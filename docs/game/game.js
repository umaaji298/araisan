var Preloader = new Phaser.Class({

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
    

    this.load.multiatlas('textures', 'assets/texture/textures.json', 'assets/texture');
    this.load.audio('click', 'assets/audio/click2.ogg');
    this.load.audio('evmove', 'assets/audio/elevetor_6sec.ogg');
    this.load.audio('pone', 'assets/audio/ariplane-chime_one.ogg');
    this.load.audio('dooropen', 'assets/audio/elevetordoor.ogg');
    this.load.audio('ending', 'assets/audio/taiju_43sec.ogg');
    //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  },

  create: function () {
    console.log('%c Preloader ', 'background: green; color: white; display: block;');
    //loadgin
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    //game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
    // game.scale.scaleMode = Phaser.Scale.HEIGHT_CONTROLS_WIDTH;
    // game.scale.refresh();

    // this.fullscreen = this.add.image(400,300,'fullscreen');
    // this.fullscreen.setInteractive();

    // this.fullscreen.on('pointerup',()=>{
    //   console.log('hello',game);
    //   game.scale.startFullscreen();
    //   game.scale.refresh();
    // },this);

    this.scene.start('start');
  }

});


var Start = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function Start() {
      Phaser.Scene.call(this, { key: 'start' });
      window.MENU = this;// whats?
    },

  create: function () {
    console.log('%c Start ', 'background: green; color: white; display: block;');

    var bg = this.add.image(400, 300, 'title');

    bg.setInteractive();

    bg.once('pointerup', function () {

      this.scene.start('game');

    }, this);
  }

});


var GameOver = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function GameOver() {
      Phaser.Scene.call(this, { key: 'gameover' });
      window.OVER = this; // whats?

    },

  create: function () {
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
      "ポケットサウンド@https://pocket-se.info/",
      "",
      "",
      "素材",
      "",
      "illustAC@アトリエウパ",
      "",
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

    this.endingBGM.on('complete', () => {
      this.cameras.main.fadeOut(3000, 0, 0, 0);
    }, this);

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

  },

  update: function () {
    this.scrolltext.y -= 0.5;
  }

});

