const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stream = require('stream');

admin.initializeApp();

const db = admin.firestore();

/**
 * DBの変更をトリガーに、events.jsonを生成する
 */

exports.createDailyEvents = functions
  .region('asia-northeast1')
  .firestore
  .document('floors/v1/datas/{dataid}')
  .onWrite(async (change, context) => {

    //書き込みデータ
    // const id = context.params.dataid;
    // const data = change.after.data();
    // console.log('document change',id,data);

    console.log('create event.json');

    await createEventsJson();

    console.log('done');

    return
  });

// exports.scheduledFunction = functions
//   .region('asia-northeast1')
//   .functions.pubsub.schedule('5 4 * * *') // This will be run every day at 4:05 AM
//   .timeZone('Asia/Tokyo')
//   .onRun(async (context) => {

//     console.log('create event.json');

//     await createEventsJson();

//     //todo delete daily db table
//     //delete events_daily.json

//     console.log('done');

//     return null;
//   });

async function createEventsJson() {
  // DB Event全て読み出し、jsonを作成する
  const writeData = new Object();
  const collectionData = await db.collection('floors/v1/datas').get();

  //console.log('length' ,collectionData.docs.length);

  for (let i = 0; i < collectionData.docs.length; i++) {
    const doc = collectionData.docs[i];
    const data = doc.data();

    writeData[doc.ref.id] = {
      text: data.text,
      imgUrl: data.imgUrl,
      floorName: data.floorName,
      author: data.author
    }
  }

  //default bucket
  const bucket = admin.storage().bucket();
  const file = bucket.file('events.json');

  const writeStream = file.createWriteStream({
    public: true, // ACL public
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=300, no-transform",
      contentType: 'application/json'
    }
  });

  // //書き込み本体
  await writeHtmlCore(JSON.stringify(writeData), writeStream);

  return
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