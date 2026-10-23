import { useState } from "react";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }

  function handleClear() {
    setQuery("");
    onSearch("");
  }

  return (
    <header className="site-header">
      <a href="/" className="site-logo">
        MovieShelf
      </a>

      <nav>
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
      </nav>

<nav>
  <Link to="/">Home</Link>
  <Link to="/watchlist">Watchlist</Link>
  <Link to="/favorites">Favorites</Link>
</nav>

import { Link } from "react-router-dom";
      <form onSubmit={handleSubmit} role="search">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search movies..."
          aria-label="Search movies"
        />

        <button type="submit">Search</button>

        {query && (
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        )}
      </form>
    </header>
  );
}

export default Header;
