"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const items = [
  { href: "/", texto: "Inicio", icono: "inicio" },
  { href: "/buscar", texto: "Buscar", icono: "buscar" },
  { href: "/solicitar", texto: "Solicitar", icono: "solicitar" },
  { href: "#", texto: "Mi cuenta", icono: "cuenta" },
];

export function BottomNav() {
  const ruta = usePathname();

  // En el perfil del prestador se muestra la barra de acciones en su lugar.
  if (ruta.startsWith("/prestadores/")) return null;

  return (
    <nav
      aria-label="Navegación móvil"
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-borde bg-white px-2 pb-3 pt-1.5 md:hidden"
    >
      {items.map((it) => {
        const activo = it.href === "/" ? ruta === "/" : ruta.startsWith(it.href);
        return (
          <Link
            key={it.texto}
            href={it.href}
            aria-current={activo ? "page" : undefined}
            className={`flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ${
              activo ? "font-bold text-primario" : "font-semibold text-suave"
            }`}
          >
            <Icon nombre={it.icono} />
            {it.texto}
          </Link>
        );
      })}
    </nav>
  );
}
