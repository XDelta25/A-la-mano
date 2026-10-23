import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PrestadorCard } from "@/components/PrestadorCard";
import { categorias, prestadores } from "@/lib/datos";

export default function Inicio() {
  const destacados = [...prestadores]
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 3);

  return (
    <>
      {/* Portada: clara en celular, banda azul oscuro en escritorio */}
      <section className="md:bg-primario-oscuro md:text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 pb-2 pt-6 md:gap-5 md:pb-16 md:pt-14">
          <h1 className="max-w-2xl font-display text-[30px] font-bold leading-[1.1] tracking-tight md:text-5xl">
            Encuentra a quien sabe hacerlo
          </h1>
          <p className="max-w-xl text-[15px] leading-snug text-suave md:text-lg md:text-[#d5dee7]">
            Carpinteros, herreros, plomeros y más, cerca de ti y con trabajos
            que puedes ver.
          </p>
          <Link
            href="/buscar"
            className="mt-1 flex h-[52px] max-w-2xl items-center gap-3 rounded-2xl border border-borde bg-white px-4 text-[15px] text-suave md:h-14"
          >
            <Icon nombre="buscar" size={20} />
            ¿Qué necesitas? Ej. portón, closet…
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-5 md:pt-12">
        <h2 className="sr-only md:not-sr-only md:mb-5 md:font-display md:text-[28px] md:font-bold">
          Oficios más buscados
        </h2>
        <div className="grid grid-cols-4 gap-2.5 md:grid-cols-7 md:gap-3">
          {categorias.map((c) => (
            <Link
              key={c.id}
              href="/buscar"
              className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-2xl border border-borde bg-white px-0.5 py-2.5 text-primario transition-colors hover:border-primario md:min-h-[104px]"
            >
              <Icon nombre={c.icono} size={26} grosor={1.8} />
              <span className="text-center text-xs font-semibold text-tinta md:text-sm">
                {c.nombre}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-7 md:pt-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold md:text-[28px]">
            Destacados esta semana
          </h2>
          <Link href="/buscar" className="text-sm font-semibold text-primario">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {destacados.map((p) => (
            <PrestadorCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto hidden max-w-5xl px-5 pb-14 pt-12 md:block">
        <div className="flex items-center justify-between gap-6 rounded-[22px] bg-primario p-10 text-white">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              ¿Tienes un oficio? Que te encuentren.
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-[#dce5ed]">
              Crea tu perfil, sube fotos de tus trabajos y recibe solicitudes
              de clientes cerca de ti.
            </p>
          </div>
          <Link
            href="/solicitar"
            className="flex h-14 shrink-0 items-center rounded-2xl bg-white px-7 text-base font-bold text-tinta"
          >
            Crear mi perfil gratis
          </Link>
        </div>
      </section>
    </>
  );
}
