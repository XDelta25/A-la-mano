// Tipos y textos compartidos. No importa Supabase, así que es seguro usarlo
// tanto en componentes del servidor como del navegador.

export type Categoria = { id: string; nombre: string; icono: string };

export type Disponibilidad = "hoy" | "manana" | "semana";

export const textoDisponibilidad: Record<Disponibilidad, string> = {
  hoy: "Disponible hoy",
  manana: "Desde mañana",
  semana: "Esta semana",
};

export type Resena = {
  autor: string;
  iniciales: string;
  cuando: string;
  trabajo: string;
  estrellas: number;
  texto: string;
};

export type Prestador = {
  id: string;
  nombre: string;
  iniciales: string;
  tono: string;
  categoria: string; // id de categoría
  categoriaNombre: string; // nombre para mostrar
  especialidad: string;
  calificacion: number;
  resenas: number;
  km: number;
  disponibilidad: Disponibilidad;
  anios: number;
  descripcion: string;
  servicios: string[];
  trabajos: { titulo: string; tono: string }[];
  resenasDestacadas: Resena[];
  whatsapp: string; // número con lada país, sin símbolos
};
