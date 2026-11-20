"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Modo = "ingresar" | "registro";
type Rol = "cliente" | "prestador";

const campo =
  "h-[52px] w-full rounded-2xl border border-borde bg-white px-3.5 text-base text-tinta outline-none focus:border-primario";

function traducirError(mensaje: string) {
  const m = mensaje.toLowerCase();
  if (m.includes("invalid login")) return "Correo o contraseña incorrectos.";
  if (m.includes("already registered")) return "Ese correo ya tiene una cuenta. Prueba iniciar sesión.";
  if (m.includes("email not confirmed")) return "Falta confirmar tu correo. Revisa tu bandeja de entrada.";
  if (m.includes("rate limit")) return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  if (m.includes("password")) return "La contraseña no cumple los requisitos (mínimo 8 caracteres).";
  return "Algo salió mal. Inténtalo de nuevo.";
}

export function AuthForm() {
  const [modo, setModo] = useState<Modo>("ingresar");
  const [rol, setRol] = useState<Rol>("cliente");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revisaCorreo, setRevisaCorreo] = useState(false);

  async function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const email = String(datos.get("email")).trim();
    const password = String(datos.get("password"));

    setEnviando(true);
    setError(null);

    if (modo === "registro") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre: String(datos.get("nombre")).trim(), rol } },
      });
      setEnviando(false);
      if (error) return setError(traducirError(error.message));
      // Sin sesión = Supabase está pidiendo confirmar el correo primero.
      if (!data.session) setRevisaCorreo(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setEnviando(false);
    if (error) setError(traducirError(error.message));
    // Si todo sale bien, useSesion detecta la sesión y la página cambia sola.
  }

  if (revisaCorreo) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-3 px-5 py-14 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">Revisa tu correo</h1>
        <p className="text-suave">
          Te enviamos un enlace para confirmar tu cuenta. Después de confirmarla, vuelve
          aquí e inicia sesión.
        </p>
      </div>
    );
  }

  const cambiar = (m: Modo) => {
    setModo(m);
    setError(null);
  };

  return (
    <form
      onSubmit={alEnviar}
      className="mx-auto flex max-w-md flex-col gap-[18px] px-5 pb-8 pt-4 md:pt-10"
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight">
          {modo === "ingresar" ? "Inicia sesión" : "Crea tu cuenta"}
        </h1>
        <p className="text-sm text-suave">
          {modo === "ingresar"
            ? "Entra para ver tus solicitudes o administrar tu perfil."
            : "Es gratis. Elige cómo vas a usar la plataforma."}
        </p>
      </div>

      <div role="group" aria-label="Modo" className="flex rounded-2xl bg-white p-1 ring-1 ring-borde">
        {(["ingresar", "registro"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={modo === m}
            onClick={() => cambiar(m)}
            className={`min-h-11 flex-1 rounded-xl text-sm font-bold ${
              modo === m ? "bg-primario text-white" : "text-suave"
            }`}
          >
            {m === "ingresar" ? "Ingresar" : "Crear cuenta"}
          </button>
        ))}
      </div>

      {modo === "registro" && (
        <>
          <div className="flex flex-col gap-2">
            <span id="rol-label" className="text-sm font-bold">
              ¿Cómo vas a usarla?
            </span>
            <div role="group" aria-labelledby="rol-label" className="grid grid-cols-2 gap-2">
              {(
                [
                  ["cliente", "Busco un servicio"],
                  ["prestador", "Ofrezco un servicio"],
                ] as const
              ).map(([valor, texto]) => (
                <button
                  key={valor}
                  type="button"
                  aria-pressed={rol === valor}
                  onClick={() => setRol(valor)}
                  className={`min-h-14 rounded-2xl border px-2 text-sm font-semibold ${
                    rol === valor
                      ? "border-primario bg-primario text-white"
                      : "border-borde bg-white text-tinta"
                  }`}
                >
                  {texto}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-sm font-bold">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              className={campo}
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={campo}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-bold">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={modo === "ingresar" ? "current-password" : "new-password"}
          className={campo}
        />
        {modo === "registro" && <p className="text-xs text-suave">Mínimo 8 caracteres.</p>}
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-[#fbeaea] p-3.5 text-sm text-[#8a1f1f]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-1 flex h-[54px] items-center justify-center rounded-2xl bg-primario text-base font-bold text-white hover:bg-primario-oscuro disabled:opacity-60"
      >
        {enviando ? "Un momento…" : modo === "ingresar" ? "Entrar" : "Crear cuenta"}
      </button>
    </form>
  );
}
