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

  rswSE(){
    this.scene.rswSE.play();
  }

  fadeOut(milliseconds){
    this.scene.cameras.main.fadeOut(milliseconds, 0, 0, 0);
  }
  preText(text,x,y,w,h) {
    this.scene.add.text(x, y, text, this.scene.fontsys);
    this.scene.graphics.strokeRoundedRect(x, y, w, h, 2);
  }

  text(text,x,y) {
    this.scene.add.text(x, y, text, this.scene.fontev);
  }

  textRed(text,x,y){
    this.scene.add.text(x, y, text, this.scene.fontevRed);
  }

  next() {
    this.scene.next.setVisible(true);
  }

  toGameOver(){
    console.log('player call to Gameover')
    this.scene.events.emit('toGameOver');
    this.scene.scene.stop('floorEvent');
  }
}
export default class FloorEvent extends Phaser.Scene {

  constructor() {
    super('floorEvent');
  }

  preload(data) {
    //console.log('call init', data);

    //font
    this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontev = { fontSize: '30px', color: '#fff', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
  }

  create(data) {

    console.log('%c floorEvent ', 'background: green; color: white; display: block;');

    this.evMoveBGM = this.sound.add('evmove');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');
    this.rswSE = this.sound.add('rsw');

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(2, 0xFFFFFF, 1);

    //next button 
    this.next = this.add.image(400, 530, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    this.next.on('pointerup', ()=>{
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