import * as util from './etc';

export function toCommands(scene, data) {
  let dataObj = {
    commands: "",
    fileName: "",
    fileType: "",
  }

  console.log('convert command');
  console.log('floordata', data);

  const gauge = data.gauge;

  const floorRand = getFloorRand(data.arraws[0], data.arraws[1], gauge);
  scene.randFuncs = randFactory(floorRand, scene);

  const checkedCode = checkEvent(data.code, scene);
  let script;
  let autoText = true;

  if (checkedCode) {
    //registered event
    const event = scene.spEvents.get(checkedCode);

    //debug detas
    // const event = { "text": "こんにちは！\\G,ハロー\\C,タグのテスト\\G", "idString": "19-12-Г-Ж", "fileName": "", "fileType":"", "floorName": "君の半身", "author": "としあき！" }
    // const event = { "text": "ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C", "idString": "19-12-Г-Ж", "fileName": "", "fileType":"",  "floorName": "君の半身", "author": "としあき！" };
    // const event = { "text": "ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G", "idString": "19-12-Г-Ж", "fileName": "", "fileType":"",  "floorName": "君の半身", "author": "としあき！" };
    // debug end

    script = event.text;
    dataObj.fileName = event.fileName;
    dataObj.fileType = event.fileType;

    //既読削除処理
    scene.endEvents.set(checkedCode, event);
    scene.endMenuItems.push({
      id: checkedCode,
      idString: event.idString,
      text: `${event.idString} / ${event.floorName}`,
      color: Phaser.Math.Between(0, 0xffffff)
    })
    const delIndex = scene.spEventsKeys.indexOf(checkedCode);
    if (delIndex >= 0) {
      scene.spEventsKeys.splice(delIndex, 1);
    }

    //localStorage保存
    if (scene.useLocalStorage) {
      localStorage.setItem('endEvents', JSON.stringify([...scene.endEvents]));
    }

  } else {
    //normal event
    autoText = false;
    const select = floorRand.split('');

    script = scene.ev1data[select[0]][data.inputNo[0]] + ','
      + scene.ev2data[select[1]][data.inputNo[1]] + ','
      + scene.ev3data[select[2]][data.inputNo[2]] + ','
      + scene.ev4data[select[3]][data.inputNo[3]];

  }

  //タグを置き換え : 置き換え後にタグが発生する場合があるのでdo-while
  do {
    script = tagReplace(script, scene);
  } while (tagCheck(script));

  //RCRPに変換
  let commands_text = util.scriptsToEvents(script, autoText);

  dataObj.commands = spCommandsFix(commands_text, checkedCode, dataObj.fileType);

  return dataObj
}

function checkEvent(code, scene) {
  let resultCode = 0 // No.0 is normal event

  const code_nogauge = code.slice(0, -2);

  const code_swonly = code.slice(0, -4);

  // console.log(code, code4, code6);
  // console.log(scene.spEvents);

  //todo なんかうまい方法ないのか
  if (scene.spEvents.has(code)) {
    resultCode = code;
  } else if (scene.spEvents.has(code_nogauge)) {
    resultCode = code_nogauge;
  } else if (scene.spEvents.has(code_swonly)) {
    resultCode = code_swonly;
  }

  return resultCode;
}

function getFloorRand(arrow1, arrow2, gauge) {

  if (arrow1 === 8 || arrow2 === 8) {
    //特殊対応
    return '3333';
  }

  // normal拡張レベル4 : 4 * 4 * 4 * 4 = 256パターン(0-255)を構築する
  // rsw 8進数を10進数に変換(63通り) * gaugeから4通り作成 = 252通り
  const base = parseInt((arrow1 * 10 + arrow2), 8) + (gauge % 5);

  //RandTableに入れて数字を変換する
  const randTable = [211, 119, 238, 158, 177, 126, 60, 9, 116, 32, 191, 82, 163, 49, 58, 41, 61, 185, 186, 64, 21, 226, 246, 194, 201, 173, 28, 206, 165, 56, 67, 93, 175, 209, 48, 63, 31, 111, 180, 3, 76, 178, 55, 27, 129, 88, 138, 42, 139, 71, 102, 197, 14, 176, 85, 7, 230, 169, 250, 179, 225, 205, 52, 181, 148, 207, 120, 189, 130, 45, 77, 135, 224, 212, 223, 110, 215, 79, 65, 68, 16, 188, 156, 234, 34, 217, 19, 44, 101, 117, 38, 66, 23, 22, 213, 122, 89, 227, 37, 50, 125, 193, 80, 78, 187, 11, 30, 18, 91, 218, 84, 100, 220, 6, 159, 231, 83, 162, 96, 144, 253, 183, 5, 243, 73, 123, 198, 26, 86, 127, 195, 0, 190, 244, 172, 47, 51, 53, 25, 94, 237, 40, 98, 155, 203, 208, 114, 232, 142, 221, 240, 219, 160, 4, 239, 24, 131, 105, 146, 134, 210, 54, 132, 75, 236, 214, 252, 112, 140, 228, 74, 154, 166, 170, 128, 70, 72, 92, 106, 242, 103, 17, 99, 235, 151, 152, 59, 229, 109, 46, 241, 164, 161, 200, 168, 133, 153, 249, 15, 90, 137, 147, 107, 118, 222, 184, 13, 167, 254, 182, 87, 145, 136, 97, 57, 69, 216, 124, 20, 2, 245, 95, 157, 149, 115, 29, 81, 12, 248, 36, 247, 141, 33, 108, 104, 233, 196, 39, 251, 121, 150, 171, 62, 199, 8, 35, 174, 1, 204, 192, 113, 202, 10, 43, 143, 255];
  const fixBase = randTable[base];

  // normal event の各evのindex決定 : 4進数4桁を作成し分割することで、indexを決定するのじゃ。
  // ev1[0-3] , ev2[0-3],  ev3[0-3], ev4[0-3]
  return ('0000' + fixBase.toString(4)).slice(-4);
}

