import React, { useState, useEffect } from "react";
import axios from "axios";
// Import DB functions
import { addData, checkData } from "./storage";

const APIKEY = process.env.REACT_APP_API_KEY;
const URL = "http://api.eia.gov/series/";

const codes = {
  population: "INTL.4702-33-CODE-THP.A",
  energy: "INTL.2-2-CODE-BKWH.A",
};

function useFetchData(selectedArea) {
  const [data, setData] = useState(null);
  //   console.log(APIKEY);
  //   console.log(selectedArea);

  useEffect(() => {
    console.log("fetching data");
    async function getDataFromApi(seriesCode) {
      const data = await axios.get(URL, {
        params: {
          api_key: APIKEY,
          series_id: seriesCode,
        },
      });
      if (data) {
        console.log("RESULTS: ", data);
        const dataObj = data.data.series[0];
        // console.log("dataObj: ", dataObj);

        return {
          units: dataObj.units,
          data: dataObj.data,
        };
      } else {
        // NO DATA FOUND
        return false;
      }
    }
    //  LOOP THROUGH CODES TO GET ALL DATA SET CODES
    let dataArray = [];
    Object.keys(codes).forEach((key) => {
      const seriesId = getSeriesId(selectedArea[0], key);
      // console.log("dataOBJ:", dataObj);

      // console.log(seriesId);

      // CHECK DATABASE IF CODE EXIST IN DB
      const exists = checkData(key, selectedArea[0]);
      if (exists) {
        // RETURN DATA
        console.log("document exists");
      } else {
        console.log("nope");
        // GET DATA FROM API

        getDataFromApi(seriesId).then((result) => {
          // SAVE DATA TO DB
          if (result) {
            addData(key, selectedArea[0], result).then((savedRes) => {
              // ADD DATA TO DATA OBJECT
              let resObj = {
                [key]: {
                  [selectedArea[0]]: {
                    units: result.units,
                    data: [...result.data],
                  },
                },
              };
              dataArray.push(resObj);
              console.log("DATA ARR: ", dataArray);
              // console.log("obbbb: ", dataObj);
            });
          }
        });
        // console.log("API DATA: ", apiData);
      }
      //  IF TIMESTAMP OF DB ENTRY IS SMALLER THAN 1 WEEK
      // TODO: GET DATA FROM DB
      // TODO: ELSE GET DATA FROM API
      //  SET DATA IN STATE
    });
  }, []);

  function checkDB() {}

  function saveDataInDB() {}

  function fetchData(countryCode) {}

  function getSeriesId(countryCode, seriesName) {
    return codes[seriesName].replace("CODE", countryCode);
  }

  return { data };
}

export default useFetchData;
