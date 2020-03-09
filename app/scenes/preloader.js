
export default new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:
    function Preloader() {
      Phaser.Scene.call(this, { key: 'preloader' });
    },

  preload: function () {
    this.load.image('fullscreen', 'assets/fullscreen.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('panel', 'assets/panel.png');
    this.load.image('next', 'assets/next.png');
    this.load.image('arraw', 'assets/arraw.png');
    this.load.multiatlas('textures', 'assets/texture/textures.json', 'assets/texture');

    //this.load.audio('click', 'assets/audio/click2.ogg');
    this.load.audio('click', 'assets/audio/click2.mp3');
    this.load.audio('rsw', 'assets/audio/switch1.mp3');
    this.load.audio('gauge', 'assets/audio/kachi4.mp3');
    this.load.audio('evmove', 'assets/audio/elevetor_6sec.mp3');
    this.load.audio('pone', 'assets/audio/ariplane-chime_one.mp3');
    this.load.audio('dooropen', 'assets/audio/elevetordoor.mp3');
    this.load.audio('ending', 'assets/audio/taiju_43sec.mp3');

    //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  },

  create: function () {
    console.log('%c Preloader ', 'background: green; color: white; display: block;');

    // gameobject??
    // game.scale.onFullScreenChange(() => {
    //   console.log('change');
    // })

    this.scene.start('start');
    // this.scene.start('game');

  }

});