export async function searchCities(query: string) {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=es`,
      { cache: "no-store" } // <- important
    );

    if (!res.ok) {
      console.error("Error en la API:", res.status);
      return [];
    }

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("❌ Error de red:", err);
    return [];
  }
}
export async function getWeather(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=3&timezone=auto`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Error al obtener clima:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error de red clima:", err);
    return null;
  }
}
