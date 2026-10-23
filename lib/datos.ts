// Datos de ejemplo. Más adelante esto se reemplaza por consultas a Supabase.

export type Categoria = { id: string; nombre: string; icono: string };

export const categorias: Categoria[] = [
  { id: "carpinteria", nombre: "Carpintería", icono: "carpinteria" },
  { id: "herreria", nombre: "Herrería", icono: "herreria" },
  { id: "plomeria", nombre: "Plomería", icono: "plomeria" },
  { id: "electricidad", nombre: "Electricidad", icono: "electricidad" },
  { id: "pintura", nombre: "Pintura", icono: "pintura" },
  { id: "albanileria", nombre: "Albañilería", icono: "albanileria" },
  { id: "jardineria", nombre: "Jardinería", icono: "jardineria" },
];

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

export const prestadores: Prestador[] = [
  {
    id: "ramon-trevino",
    nombre: "Ramón Treviño",
    iniciales: "RT",
    tono: "#CFDAE4",
    categoria: "herreria",
    especialidad: "Portones y barandales",
    calificacion: 4.9,
    resenas: 38,
    km: 2.1,
    disponibilidad: "hoy",
    anios: 6,
    descripcion:
      "Fabricación e instalación de portones, barandales y ventanas. Trabajo con material de calidad y entrego en la fecha acordada.",
    servicios: ["Portones", "Barandales", "Ventanas", "Reparaciones"],
    trabajos: [
      { titulo: "Portón corredizo", tono: "#CFDAE4" },
      { titulo: "Barandal de escalera", tono: "#D9DDE2" },
      { titulo: "Ventana con protección", tono: "#C3D0DC" },
    ],
    resenasDestacadas: [
      {
        autor: "Ana M.",
        iniciales: "AM",
        cuando: "Hace 2 semanas",
        trabajo: "Portón corredizo",
        estrellas: 5,
        texto:
          "Quedó muy bien el portón, llegó puntual y limpió todo al terminar.",
      },
    ],
    whatsapp: "5210000000000",
  },
  {
    id: "jorge-martinez",
    nombre: "Jorge Martínez",
    iniciales: "JM",
    tono: "#D9DDE2",
    categoria: "herreria",
    especialidad: "Ventanas y protecciones",
    calificacion: 4.8,
    resenas: 27,
    km: 3.0,
    disponibilidad: "hoy",
    anios: 9,
    descripcion:
      "Protecciones, ventanas y puertas de herrería a la medida, con acabado en pintura electrostática.",
    servicios: ["Ventanas", "Protecciones", "Puertas"],
    trabajos: [
      { titulo: "Protección de ventana", tono: "#D9DDE2" },
      { titulo: "Puerta de entrada", tono: "#CFDAE4" },
      { titulo: "Reja de patio", tono: "#C3D0DC" },
    ],
    resenasDestacadas: [],
    whatsapp: "5210000000000",
  },
  {
    id: "esteban-cortes",
    nombre: "Esteban Cortés",
    iniciales: "EC",
    tono: "#CFDAE4",
    categoria: "herreria",
    especialidad: "Soldadura y estructuras",
    calificacion: 4.7,
    resenas: 41,
    km: 4.6,
    disponibilidad: "manana",
    anios: 12,
    descripcion:
      "Soldadura de estructuras metálicas, techos y cobertizos para casas y negocios.",
    servicios: ["Estructuras", "Techos", "Cobertizos"],
    trabajos: [
      { titulo: "Techo de cochera", tono: "#CFDAE4" },
      { titulo: "Estructura de local", tono: "#D9DDE2" },
      { titulo: "Cobertizo", tono: "#C3D0DC" },
    ],
    resenasDestacadas: [],
    whatsapp: "5210000000000",
  },
  {
    id: "hector-salinas",
    nombre: "Héctor Salinas",
    iniciales: "HS",
    tono: "#D9DDE2",
    categoria: "herreria",
    especialidad: "Rejas y reparaciones",
    calificacion: 4.6,
    resenas: 19,
    km: 5.2,
    disponibilidad: "semana",
    anios: 4,
    descripcion:
      "Reparación y fabricación de rejas, cerraduras y herrajes para el hogar.",
    servicios: ["Rejas", "Cerraduras", "Reparaciones"],
    trabajos: [
      { titulo: "Reja frontal", tono: "#D9DDE2" },
      { titulo: "Reparación de portón", tono: "#CFDAE4" },
      { titulo: "Herrajes", tono: "#C3D0DC" },
    ],
    resenasDestacadas: [],
    whatsapp: "5210000000000",
  },
  {
    id: "luis-garza",
    nombre: "Luis Garza",
    iniciales: "LG",
    tono: "#D9DDE2",
    categoria: "carpinteria",
    especialidad: "Closets y cocinas",
    calificacion: 4.8,
    resenas: 52,
    km: 3.4,
    disponibilidad: "manana",
    anios: 15,
    descripcion:
      "Cocinas integrales, closets y muebles a medida. Diseño y fabricación en madera y melamina.",
    servicios: ["Cocinas", "Closets", "Muebles a medida"],
    trabajos: [
      { titulo: "Cocina integral", tono: "#D9DDE2" },
      { titulo: "Closet empotrado", tono: "#CFDAE4" },
      { titulo: "Mueble de baño", tono: "#C3D0DC" },
    ],
    resenasDestacadas: [],
    whatsapp: "5210000000000",
  },
  {
    id: "mario-cantu",
    nombre: "Mario Cantú",
    iniciales: "MC",
    tono: "#C3D0DC",
    categoria: "plomeria",
    especialidad: "Instalaciones y reparaciones",
    calificacion: 4.8,
    resenas: 44,
    km: 1.8,
    disponibilidad: "hoy",
    anios: 10,
    descripcion:
      "Instalación y reparación de tuberías, calentadores y baños. Atiendo urgencias.",
    servicios: ["Fugas", "Calentadores", "Baños"],
    trabajos: [
      { titulo: "Instalación de baño", tono: "#C3D0DC" },
      { titulo: "Calentador", tono: "#CFDAE4" },
      { titulo: "Cambio de tubería", tono: "#D9DDE2" },
    ],
    resenasDestacadas: [],
    whatsapp: "5210000000000",
  },
];

export function buscarPrestador(id: string) {
  return prestadores.find((p) => p.id === id);
}

export function nombreCategoria(id: string) {
  return categorias.find((c) => c.id === id)?.nombre ?? id;
}
