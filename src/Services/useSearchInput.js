import React, { useState, useEffect } from "react";
// IMPORT COUNTRY CODES
import { countryCodes } from "../countryCodes";

function useSearchInput(setSelectedArea) {
  const [selectedSearch, setSelectedSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (searchInput !== "") {
      // console.log("search changing");
      // console.log(searchInput);
      // console.log("country codes: ", countryCodes);

      const searchObject = countryCodes.filter((country) => {
        return country.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setSearchList([...searchObject]);
      // console.log("search Object: ", searchObject);
    }
  }, [searchInput]);

  return {
    searchInput,
    setSearchInput,
    selectedSearch,
    searchList,
  };
}

export default useSearchInput;
