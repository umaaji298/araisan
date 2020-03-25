import * as util from '../util';

export default class FloorSelector extends Phaser.Scene {

  constructor() {
    super('floorSelector');
  }

  preload() {
    //data
    this.ev1data = [
      ["0", "人型の", "蟲型の", "不定形の", "4", "神となった", "\G人の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "時を止めてくる", "あなたは１４に向かった", "異質の", "古い書物に描かれた", "夜の", "頭が\G個ある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"],
      ["0", "となりの", "ＴＳした", "ゼラチナス", "4", "狂気に飲まれた", "多脚の", "メスガキの", "健康的に日焼けした", "箱化した", "極限まで鍛えた", "デパートの", "奇妙な仮面を付けた", "ひどい匂いのする", "生まれたての", "有り金を溶かした", "モデル体型の", "あお向けに倒れた", "君の", "何かに操られた", "概念となった", "プロ野球選手の", "噛むとほろ苦い", "君を殴った", "脳を交換した", "妹の", "生まれたての", "爆発寸前の", "召喚に応じた"],
      ["0","音声だけの","ケイ素生命の","致命傷を負った","4","毛だらけの","RTAの","セガ信者の","サメの","シュレーディンガーの","石化した","最後の生き残りの","ラビ化した","外宇宙の","ゲーミング","心の","\G英雄の","野生を取り戻した","発情期の","乳房が\G個ある","朝\G時","現場の","モトラド乗りの","世界を救った","配信中の","電動の","むちむちの","壁尻の","にこにこした"],
    ];
    this.ev2data = [
      ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンギツネが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "お稲荷様が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"],
      ["0", "裸フレンズが", "ケルピーが", "ニセイさんが", "4", "クラウケンが", "異形が", "古狩人が", "ジャンレノが", "宇宙人が", "ボンドルド卿が", "霊体が", "かーさばが", "壁の絵が", "キタキツネが", "警察が", "ホオジロザメが", "狐ババアが", "ショタが", "ピザ屋が", "狂犬フレンズが", "ワシさんが", "「あけて」君が", "死体が", "\G人ミサキが", "光が", "闇が", "悪鬼が", "機械が"],
      ["0","エレベーターガールが","妖精みんみが","エリクサーが","4","トルソーが","尿ボトルが","尻目が","ボスが","家具が","エガちゃんが","ジャガーさんが","オナガザメが","メリヰさんが","エンジニアが","ソフトクリームが","ハカセが","助手が","スナドリネコが","メカオオカワウソが","島が","フロアが","自宅が","パソコンが","マンション住人が","全員が","スマフォが","ゾンビが","旧神が"],
    ];
    this.ev3data = [
      ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "楽しげに踊りながら", "君を見つめながら", "夢中で何かを食べながら", "気安く話しかけながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"],
      ["0", "催眠アプリを急に使って", "貴重な秘薬をがぶ飲みして", "何も知らない幼体に変化して", "4", "震えが止まらぬ老体に変化して", "暗く君の死を予言して", "廃墟から窺うようにして", "大草原でうたた寝をしながら", "ぼーっと無反応な様子で", "ご神体に祈りを捧げながら", "\Gもの魔法陣を展開して", "燃やせるごみを出しながら", "早口で君を罵倒しながら", "敵の大群を押し留めながら", "いやらしく何かを察した様子で", "マンションの清掃をしながら", "音もなく死角に潜んで", "一心不乱に何かを製造しながら", "星々が輝く屋上で", "取引を持ちかけてきて", "尊大な態度で君を挑発して", "岩の上からつまらなさそうにして", "もう間に合わないと君に覆いかぶさり", "まもなく応援が来ると断言して", "疲れた顔でもう何もないと言い", "秘密があるんだと耳打ちして", "怒りで我を忘れて", "決戦への士気を高揚させて"],
      ["0","めでたい祝いの席にて","3点倒立キメながら","青空に落ち続けながら","4","尿道を散歩しながら","居留守をかまして","デーモン・コアをいじりつつ","ゆかいに狩りを行いながら","コンビニのバイト中に","面白すぎる映画館にて","優雅に魔導書をひもといて","受肉して","食べないでくださいと哀願して","あつあつのおでんを差し向けて","こうもんであそびながら","青白いカレーを取り分けながら","暴力で全てを解決しながら","最後の一人になるまで生き延びて","貴重品をどんぐりに変換しながら","お先に失礼と背を向けながら","プランクがキツイと弱音を吐いて","マンションを増築しながら","勇者らしく堂々とした態度で","たのむ見逃してくれと卑屈そうに","裏切られ生贄に捧げられながら","必殺の構えをとり、今まさに","中の人をまろび出して","落とし前をつけろと激怒しながら"],
    ];
    this.ev4data = [
      ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんをごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と\G年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"],
      ["0", "君の金を\G円奪った。", "君を無理に強化した。", "君をエレベーターに帰した。", "4", "大爆発した。", "ついに負けを認めた。", "互いの健闘を祈った。", "君を仲間に加えた。", "信じられないものを出した。", "君のこたつでくつろいだ。", "君を何かに売り払った。", "君とエレベーターに乗り込んだ。", "あの情報を教えてくれた。", "毒を散布した。", "作りすぎた肉じゃがをくれた。", "君を罠にはめた。", "君を母にした。", "君を操った。", "君と楽しく飲んだ。", "眠ってしまった…", "何かを産み出した。", "壁に大穴を開けた！", "創作物を見せてきた。", "怪異を打ち払った。", "大声で敵を呼び寄せた！", "真の姿になった。", "ある部位から光線を発した。", "もじもじしていた。"],
      ["0","人体発火した！","個性を獲得した。","孤独死した…","4","塵となって消えた…","二度寝した。","畑の手入れをした。","何者かの命を奪った。","次に遊ぶ日の約束をした。","灰から復活した！","脳だけになった。","君だけの剣になった。","\Gの真実を悟った。","自己紹介をした。","未来を切り開いた。","爆撃を開始した。","死の予言を回避した。","君をしまった。","遭難した。","青春時代を過ごした。","仕事の効率を改善した。","悲しく歌っていた。","盛大に嘔吐した。","何もかも諦めた。","君の無事を祈った。","記念写真を撮った。","軍隊での経験を生かした。","君を\Gm吹き飛ばした。"],
    ];

