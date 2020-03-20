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
    var cameras = this.cameras.main;
    this.tweens.addCounter({
      targets: this,
      from: 0.0,
      to: 0.5,
      duration: 500,
      onUpdate: function (tween, targets) {
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
        //gameシーンからこのシーンを削除する？
        this.events.emit('restert');
        this.scene.stop('floorEvent');
      }, this);

    //TCRP event
    var myCmds = new TcrpAction(this);

    var player = new TCRP.Player(this,{});
    player
      .load(data.commands_fix, myCmds, {
        // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
        dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
      })
      .start()
      .on('complete', function () {
        console.log(player.now * 0.001);
      });
  }
}