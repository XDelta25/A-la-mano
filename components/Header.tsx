import Link from "next/link";
import { Icon } from "./Icon";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primario text-white">
        <Icon nombre="carpinteria" size={20} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        A la mano
      </span>
    </Link>
  );
}

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/buscar", texto: "Buscar" },
  { href: "/solicitar", texto: "Solicitar servicio" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-borde bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold text-suave hover:text-tinta"
            >
              {e.texto}
            </Link>
          ))}
          <Link
            href="/solicitar"
            className="ml-2 flex min-h-11 items-center rounded-full border-[1.5px] border-primario px-4 text-[15px] font-bold text-primario hover:bg-chip"
          >
            Ofrecer mis servicios
          </Link>
        </nav>
        <span className="flex min-h-11 items-center gap-1.5 rounded-full border border-borde bg-white px-3.5 text-[13px] font-semibold text-primario md:hidden">
          <Icon nombre="ubicacion" size={16} />
          Cerca de ti
        </span>
      </div>
    </header>
  );
}
