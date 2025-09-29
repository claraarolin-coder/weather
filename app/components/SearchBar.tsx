"use client";
import { useState, useEffect } from "react";
import { searchCities } from "../lib/api";

export default function SearchBar({ onSelect }: { onSelect: (city: any) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // debounce → attendre 300ms avant de chercher
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const cities = await searchCities(query);

        // 🔑 injecter un id basé sur lat/long
        const withIds = cities.map((c: any) => ({
          ...c,
          id: `${c.latitude}-${c.longitude}`,
        }));

        setResults(withIds);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar ciudad..."
        className="w-full p-2 border rounded"
      />
      {loading && <p className="text-sm text-gray-500">Buscando...</p>}
      <ul className="border rounded mt-2">
        {results.map((city) => (
          <li
            key={city.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              console.log("🟡 Ville sélectionnée:", city);
              onSelect(city);
            }}
          >
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

