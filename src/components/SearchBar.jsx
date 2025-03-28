import React from "react";

const SearchBar = ({ query, setQuery, fetchImages, error }) => {
  return (
    <>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Search</button>
      </div>
      <div className="search-section">
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};
export default SearchBar;
