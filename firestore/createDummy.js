
const admin = require("firebase-admin");

const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});


let db = admin.firestore();

async function main(){

  const writeBatch = db.batch();

  //create userdata

  const dummyUid = "dummyUid";

  const floorData = {
    idString:"debugIdString",
    text:"debugText",
    uid:dummyUid,
    author:"debug",
    fileName:"",
    fileType:"",
    createdAt:new Date(),
    updatedAt:new Date(),
    floorName:"debug",
    like:0
  }

  

  const docRef = db.collection(`/floors/v1/users/${dummyUid}/datas`).doc();
  writeBatch.set(docRef,floorData);

  const docRef2 = db.collection(`/today/v1/users/${dummyUid}/todayDatas`).doc();
  writeBatch.set(docRef2,floorData);

  await writeBatch.commit();
}

main().then(()=>{
  console.log('done');
});