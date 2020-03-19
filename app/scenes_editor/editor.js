// todo モジュール化
class ActionKlass {
  constructor(scene) {
    this.scene = scene;
    this.objs = new Map();
  }

  // commands
  print(msg) {
    console.log(msg);
  }

  evMoveBGM() {
    this.scene.evMoveBGM.play();
  }

  poneSE() {
    this.scene.poneSE.play();
  }

  dooropenSE() {
    this.scene.dooropenSE.play();
  }

  rswSE() {
    this.scene.rswSE.play();
  }

  fadeOut(milliseconds) {
    this.scene.cameras.main.fadeOut(milliseconds, 0, 0, 0);
  }

  //引数を無効化
  preText(text) {
    const x = 280;
    const y = 77;
    const px = 20;
    const py = 10;
    const textBox = this.scene.rexUI.add.textBox({
      x: x,
      y: y,

      background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 2, 0x000000)
        .setStrokeStyle(2, 0xffffff),

      text: getBBcodeText(this.scene, 0, 0, 0),

      space: {
        left: px,
        right: px,
        top: py,
        bottom: py,
        // icon: 10,
        // text: 10,
      }
    })
      //.setOrigin(0)
      .layout();

    textBox.start(text, 0);
  }

  //引数を無効化
  roundText(text, x, y, px, py) {
    const textBox = this.scene.rexUI.add.textBox({
      x: x,
      y: y,

      background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 2, 0x000000)
        .setStrokeStyle(2, 0xffffff),

      text: getBBcodeText(this.scene, 0, 0, 0),

      space: {
        left: px,
        right: px,
        top: py,
        bottom: py,
        // icon: 10,
        // text: 10,
      }
    })
      //.setOrigin(0)
      .layout();

    textBox.start(text, 0);
  }

  text(text, x, y) {
    this.scene.add.text(x, y, text, this.scene.fontev);
  }

  textRed(text, x, y) {
    this.scene.add.text(x, y, text, this.scene.fontevRed);
  }

  next() {
    this.scene.next.setVisible(true);
  }

  toGameOver() {
    console.log('player call to Gameover')
    this.scene.events.emit('toGameOver');
    this.scene.scene.stop('floorEvent');
  }
}

export default class Editor extends Phaser.Scene {

  constructor() {
    super({ key: 'editor' });
  }

  preload() {
    //console.log('call game pleroad');
    //font
    this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontev = { fontSize: '30px', color: '#fff', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "７", "５", "７７", "３", "１０", "０．１", "１", "千万", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１"];
  }

  create() {
    console.log('%c editor ', 'background: green; color: white; display: block;');
    //console.log(this);
    this.cameras.main.fadeIn(2000, 0, 0, 0);

    this.switches = new Array(); // normal sw
    this.inputNo = new Array(); // 階表示用データ
    this.rswitches = new Array(); // rotary sw
    this.evDisplay = new Array();

    //panel
    this.add.image(660, 300, 'panel');

    //formより読み込み
    const event_raw = document.getElementById('eventText').value;
    const event = event_raw.split('\n').join(',')

    console.log('evet text', event);

    //\Gの置き換え
    const index = getRandomIntInclusive(0, this.numTag.length - 1)
    const fixevent = event.replace(/\\G/g, this.numTag[index])

    const commands = scriptsToEvents(fixevent);

    //背景トーンダウン
    // todo scene - backgroundtypeなので動かない
    // var cameras = this.cameras.main;
    // this.tweens.addCounter({
    //   targets: this,
    //   from: 0.0,
    //   to: 0.5,
    //   duration: 500,
    //   onUpdate: function (tween, targets) {
    //     const opacity = tween.getValue();
    //     const color = `rgba(50,50,50,${opacity})`;
    //     cameras.setBackgroundColor(color);
    //   }
    // })

    //next button 
    this.next = this.add.image(400, 553, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    // this.next.setInteractive();
    this.next.setVisible(false);

    var myCmds = new ActionKlass(this);
    var player = this.plugins.get('rexTCRP').addPlayer(this);
    player
      .load(commands, myCmds, {
        // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
        dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
      })
      .start()
      .on('complete', function () {
        console.log(player.now * 0.001);
      });
  }
}

/**
 * ここではやらない
 * @param {*} textdata 
 */
function scriptsToEvents(textdata) {
  const strings = textdata.split(',');

  const baseX = 40;
  const baseY = 117;
  const fixY = (10 - strings.length) * 20 + baseY;

  const commands = new Array();
  commands.push([2000, 'preText', 'エレベータを降りた\nとしあきは見た…']);

  let wait = 3000; // 次の文章表示時間 : 

  for (let i = 0; i < strings.length; i++) {

    const lineWord = strings[i];
    const waittimeClass = Math.floor(lineWord.length / 12);
    const oneScript = [wait, 'text', strings[i], baseX, fixY + (40 * i)];

    wait = 2000; // eye forcus time

    switch (waittimeClass) {
      case 0: {
        wait += 1000;
        break;
      }
      case 1: {
        wait += 3000;
        break;
      }
      case 2: {
        wait += 4000;
      }
    }

    commands.push(oneScript);
  }
  // 次へボタン表示
  commands.push([wait, 'next']);

  return commands;
}


var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,

    fontSize: '30px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 3
  })
}

/** Events */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}