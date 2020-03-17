const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stream = require('stream');

admin.initializeApp();

const db = admin.firestore();

exports.appendEventJson = functions
  .region('asia-northeast1')
  .firestore
  .document('floors/v1/datas/{dataid}')
  .onWrite(async (change, context) => {

    //書き込みデータ
    // const id = context.params.dataid;
    // const data = change.after.data();
    // console.log('document change',id,data);

    // DB Event全て読み出し、jsonを作成する
    const writeData = new Object();

    const collectionData = await db.collection('floors/v1/datas').get();

    for(let i = 0;i<collectionData.docs.length;i++)
    {
      const doc = collectionData.docs[i];
      const data = doc.data();

      writeData[doc.ref.id] = {
        text : data.text,
        imgUrl : data.imgUrl,
        floorName : data.floorName,
        author : data.author
      }
    }
    

    //default bucket
    const bucket = admin.storage().bucket();
    const file = bucket.file('test.json');

    const writeStream = file.createWriteStream({
      public: true, // ACL public
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=2592000, no-transform",
        contentType: 'application/json'
      }
    });

    // //書き込み本体
    await writeHtmlCore(JSON.stringify(writeData),writeStream);

    console.log('done');

    return
  });


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