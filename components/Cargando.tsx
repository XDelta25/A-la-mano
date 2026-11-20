// Marcador gris que se ve unos instantes mientras llegan los datos de Supabase.
export function Cargando({ alto = "h-40" }: { alto?: string }) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`${alto} w-full animate-pulse rounded-2xl bg-borde/60`}
    />
  );
}
