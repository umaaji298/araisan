export default class Preloader extends Phaser.Scene {

  constructor() {
    super({ key: 'preloader' })
  }

  preload() {

    //const content = `ENTERING WONDER ELEVATOR\nOF THE ARAISAN's MANSION`;

    //Loading TEXT
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '30px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // loading
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on('progress', (progress) => {
      // console.log(progress);

      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * progress, 30);
    });

    //load comp
    this.load.on('complete', () => {
      // console.log('loadend');
      progressBar.destroy();
      progressBox.destroy();
      this.load.off('progress');
      this.load.off('complete');
      this.scene.start('start');
    });

    this.load.image('title', 'assets/title.png');
    this.load.image('panel', 'assets/panel.png');
    this.load.image('menu', 'assets/menu.png');
    this.load.image('menu_back', 'assets/menu_back.png');
    this.load.image('arraw', 'assets/arraw.png');
    this.load.image('light', 'assets/light.png');
    this.load.image('eye_open', 'assets/eye_open.png');
    this.load.image('eye_close', 'assets/eye_close.png');
    this.load.image('eye_focus', 'assets/eye_focus.png');
    this.load.image('overflow', 'assets/overflow.png');
    this.load.multiatlas('textures', 'assets/texture/textures.json', 'assets/texture');

    this.load.audio('click', 'assets/audio/click2.mp3');
    this.load.audio('rsw', 'assets/audio/switch1.mp3');
    this.load.audio('gauge', 'assets/audio/kachi4.mp3');
    this.load.audio('evmove', 'assets/audio/elevetor_6sec.mp3');
    this.load.audio('pone', 'assets/audio/ariplane-chime_one.mp3');
    this.load.audio('dooropen', 'assets/audio/elevetordoor.mp3');
    this.load.audio('menuse', 'assets/audio/enter8.mp3');
    //this.load.audio('ending', 'assets/audio/taiju_63sec.mp3');

    //scripts
    this.load.json('events', 'https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events.json?alt=media');
    this.load.json('events_diff', 'https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events_diff.json?alt=media');

    //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create() {
    console.log('%c Preloader ', 'background: green; color: white; display: block;');
    // this.scene.start('game');
    // this.scene.start('gameover');
  }
}