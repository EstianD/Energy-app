import Localbase from "localbase";

let db = new Localbase("energy-app");

export function checkData(area) {
  // console.log(key);
  console.log(area);

  // CHECK IF DATA IS IN DB
  // db.collection(key)
  //   .doc({ id: area })
  //   .get()
  //   .then((document) => {
  //     //  IF DOCUMENT EXISTS
  //     if (document) {
  //       console.log(document);
  //       return true;
  //     } else {
  //       // DOCUMENT DOES NOT EXIST
  //       return false;
  //     }
  //   });

  //  CHECK IF TIMESTAMP LESS THAN A WEEK
  // IF DATA EXISTS, RETURN DATA
  // IF DATA DOES NOT EXIST, RETURN FALSE
}

export async function addDataToDB(dataArray) {
  console.log("adding data");
  console.log("data: ", dataArray);

  // LOOP TROUGH ARRAY AND SAVE DATA TO DB
  dataArray.forEach(async (entry) => {
    // CHECK IF COLLECTION EXISTS
    const data = await db.collection(entry.key).get({ id: entry.id });
    console.log("data o: ", data);

    if (data.length > 0) {
      // OVERWRITE DATA TO DB
      try {
        await db
          .collection(entry.key)
          .doc({ id: entry.id })
          .set({
            id: entry.id,
            unit: entry.units,
            data: [...entry.data],
          });
        console.log("done setting data");

        // return true;
      } catch (er) {
        console.log("error: ", er);
        return false;
      }
    } else {
      // ADD DATA TO DB
      // SAVE DATA TO DB
      try {
        await db.collection(entry.key).add({
          id: entry.id,
          unit: entry.units,
          data: [...entry.data],
        });
        console.log("done setting data");

        // return true;
      } catch (er) {
        console.log("error: ", er);
        return false;
      }
    }
  });
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
