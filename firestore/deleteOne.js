
const admin = require("firebase-admin");
const serviceAccount = require("../keys/owner.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://araisan-ms.firebaseio.com"
});

let db = admin.firestore();

/**
 * ここを書き換える
 * ・API呼び出してjson再生成必要
 */
const deletefloor = "3-В-2-Б";

async function main(){

  const decodedId = floorDecoder(deletefloor);
  console.log(decodedId);

  const ss = await db.collectionGroup(`datas`).get(); 

  ss.forEach(doc=>{
    const data = doc.data();
    if(doc.ref.id === decodedId){
      console.log('delete id',doc.ref.parent.parent.id);
      //writeBatch.delete(doc.ref);
    }   
  })
}

main().then(()=>{
  console.log('done');
});

function floorDecoder(no){
  const convertMap2 = new Map([["A", "20"], ["Б", "21"], ["В", "22"], ["Г", "23"], ["Д", "24"], ["Е", "25"], ["Ж", "26"], ["з", "27"], ["И", "28"], ["↑", "0"], ["↗", "1"], ["→", "2"], ["↘", "3"], ["↓", "4"], ["↙", "5"], ["←", "6"], ["↖", "7"], ["|=0", "00"], ["|=1", "01"], ["|=2", "02"], ["|=3", "03"], ["|=4", "04"], ["|=5", "05"], ["|=6", "06"], ["|=7", "07"], ["|=8", "08"], ["|=9", "09"], ["|=10", "10"], ["|=11", "11"], ["|=12", "12"], ["|=13", "13"], ["|=14", "14"],["|=15", "15"]]);
  const array = no.split('-');
  let result = "";

  for (let i = 0; i < array.length; i++) {
    if (convertMap2.has(array[i])) {
      result += convertMap2.get(array[i]);
    } else {
      result += ('00' + array[i]).slice(-2); // 2桁揃え
    }
  }
  return result
}
