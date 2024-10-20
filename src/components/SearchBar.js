import React, { useState } from "react";
import "./styles.css";

const SearchBar = ({ onRequestSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchRequest = () => {
    onRequestSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchRequest();
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search-bar"
        placeholder="Enter search term..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearchRequest}>
        Request
      </button>
    </div>
  );
};

export default SearchBar;
