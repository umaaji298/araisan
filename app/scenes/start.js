

export default class Start extends Phaser.Scene {

  constructor() {
    super({ key: 'start' });
    // window.MENU = this;// whats?
  }

  create() {
    console.log('%c Start ', 'background: green; color: white; display: block;');

    this.poneSE = this.sound.add('pone');

    var bg = this.add.image(400, 300, 'title');
    bg.setInteractive();

    bg.once('pointerup', function () {
      this.poneSE.play();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
      this.time.delayedCall(2000, () => {
        this.scene.start('game');
      }, [], this);
    }, this);


    // createTextBox(this, 100, 100)
    //   .start(content, 0);

  }
}

//var content = `ENTERING WONDER ELEVATOR\nOF THE ARAISAN's MANSION`;



