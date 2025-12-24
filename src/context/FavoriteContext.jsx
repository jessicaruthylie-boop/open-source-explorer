import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("gitvista_favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gitvista_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (user) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === user.id)
        ? prev.filter((f) => f.id !== user.id)
        : [...prev, user]
    );
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