function randFactory(floorRand, scene) {
  const retObj = new Object();
  const num = parseInt(floorRand, 4); // 4進数to 10進数 : range : 

  // numtag Indexを返す : 初回のみ再現値をもとにした値
  const f_getRandNumTagId = function () {
    if (!f_getRandNumTagId.hasOwnProperty('data')) {
      // console.log('first call');
      f_getRandNumTagId.data = Math.floor(num % scene.numTag.length);
    } else {
      // console.log('normal call');
      f_getRandNumTagId.data = Phaser.Math.Between(0, scene.numTag.length - 1);
    }
    return f_getRandNumTagId.data;
  };

  // npc indexを返す
  const f_getNpcTableId = function () {
    if (!f_getNpcTableId.hasOwnProperty('data')) {
      // console.log('first call');
      f_getNpcTableId.data = Math.floor(num % scene.ev2data.length); // fixme : 乱数生成がnpcid と同期している
    } else {
      // console.log('normal call');
      f_getNpcTableId.data = Phaser.Math.Between(0, scene.ev2data.length - 1);
    }
    return f_getNpcTableId.data;
  }

  // npc id を返す
  const f_getNpcId = function () {
    if (!f_getNpcId.hasOwnProperty('data')) {
      // console.log('first call');
      f_getNpcId.data = Math.floor(num % scene.ev2data[0].length);
    } else {
      // console.log('normal call');
      f_getNpcId.data = Phaser.Math.Between(0, scene.ev2data[0].length - 1);
    }
    return f_getNpcId.data;
  }

  retObj.getRandNumTagId = f_getRandNumTagId;
  retObj.getNpcTableId = f_getNpcTableId;
  retObj.getNpcId = f_getNpcId;

  return retObj;
}

function tagCheck(text) {
  const reg = /\\[A-Z]/;
  return reg.test(text);
}

function tagReplace(text, scene) {
  const replacerScene = replacer.bind(scene);
  return text.replace(/\\[A-Z]/g, replacerScene);
}

function replacer(match) {

  let replacedStr = "";
  switch (match) {
    case "\\G": {
      //floorRand is var
      replacedStr = this.numTag[this.randFuncs.getRandNumTagId()];
      break;
    }
    case "\\C": {
      replacedStr = this.ev2data[this.randFuncs.getNpcTableId()][this.randFuncs.getNpcId()].slice(0, -1);
      break;
    }
    default: {
      console.log('unknown tag', match);
      //replacedata is blank
      break;
    }
  }
  return replacedStr;
}

/**
 * 通常のコマンド処理を改変する
 * @param {*} commands 
 * @param {*} id 
 * @param {*} fileType 
 */
function spCommandsFix(commands, id, fileType) {
  if (id === '14141414') {
    return commandFixEnding(commands);
  } else if (id === '999999990000' || id === '999999990001') {
    return commandFixNoPretext(commands);
  }
  if (fileType === 'video/mp4' || fileType === 'video/webm') {
    return commandFixNoPretext(commands);
  }

  return commands;
}

/** 
 * としあきは見た　無し
 */
function commandFixNoPretext(commands) {
  return commands.slice(1);
}

/**
 * ENDING表示用コマンド処理
 */
function commandFixEnding(commands) {
  const _commands = commands.slice(0, -1);
  return _commands.concat([[5000, "poneSE"], [1000, [["dooropenSE"], ["fadeOut", 6000]]], [6000, "toGameOver"]]);
}