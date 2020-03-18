

$(function () {
  /** tooltip表示 */
  $('[data-toggle="tooltip"]').tooltip();

  /** すべて消す */
  $('#allClear').click(() => {
    $('#eventText').val("");
    $('#floorname').val("");
    $('#creator').val("");
  });

  //続けて入力する
  $('#modal_cotinue').click(() => {
    $('#exampleModalCenter').modal('hide');
    $('#eventText').val("");
    $('#floorname').val("");
  });

  //ゲーム画面へ
  $('#modal_next').click(() => {
    window.location.href = '/'; // 通常の遷移
  });


  // $('#exampleModalCenter').on('show.bs.modal', function(e) {
  //   const floorId = e.relatedTarget.floorId;
  //   const _floorId = floorId.split(',').join('-');
  //   console.log('modal event',_floorId);
  //   $('#floorNo').val(_floorId);
  // });
});

//modal用
//modal用progressber
var progress = 0;


//登録済みイベントデータ取得
var events;
// var events_daily;

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

// fetch('https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/daily.json?alt=media')
//   .then(resp => { return resp.json(); })
//   .then(jsonObj => {
//     events_daily = jsonObj;
//     //console.log(events_daily);
//   })
//   .catch(error => {
//     alert('ネットワークエラー発生中！管理人が復旧しないと無理そうです。code:11')
//     console.error(error)
//   });

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

    //IDの決定
    let idObj;

    try {
      idObj = createFloorId();
    } catch (err) {
      console.log(err);
      alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:20')
      return;
    }

    console.log(creator, floorName, idObj.id, idObj.idString);

    //modal呼び出し
    $('#exampleModalCenter').modal();
    //modal用プログレスバー
    var counterBack = setInterval(function () {
      progress++;
      if (progress <= 100) {
        $('.progress-bar').css('width', progress + '%');
      } else {
        clearInterval(counterBack);
        $('#exampleModalLongTitle').text("更新完了");
        $('#modal_spinner').hide();
        $('#modal_next').prop("disabled", false);
        $('#modal_next').text("ゲームへ行く");
      }
    
    }, 700);

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

        //現在のobjectも更新
        events[idObj.id] = floorData;

        //modalデータここで更新
        const floorId = idObj.idString.split(',').join('-');
        $('#floorNo').text(floorId);

        $('#exampleModalLongTitle').text("ゲームデータを更新中");

        if(progress < 40) progress = 40;

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



function createFloorId() {

  let id, id_1, id_2, id_3, id_4;

  //既存IDとかぶってないかチェックする
  for (let i = 0; i < 5; i++) {
    id_1 = rand28String();
    id_2 = rand28String();
    id_3 = rand28String();
    id_4 = rand28String();

    id = id_1 + id_2 + id_3 + id_4;

    if (chekNewId(id)) {
      break;
    }

    if (i === 4) {
      //4回もやってダメならなんか変！
      throw Error();
    }
  }

  const idString = `${idToPanelNo(id_1)},${idToPanelNo(id_2)},${idToPanelNo(id_3)},${idToPanelNo(id_4)}`;

  return { id, idString }
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
  // if (events_daily.hasOwnProperty(id)) {
  //   isOK = false;
  // }

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

