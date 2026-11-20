"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Categoria, Disponibilidad } from "@/lib/tipos";

type Mio = {
  id: string;
  nombre: string;
  categoria_id: string;
  especialidad: string;
  descripcion: string;
  servicios: string[];
  anios: number;
  disponibilidad: Disponibilidad;
  whatsapp: string;
  verificado: boolean;
};

const campo =
  "h-[52px] w-full rounded-2xl border border-borde bg-white px-3.5 text-base text-tinta outline-none focus:border-primario";

// "Ana López" → "ana-lopez": sirve como dirección del perfil (/prestadores/ana-lopez)
function aSlug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function aIniciales(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

// Deja solo dígitos. Un número de 10 dígitos se toma como mexicano y lleva 52 delante.
function normalizarWhatsapp(texto: string) {
  const digitos = texto.replace(/\D/g, "");
  return digitos.length === 10 ? `52${digitos}` : digitos;
}

export function PanelPrestador({
  usuario,
  nombreInicial,
}: {
  usuario: User;
  nombreInicial: string;
}) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mio, setMio] = useState<Mio | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from("categorias").select("id, nombre, icono").order("orden"),
      supabase
        .from("prestadores")
        .select(
          "id, nombre, categoria_id, especialidad, descripcion, servicios, anios, disponibilidad, whatsapp, verificado",
        )
        .eq("user_id", usuario.id)
        .maybeSingle(),
    ]).then(([cats, perfil]) => {
      setCategorias((cats.data as Categoria[]) ?? []);
      setMio((perfil.data as Mio) ?? null);
      setCargando(false);
    });
  }, [usuario.id]);

  async function alGuardar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);

    const whatsapp = normalizarWhatsapp(String(datos.get("whatsapp")));
    if (whatsapp.length < 11 || whatsapp.length > 15) {
      return setMensaje({
        tipo: "error",
        texto: "Revisa el WhatsApp: escribe tu número a 10 dígitos o con lada de país.",
      });
    }

    const nombre = String(datos.get("nombre")).trim();
    const campos = {
      nombre,
      iniciales: aIniciales(nombre),
      categoria_id: String(datos.get("categoria")),
      especialidad: String(datos.get("especialidad")).trim(),
      descripcion: String(datos.get("descripcion")).trim(),
      servicios: String(datos.get("servicios"))
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      anios: Math.max(0, Number(datos.get("anios")) || 0),
      disponibilidad: String(datos.get("disponibilidad")) as Disponibilidad,
      whatsapp,
    };

    setGuardando(true);
    setMensaje(null);

    if (mio) {
      const { error } = await supabase.from("prestadores").update(campos).eq("id", mio.id);
      setGuardando(false);
      if (error) {
        console.error(error);
        return setMensaje({ tipo: "error", texto: "No se pudo guardar. Inténtalo de nuevo." });
      }
      setMio({ ...mio, ...campos });
      return setMensaje({ tipo: "ok", texto: "Cambios guardados." });
    }

    // Primera vez: se crea el perfil. Si la dirección ya existe, se le agrega un sufijo.
    const base = aSlug(nombre) || "prestador";
    let id = base;
    let resultado = await supabase.from("prestadores").insert({ id, user_id: usuario.id, ...campos });
    if (resultado.error?.code === "23505") {
      id = `${base}-${Math.random().toString(36).slice(2, 6)}`;
      resultado = await supabase.from("prestadores").insert({ id, user_id: usuario.id, ...campos });
    }
    setGuardando(false);
    if (resultado.error) {
      console.error(resultado.error);
      return setMensaje({ tipo: "error", texto: "No se pudo crear tu perfil. Inténtalo de nuevo." });
    }
    setMio({ id, verificado: false, ...campos });
    setMensaje({ tipo: "ok", texto: "¡Tu perfil ya está publicado!" });
  }

  if (cargando) {
    return <div role="status" aria-label="Cargando" className="h-64 animate-pulse rounded-2xl bg-borde/60" />;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-lg font-bold">
          {mio ? "Mi perfil de prestador" : "Crea tu perfil de prestador"}
        </h2>
        <p className="text-sm text-suave">
          {mio
            ? "Así te verán los clientes en la búsqueda."
            : "Llénalo una vez y aparecerás en las búsquedas de tu oficio."}
        </p>
      </div>

      {mio && (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/prestadores/${mio.id}`}
            className="flex min-h-11 items-center rounded-2xl border-[1.5px] border-primario px-4 text-sm font-bold text-primario hover:bg-chip"
          >
            Ver mi perfil público
          </Link>
          {!mio.verificado && (
            <span className="text-xs text-suave">
              Tu identidad aún no está verificada; la insignia la asigna el equipo.
            </span>
          )}
        </div>
      )}

      <form onSubmit={alGuardar} className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="text-sm font-bold">
            Nombre o nombre del negocio
          </label>
          <input id="nombre" name="nombre" required minLength={2} maxLength={80}
            defaultValue={mio?.nombre ?? nombreInicial} className={campo} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-sm font-bold">Oficio</label>
          <select id="categoria" name="categoria" className={campo}
            defaultValue={mio?.categoria_id ?? categorias[0]?.id} key={categorias.length}>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="especialidad" className="text-sm font-bold">Especialidad</label>
          <input id="especialidad" name="especialidad" required maxLength={80}
            placeholder="Ej. Portones y barandales" defaultValue={mio?.especialidad ?? ""} className={campo} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="text-sm font-bold">Acerca de tu trabajo</label>
          <textarea id="descripcion" name="descripcion" rows={4} required maxLength={600}
            defaultValue={mio?.descripcion ?? ""}
            className="w-full resize-none rounded-2xl border border-borde bg-white p-3.5 text-[15px] leading-snug text-tinta outline-none focus:border-primario" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="servicios" className="text-sm font-bold">Servicios que ofreces</label>
          <input id="servicios" name="servicios" placeholder="Separados por comas: Portones, Barandales"
            defaultValue={mio?.servicios.join(", ") ?? ""} className={campo} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="anios" className="text-sm font-bold">Años de experiencia</label>
            <input id="anios" name="anios" type="number" min={0} max={80}
              defaultValue={mio?.anios ?? 0} className={campo} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="disponibilidad" className="text-sm font-bold">Disponibilidad</label>
            <select id="disponibilidad" name="disponibilidad" className={campo}
              defaultValue={mio?.disponibilidad ?? "semana"}>
              <option value="hoy">Disponible hoy</option>
              <option value="manana">Desde mañana</option>
              <option value="semana">Esta semana</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className="text-sm font-bold">WhatsApp</label>
          <input id="whatsapp" name="whatsapp" type="tel" required inputMode="tel"
            placeholder="10 dígitos, ej. 8681234567" defaultValue={mio?.whatsapp ?? ""} className={campo} />
        </div>

        {mensaje && (
          <p role={mensaje.tipo === "error" ? "alert" : "status"}
            className={`rounded-2xl p-3.5 text-sm ${
              mensaje.tipo === "error" ? "bg-[#fbeaea] text-[#8a1f1f]" : "bg-chip text-chip-texto"
            }`}>
            {mensaje.texto}
          </p>
        )}

        <button type="submit" disabled={guardando}
          className="flex h-[54px] items-center justify-center rounded-2xl bg-primario text-base font-bold text-white hover:bg-primario-oscuro disabled:opacity-60">
          {guardando ? "Guardando…" : mio ? "Guardar cambios" : "Publicar mi perfil"}
        </button>
      </form>
    </section>
  );
}
