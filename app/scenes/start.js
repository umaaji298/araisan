

export default class Start extends Phaser.Scene {

  constructor() {
    super({ key: 'start' });
  }

  create() {
    console.log('%c Start ', 'background: green; color: white; display: block;');

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.poneSE = this.sound.add('pone');

    this.bg = this.add.image(400, 300, 'title');
    this.bg.setInteractive();

    this.bg.once('pointerup', function () {
      this.poneSE.play();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
      this.time.delayedCall(2000, () => {
        destructor(this);
        this.scene.start('game');
      }, [], this);
    }, this);

  }
}

function destructor(scene){
  scene.bg.removeInteractive();
  scene.bg.destroy();
  scene.textures.remove('title');

  //object削除
  scene.poneSE.destroy();
  scene.bg.destroy();
}
