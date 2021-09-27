import Localbase from "localbase";

let db = new Localbase("energy-app");

export function checkData(key, area) {
  console.log(key);
  console.log(area);

  // CHECK IF DATA IS IN DB
  db.collection(key)
    .doc({ id: area })
    .get()
    .then((document) => {
      //  IF DOCUMENT EXISTS
      if (document) {
        console.log(document);
        return true;
      } else {
        // DOCUMENT DOES NOT EXIST
        return false;
      }
    });

  //  CHECK IF TIMESTAMP LESS THAN A WEEK
  // IF DATA EXISTS, RETURN DATA
  // IF DATA DOES NOT EXIST, RETURN FALSE
}

export async function addData(key, area, data) {
  try {
    await db.collection(key).add({
      id: area,
      unit: data.units,
      data: [
        { year: 2000, value: 10000 },
        { year: 2001, value: 120000 },
        { year: 2002, value: 140000 },
      ],
    });
    return true;
  } catch (er) {
    console.log("error: ", er);
    return false;
  }
}
