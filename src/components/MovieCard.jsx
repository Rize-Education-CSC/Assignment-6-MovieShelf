import { useState } from "react";
import { useMovies } from "../contexts/MovieContext";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE =
  "https://placehold.co/300x450?text=No+Poster";

function getSavedFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
  } catch {
    return [];
  }
}

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() =>
    getSavedFavorites().some((item) => item.id === movie.id)
  );

  function toggleFavorite() {
    const favorites = getSavedFavorites();

    const alreadySaved = favorites.some(
      (item) => item.id === movie.id
    );

    const updatedFavorites = alreadySaved
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(!alreadySaved);
  }

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  return (
    <article className="movie-card">
      <img
        src={poster}
        alt={`${movie.title} poster`}
        loading="lazy"
      />

      <div className="movie-card-content">
        <h2>{movie.title}</h2>
        <p>
          {movie.release_date
            ? movie.release_date.slice(0, 4)
            : "Release date unavailable"}
        </p>

        <p>
          Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>

        <button
          type="button"
          onClick={toggleFavorite}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
        >
          {isFavorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
        </button>
      </div>
    </article>
  );
}
const { watchlist, addToWatchlist, removeFromWatchlist } = useMovies();

const isInWatchlist = watchlist.some(
  (item) => item.id === movie.id
);
export default MovieCard;
