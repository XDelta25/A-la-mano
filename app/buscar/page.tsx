import { Suspense } from "react";
import type { Metadata } from "next";
import { Buscador } from "@/components/Buscador";
import { Cargando } from "@/components/Cargando";
import { getCategorias, getPrestadores } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Buscar servicios · A la mano",
};

async function Resultados() {
  // Las dos consultas se lanzan a la vez para no esperar una por una.
  const [prestadores, categorias] = await Promise.all([
    getPrestadores(),
    getCategorias(),
  ]);
  return <Buscador prestadores={prestadores} categorias={categorias} />;
}

export default function Buscar() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-5 py-6">
          <Cargando alto="h-64" />
        </div>
      }
    >
      <Resultados />
    </Suspense>
  );
}
