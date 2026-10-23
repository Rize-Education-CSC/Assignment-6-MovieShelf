import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { searchMovies } from "./services/movieService";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  async function handleSearch(query) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResults(null);
      setSearchError("");
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    setSearchError("");

    try {
      const results = await searchMovies(trimmedQuery);
      setSearchResults(results);
    } catch (error) {
      setSearchError(
        error.message || "Unable to search movies."
      );
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />

      {searchLoading && <p>Searching movies...</p>}
      {searchError && <p role="alert">{searchError}</p>}

      <Routes>
        <Route
          path="/"
          element={<Home searchResults={searchResults} />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
