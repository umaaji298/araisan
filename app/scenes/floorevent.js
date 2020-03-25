import TCRP from 'phaser3-rex-plugins/plugins/tcrp.js';
import TcrpAction from '../class/tcrpAction';

export default class FloorEvent extends Phaser.Scene {

  constructor() {
    super('floorEvent');
  }

  preload() {
  }

  create(data) {

    console.log('%c floorEvent ', 'background: green; color: white; display: block;');

    //背景トーンダウン
    this.tw_1 = this.tweens.addCounter({
      targets: this,
      from: 0.0,
      to: 0.5,
      duration: 500,
      onUpdateParams:this.cameras.main,
      onUpdate: function (tween, targets,cameras) {
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
        this.events.emit('restert');
        destructor(this);
        this.scene.stop('floorEvent');
      }, this);

    //TCRP event
    this.myCmds = new TcrpAction(this);

    this.player = new TCRP.Player(this, {});
    this.player
      .load(data.commands, this.myCmds, {
        // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
        dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
      })
      .start();
    // .on('complete', function () {
    //   console.log(player.now * 0.001);
    // });
  }
}

function destructor(scene) {
  scene.tweens.remove(scene.tw_1);

  scene.next.off('pointerup');
  scene.next.removeInteractive();
  scene.next.destroy();

  //object削除
  scene.evMoveBGM.destroy();
  scene.poneSE.destroy();
  scene.dooropenSE.destroy();
  scene.rswSE.destroy();

  scene.myCmds = null;
  scene.player = null;
}