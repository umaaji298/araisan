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

    this.eventObjs = new Array(); // player で生成するtextureへの参照を保存

    this.myCmds = new TcrpAction(this);
    this.player = new TCRP.Player(this, {});

    //next event
    this.events.once('next', () => {
      console.log('call next');
      this.events.emit('restert');
      destructor(this);
      this.scene.stop('floorEvent');
    });

    //背景トーンダウン
    this.tw_1 = this.tweens.addCounter({
      targets: this,
      from: 0.0,
      to: 0.5,
      duration: 500,
      delay: data.delay,
      // backgraound fade
      onUpdateParams: this.cameras.main,
      onUpdate: function (tween, targets, cameras) {
        const opacity = tween.getValue();
        const color = `rgba(50,50,50,${opacity})`;
        cameras.setBackgroundColor(color);
      },
      //TCRP Player
      onCompleteScope: this,
      onCompleteParams: data,
      onComplete: function (tween, targets, data) {
        this.player
          .load(data.commands, this.myCmds, { dtMode: 1 })
          .start();
      },
    });

  }
}

function destructor(scene) {
  scene.tweens.remove(scene.tw_1);

  scene.textBox.removeInteractive();
  scene.textBox.destroy();

  scene.myCmds = null;
  scene.player = null;
}