const rutas: Record<string, string> = {
  carpinteria: "M3 17 17 3l4 4L7 21z M7 13l2 2 M10 10l2 2 M13 7l2 2",
  herreria:
    "M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  plomeria:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  electricidad: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  pintura: "M5 3h12v6H5z M17 6h3v5H11v3 M10 14h2v7h-2z",
  albanileria: "M3 5h18v14H3z M3 12h18 M9 5v7 M15 12v7",
  jardineria: "M5 19C5 10 10 5 20 4c0 10-5 15-14 15z M5 19l7-7",
  mas: "M5 12h.01 M12 12h.01 M19 12h.01",
  buscar: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3",
  ubicacion:
    "M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  volver: "M19 12H5 M12 19l-7-7 7-7",
  inicio: "M3 11l9-8 9 8 M5 10v10h14V10",
  solicitar: "M9 4h6v3H9z M7 5H5v16h14V5h-2 M9 12h6 M9 16h4",
  cuenta: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6",
  escudo: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",
  whatsapp: "M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z",
  mas_signo: "M12 5v14 M5 12h14",
  imagen: "M4 5h16v14H4z M4 16l5-5 4 4 3-3 4 4 M9 9h.01",
  check: "M5 13l4 4L19 7",
};

export function Icon({
  nombre,
  size = 22,
  className,
  grosor = 2,
}: {
  nombre: string;
  size?: number;
  className?: string;
  grosor?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={rutas[nombre] ?? rutas.mas} />
    </svg>
  );
}

export function Estrella({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
    </svg>
  );
}
