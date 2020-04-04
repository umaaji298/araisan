import ShakePosition from 'phaser3-rex-plugins/plugins/shakeposition.js';
import * as util from '../util/etc';
import * as tcrp from '../util/tcrp';
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    //data
    this.ev1data = [
      ["酸を浴びた", "人型の", "蟲型の", "不定形の", "鬼畜の", "神となった", "\\G人の", "機械の", "太った", "植物の", "影のような", "小さい", "巨女の", "時を止めてくる", "スモウレスラー", "異質の", "古い書物に描かれた", "夜の", "頭が\\G個ある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"],
      ["３枚におろされた", "となりの", "ＴＳした", "ゼラチナス", "エネルギー体の", "狂気に飲まれた", "多脚の", "メスガキの", "健康的に日焼けした", "箱化した", "極限まで鍛えた", "デパートの", "奇妙な仮面を付けた", "ひどい匂いのする", "消しゴムの", "有り金を溶かした", "\\G頭身の", "あお向けに倒れた", "君の", "何かに操られた", "概念となった", "プロ野球選手の", "噛むとほろ苦い", "君を殴った", "脳を交換した", "妹の", "生まれたての", "爆発寸前の", "召喚に応じた"],
      ["毒ブレスを吐く", "音声だけの", "ケイ素生命の", "致命傷を負った", "使徒", "毛だらけの", "RTAの", "セガ信者の", "サメの", "シュレーディンガーの", "石化した", "最後の生き残りの", "ラビ化した", "外宇宙の", "盛りすぎた", "心の", "\\G英雄の", "野生を取り戻した", "発情期の", "乳房が\\G個ある", "朝\G時", "現場の", "モトラド乗りの", "世界を救った", "配信中の", "電動の", "むちむちの", "壁尻の", "にこにこした"],
      ["眼鏡の", "ゲーミング", "消えたはずの", "手乗り", "接続された", "エンペラー", "上質の", "星の", "量産型", "双子の", "フロアを支える", "玉座の", "バイトの", "家元の", "ロマンチック", "白衣の", "罪を持つ", "先輩の", "ベイッと言う", "重力を操る", "たくさん生えてる", "妊娠した", "殺人", "ＡＩ", "生き別れた", "インテリジェント", "異国の", "いつもの", "木の実の"],
    ];
    this.ev2data = [
      ["無が", "みんみが", "オオカワウソが", "ガチおじが", "死が", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンギツネが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "お稲荷様が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"],
      ["壁が", "裸フレンズが", "ケルピーが", "偽イさんが", "図書館が", "クラウケンが", "異形が", "古狩人が", "ジャンレノが", "宇宙人が", "ボンドルド卿が", "霊体が", "両親が", "壁の絵が", "キタキツネが", "警察が", "ホオジロザメが", "狐ババアが", "ショタが", "ピザ屋が", "狂犬フレンズが", "ワシさんが", "「あけて」君が", "死体が", "\\G人ミサキが", "光が", "闇が", "悪鬼が", "機械が"],
      ["サーバールームが", "エレベーターガールが", "妖精みんみが", "エリクサーが", "イクラが", "トルソーが", "尿ボトルが", "尻目が", "ボスが", "家具が", "エガちゃんが", "ジャガーさんが", "オナガザメが", "メリヰさんが", "エンジニアが", "ソフトクリームが", "ハカセが", "助手が", "スナドリネコが", "メカオオカワウソが", "大学生が", "軍人が", "隣人が", "宅配人が", "マンション住人が", "全員が", "スマフォが", "ゾンビが", "旧神が"],
      ["武器が", "アーティファクトが", "シュモクザメが", "君が", "マンションが", "カナリアが", "\\G本の触手が", "魚人が", "モブ―バルが", "まいごが", "ジジイが", "浮浪者が", "アイドルが", "壁の落書きが", "天使が", "エージェントが", "かばんが", "ささやき声が", "リザードマンが", "ケイ素生命体が", "尻穴が", "スイカが", "マタンゴが", "クリーチャーが", "獣人が", "過去の記憶が", "人々が", "ピエロが", "マンション管理人が"],
    ];
    this.ev3data = [
      ["正々堂々と", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "ちょっとアホになって", "天井に張り付きながら", "高速で走りながら", "楽しげに踊りながら", "君を見つめながら", "夢中で何かを食べながら", "気安く話しかけながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"],
      ["密室殺人の謎が解けた！と宣言し", "催眠アプリを急に使って", "探索に恐怖を感じ、足がすくんで", "むちゃくちゃ若返って", "最近景気悪くてね…と胸を押し付けて", "急激に老けて", "暗く君の死を予言して", "廃墟から窺うようにして", "大草原でうたた寝をしながら", "ぼーっと無反応な様子で", "ご神体に祈りを捧げながら", "\\Gもの魔法陣を展開して", "燃やせるごみを出しながら", "早口で君を罵倒しながら", "敵の大群を押し留めながら", "いやらしく何かを察した様子で", "マンションの清掃をしながら", "音もなく死角に潜んで", "一心不乱に何かを製造しながら", "星々が輝く屋上で", "取引を持ちかけてきて", "尊大な態度で君を挑発して", "岩の上からつまらなさそうにして", "もう間に合わないと君に覆いかぶさり", "まもなく応援が来ると断言して", "疲れた顔でもう何もないと言い", "秘密があるんだと耳打ちして", "怒りで我を忘れて", "決戦への士気を高揚させて"],
      ["小耳に挟んだんだけど、と深刻そうに", "めでたい祝いの席にて", "3点倒立キメながら", "青空に落ち続けながら", "むりやり弁当を押し付けてきて", "尿道を散歩しながら", "居留守をかまして", "デーモン・コアをいじりつつ", "ゆかいに狩りを行いながら", "コンビニのバイト中に", "面白すぎる映画館にて", "優雅に魔導書をひもといて", "受肉して", "食べないでくださいと哀願して", "あつあつのおでんを差し向けて", "こうもんであそびながら", "青白いカレーを取り分けながら", "暴力で全てを解決しながら", "最後の一人になるまで生き延びて", "貴重品をどんぐりに変換しながら", "お先に失礼と背を向けながら", "プランクがキツイと弱音を吐いて", "マンションを増築しながら", "勇者らしく堂々とした態度で", "たのむ見逃してくれと卑屈そうに", "裏切られ生贄に捧げられながら", "必殺の構えをとり、今まさに", "中の人をまろび出して", "落とし前をつけろと激怒しながら"],
      ["あんまりすごくないね…と落胆しながら", "君と怪異を合成させて", "波動を感じると闇を睨んで", "アクロバットにユンボを操作して", "むきになり君をポカポカとぶって", "自覚がないだけさと君に触れて", "壁をへだてた向こうで", "「よしっ！合体だ」と君に飛びかかり", "恐怖で幼児退行しながら", "イキって死亡フラグを立てながら", "マンションパレードの日に", "\\Cとの戦闘中に", "もう分かんないよと錯乱し", "真の武士道をその武威で体現し", "緊張で汗をだらだら流しながら", "フロアでぺちゃんこ！でも、", "上階からロープを垂らして", "みんなから怒られて、謝罪代わりに", "君を何度も何度も刺しながら", "約束を果たして粒子になりながら", "貴方の子よと赤子を見せて", "幸運にも危険から逃れて", "正しい呪文で扉をひらいて", "\\Cと肩を組んで仲良く", "はっぴーになろうとフロアへ引き込み", "実践はこんなもんじゃないぞと指導し", "禁じられたルールを破り、今こそ", "古代の巨大ロボに乗り込みながら", "わからせ棒をぴたぴたと君に当てて"],
    ];
    this.ev4data = [
      ["裏切った。", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "喜んだ。", "君の落とし物を届けてくれた。", "手打ちうどんをごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "\\Cから君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と\\G年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を\\G本毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"],
      ["罠にハマった。", "君の金を\\G円奪った。", "君を無理に強化した。", "君をエレベーターに帰した。", "分け前をくれた。", "大爆発した。", "ついに負けを認めた。", "勝利を分かち合った。", "君を仲間に加えた。", "信じられないものを出した。", "君のこたつでくつろいだ。", "君を\\Cに売り払った。", "君とエレベーターに乗り込んだ。", "あの情報を教えてくれた。", "毒を散布した。", "作りすぎた肉じゃがをくれた。", "君を罠にはめた。", "君を母にした。", "君を操った。", "君と楽しく飲んだ。", "眠ってしまった…", "\\Cを産み出した。", "壁に大穴を開けた！", "創作物を見せてきた。", "怪異を打ち払った。", "大声で敵を呼び寄せた！", "真の姿になった。", "ある部位から光線を発した。", "もじもじしていた。"],
      ["点呼した。", "人体発火した！", "個性を獲得した。", "孤独死した…", "探索の準備をした。", "塵となって消えた…", "二度寝した。", "畑の手入れをした。", "\\Cの命を奪った。", "次に遊ぶ日の約束をした。", "灰から復活した！", "脳だけになった。", "君だけの剣になった。", "\\Cの真実を悟った。", "自己紹介をした。", "未来を切り開いた。", "爆撃を開始した。", "死の予言を回避した。", "君を閉所にしまった。", "遭難した。", "青春時代を過ごした。", "仕事の効率を改善した。", "悲しく歌っていた。", "盛大に嘔吐した。", "何もかも諦めた。", "君の無事を祈った。", "記念写真を撮った。", "軍隊での経験を生かした。", "君を\\Gメートル吹き飛ばした。"],
      ["動けなくなった。", "第\\Gのチャクラを開いた。", "うろたえた。", "君と見事な風景を楽しんだ。", "君に病気をうつした…。", "君の身支度を整えた。", "脱皮した。", "\\Cを蹴散らした。", "食事をした。", "探索を開始した。", "君と夜店を回った。", "致命傷を負った。", "大事なデータを消した。", "通販でむちゃくちゃ散財した。", "アヘ顔でぴーすした。", "たからものを見つけた。", "君を救出した。", "NTRした。", "君に謝罪した。", "ボールに戻った。", "必要な書類を出した。", "あるべき状態に変化した。", "フロアの仕掛けを動かした。", "トラップにかかった！", "血を吐いた。", "焚き火でひといきついた。", "ボトルシップを作った。", "君の命令を遂行した。", "君を罰した。"],
    ];

    //events.jsonよりイベント呼び出し
    let mainArray = this.cache.json.get('events');
    let diffArray = this.cache.json.get('events_diff');
    this.spEvents = new Map(diffArray.concat(mainArray));
    this.spEventKeys = Array.from(this.spEvents.keys());

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "８", "１０", "７７", "３", "７", "０．１", "１", "１００", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１", "５０００兆", "８"];

  }

  create() {
    console.log('%c game ', 'background: green; color: white; display: block;');
    //console.log(this);
    this.cameras.main.fadeIn(2000, 0, 0, 0);

    this.switches = new Array(); // normal sw
    this.inputNo = new Array(); // 階表示用データ
    this.rswitches = new Array(); // rotary sw
    this.evDisplay = new Array();

    //panel
    this.add.image(660, 300, 'panel');

    //timeoutBar
    setupTimeoutBar(this);

    //normal sw
    setupSwitches(this);

    //rotary sw
    setupRotarySw(this);

    // display arrow
    this.arraw1 = this.add.image(731, 58, 'arraw');
    this.arraw2 = this.add.image(731, 88, 'arraw');
    setArraw(this);

    //gauge
    setupGauge(this);

    //menu
    this.menu = this.add.image(40, 550, 'menu');
    this.menu.name = "menu";
    this.menu.setInteractive();
    menuSetup(this, 3000);

    //Objectの反応をONにする
    this.input.on('gameobjectup', panelFeedBack, this);

    //audio
    this.clickSE = this.sound.add('click');
    this.rswSE = this.sound.add('rsw');
    this.gaugeSE = this.sound.add('gauge');
    this.menuSE = this.sound.add('menuse');
    this.menuSE.setVolume(0.4);

    this.evMoveBGM = this.sound.add('evmove');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen');

    /**
     * Scene events
     */
    //restart scene : イベントの再登録なし
    this.events.on('restert', () => {
      console.log('call restert');

      this.inputNo = new Array();

      //sw off表示
      this.switches.forEach(sw => {
        if (sw.hasOwnProperty('anims')) {
          sw.anims.previousFrame();
        }
      });
      //display表示消去
      this.evDisplay.forEach(disp => {
        disp.destroy();
      });

      //evImage消去
      if (this.hasOwnProperty('evImage')) {
        this.evImage.destroy();
        this.textures.remove('evImage');
        this.light_l.destroy();
        this.light_r.destroy();
        this.flashGraphics.destroy();
      }

      //locksw解除
      unlockSwitches(this);
      //menu再表示
      menuSetup(this, 300);
    }, this);

    //Gameover event
    this.events.once('toGameOver', () => {
      console.log('call togameover');
      destructor_game(this);
      this.scene.start('gameover');
    }, this);

    //自動入力
    this.events.on('autoFloor', (id) => {
      // console.log('autofloor call', id);
      if (this.inputNo.length > 0) {
        //自動入力できない
        this.menuSE.play();
      } else {
        autoEvent_view(this, id);
      }
    })

    //背景画像隠す
    this.events.on('hideImage', () => {
      if (this.hasOwnProperty('evImage')) {
        this.evImage.setVisible(false);
      }
    });

    //背景画像再表示
    this.events.on('showImage', () => {
      if (this.hasOwnProperty('evImage')) {
        this.evImage.setVisible(true);
      }
    });

    //create end
    // destructor_game(this);
  }
}

