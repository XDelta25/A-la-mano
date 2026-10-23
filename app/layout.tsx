import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "A la mano · Servicios y oficios cerca de ti",
  description:
    "Encuentra carpinteros, herreros, plomeros y más oficios cerca de ti. Mira sus trabajos, lee reseñas y contáctalos directo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="min-h-screen bg-fondo font-sans text-tinta antialiased">
        <Header />
        <main className="pb-24 md:pb-0">{children}</main>
        <BottomNav />
        <footer className="hidden border-t border-borde md:block">
          <div className="mx-auto flex max-w-5xl justify-between px-5 py-6 text-sm text-suave">
            <span>A la mano · prototipo de demostración</span>
            <span>Los perfiles y reseñas son datos de ejemplo.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
