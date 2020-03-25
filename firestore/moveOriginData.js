
const admin = require("firebase-admin");

const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});


let db = admin.firestore();

async function main(){

  const writeBatch = db.batch();

  const ss = await db.collection(`/floors/v1/datas`).get();
  const dstRef = db.collection(`/floors/v1/origins/v1/datas`);

  ss.forEach(doc=>{
    const id = doc.ref.id;
    const data = doc.data();

    const docref = dstRef.doc(id);
    writeBatch.set(docref,data);
  })

  await writeBatch.commit();
}

main().then(()=>{
  console.log('done');
});