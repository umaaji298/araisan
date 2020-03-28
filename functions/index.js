const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stream = require('stream');

admin.initializeApp();

const db = admin.firestore();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

/**
 * テスト用:API callを起点として、events.jsonを生成
 */
exports.createEventsJsonAPI = functions
  .region('asia-northeast1')
  .https
  .onRequest(async (request, response) => {

    console.log('api create event.json');

    // create events.json
    await createEventsJson();

    // Today datas delete
    await daleteDbToday();

    //events_diff.json to empty
    await createEmptyDiffJson();

    console.log('done');

    response.send("OK");
  });

/**
 * 毎日1度実行される、events.jsonを生成する
 */

exports.scheduledFunction = functions
  .region('asia-northeast1')
  // .pubsub.schedule('every 5 minutes') // for test
  .pubsub.schedule('5 4 * * *') // This will be run every day at 4:05 AM
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {

    console.log('scheduled create event.json');

    // create events.json
    await createEventsJson();

    // Today datas delete
    await daleteDbToday();

    //events_diff.json to empty
    await createEmptyDiffJson();

    console.log('done');

    return null;
  });

/**
 * DBの変更をトリガーに、events.jsonを生成する
 */
exports.createTodayJson = functions
  .region('asia-northeast1')
  .firestore
  .document('today/v1/users/{userId}/todayDatas/{floorId}')
  .onWrite(async (change, context) => {

    console.log('create event_diff.json');

    //書き込みデータの参照
    // const id = context.params.dataid;
    // const data = change.after.data();
    // console.log('document change',id,data);   

    await createDiffJson();

    console.log('done');

    return
  });

async function createEventsJson() {
  // DB Event全て読み出し、jsonを作成する
  const writeData = new Array();
  const collectionData = await db.collectionGroup('datas').orderBy('updatedAt', 'desc').get();

  // 列挙順を日付降順で維持するため、forEachではなくfor
  for (let i = 0; i < collectionData.docs.length; i++) {
    const doc = collectionData.docs[i]
    const data = doc.data();
    let fileName = "";
    if(Object.prototype.hasOwnProperty.call(data, "fileName")){
      fileName = data.fileName;
    }    

    const outdata = {
      text: data.text,
      idString: data.idString,
      fileName : fileName,
      floorName: data.floorName,
      author: data.author
    }
    writeData.push([doc.ref.id, outdata]);
  }

  //default bucket
  const bucket = admin.storage().bucket();
  const file = bucket.file('events.json');

  const writeStream = file.createWriteStream({
    public: true, // ACL public
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=0, no-transform", // see :https://qiita.com/hkusu/items/d40aa8a70bacd2015dfa
      contentType: 'application/json'
    }
  });

  // //書き込み本体
  await writeHtmlCore(JSON.stringify(writeData), writeStream);

  return
}

async function createDiffJson() {
  // todayDatasを全て読み出し、jsonを作成する
  const writeData = new Array();
  const collectionData = await db.collectionGroup('todayDatas').orderBy('updatedAt', 'desc').get();

  if (collectionData.docs.length === 0) {
    //早期return
    return
  }

  // 列挙順を日付降順で維持するため、forEachではなくfor
  for (let i = 0; i < collectionData.docs.length; i++) {
    const doc = collectionData.docs[i]
    const data = doc.data();
    let fileName = "";
    if(Object.prototype.hasOwnProperty.call(data, "fileName")){
      fileName = data.fileName;
    }   

    const outdata = {
      text: data.text,
      idString: data.idString,
      fileName : fileName,
      floorName: data.floorName,
      author: data.author
    }
    writeData.push([doc.ref.id, outdata]);
  }

  //default bucket
  const bucket = admin.storage().bucket();
  const file = bucket.file('events_diff.json');

  const writeStream = file.createWriteStream({
    public: true, // ACL public
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=0, no-transform", // see :https://qiita.com/hkusu/items/d40aa8a70bacd2015dfa
      contentType: 'application/json'
    }
  });

  // //書き込み本体
  await writeHtmlCore(JSON.stringify(writeData), writeStream);
}

function writeHtmlCore(data, writeStream) {
  return new Promise(resolve => {

    const readStream = new stream.Readable();
    readStream.push(data);
    readStream.push(null);

    //書き込み本体
    readStream
      .pipe(writeStream)
      .on('error', (err) => {
        writeStream.destroy(err);
        Logger.error(`write storage err : ${err}`);
      })
      .on('finish', () => {
        console.log('writeEnd')
        // https://storage.googleapis.com/ritupr-test/pub/html/sample.htm
        resolve();
      });
  })
}

async function daleteDbToday() {
  let writeBatch = db.batch();

  let ss = await db.collectionGroup('todayDatas').get();

  ss.forEach(doc => {
    writeBatch.delete(doc.ref);
  })

  let ss2 = await db.collection('/today/v1/users').get();

  ss2.forEach(doc => {
    writeBatch.delete(doc.ref);
  })

  return await writeBatch.commit();
}

async function createEmptyDiffJson() {

  //default bucket
  const bucket = admin.storage().bucket();
  const file = bucket.file('events_diff.json');

  const writeStream = file.createWriteStream({
    public: true, // ACL public
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=0, no-transform", // see :https://qiita.com/hkusu/items/d40aa8a70bacd2015dfa
      contentType: 'application/json'
    }
  });

  //書き込み本体 // 空データの書き込み
  await writeHtmlCore("[]", writeStream);
}