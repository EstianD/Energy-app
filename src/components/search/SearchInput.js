import React, { useState, useEffect } from "react";
import "./SearchInput.css";
// IMPORT COUNTRY CODES
import { countryCodes } from "../../countryCodes";

function SearchInput({ setSelectedArea }) {
  // const [searchInput, setSearchInput] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (searchInput !== "") {
      console.log("search changing");
      console.log(searchInput);
      // console.log("country codes: ", countryCodes);

      const searchObject = countryCodes.filter((country) => {
        return country.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setSearchList([...searchObject]);
      console.log("search Object: ", searchObject);
    }
  }, [searchInput]);

  function handleSearchSelect(selected) {
    console.log("area selected: ", selected);
    setSelectedArea({
      areaCode: selected["alpha-3"],
      name: selected["name"],
    });

    setSearchInput("");
  }

  function renderSearchList() {
    console.log("search list: ", searchList);
    if (searchList.length !== 0) {
      return (
        <ul className="search-results">
          {searchList.map((country) => {
            {
              /* console.log(country); */
            }
            return (
              <li
                className="search-item"
                onClick={() => handleSearchSelect(country)}
              >
                {country.name}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <>
      <input
        className="search-input"
        type="text"
        placeholder="Country"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput.length !== 0 && renderSearchList()}
    </>
  );
}

export default SearchInput;
