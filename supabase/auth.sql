-- A la mano · cuentas, roles y permisos
-- Córrelo en Supabase → SQL Editor, DESPUÉS de schema.sql y seed.sql.

-- ───────────── Perfiles: un registro por cada usuario con su rol ─────────────

create table public.perfiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  rol         text not null check (rol in ('cliente', 'prestador')),
  nombre      text not null default '',
  created_at  timestamptz not null default now()
);

alter table public.perfiles enable row level security;

-- Cada persona solo puede ver su propio perfil. Nadie lo edita desde la web
-- (el rol se fija al registrarse), por eso no hay política de insert ni update.
create policy "ver mi perfil" on public.perfiles
  for select to authenticated using (id = (select auth.uid()));

grant select on public.perfiles to authenticated;

-- Al registrarse alguien, se crea su perfil automáticamente
-- con el nombre y el rol que eligió en el formulario.
create function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, rol, nombre)
  values (
    new.id,
    case when new.raw_user_meta_data ->> 'rol' = 'prestador' then 'prestador' else 'cliente' end,
    coalesce(new.raw_user_meta_data ->> 'nombre', '')
  );
  return new;
end;
$$;

revoke execute on function public.crear_perfil() from public, anon, authenticated;

create trigger al_registrarse
  after insert on auth.users
  for each row execute function public.crear_perfil();

-- ───────────── Prestadores: cada usuario prestador es dueño de UN perfil ─────────────

alter table public.prestadores
  add column user_id   uuid unique references auth.users (id) on delete set null,
  add column verificado boolean not null default false;

-- Los prestadores de demostración se marcan como verificados.
-- Los nuevos empiezan sin verificar: la insignia solo la puede dar el administrador.
update public.prestadores set verificado = true where user_id is null;

-- El dueño puede ver su perfil aunque esté inactivo.
create policy "ver el mio" on public.prestadores
  for select to authenticated using (user_id = (select auth.uid()));

-- Crear: solo quien tiene rol 'prestador' y solo a su nombre.
create policy "crear el mio" on public.prestadores
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.perfiles
      where id = (select auth.uid()) and rol = 'prestador'
    )
  );

-- Editar: solo el propio.
create policy "editar el mio" on public.prestadores
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Permisos POR COLUMNA: el prestador puede escribir sus datos,
-- pero NO calificacion, num_resenas, km, activo ni verificado.
grant insert (id, user_id, nombre, iniciales, categoria_id, especialidad,
              descripcion, servicios, anios, disponibilidad, whatsapp)
  on public.prestadores to authenticated;

grant update (nombre, iniciales, categoria_id, especialidad,
              descripcion, servicios, anios, disponibilidad, whatsapp)
  on public.prestadores to authenticated;

-- ───────────── Solicitudes: cada cliente puede ver las suyas ─────────────

-- user_id se llena solo con el usuario que envía (queda vacío si envía sin cuenta).
alter table public.solicitudes
  add column user_id uuid default auth.uid() references auth.users (id) on delete set null;

create policy "ver mis solicitudes" on public.solicitudes
  for select to authenticated using (user_id = (select auth.uid()));

grant select on public.solicitudes to authenticated;
