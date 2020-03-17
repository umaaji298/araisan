/** tooltip表示 */
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAU58Q3dGjp60YosKVPqwE3GUy_BHQuld0",
  authDomain: "araisan-ms.firebaseapp.com",
  databaseURL: "https://araisan-ms.firebaseio.com",
  projectId: "araisan-ms",
  storageBucket: "araisan-ms.appspot.com",
  messagingSenderId: "847938018391",
  appId: "1:847938018391:web:0030eac3a097d04f56d712"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

/**
 * Anonymous singnin
 */
var isAnonymous;
var uid;

firebase.auth().signInAnonymously().catch(function (error) {
  console.log(error);
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    isAnonymous = user.isAnonymous;
    uid = user.uid;

    console.log('loggedin', isAnonymous, uid);
  } else {
    // User is signed out.
    // ...
  }
});

/**
 * form入力
 */
$('#submit').click(() => {

  console.log('call submit');
  const textdata = $('#eventText').val();
  const creator = $('#creator').val();
  const floorName = $('#floorname').val();

  const { id, idString } = createFloorId();

  console.log(creator, floorName, id, idString);

  // todo validation

  // textdata to TRPCode //廃止
  //const commands = scriptsToEvents(textdata)
  
  // textdata \n to ,
  const text = textdata.split('\n').join(',')

  const floorData = {
    idString: idString, // todo decode to
    //commands: commands,
    text : text,
    uid: uid,
    author: creator,
    imgUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    floorName: floorName,
    // favorite : 0 // pending
  }

  if (isAnonymous && uid) {


    // const ref = db.collection('/floors/v1/datas/').doc('000000000001');
    const ref = db.collection('/floors/v1/datas').doc(id);
    console.log(ref);

    ref.set(floorData)
      // ref.create({foo:'bar'})
      .then(function () {
        console.log("Document written with ID: ", id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
  else {
    console.error('not logged in');
  }

})

// document.getElementById('submit').onclick = submit;

function createFloorId() {
  const id1 = rand28String();
  const id2 = rand28String();
  const id3 = rand28String();
  const id4 = rand28String();

  const id = id1 + id2 + id3 + id4;

  const idString = idToPanelNo(id1) + idToPanelNo(id2) + idToPanelNo(id3) + idToPanelNo(id4);


  return { id, idString }
}


function rand28String() {
  let result;

  while (true) {
    result = Math.floor(Math.random() * 29);
    if (result != 0 && result != 4) break;
  }

  //2桁あわせ
  const resultStr = ('00' + result).slice(-2);

  return resultStr
}

const convertSWMap = new Map([['20', 'А'], ['21', 'Б'], ['22', 'В'], ['23', 'Г'], ['24', 'Д'], ['25', 'Е'], ['26', 'Ж'], ['27', 'з'], ['28', 'И']]);

function idToPanelNo(id) {
  let no = convertSWMap.get(id);
  if (!no) {
    if (id.substring(0, 1) === "0") {
      //0を消去
      no = id.substring(1, 2)
    } else {
      no = id; //そのまま
    }
  }
  return no;
}

