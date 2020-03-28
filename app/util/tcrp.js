import * as util from './etc';

export function toCommands(scene, data) {

  console.log('convert command');
  //console.log('floordata', data);

  const gauge = data.gauge;

  const floorRand = getFloorRand(data.arraws[0], data.arraws[1], gauge);
  scene.randDatas = getRandData(floorRand, scene);

  const checkedCode = checkEvent(data.code, scene);
  let script;

  if (checkedCode) {
    //registered event
    const event = scene.spEvents.get(checkedCode);
    //debug
    //event = { "text": "こんにちは！\\G,ハロー\\C,タグのテスト\\G", "idString": "19,12,Г,Ж", "imgUrl": "", "floorName": "君の半身", "author": "としあき！" }
    script = event.text;
  } else {
    //normal event
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
  let commands = util.scriptsToEvents(script, checkedCode);
  return spCommandsFix(commands, checkedCode);
}

function checkEvent(code, scene) {
  let resultCode = 0 // No.0 is normal event

  const code4 = code.slice(0, 8);
  const code6 = code.slice(0, 10);

  //console.log(code, code4, code6);
  //console.log(scene.spEvents);

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
  return ('0000' + reverse.toString(3)).slice(-4);
}

function getRandData(floorRand, scene) {
  const retObj = new Object();
  const num = parseInt(floorRand, 3); // 3進数to 10進数 : range : 2 - 80

  retObj.numtagId = Math.floor(num % scene.numTag.length);
  retObj.tebleId = Math.floor(num / scene.ev3data[0].length);
  retObj.npcId = Math.floor(num % scene.ev3data[0].length);

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
  //console.log(match,this.randDatas.tebleId,this.randDatas.npcId);

  let replacedStr = "";
  switch (match) {
    case "\\G": {
      //floorRand is var
      replacedStr = this.numTag[this.randDatas.numtagId];
      break;
    }
    case "\\C": {
      replacedStr = this.ev2data[this.randDatas.tebleId][this.randDatas.npcId].slice(0, -1);
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
