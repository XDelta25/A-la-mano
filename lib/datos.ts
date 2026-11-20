// Consultas a Supabase. Cada función devuelve datos con la misma forma
// (tipos en lib/tipos.ts) que antes tenían los datos de ejemplo,
// así que las páginas casi no cambian.

import { supabase } from "./supabase";
import type { Categoria, Disponibilidad, Prestador } from "./tipos";

// Forma de una fila tal como llega de la base de datos (columnas en snake_case).
type FilaPrestador = {
  id: string;
  nombre: string;
  iniciales: string;
  tono: string;
  categoria_id: string;
  especialidad: string;
  descripcion: string;
  servicios: string[];
  anios: number;
  disponibilidad: Disponibilidad;
  calificacion: number;
  num_resenas: number;
  km: number;
  whatsapp: string;
  verificado: boolean;
  categorias: { nombre: string } | null;
  trabajos?: { titulo: string; tono: string }[];
  resenas?: {
    autor: string;
    iniciales: string;
    trabajo: string;
    estrellas: number;
    texto: string;
    created_at: string;
  }[];
};

function haceCuanto(iso: string) {
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (dias < 1) return "Hoy";
  if (dias < 7) return `Hace ${dias} ${dias === 1 ? "día" : "días"}`;
  if (dias < 30) {
    const s = Math.floor(dias / 7);
    return `Hace ${s} ${s === 1 ? "semana" : "semanas"}`;
  }
  const m = Math.floor(dias / 30);
  return `Hace ${m} ${m === 1 ? "mes" : "meses"}`;
}

// Convierte una fila de la base de datos en el tipo Prestador que usa la interfaz.
function aPrestador(f: FilaPrestador): Prestador {
  return {
    id: f.id,
    nombre: f.nombre,
    iniciales: f.iniciales,
    tono: f.tono,
    categoria: f.categoria_id,
    categoriaNombre: f.categorias?.nombre ?? f.categoria_id,
    especialidad: f.especialidad,
    calificacion: Number(f.calificacion),
    resenas: f.num_resenas,
    km: Number(f.km),
    disponibilidad: f.disponibilidad,
    anios: f.anios,
    descripcion: f.descripcion,
    servicios: f.servicios,
    trabajos: f.trabajos ?? [],
    resenasDestacadas: (f.resenas ?? []).map((r) => ({
      autor: r.autor,
      iniciales: r.iniciales,
      cuando: haceCuanto(r.created_at),
      trabajo: r.trabajo,
      estrellas: r.estrellas,
      texto: r.texto,
    })),
    whatsapp: f.whatsapp,
    verificado: f.verificado,
  };
}

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("id, nombre, icono")
    .order("orden");
  if (error) throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  return data;
}

export async function getPrestadores(): Promise<Prestador[]> {
  const { data, error } = await supabase
    .from("prestadores")
    .select("*, categorias(nombre)")
    .order("calificacion", { ascending: false });
  if (error) throw new Error(`No se pudieron cargar los prestadores: ${error.message}`);
  return (data as unknown as FilaPrestador[]).map(aPrestador);
}

export async function getPrestador(id: string): Promise<Prestador | null> {
  const { data, error } = await supabase
    .from("prestadores")
    .select(
      "*, categorias(nombre), trabajos(titulo, tono), resenas(autor, iniciales, trabajo, estrellas, texto, created_at)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`No se pudo cargar el perfil: ${error.message}`);
  return data ? aPrestador(data as unknown as FilaPrestador) : null;
}
