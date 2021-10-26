import React, { useState, useEffect } from "react";
import axios from "axios";
// Import DB functions
import {
  addDataToDB,
  checkData,
  checkCachedTimestamp,
  getDataFromDB,
} from "./storage";

const APIKEY = process.env.REACT_APP_API_KEY;
const URL = "http://api.eia.gov/series/?";

const codes = {
  population: "INTL.4702-33-CODE-THP.A",
  electricity: "INTL.2-2-CODE-BKWH.A",
  solar: "INTL.116-12-CODE-BKWH.A",
  wind: "INTL.37-12-CODE-BKWH.A",
  hydro: "INTL.33-12-CODE-BKWH.A",
  fossilFuel: "INTL.28-12-CODE-BKWH.A ",
  geothermal: "INTL.35-12-CODE-BKWH.A ",
  biomass: "INTL.38-12-CODE-BKWH.A",
  coTwo: "INTL.4008-8-CODE-MMTCD.A",
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

    // let cachedResponse = false; //CHANGE TO BELOW AFTER TESTING
    //  GET TIMESTAMP OF DATA IF EXISTS
    const cachedResponse = checkCachedTimestamp(selectedArea[0]);
    console.log("localstorage response: ", cachedResponse);

    if (cachedResponse) {
      // GET DATA FROM DB
      console.log("getting data");
      getDataFromDB(selectedArea[0], Object.keys(codes)).then((result) => {
        console.log("response from get data from db: ", result);
        setData([...result]);
      });
    } else {
      // ELSE RETRIEVE DATA FROM API
      getDataFromApi(selectedArea[0]).then(async (data) => {
        // ADD DATA TO DB
        const addedData = await addDataToDB(data);

        // CHECK IF DATA WAS ADDED SUCCESSFULY
        if (addedData) {
          const dbData = await getDataFromDB(
            selectedArea[0],
            Object.keys(codes)
          );
          setData([...dbData]);
          console.log("db data: ", dbData);
        } else {
          // SOMETHING WENT WRONG
          console.log("something went wrong in adding the data");
        }

        console.log("added data response: ", addedData);
      });
    }

    // console.log("cached response: ", cachedResponse);
  }, [selectedArea]);

  function saveDataInDB() {}

  function fetchData(countryCode) {}

  function getSeriesId(countryCode, seriesName) {
    return codes[seriesName].replace("CODE", countryCode);
  }

  return { data };
}

export default useFetchData;
