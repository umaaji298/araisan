import TCRP from 'phaser3-rex-plugins/plugins/tcrp.js';
import TcrpAction from '../class/tcrpAction';
import * as util from '../util/etc';

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

    //special var
    var scene = this;

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.randDatas = getRandData({}, this);

    let commands = readEventsText(this);// form入力値

    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');

    //panel
    const panel = this.add.image(660, 300, 'panel');


    this.eventObj = this.scene.get('floorEvent');
    this.eventObj.events.once('restert', () => {
      this.eventObj.events.off('restert');
      console.log('call restert');
      this.poneSE.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);

      if (!this.hasOwnProperty('evImage')) {
        this.scene.restart();
      } else {
        this.evImage.destroy();

        this.textures.once('removetexture', () => {
          console.log('wahahahaha');
          this.scene.restart();
        });
        this.textures.remove('evImage');
      }
    })

    if (commands.file === null) {
      const eventData = {
        commands: commands.data,
        delay: 0,
      }
      this.scene.launch('floorEvent', eventData);

    } else {
      //画像の読み出し
      const reader = new FileReader();
      reader.onload = function () {
        scene.textures.once('onload', () => {
          console.log('texture load end');
          scene.events.emit('imageEvent');
        })
        scene.textures.addBase64('evImage', reader.result);
      }
      reader.readAsDataURL(commands.file);

      this.events.once('imageEvent', () => {
        console.log('call');
        viewEventImage(scene);
        scene.dooropenSE.play();
      });

      this.dooropenSE.once('complete', () => {
        const eventData = {
          commands: commands.data,
          delay: 2000,
        }
        this.scene.launch('floorEvent', eventData);
      });
    }
  }
}

function readEventsText(scene) {
  let retObj = {
    data: "",
    file: null
  }

  //formより読み込み
  const event_raw = document.getElementById('eventText').value;
  let text_temp = cleanText(event_raw);
  text_temp = cleanLine(text_temp);

  let script = text_temp.split('\n').join(',')
  console.log('evet text', script);
  script = tagReplace(script, scene);

  retObj.data = util.scriptsToEvents(script);

  //image
  const fileDatas = document.getElementById('fileupload').files;
  retObj.file = fileDatas.length > 0 ? fileDatas[0] : null;

  return retObj
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

// event image
function viewEventImage(scene) {
  //todo this.load 'complete' check

  // 本体画像
  scene.evImage = scene.add.image(280, 310, 'evImage');
  const image = scene.evImage;

  if (image.width >= image.height) {
    if (image.width > 480) {
      // scale
      image.setScale(480 / image.width);
    }
  } else {
    if (image.height > 520) {
      // scale
      image.setScale(520 / image.height);
    }
  }
  image.setCrop(0, 0, 0, 0); // all cropped

  const centerX = Math.ceil(image.width / 2);
  const centerY = Math.ceil(image.height / 2);

  const dispX = Math.ceil(image.displayWidth / 2);
  const dispY = Math.ceil(image.displayHeight / 2);

  // //左右ライト
  scene.light_l = scene.add.tileSprite(-100, -100, 41, image.displayHeight, 'light');
  scene.light_r = scene.add.tileSprite(-100, -100, 41, image.displayHeight, 'light');

  const light_l = scene.light_l;
  const light_r = scene.light_r;
  light_r.setAngle(180);

  //フラッシュ
  let rect;
  scene.flashGraphics = scene.add.graphics();
  const flashGraphics = scene.flashGraphics;

  scene.tweens.addCounter({
    targets: image,
    from: 1.0,
    to: 0.0,
    ease: 'Quad.easeInOut',
    duration: 3000,
    onUpdate: function (tween, targets) {

      const x = centerX * tween.getValue();
      const y = 0;
      const w = (centerX - x) * 2;
      const h = image.height;
      image.setCrop(x, y, w, h);

      // todo scale計算必要
      const scaledX = dispX * tween.getValue();
      const lineX = image.x - dispX + scaledX;
      const lineY = image.y - dispY;
      const lineX2 = image.x + dispX - scaledX;
      const scaledW = (dispX - scaledX) * 2;
      const scaledH = image.displayHeight;
      rect = new Phaser.Geom.Rectangle(lineX, lineY, scaledW, scaledH);

      light_l.x = lineX - light_l.width / 2;
      light_l.y = lineY + light_l.height / 2;

      light_r.x = lineX2 + light_r.width / 2;
      light_r.y = lineY + light_r.height / 2;
    }
  });

  scene.tweens.addCounter({
    targets: image,
    from: 1.0,
    to: 0.0,
    ease: 'Expo.easeIn',
    duration: 3000,
    onUpdate: function (tween, targets) {
      flashGraphics.clear();
      flashGraphics.fillStyle(0xffffff, tween.getValue());
      flashGraphics.fillRectShape(rect);
      flashGraphics.setDepth(1);

      light_l.setAlpha(tween.getValue());
      light_r.setAlpha(tween.getValue());
    }
  })

}

/** clean input data */
function cleanText(text) {
  //複数空行をまとめる
  return text.replace(/[ 　]+/g, " ");
}

function cleanLine(text) {
  //空行つき改行は改行のみ
  let text_temp = text.replace(/^ \n/g, "\n");

  //連続改行をひとつに
  text_temp = text_temp.replace(/\n\n+/g, "\n\n");

  return text_temp
}