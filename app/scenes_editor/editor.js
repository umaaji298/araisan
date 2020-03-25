import TCRP from 'phaser3-rex-plugins/plugins/tcrp.js';
import TcrpAction from '../class/tcrpAction';
import * as util from '../util';

export default class Editor extends Phaser.Scene {

  constructor() {
    super({ key: 'editor' });
  }

  preload() {
    //console.log('call game pleroad');

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "７", "５", "７７", "３", "１０", "０．１", "１", "千万", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１","５０００兆"];
  }

  create() {
    console.log('%c editor ', 'background: green; color: white; display: block;');

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //TCRP event
    this.myCmds = new TcrpAction(this);
    this.player = new TCRP.Player(this, {});

    let commands = readEventsText(this);// form入力値

    this.poneSE = this.sound.add('pone');

    //panel
    const panel = this.add.image(660, 300, 'panel');
    panel.alpha = 0.5;
    panel.setInteractive();

    //fade用の待ち時間を入れる？
    //commands.unshift([2000,'print','wait']);

    //背景トーンダウン
    // todo scene - backgroundtypeなので動かない

    //next button 
    this.next = this.add.image(400, 553, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    this.next.on('pointerup', function () {
      this.poneSE.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        //commands = readEventsText(this);
        //tcrpPlay(this, commands);
        this.player.stop();
        this.scene.restart();
      }, [], this);

    }, this);



    tcrpPlay(this, commands);
  }
}

function readEventsText(scene) {
  //formより読み込み
  const event_raw = document.getElementById('eventText').value;
  const event = event_raw.split('\n').join(',')

  console.log('evet text', event);

  //\Gの置き換え
  const index = Phaser.Math.Between(0, scene.numTag.length - 1);
  const fixevent = event.replace(/\\G/g, scene.numTag[index]); // ランダム表示

  return util.scriptsToEvents(fixevent);
}

function tcrpPlay(scene, commands) {
  scene.player
    .load(commands, scene.myCmds, {
      // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
      dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
    })
    .start()
    .on('complete', function () {
      console.log(scene.player.now * 0.001);
    });
}
