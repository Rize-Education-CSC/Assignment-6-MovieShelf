import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem("movieWatchlist");
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error("Error loading watchlist:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));
    } catch (error) {
      console.error("Error saving watchlist:", error);
    }
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current;
      }
      return [...current, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((current) =>
      current.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <MovieContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
