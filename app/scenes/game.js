
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
    window.GAME = this; // what?
  }

  preload() {
    //data
    this.ev1data = ["0", "人型の", "蟲型の", "不定形の", "4", "半透明の", "複数の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "花にまみれた", "あなたは１４に向かった", "異質の", "光に包まれた", "夜の", "頭が２つある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"];
    this.ev2data = ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンキタが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "のじゃ巫女が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"];
    this.ev3data = ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "踊りながら", "君を見つめながら", "何かを食べながら", "ウインクしながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"];
    this.ev4data = ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんを\nごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と１０年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"];

    //font
    this.fontopt = { fontSize: '16px', color: '#fff', backgroundColor: '#f00', padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsys = { fontSize: '30px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontsysSmall = { fontSize: '16px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontev = { fontSize: '30px', color: '#fff', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
    this.fontevRed = { fontSize: '30px', color: '#f00', maxLines: 4, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };

    //angle // is this utils?
    this.angles = [0, 0.785, 1.570, 2.356, 3.141, -2.35, -1.57, -0.78]; // see https://phaser.io/examples/v3/view/game-objects/sprites/sprite-rotation

    //gauge step // bad system...
    this.geugeYpos = [342, 351, 361, 371, 381, 390, 400, 410, 420, 430, 440, 449, 459, 469, 478, 488];
  }

  create() {

    if (!this.retry) {
      //リトライ時はフェードしない
      this.cameras.main.fadeIn(2000, 0, 0, 0);
    }

    this.switches = new Array();
    this.inputNo = new Array(); // 階表示用データ

    this.rswitches = new Array(); // rotary sw
    //this.viewRotarySw = [0, 0]; // 表示用データ : arraw1.step から取得する

    this.specialFloor = 0;

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
      swobj.name = 'sw';
      swobj.no = i;
      var evname = 'sw' + i + 'on'
      swobj.setInteractive();

      const frameNames = this.anims.generateFrameNames('textures', { start: 1, end: 2, prefix: 'buttons/' + i + '/', suffix: '.png' });
      this.anims.create({ key: evname, frames: frameNames, frameRate: 10, repeat: 0 });
      swobj.anims.load(evname);
    }

    // //rotary sw
    this.rswitches.push(this.add.sprite(721, 175, 'textures', 'rotarysw.png'));
    this.rswitches.push(this.add.sprite(721, 239, 'textures', 'rotarysw.png'));
    this.rswitches.push(this.add.sprite(721, 299, 'textures', 'rotarysw.png'));

    for (let i = 0; i < this.rswitches.length; i++) {
      var swobj = this.rswitches[i];
      swobj.name = 'rsw';
      swobj.no = i;
      swobj.isLocked = false;
      swobj.direction = 1;
      swobj.setInteractive();

      //初期配置
      if (i === 0) {
        swobj.step = 2;
        swobj.stepMax = 3;
        swobj.stepMin = 0;
      }
      else if (i === 1) {
        swobj.step = 1;
        swobj.stepMax = 3;
        swobj.stepMin = 0;
      }
      else if (i === 2) {
        swobj.step = 5;
        swobj.stepMax = 7;
        swobj.stepMin = 3;
      }

      swobj.rotation = this.angles[swobj.step];
    }

    // display arrow
    this.arraw1 = this.add.image(721, 58, 'arraw');
    this.arraw2 = this.add.image(721, 88, 'arraw');
    setArraw(this);

    //gauge
    this.gauge = this.add.sprite(717, 342, 'textures', 'gauge.png');
    this.gauge.name = 'gauge';
    this.gauge.isLocked = false;
    this.gauge.direction = 1; // 1 is down : 0 is up
    this.gauge.step = 3; // 初期位置
    setGauge(this);
    let gaugeHitarea = this.gauge.setInteractive();
    gaugeHitarea.input.hitArea.setTo(0, -15, 45, 11 + 40); // original size : 45,11 : 上15 下25
    //this.input.enableDebug(this.gauge);

    //next button 
    this.next = this.add.image(400, 530, 'next');
    this.next.setScale(0.8, 0.8);
    this.next.name = "next";
    this.next.setInteractive();
    this.next.setVisible(false);

    this.input.on('gameobjectup', panelFeedBack, this);

    //display

    //audio
    this.clickSE = this.sound.add('click');
    this.rswSE = this.sound.add('rsw');
    this.gaugeSE = this.sound.add('gauge');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');
    this.evMoveBGM = this.sound.add('evmove');

    /**
     * UI FeedBack
     */
    function panelFeedBack(pointer, obj) {

      switch (obj.name) {
        case 'next': {
          console.log('restart');
          this.retry = true;
          delete this.switches;
          this.scene.start('game');
          break;
        }
        case 'gauge': {
          const gauge = obj; // rename

          if (gauge.isLocked) {
            var shake = this.plugins.get('rexShakePosition').add(obj, {
              mode: 0,
              duration: 600,
              magnitude: 3,
              magnitudeMode: 1
            });
            shake.shake();

            break;
          }

          let step = gauge.step;
          let direction = gauge.direction;

          this.gaugeSE.play();

          if (direction === 1) {
            if (step + 1 > 15) {
              step = 14;
              direction = 0;
            } else {
              step += 1;
            }
          } else {
            if (step - 1 < 0) {
              step = 1;
              direction = 1;
            } else {
              step -= 1;
            }
          }

          gauge.step = step;
          gauge.direction = direction;

          setGauge(this);

          break;
        }
        case 'rsw': {
          const rsw = obj; // rename

          //ロック中
          if (rsw.isLocked) {
            var shake = this.plugins.get('rexShakePosition').add(obj, {
              mode: 0,
              duration: 600,
              magnitude: 3,
              magnitudeMode: 1
            });
            shake.shake();
            break;
          }

          this.rswSE.play();

          switch (rsw.no) {
            case 0: //fall through
            case 1:
            case 2:
              {
                //caution　rsw0 is arraw2 : はみ出るが仕様
                if (rsw.direction === 1) {
                  if (rsw.step + 1 > rsw.stepMax) {
                    rsw.step = rsw.stepMax - 1;
                    rsw.direction = 0; // 方向切替
                  } else {
                    rsw.step += 1;
                  }
                } else if (rsw.direction === 0) {
                  if (rsw.step - 1 < rsw.stepMin) {
                    rsw.step = rsw.stepMin + 1;
                    rsw.direction = 1; //方向切替
                  } else {
                    rsw.step -= 1;
                  }
                }
                rsw.rotation = this.angles[rsw.step];
                break;
              }
            default: {
              console.log('unknown rsw');
              break;
            }
          }

          setArraw(this);
          break;
        }
        case 'sw': {
          const sw = obj;//rename
          sw.anims.nextFrame();
          this.clickSE.play();

          this.inputNo.push(sw.no);
          console.log('totalinput', this.inputNo);

          switch (this.inputNo.length) {
            case 1: {
              //special
              if (sw.no === 14) {
                all14event_view(this);
                this.specialFloor = 14;
              } else {
                this.add.sprite(585, 75, 'textures', `evfont/${sw.no}.png`);
              }
              break;
            }
            case 2: {
              this.add.sprite(603, 75, 'textures', 'evfont/haifun.png');
              this.add.sprite(621, 75, 'textures', `evfont/${sw.no}.png`);
              break;
            }
            case 3: {
              this.add.sprite(639, 75, 'textures', 'evfont/haifun.png');
              this.add.sprite(657, 75, 'textures', `evfont/${sw.no}.png`);
              break;
            }
            case 4: {
              this.add.sprite(675, 75, 'textures', 'evfont/haifun.png');
              this.add.sprite(693, 75, 'textures', `evfont/${sw.no}.png`);
              lockSwitches(this);
              this.evMoveBGM.play();
              break;
            }
            default: {
              //todo 6keta
              break;
            }
          }
          break;
        }
        default: {
          console.error('unknown sw pushed!', obj);
        }
      }
    }

    function setGauge(secne) {
      //表示修正
      secne.gauge.y = secne.geugeYpos[secne.gauge.step];

      //console.log(secne.gauge.y, secne.gauge.step)
    }

    function setArraw(scene) {
      let arraw2step;
      let arraw1step;

      //rsw3状態を取得して、表示状態を補正
      const rswf = scene.rswitches[2];
      switch (rswf.step) {
        case 1:
        case 2:
        case 4: {
          //no arraw view
          arraw2step = -1;
          arraw1step = -1;
          break;
        }
        case 5: {
          arraw2step = scene.rswitches[0].step + 4;
          arraw1step = scene.rswitches[1].step;
          break;
        }
        case 6: {
          arraw2step = scene.rswitches[0].step;
          arraw1step = scene.rswitches[1].step + 4;
          break;
        }
        case 7: {
          arraw2step = scene.rswitches[0].step + 4;
          arraw1step = scene.rswitches[1].step + 4;
          break;
        }
        case 0:
        case 3:
        default:
          {
            arraw2step = scene.rswitches[0].step;
            arraw1step = scene.rswitches[1].step;
            break;
          }
      }

      //arraw viwe 確定

      //dataset
      scene.arraw2.step = arraw2step;
      scene.arraw1.step = arraw1step;

      //console.log(scene.arraw2.step, scene.arraw1.step)

      if (arraw1step === -1) {
        scene.arraw1.setVisible(false);
      } else {
        scene.arraw1.setVisible(true);
        scene.arraw1.rotation = scene.angles[arraw1step];
      }
      //arraw viwe 確定
      if (arraw2step === -1) {
        scene.arraw2.setVisible(false);
      } else {
        scene.arraw2.setVisible(true);
        scene.arraw2.rotation = scene.angles[arraw2step];
      }

      return
    }

    function lockSwitches(scene) {
      scene.rswitches.forEach(obj => {
        obj.isLocked = true;
      })

      scene.gauge.isLocked = true;
    }
    /**
     * EVENT 
     */

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
  }

  update() {
    //nothing
  }
}