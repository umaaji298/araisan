
const admin = require("firebase-admin");

const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});


let db = admin.firestore();

const writeBatch = db.batch();

async function main(){

  const ss = await db.collectionGroup(`datas`).get(); 

  ss.forEach(doc=>{
    const data = doc.data();
    switch(doc.ref.id){
      case "0222050816":{
        writedata(doc,data,'0222050806');
        break;
      }
      dafault:{
        break;
      }
    }
  })

  await writeBatch.commit();
}

function writedata(doc,data,newid){
  console.log('found',doc.ref.id,doc.ref.parent.id);
  const new_doc = doc.ref.parent.doc(newid);
  writeBatch.set(new_doc,data);
}

main().then(()=>{
  console.log('done');
});