    //events.jsonよりイベント呼び出し
    let mainArray = this.cache.json.get('events');
    let diffArray = this.cache.json.get('events_diff');

    this.spEvents = new Map(diffArray.concat(mainArray));

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "７", "５", "７７", "３", "１０", "０．１", "１", "千万", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１","５０００兆"];
  }

  create(data) {
    console.log('%c floorSelector ', 'background: green; color: white; display: block;');
    console.log('floordata', data);

    const evKey = (data.arraws[0] % 2).toString() + data.arraws[1];
    const gauge = data.gauge;
    const floorRand = getFloorRand(data.arraws[0], data.arraws[1], gauge);

    const checkedCode = checkEvent(data.code, this)

    if (checkedCode) {

      //イベントデコード : todo コスト重いか…！
      // todo 制御文字の構文解析はここでやる感じ
      const event = this.spEvents.get(checkedCode);

      //\Gの置き換え
      // todo : 制御子の統一的な処理
      const index = Math.floor((Number(floorRand) % this.numTag.length));
      const fixevent = event.text.replace(/\\G/g, this.numTag[index])

      const commands_raw = util.scriptsToEvents(fixevent, checkedCode);
      const commands = spCommandsFix(commands_raw, checkedCode);

      this.scene.start('floorEvent', { commands });
    } else {
      //normal event
      const select = floorRand.split('');

      const texts = new Array();
      texts.push(this.ev1data[select[0]][data.inputNo[0]]);
      texts.push(this.ev2data[select[1]][data.inputNo[1]]);
      texts.push(this.ev3data[select[2]][data.inputNo[2]]);
      texts.push(this.ev4data[select[3]][data.inputNo[3]]);

      const textsFix = new Array();

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const index = Math.floor((Number(floorRand) + i) % this.numTag.length);
        textsFix.push(text.replace(/\G/g, this.numTag[index]));
      }

      //create TCRP commands

      // const commands = [
      //   ['// ??'],               // [NaN, ...] -> ignored
      //   [0, 'print', 'hello'],        // [dt, fnName, param0, param1, ...]
      //   [1000, ['print', 'world']],   // [dt, [fnName, param0, param1, ...]]
      //   [3000, [                      // [dt, [command0, command1, ...]]
      //       ['print', '--'],
      //       ['print', 'phaser3'],
      //   ]]
      // ];

      //todo use : data.arraws[0] , data.arraws[1] , data.gauge??
      const commands = [
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 257, 77, 20, 10],
        [3000, 'text', textsFix[0], 40, 172],
        [3000, 'text', textsFix[1], 40, 212],
        [3000, 'text', textsFix[2], 40, 252],
        [3000, 'text', textsFix[3], 40, 292],
        [3000, 'next'],
      ];

      this.scene.start('floorEvent', { commands });
    }
  }
}

function checkEvent(code, scene) {
  let resultCode = 0 // No.0 is normal event

  const code4 = code.slice(0, 8);
  const code6 = code.slice(0, 10);

  //console.log(code, code4, code6);
  //console.log(scene.spEvents);

  //todo なんかうまい方法ないのか
  if (scene.spEvents.has(code)) {
    resultCode = code;
  } else if (scene.spEvents.has(code6)) {
    resultCode = code6;
  } else if (scene.spEvents.has(code4)) {
    resultCode = code4;
  }

  return resultCode;
}

function spCommandsFix(commands, id) {
  if (id === '14141414') {
    const _commands = commands.slice(0, -1);
    return _commands.concat([[5000, "poneSE"], [1000, [["dooropenSE"], ["fadeOut", 6000]]], [6000, "toGameOver"]]);
  } else if (id === '999999990000') {
    return commands.slice(1);
  }
  else if (id === '999999990001') {
    return commands.slice(1);
  }

  return commands;
}

function getFloorRand(arrow1, arrow2, gauge) {

  if(arrow1 === 8 || arrow2 === 8){
    //特殊対応
    return '0000';
  }

  //max 80 - 0 : min 80 - 78 = 2
  const base = parseInt((arrow1 * 10 + arrow2), 8) + gauge;
  const reverse = 80 - base;
  return ('0000' + reverse.toString(3)).slice(-4);
}