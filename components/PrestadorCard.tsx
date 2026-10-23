import Link from "next/link";
import { Estrella } from "./Icon";
import {
  nombreCategoria,
  textoDisponibilidad,
  type Prestador,
} from "@/lib/datos";

export function PrestadorCard({ p }: { p: Prestador }) {
  return (
    <Link
      href={`/prestadores/${p.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-borde bg-white p-3.5 transition-colors hover:border-primario"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold"
          style={{ background: p.tono }}
        >
          {p.iniciales}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold">{p.nombre}</span>
          <span className="text-[13px] text-suave">
            {nombreCategoria(p.categoria)} · {p.especialidad}
          </span>
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-suave">
          {p.km.toFixed(1)} km
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[13px] text-suave">
          <span className="text-estrella">
            <Estrella />
          </span>
          <b className="text-tinta">{p.calificacion.toFixed(1)}</b> · {p.resenas}{" "}
          reseñas
        </span>
        <span className="rounded-xl bg-chip px-2.5 py-1 text-xs font-bold text-chip-texto">
          {textoDisponibilidad[p.disponibilidad]}
        </span>
      </div>
    </Link>
  );
}
