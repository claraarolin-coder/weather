"use client";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<any | null>(null);

  return (
    <main className="p-4">
      <h2 className="text-xl font-semibold mb-4">Buscar clima por ciudad</h2>
      <SearchBar onSelect={(city) => setSelectedCity(city)} />

      {selectedCity && <WeatherCard city={selectedCity} />}
    </main>
  );
}
