import type { Metadata } from "next";
import { Cuenta } from "@/components/Cuenta";

export const metadata: Metadata = {
  title: "Mi cuenta · A la mano",
};

export default function PaginaCuenta() {
  return <Cuenta />;
}
