

$(function () {
  /** tooltip表示 */
  $('[data-toggle="tooltip"]').tooltip();

  /** すべて消す */
  $('#allClear').click(() => {
    console.log('call');
    $('#eventText').val("");
    $('#floorname').val("");
    $('#creator').val("");
  });
});

//登録済みイベントデータ取得
var events;
var events_daily;

fetch('https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events.json?alt=media')
  .then(resp => { return resp.json(); })
  .then(jsonObj => {
    events = jsonObj;
    //console.log(events,typeof(events));
  })
  .catch(error => {
    alert('ネットワークエラー発生中！管理人が復旧しないと無理そうです。code:10')
    console.error(error)
  });

fetch('https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/daily.json?alt=media')
  .then(resp => { return resp.json(); })
  .then(jsonObj => {
    events_daily = jsonObj;
    //console.log(events_daily);
  })
  .catch(error => {
    alert('ネットワークエラー発生中！管理人が復旧しないと無理そうです。code:11')
    console.error(error)
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

  // todo validation

  // textdata \n to ,
  const text = textdata.split('\n').join(',')

  if (isAnonymous && uid) {

    //特権用ID
    let idObj = new Object();
    idObj.idString = $('#floorNo').val();

    try {
      idObj.id = createFloorIdSp(idObj.idString);
    } catch (err) {
      console.log(err);
      alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:20')
      return;
    }

    console.log(creator, floorName, idObj.id, idObj.idString);

    const floorData = {
      idString: idObj.idString, // todo decode to
      //commands: commands,
      text: text,
      uid: uid,
      author: creator,
      imgUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      floorName: floorName,
      // favorite : 0 // pending
    }

    const ref = db.collection('/floors/v1/datas').doc(idObj.id);

    ref.set(floorData)
      // ref.create({foo:'bar'})
      .then(function () {
        console.log("Document written with ID: ", idObj.id);
      })
      .catch(function (error) {
        alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:30');
        console.error("Error adding document: ", error);
        return
      });
  }
  else {
    alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:40');
    console.error('not logged in');
    return
  }
})

const convertMap = new Map([["А", "20"], ["Б", "21"], ["В", "22"], ["Г", "23"], ["Д", "24"], ["Е", "25"], ["Ж", "26"], ["з", "27"], ["и", "28"], ["И", "28"], ["↑", "0"], ["↗", "1"], ["→", "2"], ["↘", "3"], ["↓", "4"], ["↙", "5"], ["←", "6"], ["↖", "7"], ["|", "00"], ["||", "01"], ["|||", "02"], ["||||", "03"], ["|||||", "04"], ["||||||", "05"], ["|||||||", "06"], ["||||||||", "07"], ["|||||||||", "08"], ["||||||||||", "09"], ["|||||||||||", "10"], ["||||||||||||", "11"], ["|||||||||||||", "12"], ["||||||||||||||", "13"], ["|||||||||||||||", "14"]]);

function createFloorIdSp(input) {
  const array = input.split(',');
  let result = ""

  for (let i = 0; i < array.length; i++) {
    if (convertMap.has(array[i])) {
      // console.log('hit of',array[i]);
      result += convertMap.get(array[i]);
    } else {
      result += ('00' + array[i]).slice(-2); // 2桁揃え
    }
  }

  if (!chekNewId(result)) {
    console.error('id is already regestred!', result);
    throw Error();
  }

  return result;
}

function rand28String() {
  let result;

  //while若干怖い
  while (true) {
    result = Math.floor(Math.random() * 29);
    if (result != 0 && result != 4) break;
  }

  //2桁あわせ
  const resultStr = ('00' + result).slice(-2);

  return resultStr
}

function chekNewId(id) {
  let isOk = true;

  if (events.hasOwnProperty(id)) {
    isOk = false;
  }
  if (events_daily.hasOwnProperty(id)) {
    isOK = false;
  }

  return isOk;
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