/**
 * UI FeedBack
 */
function panelFeedBack(pointer, obj) {

  switch (obj.name) {
    case 'menu': {
      this.menuSE.play();

      this.menu.setVisible(false);
      const menuItems = getMenuItems(6, this); // 表示用に６個取得する
      this.scene.launch('menu', { menuItems });
      break;
    }
    case 'gauge': {
      const gauge = obj; // rename

      if (gauge.isLocked) {
        if (!obj.shake.isRunning) obj.shake.shake();
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
        if (!obj.shake.isRunning) obj.shake.shake();
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
            rsw.rotation = util.getAngleFromStep(rsw.step);
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
          } else {
            this.evDisplay.push(this.add.sprite(595, 75, 'textures', `evfont/${sw.no}.png`));
            timeOutBarStart(this);
          }
          break;
        }
        case 2: {
          this.evDisplay.push(this.add.sprite(613, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(631, 75, 'textures', `evfont/${sw.no}.png`));
          timeOutBarStart(this);
          break;
        }
        case 3: {
          this.evDisplay.push(this.add.sprite(649, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(667, 75, 'textures', `evfont/${sw.no}.png`));
          timeOutBarStart(this);
          break;
        }
        case 4: {
          this.evDisplay.push(this.add.sprite(685, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(703, 75, 'textures', `evfont/${sw.no}.png`));
          lockSwitches(this);
          setupTimeoutBarFast(this);

          break;
        }
        default: {
          timeOutBarStart(this);
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

function setupTimeoutBar(scene) {
  scene.timeoutBar = scene.add.graphics();
  scene.timeoutBar.fillStyle(0xFFFFFF, 0.6);
  scene.timeoutBar.fillRect(578, 98, 138, 4);
  scene.timeoutBarTween = scene.tweens.addCounter({
    from: 1.0,
    to: 0.0,
    duration: 4000,
    onUpdate: function (tween, targets) {
      scene.timeoutBar.clear();
      scene.timeoutBar.fillStyle(0xFFFFFF, 0.6);
      scene.timeoutBar.fillRect(578, 98, 138 * tween.getValue(), 4);
    },
    onComplete: function (tween, targets, param) {
      //イベント開始の起点
      startFloorEvent(scene);
    }
  });
  scene.timeoutBarTween.stop();
}

function setupTimeoutBarFast(scene) {
  scene.timeoutBarTween.remove();
  scene.timeoutBarTween = scene.tweens.addCounter({
    from: 1.0,
    to: 0.0,
    duration: 2000,
    onUpdate: function (tween, targets) {
      scene.timeoutBar.clear();
      scene.timeoutBar.fillStyle(0xFFFFFF, 0.6);
      scene.timeoutBar.fillRect(578, 98, 138 * tween.getValue(), 4);
    },
    onComplete: function (tween, targets, param) {
      //イベント開始の起点
      startFloorEvent(scene);
    }
  });
}

function timeOutBarStart(scene) {
  scene.timeoutBarTween.restart();
}

function setupSwitches(scene) {
  const switches = scene.switches;

  // this is darty code
  switches.push({}); // 1 is null
  // this.switches.push(this.add.sprite(563, 162, 'textures', 'buttons/1/1.png'));
  switches.push(scene.add.sprite(573, 162, 'textures', 'buttons/1/1.png'));
  switches.push(scene.add.sprite(573, 201, 'textures', 'buttons/2/1.png'));
  switches.push(scene.add.sprite(573, 239, 'textures', 'buttons/3/1.png'));
  switches.push({}); // 4 is null
  switches.push(scene.add.sprite(573, 277, 'textures', 'buttons/5/1.png'));
  switches.push(scene.add.sprite(573, 316, 'textures', 'buttons/6/1.png'));
  switches.push(scene.add.sprite(573, 355, 'textures', 'buttons/7/1.png'));
  switches.push(scene.add.sprite(573, 394, 'textures', 'buttons/8/1.png'));
  switches.push(scene.add.sprite(573, 433, 'textures', 'buttons/9/1.png'));
  switches.push(scene.add.sprite(573, 471, 'textures', 'buttons/10/1.png'));

  switches.push(scene.add.sprite(622, 162, 'textures', 'buttons/11/1.png'));
  switches.push(scene.add.sprite(622, 201, 'textures', 'buttons/12/1.png'));
  switches.push(scene.add.sprite(622, 239, 'textures', 'buttons/13/1.png'));
  switches.push(scene.add.sprite(622, 277, 'textures', 'buttons/14/1.png'));
  switches.push(scene.add.sprite(622, 317, 'textures', 'buttons/15/1.png'));
  switches.push(scene.add.sprite(622, 355, 'textures', 'buttons/16/1.png'));
  switches.push(scene.add.sprite(622, 394, 'textures', 'buttons/17/1.png'));
  switches.push(scene.add.sprite(622, 433, 'textures', 'buttons/18/1.png'));
  switches.push(scene.add.sprite(622, 471, 'textures', 'buttons/19/1.png'));

  switches.push(scene.add.sprite(673, 162, 'textures', 'buttons/20/1.png'));
  switches.push(scene.add.sprite(673, 201, 'textures', 'buttons/21/1.png'));
  switches.push(scene.add.sprite(673, 239, 'textures', 'buttons/22/1.png'));
  switches.push(scene.add.sprite(673, 277, 'textures', 'buttons/23/1.png'));
  switches.push(scene.add.sprite(673, 317, 'textures', 'buttons/24/1.png'));
  switches.push(scene.add.sprite(673, 355, 'textures', 'buttons/25/1.png'));
  switches.push(scene.add.sprite(673, 394, 'textures', 'buttons/26/1.png'));
  switches.push(scene.add.sprite(673, 433, 'textures', 'buttons/27/1.png'));
  switches.push(scene.add.sprite(673, 471, 'textures', 'buttons/28/1.png'));

  for (let i = 0; i < switches.length; i++) {
    if (i === 0 || i === 4) {
      continue;
    }

    const swobj = switches[i];
    swobj.name = 'sw';
    swobj.no = i;
    swobj.evname = 'sw' + i + 'on'
    swobj.setInteractive();

    const frameNames = scene.anims.generateFrameNames('textures', { start: 1, end: 2, prefix: 'buttons/' + i + '/', suffix: '.png' });
    scene.anims.create({ key: swobj.evname, frames: frameNames, frameRate: 10, repeat: 0 });
    swobj.anims.load(swobj.evname);
  }
}

function setupRotarySw(scene) {
  scene.rswitches.push(scene.add.sprite(731, 175, 'textures', 'rotarysw.png'));
  scene.rswitches.push(scene.add.sprite(731, 239, 'textures', 'rotarysw.png'));
  scene.rswitches.push(scene.add.sprite(731, 299, 'textures', 'rotarysw.png'));

  const rswitches = scene.rswitches;

  for (let i = 0; i < rswitches.length; i++) {
    const swobj = rswitches[i];
    swobj.name = 'rsw';
    swobj.no = i;
    swobj.isLocked = false;
    swobj.setInteractive();

    swobj.shake = new ShakePosition(swobj, {
      mode: 0,
      duration: 600,
      magnitude: 3,
      magnitudeMode: 1
    });

    if (i === 2) {
      // 3番目のrswだけ特殊
      swobj.stepMin = 3;
      swobj.stepMax = 7;
    } else {
      swobj.stepMin = 0;
      swobj.stepMax = 3;
    }
    //初期状態をランダムで決定する
    swobj.step = Phaser.Math.Between(swobj.stepMin, swobj.stepMax);

    if (swobj.step === swobj.stemMax) {
      swobj.direction = 0;
    } else {
      swobj.direction = 1;
    }

  }
  setRotarySw(scene);
}

function setupGauge(scene) {
  scene.gauge = scene.add.sprite(727, 342, 'textures', 'gauge.png');
  const gauge = scene.gauge;

  gauge.name = 'gauge';
  gauge.isLocked = false;

  gauge.stepMax = 15;
  gauge.stepMin = 0;
  gauge.step = Phaser.Math.Between(scene.gauge.stepMin, scene.gauge.stepMax);// 初期位置

  if (gauge.step === 15) {
    gauge.direction = 0; // 1 is down : 0 is up
  } else {
    gauge.direction = 1;
  }

  gauge.shake = new ShakePosition(scene.gauge, {
    mode: 0,
    duration: 600,
    magnitude: 3,
    magnitudeMode: 1
  });

  setGauge(scene);
  let gaugeHitarea = scene.gauge.setInteractive();
  gaugeHitarea.input.hitArea.setTo(0, -15, 45, 11 + 40); // original size : 45,11 : 上15 下25
  //this.input.enableDebug(this.gauge); // view hitbox
}

function setRotarySw(scene) {
  scene.rswitches.forEach(swobj => {
    swobj.rotation = util.getAngleFromStep(swobj.step);
  });
  return;
}

function setGauge(secne) {
  secne.gauge.y = getGeugeYpos(secne.gauge.step);
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
      arraw2step = 8; // 8 is disable
      arraw1step = 8;
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

  //arraw view 確定

  //dataset
  scene.arraw2.step = arraw2step;
  scene.arraw1.step = arraw1step;

  //console.log(scene.arraw2.step, scene.arraw1.step)

  if (arraw1step === 8) {
    scene.arraw1.setVisible(false);
  } else {
    scene.arraw1.setVisible(true);
    scene.arraw1.rotation = util.getAngleFromStep(arraw1step);
  }
  //arraw viwe 確定
  if (arraw2step === 8) {
    scene.arraw2.setVisible(false);
  } else {
    scene.arraw2.setVisible(true);
    scene.arraw2.rotation = util.getAngleFromStep(arraw2step);
  }

  return
}

function lockSwitches(scene) {
  scene.rswitches.forEach(obj => {
    obj.isLocked = true;
  })
  scene.gauge.isLocked = true;
}

function unlockSwitches(scene) {
  scene.rswitches.forEach(obj => {
    obj.isLocked = false;
  })
  scene.gauge.isLocked = false;
}

function getFloorData(scene) {
  let code = "";
  let inputNo = [].concat(scene.inputNo);

  //4桁未満の対応
  if (inputNo.length < 4) {
    for (let i = inputNo.length; i < 4; i++) {
      inputNo.push(0); // 0埋め
      scene.inputNo.push(Phaser.Math.Between(0,28)); // 実体には乱数設定する。
    }
  }

  //基本コード作成
  for (let i = 0; i < inputNo.length; i++) {
    const num = inputNo[i];
    const fixnum = ('00' + num).slice(-2); // 2桁合わせ
    code += fixnum;
  }

  const fixgauge = ('00' + scene.gauge.step).slice(-2);
  code = code + scene.arraw1.step + scene.arraw2.step + fixgauge;

  // console.log('floorcode-main', code);

  return {
    inputNo: scene.inputNo,
    arraws: [scene.arraw1.step, scene.arraw2.step], // reversed
    gauge: scene.gauge.step,
    code: code
  }
}

function getGeugeYpos(index) {
  //gauge step // bad system...
  const geugeYpos = [342, 351, 361, 371, 381, 390, 400, 410, 420, 430, 440, 449, 459, 469, 478, 488];
  return geugeYpos[index];
}

/** Events */
function startFloorEvent(scene) {

  //UI scene stop
  scene.menu.setVisible(false);
  const menuScene = scene.scene.get('menu');
  menuScene.events.emit('evmove');

  //ここで入力が確定する : todo overload sw input
  let floorData = getFloorData(scene)
  if (checkClose(floorData.code)) {
    // close中
    const code6 = floorData.code.slice(0, 10);
    if (code6 === "1606070204") {
      floorData.code = "999999990001"
    } else {
      floorData.code = "999999990000"
    }
    scene.commands = tcrp.toCommands(scene, floorData);
    scene.scene.launch('floorEvent', { commands: scene.commands.data });
  } else {
    //set event chain
    scene.evMoveBGM.once('complete', () => {
      scene.poneSE.play();
    });
    scene.poneSE.once('complete', () => {
      if (scene.commands.fileName != "") {
        viewEventImage(scene);
      }

      scene.dooropenSE.play();
    }, scene);
    scene.dooropenSE.once('complete', () => {
      console.log('to next scene');

      const delay = (scene.commands.fileName != "") ? 2000 : 0;
      const eventData = {
        commands: scene.commands.data,
        delay
      }

      scene.scene.launch('floorEvent', eventData);
    }, scene)

    scene.evMoveBGM.play();
    scene.commands = tcrp.toCommands(scene, floorData);
    //debug
    //const filename = "900x900.png"
    // const filename = "4388bd6d-81a6-4a28-a4ed-3dc72cb7d0c6"
    //scene.commands.fileName = filename;

    if (scene.commands.fileName != "") {
      scene.load.image('evImage', `https://firebasestorage.googleapis.com/v0/b/araisan-ms.appspot.com/o/medias%2F${scene.commands.fileName}?alt=media`);
      scene.load.start();
    }
  }
}

// event image
function viewEventImage(scene) {
  //todo this.load 'complete' check

  // 本体画像
  scene.evImage = scene.add.image(280, 310, 'evImage');
  const image = scene.evImage;

  if (image.width >= image.height) {
    if (image.width > 480) {
      // scale
      image.setScale(480 / image.width);
    }
  } else {
    if (image.height > 520) {
      // scale
      image.setScale(520 / image.height);
    }
  }
  image.setCrop(0, 0, 0, 0); // all cropped

  const centerX = Math.ceil(image.width / 2);
  const centerY = Math.ceil(image.height / 2);

  const dispX = Math.ceil(image.displayWidth / 2);
  const dispY = Math.ceil(image.displayHeight / 2);

  // //左右ライト
  scene.light_l = scene.add.tileSprite(-100, -100, 41, image.displayHeight, 'light');
  scene.light_r = scene.add.tileSprite(-100, -100, 41, image.displayHeight, 'light');

  const light_l = scene.light_l;
  const light_r = scene.light_r;
  light_r.setAngle(180);

  //フラッシュ
  let rect;
  scene.flashGraphics = scene.add.graphics();
  const flashGraphics = scene.flashGraphics;

  scene.tweens.addCounter({
    from: 1.0,
    to: 0.0,
    ease: 'Quad.easeInOut',
    duration: 3000,
    onUpdate: function (tween, targets) {

      const x = centerX * tween.getValue();
      const y = 0;
      const w = (centerX - x) * 2;
      const h = image.height;
      image.setCrop(x, y, w, h);

      // todo scale計算必要
      const scaledX = dispX * tween.getValue();
      const lineX = image.x - dispX + scaledX;
      const lineY = image.y - dispY;
      const lineX2 = image.x + dispX - scaledX;
      const scaledW = (dispX - scaledX) * 2;
      const scaledH = image.displayHeight;
      rect = new Phaser.Geom.Rectangle(lineX, lineY, scaledW, scaledH);

      light_l.x = lineX - light_l.width / 2;
      light_l.y = lineY + light_l.height / 2;

      light_r.x = lineX2 + light_r.width / 2;
      light_r.y = lineY + light_r.height / 2;
    }
  });

  scene.tweens.addCounter({
    from: 1.0,
    to: 0.0,
    ease: 'Expo.easeIn',
    duration: 3000,
    onUpdate: function (tween, targets) {
      flashGraphics.clear();
      flashGraphics.fillStyle(0xffffff, tween.getValue());
      flashGraphics.fillRectShape(rect);
      flashGraphics.setDepth(1);

      light_l.setAlpha(tween.getValue());
      light_r.setAlpha(tween.getValue());
    }
  })

}

//menu event
function autoEvent_view(scene, id) {
  lockSwitches(scene);

  const idArray = new Array();
  const idNumArray = new Array();

  //data setup
  for (let i = 0; i < id.length - 1; i += 2) {
    const id_s = id.substring(i, i + 2);
    idArray.push(id_s);
    idNumArray.push(Number(id_s));
  }

  //sw
  scene.switches[idNumArray[0]].anims.nextFrame();
  scene.switches[idNumArray[1]].anims.nextFrame();
  scene.switches[idNumArray[2]].anims.nextFrame();
  scene.switches[idNumArray[3]].anims.nextFrame();

  //display
  scene.evDisplay.push(scene.add.sprite(595, 75, 'textures', `evfont/${idNumArray[0]}.png`));
  scene.evDisplay.push(scene.add.sprite(613, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(631, 75, 'textures', `evfont/${idNumArray[1]}.png`));
  scene.evDisplay.push(scene.add.sprite(649, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(667, 75, 'textures', `evfont/${idNumArray[2]}.png`));
  scene.evDisplay.push(scene.add.sprite(685, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(703, 75, 'textures', `evfont/${idNumArray[3]}.png`));

  if (id.length > 8) {
    //rank2 : set rsw
    const rswArray = idArray[4].split('');

    let step_0 = Number(rswArray[0]);
    let step_1 = Number(rswArray[1]);

    // rsw3の設定 : rswのstep状態から逆算する
    // step1が通常0,反転1 / step0が通常0,反転2 
    const step_2_list = [3, 5, 6, 7];
    let step_2_index = 0;

    //rsw1 : rsw1が優先（パネル表示上の上）
    const step_1isRev = step_1 > 3 ? true : false;
    if (step_1isRev) {
      step_1 = step_1 - 4;
      step_2_index += 1;
    }

    //rsw0 : rsw0があと（パネル表示上の下）
    const step_0isRev = step_0 > 3 ? true : false;
    if (step_0isRev) {
      step_0 = step_0 - 4;
      step_2_index += 2;
    }

    scene.rswitches[1].step = step_0; // 表示が反転している
    scene.rswitches[0].step = step_1;
    scene.rswitches[2].step = step_2_list[step_2_index];
    setRotarySw(scene);
    setArraw(scene);
  }

  if (id.length > 10) {
    //gauge移動
    scene.gauge.step = idNumArray[5];
    setGauge(scene);
  }

  scene.inputNo = [idArray[0], idArray[1], idArray[2], idArray[3]];

  scene.rswSE.once('complete', () => {
    startFloorEvent(scene);
  })
  scene.rswSE.play();
}

//special event
function all14event_view(scene) {
  lockSwitches(scene);

  scene.evDisplay.push(scene.add.sprite(595, 75, 'textures', `evfont/14.png`));
  scene.evDisplay.push(scene.add.sprite(613, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(631, 75, 'textures', `evfont/14.png`));
  scene.evDisplay.push(scene.add.sprite(649, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(667, 75, 'textures', `evfont/14.png`));
  scene.evDisplay.push(scene.add.sprite(685, 75, 'textures', 'evfont/haifun.png'));
  scene.evDisplay.push(scene.add.sprite(703, 75, 'textures', `evfont/14.png`));

  //rsw移動
  scene.rswSE.play();
  scene.rswitches[0].step = 0;
  scene.rswitches[1].step = 0;
  scene.rswitches[2].step = 7;
  setRotarySw(scene);
  setArraw(scene);

  //gauge移動
  scene.gauge.step = 15;
  setGauge(scene);

  scene.inputNo = new Array(14, 14, 14, 14);
  startFloorEvent(scene);
}

function checkClose(code) {
  let isClosed = false;
  const code6 = code.slice(0, 10);

  const closeList = ["2424222042", "1606070204", "0202202522", "2403102024", "2807182225", "2120191004","0919260076","05081111220662"];

  closeList.forEach(num => {
    if (num === code6) {
      //closeCode = "999999990000";
      isClosed = true;
      console.log('hit', code6);
    }
  })

  return isClosed;
}

function menuSetup(scene, delay) {
  scene.menu.setAlpha(0);
  scene.menu.setVisible(true);

  scene.tweens.add({
    targets: scene.menu,
    alpha: 0.7,
    ease: 'Power1',
    duration: 1000,
    delay: delay
  });
}

function getMenuItems(count, scene) {
  let data = [];
  let selectedKeyIndex = [];

  for (let i = 0; i < count; i++) {
    let keyIndex;
    do {
      keyIndex = Phaser.Math.Between(0, scene.spEventKeys.length - 1)
    } while (selectedKeyIndex.includes(keyIndex))

    const evKey = scene.spEventKeys[keyIndex];
    const ev = scene.spEvents.get(evKey);

    //ev : event data Obj / evKey : evId
    if (ev.floorName === 'Under Maintenance' || ev.author === 'debug') {
      i--;
      continue;
    } else {
      selectedKeyIndex.push(keyIndex);
    }

    //console.log(evNo, ev);

    const text = `${ev.idString} / ${ev.floorName}`

    data.push({
      id: evKey,
      text: text,
      color: Phaser.Math.Between(0, 0xffffff)
    });
  }
  return data;
}

function destructor_game(scene) {
  scene.tweens.getAllTweens().forEach((tw) => {
    tw.destroy();
  });

  scene.inputNo = null;
  scene.evDisplay = null;

  //sw all destroy
  scene.switches.forEach((sw) => {
    if (sw.hasOwnProperty(name)) {
      sw.removeInteractive();
      sw.anims.remove();
    }
  });
  scene.switches = null;

  //sw all destroy
  scene.rswitches.forEach((rsw) => {
    rsw.removeInteractive();
    rsw.shake = null;
  });
  scene.rswitches = null;

  //gauge destory
  scene.gauge.removeInteractive();
  scene.gauge.shake = null;

  scene.input.off('gameobjectup');

  // scene.anims.destroy();

  scene.clickSE.destroy();
  scene.rswSE.destroy();
  scene.gaugeSE.destroy();
  scene.menuSE.destroy();

  scene.evMoveBGM.destroy();
  scene.poneSE.destroy();
  scene.dooropenSE.destroy();

  scene.events.off('restert');
  scene.events.off('autoFloor');
}