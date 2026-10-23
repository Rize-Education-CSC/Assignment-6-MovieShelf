import { useMovies } from "../contexts/MovieContext";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovies();

  return (
    <main className="watchlist-page">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Add movies to get started!</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <article key={movie.id} className="movie-card">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}

              <h2>{movie.title}</h2>

              <button
                onClick={() => removeFromWatchlist(movie.id)}
              >
                Remove from Watchlist
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
import { Link } from "react-router-dom";

export default Watchlist;
