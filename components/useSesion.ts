"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type Perfil = { rol: "cliente" | "prestador"; nombre: string };

type Estado = { cargando: boolean; usuario: User | null; perfil: Perfil | null };

// Devuelve quién tiene la sesión abierta y cuál es su rol.
// Se actualiza solo cuando alguien inicia o cierra sesión.
export function useSesion(): Estado {
  const [estado, setEstado] = useState<Estado>({
    cargando: true,
    usuario: null,
    perfil: null,
  });

  useEffect(() => {
    let activo = true;

    async function cargar(usuario: User | null) {
      if (!usuario) {
        if (activo) setEstado({ cargando: false, usuario: null, perfil: null });
        return;
      }
      const { data } = await supabase
        .from("perfiles")
        .select("rol, nombre")
        .eq("id", usuario.id)
        .maybeSingle();
      if (activo) {
        setEstado({ cargando: false, usuario, perfil: (data as Perfil) ?? null });
      }
    }

    supabase.auth.getSession().then(({ data }) => cargar(data.session?.user ?? null));

    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      // setTimeout evita un bloqueo conocido al llamar a Supabase dentro de este aviso.
      setTimeout(() => cargar(sesion?.user ?? null), 0);
    });

    return () => {
      activo = false;
      suscripcion.subscription.unsubscribe();
    };
  }, []);

  return estado;
}
