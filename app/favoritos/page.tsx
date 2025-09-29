"use client";
import { useContext } from "react";
import { FavoritesContext } from "../lib/FavoritesContext";   // ✅ importer le contexte
import WeatherCard from "../components/WeatherCard";

export default function FavoritosPage() {
  const { favorites } = useContext(FavoritesContext);   // ✅ utiliser useContext

  return (
    <main className="p-4">
      <h2 className="text-xl font-semibold mb-4">Favoritos</h2>
      {favorites.length === 0 && <p>No tienes ciudades favoritas aún.</p>}
     {favorites.map((city: any) => (
  <WeatherCard key={city.id} city={city} />
))}
    </main>
  );
}
