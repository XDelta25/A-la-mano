-- A la mano · esquema de la base de datos
-- Pégalo completo en Supabase → SQL Editor → New query → Run.
-- Es seguro correrlo una sola vez. Si lo corres dos veces dará "ya existe".

-- ───────────── Tablas ─────────────

create table public.categorias (
  id      text primary key,            -- ej. 'herreria'
  nombre  text not null,               -- ej. 'Herrería'
  icono   text not null,               -- nombre del ícono en components/Icon.tsx
  orden   int  not null default 0
);

create table public.prestadores (
  id            text primary key,      -- ej. 'ramon-trevino' (es la dirección del perfil)
  nombre        text not null,
  iniciales     text not null,
  tono          text not null default '#CFDAE4',
  categoria_id  text not null references public.categorias (id),
  especialidad  text not null,
  descripcion   text not null default '',
  servicios     text[] not null default '{}',
  anios         int  not null default 0,
  disponibilidad text not null default 'semana'
                check (disponibilidad in ('hoy', 'manana', 'semana')),
  -- Valores de demostración. Cuando haya reseñas reales se calculan a partir de la tabla resenas.
  calificacion  numeric(2,1) not null default 0,
  num_resenas   int not null default 0,
  km            numeric(4,1) not null default 0,   -- distancia de demostración
  whatsapp      text not null,                     -- con lada de país, sin signos
  activo        boolean not null default true,
  created_at    timestamptz not null default now()
);

create table public.trabajos (
  id            bigint generated always as identity primary key,
  prestador_id  text not null references public.prestadores (id) on delete cascade,
  titulo        text not null,
  tono          text not null default '#CFDAE4'    -- más adelante: url de la foto
);

create table public.resenas (
  id            bigint generated always as identity primary key,
  prestador_id  text not null references public.prestadores (id) on delete cascade,
  autor         text not null,
  iniciales     text not null,
  trabajo       text not null default '',
  estrellas     int  not null check (estrellas between 1 and 5),
  texto         text not null,
  created_at    timestamptz not null default now()
);

create table public.solicitudes (
  id            uuid primary key default gen_random_uuid(),
  categoria_id  text not null references public.categorias (id),
  detalle       text not null check (char_length(detalle) between 5 and 2000),
  cuando        text not null check (cuando in ('Lo antes posible', 'Esta semana', 'Sin prisa')),
  zona          text not null check (char_length(zona) between 2 and 120),
  created_at    timestamptz not null default now()
);

create index on public.prestadores (categoria_id);
create index on public.trabajos (prestador_id);
create index on public.resenas (prestador_id);

-- ───────────── Seguridad (Row Level Security) ─────────────
-- Con RLS activado nadie puede leer ni escribir nada hasta que exista una política que lo permita.

alter table public.categorias   enable row level security;
alter table public.prestadores  enable row level security;
alter table public.trabajos     enable row level security;
alter table public.resenas      enable row level security;
alter table public.solicitudes  enable row level security;

-- Cualquier visitante puede VER categorías, prestadores activos, trabajos y reseñas.
create policy "lectura publica" on public.categorias
  for select to anon, authenticated using (true);

create policy "lectura publica" on public.prestadores
  for select to anon, authenticated using (activo);

create policy "lectura publica" on public.trabajos
  for select to anon, authenticated using (true);

create policy "lectura publica" on public.resenas
  for select to anon, authenticated using (true);

-- Cualquier visitante puede ENVIAR una solicitud, pero NO leer las de otros.
-- (Las restricciones check de la tabla limitan qué valores se aceptan.)
create policy "enviar solicitud" on public.solicitudes
  for insert to anon, authenticated with check (true);

-- Permisos de tabla (complementan las políticas).
grant select on public.categorias, public.prestadores, public.trabajos, public.resenas
  to anon, authenticated;
grant insert on public.solicitudes to anon, authenticated;
