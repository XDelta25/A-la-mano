import { createClient } from "@supabase/supabase-js";

// Las dos variables viven en el archivo .env.local (en la raíz del proyecto).
// Es importante escribir process.env.NOMBRE completo: Next.js lo reemplaza al compilar.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const llave = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !llave) {
  throw new Error(
    "Faltan las variables de Supabase. Crea el archivo .env.local con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY y reinicia npm run dev.",
  );
}

// Esta llave es pública por diseño: lo que se puede ver o hacer lo controlan
// las políticas de seguridad (RLS) definidas en supabase/schema.sql.
export const supabase = createClient(url, llave);
