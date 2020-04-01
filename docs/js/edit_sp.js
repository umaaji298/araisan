// modal用progressber
var progress = 0;
var progress_counterBack; // callback

// 登録済みイベントデータ
var events;
var events_diff;

$(function () {
  /** tooltip表示 */
  $('[data-toggle="tooltip"]').tooltip();

  /** fileupload : image表示 */
  // document.getElementById('fileupload').addEventListener('change', (event) => {
  //   console.log(event);
  //   file = event.target.files[0];
  //   console.log(file);
  // var image = document.createElement('img');
  // image.src = window.URL.createObjectURL(file);
  // $('#imagePrev').append(image);
  // })

  /** すべて消す */
  $('#allClear').click(() => {
    $('#eventText').val("");
    $('#floorname').val("");
    $('#fileupload').val("");
    $('#creator').val("");
  });

  //続けて入力する
  $('#modal_cotinue').click(() => {
    $('#exampleModalCenter').modal('hide');
  });

  //video音声の再生
  $('#minfiary').click(() => {
    const video = $('#minfiary').get(0);
    video.muted = video.muted ? false : true;
    if (!video.muted) {
      $('#muteicon').hide(1000);
    } else {
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

    $('#eventText').val("");
    $('#floorname').val("");
    $('#fileupload').val("");

    //video stop
    $('#minfiary').get(0).pause();
    $('#minfiary').get(0).currentTime = 0;

    //progess reset
    clearInterval(progress_counterBack);
    progress = 0;
    $('.progress-bar').css('width', progress + '%');

    //modal reset
    $('#exampleModalLongTitle').text("フロアを登録中");
    $('#floorNo').text("取得中...");
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
    alert('ネットワークエラー発生中。\n一度ブラウザを閉じてしばらくあとにまた試してください。code:10');
    console.error(error)
  });

function loadDiffJson() {
  fetch('https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events_diff.json?alt=media')
    .then(resp => { return resp.json(); })
    .then(jsonObj => {
      events_diff = jsonObj;
      //console.log(events_daily);
    })
    .catch(error => {
      alert('ネットワークエラー発生中。\n一度ブラウザを閉じてしばらくあとにまた試してください。code:11');
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
var storage = firebase.storage();

/**
 * Anonymous singnin
 */
var isAnonymous;
var uid;

firebase.auth().signInAnonymously()
  .then(userCredential => {
    //初回はDBに登録する
    // see : https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=ja#sign-inanonymously
    if (userCredential.additionalUserInfo.isNewUser) {

      // DB更新
      let ref = db.collection("users").doc(userCredential.user.uid);

      ref.set({
        name: "Anonymous",
        isAnonymous: true,
        uid: userCredential.user.uid
      })
    }
  })
  .catch(function (error) {
    alert('ネットワークエラー発生中。\n一度ブラウザを閉じてしばらくあとにまた試してください。code:16');
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
$('#submit').click(async () => {

  const input = createInputObj();

  //input validation
  const validated = validateInputs(input);

  //validation error
  if (!validated.result) {
    alert(validated.reason);
    return;
  }

  if (isAnonymous && uid) {

    //特権用ID
    let idObj = new Object();
    let inputFNo = "";

    inputFNo = $('#fNo_1').val() + ',' + $('#fNo_2').val() + ','
      + $('#fNo_3').val() + ',' + $('#fNo_4').val();

    idObj.idString = $('#fNo_1 option:selected').text() + ','
      + $('#fNo_2 option:selected').text() + ','
      + $('#fNo_3 option:selected').text() + ','
      + $('#fNo_4 option:selected').text();

    if ($('#fA_1').val() != "" && $('#fA_2').val() != "") {
      inputFNo += ',' + $('#fA_1').val();
      idObj.idString += ',' + $('#fA_1 option:selected').text();

      inputFNo += $('#fA_2').val();
      idObj.idString += ',' + $('#fA_2 option:selected').text();

      if ($('#fG_1').val() != "") {
        inputFNo += ',' + $('#fG_1').val();
        idObj.idString += ',' + $('#fG_1 option:selected').text();
      }
    }

    try {
      idObj.id = createFloorIdSp(inputFNo);
    } catch (err) {
      console.log(err);
      alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:20')
      return;
    }
    console.log(validated.creator, validated.floorName, idObj.id, idObj.idString);
    console.log("file", validated.file);

    //modal呼び出し
    viewModal();

    // fileupload
    if (validated.file != null) {
      try {
        validated.fileName = await uploadFile(validated.file);
        validated.fileType = validated.file.type;
      } catch (err) {
        console.log(err);
        alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:21');
        $('#exampleModalCenter').modal('hide');
        return;
      }
    } else {
      validated.fileName = "";
      validated.fileType = "";
    }

    // DBデータ作成
    const floorData = {
      idString: idObj.idString, // todo decode to -
      text: validated.text,
      uid: uid,
      author: validated.creator,
      fileName: validated.fileName,
      fileType: validated.fileType,
      createdAt: new Date(),
      updatedAt: new Date(),
      floorName: validated.floorName,
      // like : 0 // todo pending
    }

    //DB登録
    try {
      await dbWriteSp(floorData, idObj.id);
    } catch (err) {
      console.log(err);
      alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:30');
      $('#exampleModalCenter').modal('hide');
      return
    }
    console.log('done');
  }
  else {
    alert('ネットワークエラー発生中。管理人が復旧しないと無理そうです。code:40');
    console.error('not logged in');
    return
  }
})

function createFloorIdSp(input) {
  const array = input.split(',');
  let result = ""

  for (let i = 0; i < array.length; i++) {
    result += ('00' + array[i]).slice(-2); // 2桁揃え
  }

  if (!chekNewId(result)) {
    console.error('id is already regestred!', result);
    throw Error();
  }

  return result;
}

/** inputdata to Object */
function createInputObj() {
  const input = {
    text: "",
    creator: "",
    floorName: "",
    file: null
  }

  input.text = $('#eventText').val();
  input.creator = $('#creator').val();
  input.floorName = $('#floorname').val();

  const fileDatas = document.getElementById('fileupload').files;
  input.file = fileDatas.length > 0 ? fileDatas[0] : null;

  return input
}

/**
 * Validation
 * @param {*} input 
 */
function validateInputs(input) {
  const validation = {
    result: true,
    reason: "",
    text: "",
    creator: "",
    floorName: "",
    file: null
  }

  const textArray = input.text.split('\n');
  const fixedtext = textArray.join(',');

  //文字長0チェック
  if (input.text.length === 0) {
    // todo : 画像がある場合は許容される
    validation.result = false;
    validation.reason = '表示する文章がありません';
    return validation;
  }

  //文字長0チェック
  if (input.floorName.length === 0) {
    validation.result = false;
    validation.reason = 'フロア名が必要です\nv1.1より必須になりました';
    return validation;
  }

  //file validate
  if (input.file != null) {
    if (!validFileType(input.file)) {
      validation.result = false;
      validation.reason = '画像形式に対応していません';
      return validation;
    }
    if (input.file.size > 1048576) {
      const sizeMbyte = (input.file.size / 1048576).toFixed(1);
      validation.result = false;
      validation.reason = `画像のサイズは1Mbyteまでです。\n(これは${sizeMbyte}Mbyte)`;
      return validation;
    }
  }

  // 行数のチェック
  if (textArray.length > 10) {
    validation.result = false;
    validation.reason = '１１行以上の入力があります';
    return validation;
  }

  // １行文字数のチェック
  if (isLineCountNG(textArray)) {
    validation.result = false;
    validation.reason = '１つの行に25文字以上の入力があります';
    return validation;
  }

  if (input.creator.length > 24 || input.floorName.length > 24) {
    validation.result = false;
    validation.reason = 'フロア名・作成者は24文字以下です';
    return validation;
  }

  // サニタイズ : see : https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
  if (testHtml(fixedtext)) {
    validation.result = false;
    validation.reason = '使用禁止文字が含まれています ( & < > " \' ) ';
    return validation;
  }

  if (testHtmlFull(input.creator) || testHtmlFull(input.floorName)) {
    validation.result = false;
    validation.reason = '使用禁止文字が含まれています ( & < > " \' \\ ) ';
    return validation;
  }

  //念の為サニタイズ処理に通す
  validation.text = escapeHtml(fixedtext);
  validation.creator = escapeHtmlFull(input.creator);
  validation.floorName = escapeHtmlFull(input.floorName);
  validation.file = input.file;

  return validation;
}

var fileTypes = [
  'image/jpeg',
  'image/png'
]

function validFileType(file) {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function testHtml(text) {
  let re = /[&<>"']/g;
  return re.test(text);
}

function testHtmlFull(text) {
  let re = /[&<>"'\\]/g;
  return re.test(text);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function escapeHtmlFull(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    "/": ''
  };
  return text.replace(/[&<>"'/]/g, function (m) { return map[m]; });
}

function isLineCountNG(textArray) {
  let isNG = false;

  textArray.forEach(texts => {
    if (texts.length > 24) isNG = true;
  })

  return isNG;
}

/** FloorId random create */
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

function viewModal() {
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
}

function updateModal(idString) {
  //modalデータここで更新
  const floorId = idString.split(',').join('-');
  $('#floorNo').text(floorId);
  $('#exampleModalLongTitle').text("ゲームデータを更新中");
  if (progress < 40) progress = 40;
}

/** fileUpload */
async function uploadFile(file) {
  const storageRef = storage.ref();
  const ext = file.name.split('.').pop();
  const filename = generateUuid() + '.' + ext;

  await storageRef.child(`medias/${filename}`).put(file);
  return filename;
}

function generateUuid() {
  // https://qiita.com/psn/items/d7ac5bdb5b5633bae165
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
}

/** DB write */
async function dbWriteSp(floorData, id) {

  let writeBatch = db.batch();

  const refMain = db.collection(`/floors/v1/origins/v1/datas`).doc(id);
  writeBatch.set(refMain, floorData);



  await writeBatch.commit();

  //現在のobjectも更新 : global
  events[id] = floorData;
}