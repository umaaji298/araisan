export default class Preloader extends Phaser.Scene {

  constructor() {
    super({ key: 'preloader' })
  }

  preload() {

    //loading
    this.load.on('progress',(prgress)=>{
      console.log(prgress)
    });

    //load comp
    this.load.on('complete',()=>{
      console.log('loadend');
    });

    //this.load.image('title', 'assets/title.png');
    this.load.image('panel', 'assets/panel.png');
    this.load.image('next', 'assets/next.png');
    this.load.image('arraw', 'assets/arraw.png');
    this.load.multiatlas('textures', 'assets/texture/textures.json', 'assets/texture');

    //this.load.audio('click', 'assets/audio/click2.ogg');
    this.load.audio('click', 'assets/audio/click2.mp3');
    //this.load.audio('rsw', 'assets/audio/switch1.mp3');
    //this.load.audio('gauge', 'assets/audio/kachi4.mp3');
    //this.load.audio('evmove', 'assets/audio/elevetor_6sec.mp3');
    //this.load.audio('pone', 'assets/audio/ariplane-chime_one.mp3');
    //this.load.audio('dooropen', 'assets/audio/elevetordoor.mp3');
    //this.load.audio('ending', 'assets/audio/taiju_43sec.mp3');

    //scripts
    //this.load.json('events', 'events/events.json');
    //this.load.json('events', 'https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/events.json?alt=media');

    //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

  }

  create() {
    console.log('%c Preloader ', 'background: green; color: white; display: block;');
    this.scene.start('editor');
  }
}