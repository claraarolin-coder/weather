"use client";
import { useEffect, useState, useContext } from "react";
import { getWeather } from "../lib/api";
import { FavoritesContext } from "../lib/FavoritesContext"; // 👈 import ici

export default function WeatherCard({ city }: { city: any }) {
  const [weather, setWeather] = useState<any | null>(null);

  // 👇 récupérer le contexte
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    async function load() {
      const data = await getWeather(city.latitude, city.longitude);
      setWeather(data);
    }
    load();
  }, [city]);

  if (!weather) return <p>Cargando clima...</p>;

  // 👇 vérifier si la ville est déjà en favoris
  const isFavorite = favorites.some((c: any) => c.id === city.id);

  return (
    <div className="mt-4 p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg">
        {city.name}, {city.country}
      </h3>
      <p className="mb-2">
        🌡️ Actual: {weather.current_weather.temperature}°C  
        💨 Viento: {weather.current_weather.windspeed} km/h
      </p>

      <h4 className="font-semibold">Pronóstico 3 días:</h4>
      <ul className="list-disc pl-5">
        {weather.daily.time.map((day: string, i: number) => (
          <li key={day}>
            {day} → min {weather.daily.temperature_2m_min[i]}°C / max {weather.daily.temperature_2m_max[i]}°C
          </li>
        ))}
      </ul>

      {/* 👇 bouton ajouter/retirer */}
      {isFavorite ? (
        <button
          onClick={() => removeFavorite(city.id)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Quitar de favoritos
        </button>
      ) : (
        <button
          onClick={() => addFavorite(city)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Añadir a favoritos
        </button>
      )}
    </div>
  );
}
