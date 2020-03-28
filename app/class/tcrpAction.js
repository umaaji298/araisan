export default class TcrpAction {
  constructor(scene) {
    this.scene = scene;
    this.objs = new Map();

    //font
    this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontev = { fontSize: '30px', color: '#fff', stroke: '#000', strokeThickness: 8, maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
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
  roundText(text, x, y, px, py) {
    const textBox = this.scene.rexUI.add.textBox({
      x: x,
      y: y,

      background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 2, 0x000000, 0.6)
        .setStrokeStyle(2, 0xffffff),

      text: this.getBBcodeText(this.scene, 0, 0, 0),

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

    return textBox;
  }

  text(text, x, y) {
    this.scene.add.text(x, y, text, this.fontev);
  }

  textRed(text, x, y) {
    this.scene.add.text(x, y, text, this.fontevRed);
  }

  next(text, x, y, px, py) {
    this.scene.textBox = this.roundText(text, x, y, px, py);
    this.scene.textBox.setInteractive();
    this.scene.textBox.once('pointerup', () => {
      console.log('click next');
      this.scene.events.emit('next');
    });
  }

  toGameOver() {
    console.log('player call to Gameover')
    this.scene.events.emit('toGameOver');
    this.scene.scene.stop('floorEvent');
  }

  getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
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
}