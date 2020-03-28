export default class Preloader extends Phaser.Scene {

  constructor() {
    super({ key: 'preloader' })
  }

  preload() {

    this.load.image('panel', 'assets/editor_panel.png');
    this.load.image('light','assets/light.png');

    // this.load.audio('click', 'assets/audio/click2.mp3');
    this.load.audio('dooropen', 'assets/audio/elevetordoor.mp3');
    this.load.audio('pone', 'assets/audio/ariplane-chime_one.mp3');
  }

  create() {
    console.log('%c Preloader ', 'background: green; color: white; display: block;');
    this.scene.start('editor');
  }
}