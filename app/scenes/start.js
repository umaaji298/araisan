

export default class Start extends Phaser.Scene {

  constructor() {
    super({ key: 'start' });
  }

  create() {
    console.log('%c Start ', 'background: green; color: white; display: block;');

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.poneSE = this.sound.add('pone');
    this.menuSE = this.sound.add('menuse');

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

    this.setting = this.add.image(770, 570, 'settings');
    const settingHitarea = this.setting.setInteractive();
    settingHitarea.input.hitArea.setTo(-10, -10, 32 + 20, 32 + 20); // original size : 45,11 : 上15 下25

    this.setting.once('pointerup', function () {
      this.menuSE.play();
      this.bg.removeInteractive();
      this.scene.launch('settings');
    }, this);

    this.events.on('settingsExit',()=>{
      this.bg.setInteractive();
      this.setting.once('pointerup', function () {
        this.menuSE.play();
        this.bg.removeInteractive();
        this.scene.launch('settings');
      }, this);
    },this);

  }
}

function destructor(scene) {
  scene.setting.removeListener('pointerup');
  scene.setting.removeInteractive();
  scene.setting.destroy();
  scene.textures.remove('settings');
  
  scene.bg.removeInteractive();
  scene.bg.destroy();
  scene.textures.remove('title');

  //object削除
  scene.poneSE.destroy();
  scene.menuSE.destroy();
  scene.bg.destroy();
}
