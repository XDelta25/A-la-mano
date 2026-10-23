import type { Metadata } from "next";
import { Buscador } from "@/components/Buscador";

export const metadata: Metadata = {
  title: "Buscar servicios · A la mano",
};

export default function Buscar() {
  return <Buscador />;
}
