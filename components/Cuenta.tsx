"use client";

import { AuthForm } from "./AuthForm";
import { PanelCliente } from "./PanelCliente";
import { PanelPrestador } from "./PanelPrestador";
import { useSesion } from "./useSesion";
import { supabase } from "@/lib/supabase";

export function Cuenta() {
  const { cargando, usuario, perfil } = useSesion();

  if (cargando) {
    return (
      <div className="mx-auto max-w-xl px-5 py-10">
        <div role="status" aria-label="Cargando" className="h-64 animate-pulse rounded-2xl bg-borde/60" />
      </div>
    );
  }

  // Sin sesión: formulario de ingreso / registro.
  if (!usuario) return <AuthForm />;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-5 pb-8 pt-4 md:pt-10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight">
            Hola{perfil?.nombre ? `, ${perfil.nombre.split(" ")[0]}` : ""}
          </h1>
          <span className="text-sm text-suave">
            {usuario.email} ·{" "}
            {perfil?.rol === "prestador" ? "Cuenta de prestador" : "Cuenta de cliente"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="min-h-11 shrink-0 rounded-full border border-borde bg-white px-4 text-sm font-semibold text-tinta hover:border-primario"
        >
          Cerrar sesión
        </button>
      </div>

      {perfil?.rol === "prestador" ? (
        <PanelPrestador usuario={usuario} nombreInicial={perfil.nombre} />
      ) : (
        <PanelCliente />
      )}
    </div>
  );
}
