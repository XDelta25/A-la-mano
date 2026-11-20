import { Suspense } from "react";
import type { Metadata } from "next";
import { SolicitudForm } from "@/components/SolicitudForm";
import { Cargando } from "@/components/Cargando";
import { getCategorias } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Solicitar servicio · A la mano",
};

async function Formulario() {
  const categorias = await getCategorias();
  return <SolicitudForm categorias={categorias} />;
}

export default function Solicitar() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl px-5 py-10">
          <Cargando alto="h-96" />
        </div>
      }
    >
      <Formulario />
    </Suspense>
  );
}