var Game = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function Game() {
      Phaser.Scene.call(this, { key: 'game' });
      window.GAME = this;

      //data
      this.ev1data = ["0", "人型の", "蟲型の", "不定形の", "4", "半透明の", "複数の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "花にまみれた", "あなたは１４に向かった", "異質の", "光に包まれた", "夜の", "頭が２つある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"];
      this.ev2data = ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンキタが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "のじゃ巫女が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"];
      this.ev3data = ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "踊りながら", "君を見つめながら", "何かを食べながら", "ウインクしながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"];
      this.ev4data = ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんを\nごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と１０年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君を血を啜った。", "息絶えた…"];

      //others
      this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
      this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
      this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
      this.fontev = { fontSize: '30px', color: '#fff', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
      this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    },

  create: function () {

    this.switches = new Array();
    this.inputNo = new Array();

    this.specialFloor = 0;


    // var add = this.add;
    // var input = this.input;

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(2, 0xFFFFFF, 1);

    //this.add.text(20, 550, 'ドアを開けてすぐに外に出ろ！', fontopt);

    //base
    this.add.image(650, 300, 'panel');



    //darty code
    this.switches.push({}); // 1 is null
    this.switches.push(this.add.sprite(563, 162, 'textures', 'buttons/1/1.png'));
    this.switches.push(this.add.sprite(563, 201, 'textures', 'buttons/2/1.png'));
    this.switches.push(this.add.sprite(563, 239, 'textures', 'buttons/3/1.png'));
    this.switches.push({}); // 4 is null
    this.switches.push(this.add.sprite(563, 277, 'textures', 'buttons/5/1.png'));
    this.switches.push(this.add.sprite(563, 316, 'textures', 'buttons/6/1.png'));
    this.switches.push(this.add.sprite(563, 355, 'textures', 'buttons/7/1.png'));
    this.switches.push(this.add.sprite(563, 394, 'textures', 'buttons/8/1.png'));
    this.switches.push(this.add.sprite(563, 433, 'textures', 'buttons/9/1.png'));
    this.switches.push(this.add.sprite(563, 471, 'textures', 'buttons/10/1.png'));

    this.switches.push(this.add.sprite(612, 162, 'textures', 'buttons/11/1.png'));
    this.switches.push(this.add.sprite(612, 201, 'textures', 'buttons/12/1.png'));
    this.switches.push(this.add.sprite(612, 239, 'textures', 'buttons/13/1.png'));
    this.switches.push(this.add.sprite(612, 277, 'textures', 'buttons/14/1.png'));
    this.switches.push(this.add.sprite(612, 317, 'textures', 'buttons/15/1.png'));
    this.switches.push(this.add.sprite(612, 355, 'textures', 'buttons/16/1.png'));
    this.switches.push(this.add.sprite(612, 394, 'textures', 'buttons/17/1.png'));
    this.switches.push(this.add.sprite(612, 433, 'textures', 'buttons/18/1.png'));
    this.switches.push(this.add.sprite(612, 471, 'textures', 'buttons/19/1.png'));

    this.switches.push(this.add.sprite(663, 162, 'textures', 'buttons/20/1.png'));
    this.switches.push(this.add.sprite(663, 201, 'textures', 'buttons/21/1.png'));
    this.switches.push(this.add.sprite(663, 239, 'textures', 'buttons/22/1.png'));
    this.switches.push(this.add.sprite(663, 277, 'textures', 'buttons/23/1.png'));
    this.switches.push(this.add.sprite(663, 317, 'textures', 'buttons/24/1.png'));
    this.switches.push(this.add.sprite(663, 355, 'textures', 'buttons/25/1.png'));
    this.switches.push(this.add.sprite(663, 394, 'textures', 'buttons/26/1.png'));
    this.switches.push(this.add.sprite(663, 433, 'textures', 'buttons/27/1.png'));
    this.switches.push(this.add.sprite(663, 471, 'textures', 'buttons/28/1.png'));


    for (let i = 0; i < this.switches.length; i++) {
      if (i === 0 || i === 4) {
        continue;
      }

      var swobj = this.switches[i];
      swobj.name = i;
      var swev = 'sw' + i + 'on';
      swobj.setInteractive();

      const frameNames = this.anims.generateFrameNames('textures', { start: 1, end: 2, prefix: 'buttons/' + i + '/', suffix: '.png' });
      this.anims.create({ key: swev, frames: frameNames, frameRate: 10, repeat: 0 });
      swobj.anims.load(swev);
    }

    //next button 
    this.next = this.add.image(400, 530, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    this.input.on('gameobjectup', toggleSw, this);

    //display

    //audio
    this.clickSE = this.sound.add('click');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');
    this.evMoveBGM = this.sound.add('evmove');

    //functions
    function toggleSw(pointer, sw) {

      //console.log('pushobj:', sw.name);

      if (sw.name === 'next') {
        console.log('restart');

        delete this.switches;
        this.scene.start('game');
        return;
      }

      sw.anims.nextFrame();
      this.clickSE.play();

      this.inputNo.push(sw.name);
      console.log('totalinput', this.inputNo);

      switch (this.inputNo.length) {
        case 1: {
          //special
          if (sw.name === 14) {
            all14event_view(this);
            this.specialFloor = 14;
          } else {
            this.add.sprite(585, 75, 'textures', `evfont/${sw.name}.png`);
          }
          break;
        }
        case 2: {
          this.add.sprite(603, 75, 'textures', 'evfont/haifun.png');
          this.add.sprite(621, 75, 'textures', `evfont/${sw.name}.png`);
          break;
        }
        case 3: {
          this.add.sprite(639, 75, 'textures', 'evfont/haifun.png');
          this.add.sprite(657, 75, 'textures', `evfont/${sw.name}.png`);
          break;
        }
        case 4: {
          this.add.sprite(675, 75, 'textures', 'evfont/haifun.png');
          this.add.sprite(693, 75, 'textures', `evfont/${sw.name}.png`);
          this.evMoveBGM.play();
          break;
        }
        default: {
          //todo 6keta
          break;
        }
      }
    }

    // sound event
    this.evMoveBGM.on('complete', function (sound) {
      this.poneSE.play();
    }, this)

    this.poneSE.on('complete', (sound) => {
      this.dooropenSE.play();

      if (this.specialFloor === -1) {
        //Gameover
        this.cameras.main.fadeOut(6000, 0, 0, 0);
        this.time.delayedCall(6000, all14event_end_next, [], this);
      }
    }, this);

    this.dooropenSE.on('complete', (sound) => {
      let event = preTextEvent;
      if (this.specialFloor === 14) {
        event = all14event_text;
      }

      if (this.specialFloor !== -1) {
        this.time.delayedCall(1500, event, [], this);
      }
    }, this)

    //default event
    function preTextEvent() {
      this.add.text(80, 50, 'エレベーターを降りた\nとしあきは見た…', this.fontsys);
      this.graphics.strokeRoundedRect(80, 50, 350, 76, 2);
      this.time.delayedCall(3000, textEvent1, [], this);
    }

    function textEvent1() {
      this.add.text(40, 210, this.ev1data[this.inputNo[0]], this.fontev);
      this.time.delayedCall(3000, textEvent2, [], this);
    }

    function textEvent2() {
      this.add.text(40, 250, this.ev2data[this.inputNo[1]], this.fontev);
      this.time.delayedCall(3000, textEvent3, [], this);
    }

    function textEvent3() {
      this.add.text(40, 290, this.ev3data[this.inputNo[2]], this.fontev);
      this.time.delayedCall(3000, textEvent4, [], this);
    }

    function textEvent4() {
      this.add.text(40, 330, this.ev4data[this.inputNo[3]], this.fontev);
      this.time.delayedCall(3000, nextEvent, [], this);
    }

    function nextEvent() {
      console.log(this.ev1data[this.inputNo[0]], this.ev2data[this.inputNo[1]], this.ev3data[this.inputNo[2]], this.ev4data[this.inputNo[3]]);
      this.next.setVisible(true);
    }

    //special event
    function all14event_view(scene) {
      scene.add.sprite(585, 75, 'textures', `evfont/14.png`);
      scene.add.sprite(603, 75, 'textures', 'evfont/haifun.png');
      scene.add.sprite(621, 75, 'textures', `evfont/14.png`);
      scene.add.sprite(639, 75, 'textures', 'evfont/haifun.png');
      scene.add.sprite(657, 75, 'textures', `evfont/14.png`);
      scene.add.sprite(675, 75, 'textures', 'evfont/haifun.png');
      scene.add.sprite(693, 75, 'textures', `evfont/14.png`);

      scene.inputNo = new Array(14, 14, 14, 14);
      scene.evMoveBGM.play();
    }

    function all14event_text() {
      this.add.text(80, 70, 'としあきは\n１４に辿り着いた…', this.fontsys);
      this.graphics.strokeRoundedRect(80, 70, 350, 76, 2);
      this.time.delayedCall(6000, all14event_text2, [], this);
    }

    function all14event_text2() {
      this.add.text(40, 220, "ドン！という大きな音に驚く。", this.fontev);
      this.time.delayedCall(6000, all14event_text3, [], this);
    }

    function all14event_text3() {
      this.add.text(40, 250, "それは君が床に崩れ落ちた音だ。", this.fontevRed);
      this.time.delayedCall(6500, all14event_text4, [], this);
    }

    function all14event_text4() {
      this.add.text(40, 300, '床に血溜まりを広げ、\n痛みに悶える。', this.fontevRed);
      this.time.delayedCall(6500, all14event_text5, [], this);
    }

    function all14event_text5() {
      this.add.text(40, 400, 'だが、どこか安らぎも感じている。', this.fontsys);
      this.time.delayedCall(6000, all14event_text6, [], this);
    }

    function all14event_text6() {
      this.add.text(40, 500, 'もう怪異に悩まされることはない…', this.fontev);
      this.time.delayedCall(6000, all14event_end, [], this);
    }

    function all14event_end() {
      this.specialFloor = -1;
      this.poneSE.play();
    }

    function all14event_end_next() {
      delete this.switches;
      this.scene.start('gameover');
    }

  },

  update: function () {
    //nothing!
  }

});

var config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  //mode: Phaser.Scale.NONE,
  backgroundColor: '#000000',
  scene: [Preloader, Start, Game, GameOver]
};

var game = new Phaser.Game(config);
