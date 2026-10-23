import type { Metadata } from "next";
import { SolicitudForm } from "@/components/SolicitudForm";

export const metadata: Metadata = {
  title: "Solicitar servicio · A la mano",
};

export default function Solicitar() {
  return <SolicitudForm />;
}
