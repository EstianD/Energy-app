import Localbase from "localbase";

let db = new Localbase("energy-app");

export async function getDataFromDB(area, collections) {
  // const data = await db.collection()
  console.log("area: ", area);
  console.log("collections: ", collections);
  let dataArray = [];
  for (let i = 0; i < collections.length; i++) {
    try {
      const data = await db.collection(collections[i]).doc({ id: area }).get();
      data.id = collections[i];
      // console.log("dataset: ", data.data.reverse());
      data.data.reverse();
      // data.data = data.reverse();
      dataArray.push(data);
      // console.log("get data: ", data);
    } catch (err) {
      console.log("error in getting data: ", err);
    }
  }
  console.log("all data: ", dataArray);
  return dataArray;
}

export async function addDataToDB(dataArray) {
  console.log("adding data");
  console.log("data: ", dataArray);

  // LOOP TROUGH ARRAY AND SAVE DATA TO DB
  for (let i = 0; i < dataArray.length; i++) {
    // CHECK IF COLLECTION EXISTS
    const data = await db
      .collection(dataArray[i]["key"])
      .doc({ id: dataArray[i]["id"] })
      .get();

    // IF DATA IS UNDEFINED, AN NEW ENTRY NEEDS TO BE ADDED OTHERWISE IT NEEDS TO UPDATE
    if (data !== undefined) {
      console.log("not undefined");

      // OVERWRITE DATA  DB
      try {
        await db
          .collection(dataArray[i]["key"])
          .doc({ id: dataArray[i]["id"] })
          .set({
            id: dataArray[i]["id"],
            unit: dataArray[i]["units"],
            data: [...dataArray[i]["data"]],
          });
        console.log("done updating data");

        return true;
      } catch (er) {
        console.log("error in not null: ", er);
        return false;
      }
    } else {
      // ADD DATA TO DB
      try {
        await db.collection(dataArray[i]["key"]).add({
          id: dataArray[i]["id"],
          unit: dataArray[i]["units"],
          data: [...dataArray[i]["data"]],
        });
        console.log("done adding data");
        // return true;
        // return true;
      } catch (er) {
        console.log("error in null: ", er);
        return false;
      }
    }
  }
  // IF LOOP ENDED SUCCESFULLY, RETURN TRUE
  return true;
}

export function checkCachedTimestamp(area) {
  // GET LOCAL STORAGE ARRAY
  let cacheArray = JSON.parse(localStorage.getItem("energy-app")) || [];

  // FIND INDEX IN ARRAY WHERE ID IS AREA CODE
  let ObjIndex = cacheArray.findIndex((obj) => obj.id === area);

  // IF CACHE EXIST
  if (ObjIndex !== -1) {
    console.log("object exist");
    // CHECK IF TIMESTAMP WAS UPDATED LESS THAN 1 WEEK AGO
    let secondsSinceUpdated =
      Math.floor(new Date().getTime() / 1000) - cacheArray[ObjIndex].updated;
    let weekTimestampSeconds = 604800;

    // IF CACHE IS STILL VALID
    if (secondsSinceUpdated < weekTimestampSeconds) {
      // DONT UPDATE CACHE
      return true;
    } else {
      // UPDATE CACHE
      cacheArray[ObjIndex].updated = Math.floor(new Date().getTime() / 1000);
      // UPDATE LOCALSTORAGE ARRAY
      localStorage.setItem("energy-app", JSON.stringify(cacheArray));
      // TIMESTAMP IN LOCAL STORAGE WAS UPDATED
      return false;
    }
  } else {
    // CACHE DOES NOT EXIST
    console.log("object nope");
    let cacheObj = {
      id: area,
      updated: Math.floor(new Date().getTime() / 1000), //CONVERT TO SECONDS
    };

    // PUSH OBJECT TO LOCAL STORAGE ARRAY
    cacheArray.push(cacheObj);
    localStorage.setItem("energy-app", JSON.stringify(cacheArray));
    return false;
  }
}
