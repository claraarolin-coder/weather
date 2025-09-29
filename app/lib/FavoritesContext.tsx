"use client";
import { createContext, useState } from "react";

export const FavoritesContext = createContext<any>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (city: any) => {
    if (!favorites.find((c) => c.id === city.id)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((c) => c.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
