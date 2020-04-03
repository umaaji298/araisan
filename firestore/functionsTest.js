
const admin = require("firebase-admin");

const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});


let db = admin.firestore();

async function main() {


  //todo map??
  //const writeData = new Object();
  const writeData = new Map();

  const collectionData = await db.collectionGroup('datas').orderBy('updatedAt', 'desc').get();

  // 列挙順を日付降順で維持するため、forEachではなくfor
  for (let i = 0; i < collectionData.docs.length; i++) {
    const doc = collectionData.docs[i]
    const data = doc.data();
    const objdata = {
      text: data.text,
      fileName : data.fileName,
      fileType : data.fileType,
      floorName: data.floorName,
      author: data.author
    }

    writeData.set(doc.ref.id,objdata);

  }

  const jsondata = JSON.stringify([...writeData])

  console.log(jsondata)


  // const string = JSON.stringify(writeData)

  // console.log(string);

  return
}

main().then(() => {
  console.log('done');
});