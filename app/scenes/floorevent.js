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
export default class FloorEvent extends Phaser.Scene {

  constructor() {
    super('floorEvent');
  }

  preload() {

    //font
    this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontev = { fontSize: '30px', color: '#fff', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
  }

  create(data) {

    console.log('%c floorEvent ', 'background: green; color: white; display: block;');

    //背景トーンダウン
    var cameras = this.cameras.main;
    this.tweens.addCounter({
      targets: this,
      from: 0.0,
      to: 0.5,
      duration: 500,
      onUpdate: function (tween, targets) {
        const opacity = tween.getValue();
        const color = `rgba(50,50,50,${opacity})`;
        cameras.setBackgroundColor(color);
      }
    })

    // todo random color
    //this.add.rectangle(40, 127, 480, 387, 0x6666ff).setOrigin(0);


    this.evMoveBGM = this.sound.add('evmove');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');
    this.rswSE = this.sound.add('rsw');



    //next button 
    this.next = this.add.image(400, 553, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    //textbox
    this.textBoxConf =
      this.next.on('pointerup', () => {
        console.log('restart');
        //gameシーンからこのシーンを削除する？
        this.events.emit('restert');
        this.scene.stop('floorEvent');
      }, this);

    //TCRP event
    var myCmds = new ActionKlass(this);

    var player = this.plugins.get('rexTCRP').addPlayer(this);
    player
      .load(data.commands, myCmds, {
        // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
        dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
      })
      .start()
      .on('complete', function () {
        console.log(player.now * 0.001);
      });
  }
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