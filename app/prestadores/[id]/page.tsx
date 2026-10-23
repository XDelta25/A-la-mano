import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Estrella, Icon } from "@/components/Icon";
import {
  buscarPrestador,
  nombreCategoria,
  prestadores,
  textoDisponibilidad,
} from "@/lib/datos";

type Props = { params: Promise<{ id: string }> };

// Genera una página por cada prestador de ejemplo.
export function generateStaticParams() {
  return prestadores.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = buscarPrestador(id);
  return {
    title: p ? `${p.nombre} · ${nombreCategoria(p.categoria)}` : "Perfil",
  };
}

export default async function Perfil({ params }: Props) {
  const { id } = await params;
  const p = buscarPrestador(id);
  if (!p) notFound();

  const enlaceWhatsApp = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(
    `Hola ${p.nombre}, vi tu perfil en A la mano y me interesa tu servicio.`,
  )}`;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-3 md:pb-12 md:pt-8">
      <Link
        href="/buscar"
        className="-ml-2.5 flex h-11 w-fit items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold text-suave hover:text-tinta"
      >
        <Icon nombre="volver" size={20} />
        Volver a resultados
      </Link>

      <div className="mt-2 flex flex-col gap-5">
        <section className="flex flex-col gap-3 rounded-[18px] border border-borde bg-white p-[18px]">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full text-2xl font-bold"
              style={{ background: p.tono }}
            >
              {p.iniciales}
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="font-display text-[22px] font-bold tracking-tight">
                {p.nombre}
              </h1>
              <span className="text-sm text-suave">
                {nombreCategoria(p.categoria)} · {p.especialidad}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-[14px] bg-chip px-2.5 py-1.5 text-xs font-bold text-chip-texto">
              <Icon nombre="escudo" size={14} grosor={2.2} />
              Identidad verificada
            </span>
            <span className="flex items-center gap-1.5 rounded-[14px] bg-fondo px-2.5 py-1.5 text-xs font-bold text-suave">
              <Icon nombre="ubicacion" size={14} grosor={2.2} />A{" "}
              {p.km.toFixed(1)} km de ti
            </span>
            <span className="flex items-center gap-1.5 rounded-[14px] bg-fondo px-2.5 py-1.5 text-xs font-bold text-suave">
              {textoDisponibilidad[p.disponibilidad]}
            </span>
          </div>
        </section>

        <section className="grid grid-cols-3 rounded-2xl border border-borde bg-white">
          <Dato valor={p.calificacion.toFixed(1)} etiqueta="Calificación" />
          <Dato valor={String(p.resenas)} etiqueta="Reseñas" centro />
          <Dato valor={`${p.anios} años`} etiqueta="Experiencia" />
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-[17px] font-bold">Acerca de</h2>
          <p className="text-[15px] leading-relaxed text-[#3b4854]">
            {p.descripcion}
          </p>
          <ul className="flex flex-wrap gap-2">
            {p.servicios.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-borde bg-white px-3 py-1.5 text-[13px] font-semibold text-primario"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="font-display text-[17px] font-bold">
            Trabajos recientes
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {p.trabajos.map((t) => (
              <div
                key={t.titulo}
                className="flex h-[104px] flex-col items-center justify-center gap-1.5 rounded-xl text-primario md:h-40"
                style={{ background: t.tono }}
              >
                <Icon nombre="imagen" size={24} grosor={1.8} />
                <span className="px-1 text-center text-[11px] font-semibold text-chip-texto md:text-sm">
                  {t.titulo}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-suave">
            Aquí irán las fotos reales que suba cada prestador.
          </p>
        </section>

        {p.resenasDestacadas.length > 0 && (
          <section className="flex flex-col gap-2.5">
            <h2 className="font-display text-[17px] font-bold">Reseñas</h2>
            {p.resenasDestacadas.map((r) => (
              <article
                key={r.autor + r.cuando}
                className="flex flex-col gap-2 rounded-2xl border border-borde bg-white p-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9dde2] text-[13px] font-bold">
                    {r.iniciales}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{r.autor}</span>
                    <span className="text-xs text-suave">
                      {r.cuando} · {r.trabajo}
                    </span>
                  </div>
                </div>
                <span
                  className="flex gap-0.5 text-estrella"
                  role="img"
                  aria-label={`${r.estrellas} de 5 estrellas`}
                >
                  {Array.from({ length: r.estrellas }).map((_, i) => (
                    <Estrella key={i} />
                  ))}
                </span>
                <p className="text-sm leading-relaxed text-[#3b4854]">
                  {r.texto}
                </p>
              </article>
            ))}
          </section>
        )}

        {/* Barra de acciones: fija abajo en celular, normal en escritorio */}
        <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2.5 border-t border-borde bg-white px-5 pb-5 pt-3 md:static md:border-0 md:bg-transparent md:p-0">
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-[1.5px] border-primario text-[15px] font-bold text-primario hover:bg-chip"
          >
            <Icon nombre="whatsapp" size={20} />
            WhatsApp
          </a>
          <Link
            href="/solicitar"
            className="flex h-[52px] flex-1 items-center justify-center rounded-2xl bg-primario text-[15px] font-bold text-white hover:bg-primario-oscuro"
          >
            Solicitar servicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function Dato({
  valor,
  etiqueta,
  centro,
}: {
  valor: string;
  etiqueta: string;
  centro?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 px-1 py-3.5 ${
        centro ? "border-x border-borde" : ""
      }`}
    >
      <b className="font-display text-xl">{valor}</b>
      <span className="text-xs text-suave">{etiqueta}</span>
    </div>
  );
}
