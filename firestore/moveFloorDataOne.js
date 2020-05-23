
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
      case "0906250373":{
        writedata(doc,data,'0906252773');
        break;
      }
      case "0906250300":{
        writedata(doc,data,'0906252700');
        break;
      }
      case "0906250343":{
        writedata(doc,data,'0906252743');
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