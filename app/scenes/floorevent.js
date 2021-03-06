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

    this.gameEvents = this.scene.get('game').events;

    this.eventObjs = new Array(); // player で生成するtextureへの参照を保存

    this.evMoveBGM = this.sound.add('evmove');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');
    this.rswSE = this.sound.add('rsw');

    this.myCmds = new TcrpAction(this);
    this.player = new TCRP.Player(this, {});

    this.menu = this.add.image(40, 560, 'eye_close');
    this.menu_close = this.add.image(40, 550, 'eye_open');
    this.menu_focus = this.add.image(40, 550, 'eye_focus');

    //メニュークリック: 文字表示を消す
    this.menu.setVisible(false);
    this.menu.on('pointerup', () => {
      this.menu.setVisible(false);
      this.eventObjs.forEach(obj => {
        obj.setVisible(false);
      });
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
      this.menu_close.setVisible(true);
    })
    this.menu.setInteractive();

    //メニュークリック: 文字表示のみ : 画像消し
    this.menu_close.setVisible(false);
    this.menu_close.on('pointerup', () => {
      this.menu_close.setVisible(false);
      // send event to game
      this.gameEvents.emit('hideImage');
      this.eventObjs.forEach(obj => {
        obj.setVisible(true);
      });
      this.cameras.main.setBackgroundColor('rgba(50,50,50,0.5)');
      this.menu_focus.setVisible(true);
    })
    this.menu_close.setInteractive();

    //メニュークリック: 通常表示に戻す
    this.menu_focus.setVisible(false);
    this.menu_focus.on('pointerup', () => {
      this.menu_focus.setVisible(false);
      // send event to game
      this.gameEvents.emit('showImage');
      // this.eventObjs.forEach(obj=>{
      //   obj.setVisible(true);
      // });
      // this.cameras.main.setBackgroundColor('rgba(50,50,50,0.5)');
      this.menu.setVisible(true);
    })
    this.menu_focus.setInteractive();

    //next event
    this.events.once('next', () => {
      console.log('call next');
      this.gameEvents.emit('restert');
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
        if (data.useToneDown) {
          const opacity = tween.getValue();
          const color = `rgba(50,50,50,${opacity})`;
          cameras.setBackgroundColor(color);
        }
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

    this.player.on('complete', function (player) {
      // view eye image
      this.menu.setVisible(true);
    }, this);

  }
}

function destructor(scene) {
  scene.tweens.remove(scene.tw_1);

  scene.textBox.removeInteractive();
  scene.textBox.destroy();

  scene.menu.removeInteractive();
  scene.menu.destroy();
  scene.menu_close.removeInteractive();
  scene.menu_close.destroy();
  scene.menu_focus.removeInteractive();
  scene.menu_focus.destroy();

  //object削除
  scene.evMoveBGM.destroy();
  scene.poneSE.destroy();
  scene.dooropenSE.destroy();
  scene.rswSE.destroy();

  scene.myCmds = null;
  scene.player = null;

  scene.events.off('next');

  scene.gameEvents = null;
}