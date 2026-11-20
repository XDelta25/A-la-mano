"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";
import type { Categoria } from "@/lib/tipos";

const cuandoOpciones = ["Lo antes posible", "Esta semana", "Sin prisa"];

const campo =
  "h-[52px] w-full rounded-2xl border border-borde bg-white px-3.5 text-base text-tinta outline-none focus:border-primario";

export function SolicitudForm({ categorias }: { categorias: Categoria[] }) {
  const [cuando, setCuando] = useState(cuandoOpciones[0]);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Se leen los campos ANTES del await, porque después el formulario ya no está disponible.
    const datos = new FormData(e.currentTarget);

    setEnviando(true);
    setError(null);

    const { error } = await supabase.from("solicitudes").insert({
      categoria_id: String(datos.get("tipo")),
      detalle: String(datos.get("detalle")).trim(),
      cuando,
      zona: String(datos.get("zona")).trim(),
    });

    setEnviando(false);
    if (error) {
      setError("No pudimos enviar tu solicitud. Revisa los datos e inténtalo de nuevo.");
      console.error(error); // el detalle técnico queda en la consola del navegador (F12)
      return;
    }
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-chip text-primario">
          <Icon nombre="check" size={32} />
        </span>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          ¡Solicitud enviada!
        </h1>
        <p className="text-suave">
          Los prestadores cercanos la recibirán y te contactarán pronto.
        </p>
        <Link
          href="/"
          className="mt-2 flex h-12 items-center rounded-2xl bg-primario px-6 font-bold text-white hover:bg-primario-oscuro"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form
      className="mx-auto flex max-w-xl flex-col gap-[18px] px-5 pb-8 pt-4 md:pt-10"
      onSubmit={alEnviar}
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight">
          Cuéntanos qué necesitas
        </h1>
        <p className="text-sm text-suave">
          Los prestadores cercanos recibirán tu solicitud y te contactarán.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="tipo" className="text-sm font-bold">
          Tipo de servicio
        </label>
        <select
          id="tipo"
          name="tipo"
          className={campo}
          defaultValue={categorias[0]?.id}
        >
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="detalle" className="text-sm font-bold">
          Describe el trabajo
        </label>
        <textarea
          id="detalle"
          name="detalle"
          rows={4}
          required
          minLength={5}
          maxLength={2000}
          placeholder="Ej. Necesito un portón corredizo de 3 metros para la cochera."
          className="w-full resize-none rounded-2xl border border-borde bg-white p-3.5 text-[15px] leading-snug text-tinta outline-none focus:border-primario"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">
          Fotos <span className="font-medium text-suave">(opcional)</span>
        </span>
        <button
          type="button"
          className="flex h-16 items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[#8ea3b6] bg-white text-sm font-semibold text-primario"
        >
          <Icon nombre="mas_signo" size={20} />
          Agregar fotos del lugar
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span id="cuando-label" className="text-sm font-bold">
          ¿Cuándo lo necesitas?
        </span>
        <div role="group" aria-labelledby="cuando-label" className="flex gap-2">
          {cuandoOpciones.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={cuando === o}
              onClick={() => setCuando(o)}
              className={`min-h-12 flex-1 rounded-2xl border px-1 text-sm font-semibold ${
                cuando === o
                  ? "border-primario bg-primario text-white"
                  : "border-borde bg-white text-tinta"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="zona" className="text-sm font-bold">
          Zona o colonia
        </label>
        <input
          id="zona"
          name="zona"
          type="text"
          required
          minLength={2}
          maxLength={120}
          placeholder="Colonia o código postal"
          className={campo}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-[#fbeaea] p-3.5 text-sm text-[#8a1f1f]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-1 flex h-[54px] items-center justify-center rounded-2xl bg-primario text-base font-bold text-white hover:bg-primario-oscuro disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
