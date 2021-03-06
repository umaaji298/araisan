
const admin = require("firebase-admin");

const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});


let db = admin.firestore();

async function main(){

  // const writeBatch = db.batch();

  const ss = await db.collectionGroup(`datas`).get(); 

  ss.forEach(doc=>{
    const data = doc.data();
    if(data.floorName === ""){
      console.log('found',doc.ref.id,doc.ref.parent.parent.id);
      // writeBatch.delete(doc.ref);
    }   
  })

  // await writeBatch.commit();
}

main().then(()=>{
  console.log('done');
});