import * as util from './etc';

export function toCommands(scene, data) {
  let commands = {
    data: "",
    fileName: ""
  }

  console.log('convert command');
  //console.log('floordata', data);

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
    // const event = { "text": "こんにちは！\\G,ハロー\\C,タグのテスト\\G", "idString": "19,12,Г,Ж", "imgUrl": "", "floorName": "君の半身", "author": "としあき！" }
    // const event = { "text": "ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C,ハロー\\C", "idString": "19,12,Г,Ж", "imgUrl": "", "floorName": "君の半身", "author": "としあき！" };
    // const event = { "text": "ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G,ハロー\\G", "idString": "19,12,Г,Ж", "imgUrl": "", "floorName": "君の半身", "author": "としあき！" };
    // debug end

    script = event.text;
    if (event.hasOwnProperty('fileName')) {
      commands.fileName = event.fileName;
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

  commands.data = spCommandsFix(commands_text, checkedCode);

  return commands
}

function checkEvent(code, scene) {
  let resultCode = 0 // No.0 is normal event

  const code4 = code.slice(0, 8);
  const code6 = code.slice(0, 10);

  // console.log(code, code4, code6);
  // console.log(scene.spEvents);

  //todo なんかうまい方法ないのか
  if (scene.spEvents.has(code)) {
    resultCode = code;
  } else if (scene.spEvents.has(code6)) {
    resultCode = code6;
  } else if (scene.spEvents.has(code4)) {
    resultCode = code4;
  }

  return resultCode;
}

function spCommandsFix(commands, id) {
  if (id === '14141414') {
    const _commands = commands.slice(0, -1);
    return _commands.concat([[5000, "poneSE"], [1000, [["dooropenSE"], ["fadeOut", 6000]]], [6000, "toGameOver"]]);
  } else if (id === '999999990000') {
    return commands.slice(1);
  }
  else if (id === '999999990001') {
    return commands.slice(1);
  }

  return commands;
}

function getFloorRand(arrow1, arrow2, gauge) {

  if (arrow1 === 8 || arrow2 === 8) {
    //特殊対応
    return '0000';
  }

  //max 80 - 0 : min 80 - 78 = 2
  const base = parseInt((arrow1 * 10 + arrow2), 8) + gauge;
  const reverse = 80 - base;
  return ('0000' + reverse.toString(3)).slice(-4); // 3進数4桁
}

function randFactory(floorRand, scene) {
  const retObj = new Object();
  const num = parseInt(floorRand, 3); // 3進数to 10進数 : range : 2 - 80

  // numtag Indexを返す : 初回のみ再現値をもとにした値
  const f_getRandNumTagId = function () {
    if (!f_getRandNumTagId.hasOwnProperty('data')) {
      console.log('first call');
      f_getRandNumTagId.data = Math.floor(num % scene.numTag.length);
    } else {
      console.log('normal call');
      f_getRandNumTagId.data = Phaser.Math.Between(0, scene.numTag.length - 1);
    }
    return f_getRandNumTagId.data;
  };

  // npc indexを返す
  const f_getNpcTableId = function () {
    if (!f_getNpcTableId.hasOwnProperty('data')) {
      console.log('first call');
      f_getNpcTableId.data = Math.floor(num / scene.ev2data[0].length);
    } else {
      console.log('normal call');
      f_getNpcTableId.data = Phaser.Math.Between(0, scene.ev2data.length - 1);
    }
    return f_getNpcTableId.data;
  }

  // npc id を返す
  const f_getNpcId = function () {
    if (!f_getNpcId.hasOwnProperty('data')) {
      console.log('first call');
      f_getNpcId.data = Math.floor(num % scene.ev2data[0].length);
    } else {
      console.log('normal call');
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
