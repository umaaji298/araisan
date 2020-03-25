
export default class GameOver extends Phaser.Scene {

  constructor() {
    super({ key: 'gameover' })
    window.OVER = this; // whats?
  }

  create() {
    console.log('%c GameOver ', 'background: green; color: white; display: block;');

    var content = [
      "credit",
      "",
      "",
      "原案",
      "",
      "あぶぶ@健全",
      "",
      "",
      "",
      "自動生成怪異案",
      "",
      "としあき@あぶぶマンションスレ",
      "",
      "",
      "BGM/SE",
      "",
      "遊句@夢に見た緑",
      "エクシエ@nc138283",
      "ポケットサウンド@https://pocket-se.info/",
      "",
      "",
      "素材",
      "",
      "ICOON MONO",
      "",
      "",
      "Plugin",
      "",
      "Rex@rexrainbow",
      "",
      "",
      "デバッグ協力",
      "",
      "COP",
      "",
      "",
      "他",
      "",
      "としあき",
      "",
      "",
      "",
    ];

    this.graphics = this.add.graphics();

    this.graphics.lineStyle(5, 0x3e153b, 1);
    this.graphics.lineBetween(400, 0, 400, 600);


    this.fontopt = { fontSize: '26px', color: '#fff', align: 'center' };
    this.scrolltext = this.add.text(110, 650, content, this.fontopt);
    this.endingBGM = this.sound.add('ending');
    this.endingBGM.setVolume(0.6);

    this.endingBGM.play();

    // this.endingBGM.on('complete', () => {
    //   this.cameras.main.fadeOut(3000, 0, 0, 0);
    // }, this);

    this.time.delayedCall(52000, (_this) => {
      _this.cameras.main.fadeOut(7000, 0, 0, 0);
      _this.tweens.add({
        targets: _this.endingBGM,
        volume: 0,
        duration: 5000
      });
    }, [this]);

    this.input.once('pointerup', function (event) {
      this.cameras.main.fadeOut(7000, 0, 0, 0);
      this.tweens.add({
        targets: this.endingBGM,
        volume: 0,
        duration: 5000
      });
    }, this);

    this.cameras.main.once('camerafadeoutcomplete', function (camera) {
      this.sound.stopAll();
      this.scene.start('start');
    }, this);

    this.cameras.main.fadeIn(3000, 0, 0, 0);
  }

  update() {
    this.scrolltext.y -= 0.5;
  }
}