import React, { useState, useEffect } from "react";
import "./SearchInput.css";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Country"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}

export default SearchInput;
