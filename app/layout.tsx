import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { FavoritesProvider } from "./lib/FavoritesContext"; // ✅

export const metadata: Metadata = {
  title: "Mini-App del Clima",
  description: "Next.js + Tailwind + Open-Meteo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <FavoritesProvider>
          <Nav />
          <main className="max-w-3xl mx-auto p-4">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}

