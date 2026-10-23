"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { PrestadorCard } from "./PrestadorCard";
import { categorias, nombreCategoria, prestadores } from "@/lib/datos";

type Orden = "calificacion" | "distancia";

const chipBase =
  "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors";
const chipOn = "border-primario bg-primario text-white";
const chipOff = "border-borde bg-white text-tinta hover:border-primario";

export function Buscador() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [soloHoy, setSoloHoy] = useState(false);
  const [orden, setOrden] = useState<Orden>("calificacion");

  const resultados = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return prestadores
      .filter((p) => !categoria || p.categoria === categoria)
      .filter((p) => !soloHoy || p.disponibilidad === "hoy")
      .filter(
        (p) =>
          !q ||
          [p.nombre, p.especialidad, nombreCategoria(p.categoria), ...p.servicios]
            .join(" ")
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) =>
        orden === "calificacion"
          ? b.calificacion - a.calificacion
          : a.km - b.km,
      );
  }, [texto, categoria, soloHoy, orden]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 md:py-8">
      <h1 className="sr-only">Buscar servicios</h1>

      <label className="flex h-12 items-center gap-2.5 rounded-2xl border border-borde bg-white px-3.5 text-suave focus-within:border-primario">
        <Icon nombre="buscar" size={20} />
        <input
          type="search"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué necesitas? Ej. portón, closet…"
          aria-label="Buscar servicio"
          className="min-w-0 flex-1 bg-transparent text-base text-tinta outline-none"
        />
      </label>

      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        <button
          type="button"
          aria-pressed={categoria === null}
          onClick={() => setCategoria(null)}
          className={`${chipBase} ${categoria === null ? chipOn : chipOff}`}
        >
          Todos
        </button>
        {categorias.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={categoria === c.id}
            onClick={() => setCategoria(categoria === c.id ? null : c.id)}
            className={`${chipBase} ${categoria === c.id ? chipOn : chipOff}`}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={soloHoy}
          onClick={() => setSoloHoy(!soloHoy)}
          className={`${chipBase} ${soloHoy ? chipOn : chipOff}`}
        >
          Disponible hoy
        </button>
        <button
          type="button"
          aria-pressed={orden === "distancia"}
          onClick={() =>
            setOrden(orden === "distancia" ? "calificacion" : "distancia")
          }
          className={`${chipBase} ${orden === "distancia" ? chipOn : chipOff}`}
        >
          Más cerca primero
        </button>
      </div>

      <p className="text-sm text-suave" aria-live="polite">
        <b className="text-tinta">
          {resultados.length}{" "}
          {resultados.length === 1 ? "prestador" : "prestadores"}
        </b>{" "}
        cerca de ti ·{" "}
        {orden === "calificacion" ? "Mejor calificados" : "Más cercanos"}
      </p>

      {resultados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-borde bg-white p-8 text-center text-suave">
          No encontramos resultados. Prueba quitando algún filtro.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {resultados.map((p) => (
            <PrestadorCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
