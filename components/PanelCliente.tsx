"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Solicitud = {
  id: string;
  detalle: string;
  cuando: string;
  zona: string;
  created_at: string;
  categorias: { nombre: string } | null;
};

export function PanelCliente() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    supabase
      .from("solicitudes")
      .select("id, detalle, cuando, zona, created_at, categorias(nombre)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) return setError(true);
        setSolicitudes(data as unknown as Solicitud[]);
      });
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg font-bold">Mis solicitudes</h2>
        <Link href="/solicitar" className="text-sm font-semibold text-primario">
          Nueva solicitud
        </Link>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-[#fbeaea] p-3.5 text-sm text-[#8a1f1f]">
          No pudimos cargar tus solicitudes.
        </p>
      )}

      {!error && solicitudes === null && (
        <div role="status" aria-label="Cargando" className="h-24 animate-pulse rounded-2xl bg-borde/60" />
      )}

      {solicitudes?.length === 0 && (
        <div className="rounded-2xl border border-dashed border-borde bg-white p-6 text-center text-sm text-suave">
          Todavía no has enviado solicitudes. Las que envíes con tu cuenta iniciada
          aparecerán aquí.
        </div>
      )}

      {solicitudes?.map((s) => (
        <article key={s.id} className="flex flex-col gap-1.5 rounded-2xl border border-borde bg-white p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-xl bg-chip px-2.5 py-1 text-xs font-bold text-chip-texto">
              {s.categorias?.nombre ?? "Servicio"}
            </span>
            <span className="text-xs text-suave">
              {new Date(s.created_at).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="text-[15px] leading-snug">{s.detalle}</p>
          <p className="text-xs text-suave">
            {s.zona} · {s.cuando}
          </p>
        </article>
      ))}
    </section>
  );
}
