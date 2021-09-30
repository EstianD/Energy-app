import React, { useState, useEffect } from "react";
import axios from "axios";
// Import DB functions
import { addDataToDB, checkData, checkCachedTimestamp } from "./storage";

const APIKEY = process.env.REACT_APP_API_KEY;
const URL = "http://api.eia.gov/series/?";

const codes = {
  population: "INTL.4702-33-CODE-THP.A",
  electricity: "INTL.2-2-CODE-BKWH.A",
};

function useFetchData(selectedArea) {
  const [data, setData] = useState(null);
  //   console.log(APIKEY);
  //   console.log(selectedArea);

  // const options = {
  //   params: {
  //     api_key: APIKEY,
  //   },
  // };

  useEffect(() => {
    console.log("fetching data");
    // GET DATA ROM API FUNCTION
    async function getDataFromApi(area) {
      // API CALLS
      console.log(area);
      // INITIATE EMPTY ARRAY FOR DATA
      let dataArray = [];

      // GET ALL API REQUESTS
      await axios.all(
        Object.keys(codes).map((key) =>
          axios
            .get(URL, {
              params: {
                api_key: APIKEY,
                series_id: getSeriesId(area, key),
              },
            })
            .then((res) => {
              console.log("axios all: ", res);
              // CREATE DATA OBJECT FOR EACH DATA SET
              const { data, units } = res.data.series[0];
              let dataObj = {
                id: area,
                key: key,
                units: units,
                data: data,
              };
              dataArray.push(dataObj);
            })
        )
      );
      console.log("test array: ", dataArray);

      return dataArray;
    }

    let cachedResponse = false; //CHANGE TO BELOW AFTER TESTING
    //  GET TIMESTAMP OF DATA IF EXISTS
    // const cachedResponse = checkCachedTimestamp(selectedArea[0]);
    console.log("localstorage response: ", cachedResponse);

    if (cachedResponse) {
      // GET DATA FROM DB
    } else {
      // ELSE RETRIEVE DATA FROM API
      getDataFromApi(selectedArea[0]).then((data) => {
        // ADD DATA TO DB
        addDataToDB(data);
      });
    }

    // console.log("cached response: ", cachedResponse);
  }, []);

  function saveDataInDB() {}

  function fetchData(countryCode) {}

  function getSeriesId(countryCode, seriesName) {
    return codes[seriesName].replace("CODE", countryCode);
  }

  return { data };
}

export default useFetchData;
