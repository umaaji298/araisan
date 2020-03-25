import TCRP from 'phaser3-rex-plugins/plugins/tcrp.js';
import TcrpAction from '../class/tcrpAction';
import * as util from '../util';

export default class Editor extends Phaser.Scene {

  constructor() {
    super({ key: 'editor' });
  }

  preload() {
    //console.log('call game pleroad');

    this.ev2data = [
      ["無が", "みんみが", "オオカワウソが", "ガチおじが", "死が", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンギツネが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "お稲荷様が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"],
      ["壁が", "裸フレンズが", "ケルピーが", "ニセイさんが", "図書館が", "クラウケンが", "異形が", "古狩人が", "ジャンレノが", "宇宙人が", "ボンドルド卿が", "霊体が", "かーさばが", "壁の絵が", "キタキツネが", "警察が", "ホオジロザメが", "狐ババアが", "ショタが", "ピザ屋が", "狂犬フレンズが", "ワシさんが", "「あけて」君が", "死体が", "\\G人ミサキが", "光が", "闇が", "悪鬼が", "機械が"],
      ["サーバールームが", "エレベーターガールが", "妖精みんみが", "エリクサーが", "イクラが", "トルソーが", "尿ボトルが", "尻目が", "ボスが", "家具が", "エガちゃんが", "ジャガーさんが", "オナガザメが", "メリヰさんが", "エンジニアが", "ソフトクリームが", "ハカセが", "助手が", "スナドリネコが", "メカオオカワウソが", "島が", "フロアが", "自宅が", "パソコンが", "マンション住人が", "全員が", "スマフォが", "ゾンビが", "旧神が"],
    ];

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "８", "１０", "７７", "３", "７", "０．１", "１", "１００", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１", "５０００兆", "８"];
  }

  create() {
    console.log('%c editor ', 'background: green; color: white; display: block;');

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.randDatas = getRandData({}, this);

    //TCRP event
    this.myCmds = new TcrpAction(this);
    this.player = new TCRP.Player(this, {});

    let commands = readEventsText(this);// form入力値

    this.poneSE = this.sound.add('pone');

    //panel
    const panel = this.add.image(660, 300, 'panel');
    panel.alpha = 0.5;
    panel.setInteractive();

    //fade用の待ち時間を入れる？
    //commands.unshift([2000,'print','wait']);

    //背景トーンダウン
    // todo scene - backgroundtypeなので動かない

    //next button 
    this.next = this.add.image(400, 553, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    this.next.on('pointerup', function () {
      this.poneSE.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        //commands = readEventsText(this);
        //tcrpPlay(this, commands);
        this.player.stop();
        this.scene.restart();
      }, [], this);

    }, this);



    tcrpPlay(this, commands);
  }
}

function readEventsText(scene) {
  //formより読み込み
  const event_raw = document.getElementById('eventText').value;
  let script = event_raw.split('\n').join(',')
  console.log('evet text', script);
  script = tagReplace(script, scene);

  return util.scriptsToEvents(script);
}

function tcrpPlay(scene, commands) {
  scene.player
    .load(commands, scene.myCmds, {
      // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
      dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
    })
    .start()
    .on('complete', function () {
      console.log(scene.player.now * 0.001);
    });
}

function getRandData(floorRand, scene) {
  const retObj = new Object();

  retObj.numtagId = Phaser.Math.Between(0, scene.numTag.length - 1);
  retObj.tebleId = Phaser.Math.Between(0, scene.ev2data.length - 1);
  retObj.npcId = Phaser.Math.Between(0, scene.ev2data[0].length - 1);

  return retObj;
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
