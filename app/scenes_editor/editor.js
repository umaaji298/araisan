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
    this.numTag = ["１／２", "７", "５", "７７", "３", "１０", "０．１", "１", "千万", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１"];
  }

  create() {
    console.log('%c editor ', 'background: green; color: white; display: block;');
    //console.log(this);
    //this.cameras.main.fadeIn(2000, 0, 0, 0);

    //panel
    this.add.image(660, 300, 'panel');

    //formより読み込み
    const event_raw = document.getElementById('eventText').value;
    const event = event_raw.split('\n').join(',')

    console.log('evet text', event);

    //\Gの置き換え
    const index = util.getRandomIntInclusive(0, this.numTag.length - 1);
    const fixevent = event.replace(/\\G/g, this.numTag[index]); // ランダム表示

    let commands = util.scriptsToEvents(fixevent);

    //fade用の待ち時間を入れる？
    //commands.unshift([2000,'print','wait']);

    //背景トーンダウン
    // todo scene - backgroundtypeなので動かない
    // var cameras = this.cameras.main;
    // this.tweens.addCounter({
    //   targets: this,
    //   from: 0.0,
    //   to: 0.5,
    //   duration: 500,
    //   onUpdate: function (tween, targets) {
    //     const opacity = tween.getValue();
    //     const color = `rgba(50,50,50,${opacity})`;
    //     cameras.setBackgroundColor(color);
    //   }
    // })

    //next button 
    this.next = this.add.image(400, 553, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    // this.next.setInteractive();
    this.next.setVisible(false);

    //TCRP event
    var myCmds = new TcrpAction(this);
    var player = new TCRP.Player(this,{});
    player
      .load(commands, myCmds, {
        // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
        dtMode: 1           // 'abs'|'absolute'|0|'inc'|'increment'|1
      })
      .start()
      .on('complete', function () {
        console.log(player.now * 0.001);
      });
  }
}