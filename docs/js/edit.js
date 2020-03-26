//modal用progressber
var progress = 0;
var progress_counterBack;

//登録済みイベントデータ
var events;
var events_diff;

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

  //video音声の再生
  $('#minfiary').click(()=>{
    const video = $('#minfiary').get(0);
    video.muted = video.muted ? false : true;
    if(!video.muted){
      $('#muteicon').hide(1000);
    }else{
      $('#muteicon').show();
    }
  });

  //ゲーム画面へ
  $('#modal_next').click(() => {
    // progress = 0;
    // $('.progress-bar').css('width', progress + '%');
    window.location.href = '/araisan/'; // 通常の遷移
  });

  //modal show
  $('#exampleModalCenter').on('show.bs.modal', function (e) {
    //console.log('modal show');
    $('#minfiary').get(0).play();
  });

  //modal hide
  $('#exampleModalCenter').on('hide.bs.modal', function (e) {
    //console.log('modal hide');

    //video stop
    $('#minfiary').get(0).pause();
    $('#minfiary').get(0).currentTime = 0;

    //progess reset
    clearInterval(progress_counterBack);
    progress = 0;
    $('.progress-bar').css('width', progress + '%');

    //modal reset
    $('#exampleModalLongTitle').text("フロアを登録中");
    $('#modal_next').show();
    $('#modal_next_go').hide();

    
  })

});

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

function loadDiffJson(){
fetch('https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events_diff.json?alt=media')
  .then(resp => { return resp.json(); })
  .then(jsonObj => {
    events_diff = jsonObj;
    //console.log(events_daily);
  })
  .catch(error => {
    alert('ネットワークエラー発生中！管理人が復旧しないと無理そうです。code:11')
    console.error(error)
  });
}
loadDiffJson();

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

firebase.auth().signInAnonymously()
.then(userCredential=>{
  //初回はDBに登録する
  // see : https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=ja#sign-inanonymously
  if(userCredential.additionalUserInfo.isNewUser){
    console.log('this is new user');

    // DB更新
    let ref = db.collection("users").doc(userCredential.user.uid);

    ref.set({
      name:"Anonymous",
      isAnonymous:true,
      uid:userCredential.user.uid
    })
  }
})
.catch(function (error) {
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


  //文字長0チェック
  if(textdata.length === 0){
    alert('表示する文章がありません');
    return;
  }

  // textdata \n to ,
  const textArray = textdata.split('\n');
  if(textArray.length > 10){
    alert('11行以上の入力があります。');
    return;
  }

  if(!checkLineCount(textArray)){
    alert('1行に25文字以上の入力があります。');
    return;
  }
  
  const text = textArray.join(',');
  // サニタイズ : see : https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
  //const text = escapeHtml(_text);
  if(testHtml(text)){
    alert('使用禁止文字が含まれています ( & < > " \' ) ');
    return;
  }

  if(text === "君は見た,はちみつを舐める,下半身裸の,黄色いくまの怪異を…！"){
    ret = confirm("入力データが初期のままですが、本当に登録するのですか？");
    if(!ret){
      return;
    }
  }

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
    progress_counterBack = setInterval(function () {      
      progress++;
      if (progress <= 100) {
        $('.progress-bar').css('width', progress + '%');
      } else {
        clearInterval(progress_counterBack);
        $('#exampleModalLongTitle').text("更新完了");
        $('#modal_next').hide();
        $('#modal_next_go').show();
      }
    }, 700);

    const floorData = {
      idString: idObj.idString, // todo decode to
      text: text,
      uid: uid,
      author: creator,
      imgUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      floorName: floorName,
      // like : 0 // pending
    }

    //DB登録
    let writeBatch = db.batch();

    const refMain = db.collection(`/floors/v1/users/${uid}/datas`).doc(idObj.id);
    writeBatch.set(refMain,floorData);
    const refToday = db.collection(`/today/v1/users/${uid}/todayDatas`).doc(idObj.id);
    writeBatch.set(refToday,floorData);

    writeBatch.commit()
      .then(()=>{
        console.log("Document written");

        //現在のobjectも更新
        events[idObj.id] = floorData;

        //modalデータここで更新
        const floorId = idObj.idString.split(',').join('-');
        $('#floorNo').text(floorId);

        $('#exampleModalLongTitle').text("ゲームデータを更新中");

        if(progress < 40) progress = 40;

      })
      .catch(function (error) {
        //todo errorcode
        alert('ネットワーク混雑中。もう一度お試し下さい。code:30');
        console.error("Error adding document: ", error);
        $('#exampleModalCenter').modal('hide');
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
    id_1 = rand28String(14); // 14は即死
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

function rand28String(exclude = -1) {
  let result;

  //while若干怖い
  while (true) {
    result = Math.floor(Math.random() * 29);
    if (result != 0 && result != 4 && result != exclude) break;
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
  if (events_diff.hasOwnProperty(id)) {
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

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function testHtml(text) {
  let re = /[&<>"']/g;

  return re.test(text);
}

function checkLineCount(textArray){
  let isOk = true;

  textArray.forEach(texts=>{
    if(texts.length > 24) isOk = false;
  })

  return isOk;
}