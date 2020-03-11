export default class FloorSelector extends Phaser.Scene {

  constructor() {
    super('floorSelector');
  }

  preload() {
    //data
    this.ev1data = ["0", "人型の", "蟲型の", "不定形の", "4", "半透明の", "複数の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "花にまみれた", "あなたは１４に向かった", "異質の", "光に包まれた", "夜の", "頭が２つある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"];
    this.ev2data = ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンキタが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "のじゃ巫女が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"];
    this.ev3data = ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "踊りながら", "君を見つめながら", "何かを食べながら", "ウインクしながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベータを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"];
    this.ev4data = ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんを\nごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と１０年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"];

    this.spEeventsMapfull = new Map([
      ["230113241603", 1],// アライさん家
      ["070925212210", 2], //エントランス : 壁の指示
      ["070925212410", 3], //エントランス : フェネック
      ["251428191703", 4], //ネズミボトル
      ["251428191603", 5], //ネズミボトル : fix
    ])

    this.spEventsMap6 = new Map([
      ["2205222004", 100], // diner
      ["2816102313", 101], // parking
      ["2625072372", 102], // おじぞうさま ←SPEAK ENGLISH!!
      // ["2424222042", 103], // HOSPITAL
      // ["1606070204", 104], // CHURCH
      // ["0202202522", 105], // BASEMENT
      // ["2403102024", 106], // UPSIDE DOWN
      ["0906250373", 107], // みんみ ←What's???
      //["2807182225", 108], // SAFE
      //["2120191004", 109], // "NOT"SAFE
    ])

    this.spEventsMap4 = new Map([
      ["14141414", 200],// go to hell
      ["23011320", 201], // ハンバーグ
      ["19102809", 202], // 仮眠室
      ["02220508", 203], // 目目目(TVShow)
    ])
  }

  create(data) {
    console.log('%c floorSelector ', 'background: green; color: white; display: block;');
    console.log('floordata', data);

    const specialNo = checkSpecial(data.code, this)
    if (specialNo) {
      doSpecialEvent(specialNo, this, data);
    } else {
      //normal event

      let text1 = this.ev1data[data.inputNo[0]];
      let text2 = this.ev2data[data.inputNo[1]];
      let text3 = this.ev3data[data.inputNo[2]];
      let text4 = this.ev4data[data.inputNo[3]];

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
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [3000, 'text', text4, 40, 330],
        [3000, 'next'],
      ];

      this.scene.start('floorEvent', { commands });
    }
  }
}

function checkSpecial(code, scene) {
  let specialNo = 0; // No.0 is normal event
  const code4 = code.slice(0, 8);
  const code6 = code.slice(0, 10);


  if (scene.spEeventsMapfull.has(code)) {
    specialNo = scene.spEeventsMapfull.get(code);
  }
  else if (scene.spEventsMap6.has(code6)) {
    specialNo = scene.spEventsMap6.get(code6);
  }
  else if (scene.spEventsMap4.has(code4)) {
    specialNo = scene.spEventsMap4.get(code4);
  }

  return specialNo;
}

function doSpecialEvent(specialNo, scene, data) {
  let text1, text2, text3, text4, text5, text6, text7;
  let commands;

  switch (specialNo) {
    case 1:
      text1 = 'アライさんの家があるフロアだ。';
      text2 = '「ん？誰か降りたのだ？」';
      text3 = '「アライさーんご飯できたよ～」';
      text4 = '「あけて…あけて…」';
      text5 = '…ヨシ。';
      text6 = 'アライさん達の無事を確認した君は、\n次の階へと向かう。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [3000, 'text', text4, 40, 330],
        [5000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 400],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 2:
      text1 = 'ここはエントランスだ！';
      text2 = '昼過ぎの陽光が、\n柔らかな光でフロアを照らしている。';
      text3 = '買い物帰りのラフな姿のフレンズ。';
      text4 = '新聞を読む髭面の探索者。';
      text5 = '掲示板に張り紙をしている青年。';
      text6 = '君も一息入れたくなる、\nのどかな風景だ。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 170],
        [3000, 'text', text2, 40, 220],
        [4000, 'text', text3, 40, 290],
        [4000, 'text', text4, 40, 320],
        [3000, 'text', text5, 40, 350],
        [4000, 'text', text6, 40, 400],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 3:
      text1 = 'ここはエントランスのようだ。';
      text2 = '窓の外には、夕方の寂しげな街が広がる。';
      text3 = 'バイト帰りのフレンズが';
      text4 = '君と入れ違いでエレベータに乗った。';
      text5 = '君は物資の補充のため、一度外に出ることにした。';

      //todo ending
      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [3000, 'text', text5, 40, 370],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 4:
      text1 = '一般的な住居用のフロアのようだ。';
      text2 = '軽く息をつき、EVに引き返す。';
      text3 = '…？！';
      text4 = '君は周り全てが巨大になっていることに気がつく！';
      text5 = '「フフ…ここはねぇ、\n他者の遠近感にあわせて縮んじゃうんだよ？」';
      text6 = '見上げると、EVに相乗りしていたフレンズが\n意地悪げに笑っていた。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [5000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [3000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 430],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 5:
      text1 = '一般的な住居用のフロアのようだ。';
      text2 = '一通り辺りを調べ、EVへ引き返す。';
      text3 = '途中、君はごく小さなアクセサリーを見つける。';
      text4 = '「ボトル詰めされた精巧なネズミ」';
      text5 = '中の豆粒大のネズミは、\nしかし生きているかのようにうごめいている…';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [3000, 'text', text5, 40, 370],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 100:
      text1 = 'ダイナーだ。';
      text2 = '君は先客が居ないことを確認し、食事にとりかかる。';
      text3 = '暖かなポタージュスープと季節の野菜サラダ。';
      text4 = 'そして待ちかねたメインの肉料理を口にする。'
      text5 = '…君はやはりここ以上の店は無い、と唸る。';
      text6 = 'でもたまには、誰かと一緒に食事をしたくなるな。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [5000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 420],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 101:
      text1 = '「水没した地下駐車場か…」';
      text2 = '全体に亀裂が入り、深い水が溜まっている。';
      text3 = '静かな水面には軍用風のゴムボート。';
      text4 = '…そして「信じろ」のメモ書き。';
      text5 = '君は、素早くボートの所有IDを照合した。';
      text6 = 'これはだいぶ前から未帰還となっている\nベテラン探索者のもののようだ。';
      text7 = '君は悪態をつくと、\nボートに穴を開け、急いでEVに飛び乗った。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [6000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 400],
        [3000, 'text', text7, 40, 460],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 102:
      text1 = '無限にも思える広い空間。';
      text2 = 'そこに、数え切れぬほどお地蔵様が並んでいる。';
      text3 = '「おぬしのカルマは…';
      text4 = 'なんだ、たった' + data.gauge + 'かえ。つまらぬ」';
      text5 = 'あたりを清めていた巫女が、ぷいと何処かへ消えた。';
      text6 = 'お地蔵様は、ただ静かに存在している…';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [5000, 'text', text5, 40, 370],
        [5000, 'text', text6, 40, 400],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 107:
      text1 = '崩れ果てた建物、穴だらけの道、渦を巻いた雲';
      text2 = 'それら全て、全てが赤いのだ！';
      text3 = 'はるか遠方で、冗談のように巨大mなモノが動く。';
      text4 = '地獄nn！ここは地獄なんだiよ！';
      text5 = '君みは、\n何かが決ん定的に終わってしまったのを感じみん。';
      text6 = 'みみ…？';
      text7 = 'みみ…？';
      text8 = 'みみ…？';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [5000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [5000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 460],
        [4000, 'text', text7, 40, 480],
        [4000, 'text', text8, 40, 500],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 200:
      text1 = 'ドン！という大きな音に驚く。';
      text2 = 'それは君が床に崩れ落ちた音だ。';
      text3 = '床に血溜まりを広げ、\n痛みに悶える。';
      text4 = 'だが、どこか安らぎも感じている。';
      text5 = 'もう怪異に悩まされることはない…'

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [4000, 'preText', 'としあきは\n１４に辿り着いた…', 80, 70, 350, 76],
        [5000, 'text', text1, 40, 220],
        [5000, 'textRed', text2, 40, 250],
        [5500, 'textRed', text3, 40, 300],
        [5500, 'text', text4, 40, 400],
        [5000, 'text', text5, 40, 500],
        [5000, 'poneSE'],
        [1000, [
          ['dooropenSE'],
          ['fadeOut', 6000],
        ]],
        [6000, 'toGameOver']
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 201:
      text1 = '平凡な住居用フロアに着いた。';
      text2 = '手前の部屋からは楽しげな家族の会話が聞こえる。';
      text3 = '「今日はハンバーグよ」「やった」';
      text4 = '君は緊張を解いて、フロアを先に進む。';
      text5 = '…？おかしい。';
      text6 = 'ここは全ての部屋から「全く同じ」会話が聞こえているようだ。';
      text7 = '背後のエレベータはたった今、閉じたようだ。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 290],
        [5000, 'text', text4, 40, 330],
        [3000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 400],
        [3000, 'poneSE'],
        [1000, 'dooropenSE'],
        [3000, 'text', text7, 40, 430],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 202:
      text1 = '「仮眠室、そんな施設まであるのか。」';
      text2 = '薄い明かりが、\n簡素だがしっかりした作りの3段ベッドを照らしている。';
      text3 = '君は失礼を承知で、何人かの寝顔を覗き見た。';
      text4 = 'どうやら見知った人物は居ないようだ。';
      text5 = 'EVに戻った君は、いらいらしながらパネルを操作する。';
      text6 = '最後に見た無精髭の男性。\n彼とペアルックのTシャツなのは最悪の気分だ。';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 310],
        [5000, 'text', text4, 40, 340],
        [3000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 400],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

    case 203:
      text1 = 'ドアが開いた途端、大きな拍手が君を迎えた。';
      text2 = '「今日のゲストは、なんとなんとXXXXさんです！」';
      text3 = '何もない空間から観客の驚きのリアクションが生じる。';
      text4 = '「彼は我々が今、最も注目している探索者3人のうち…」';
      text5 = '赤い影はカメラに向かい、べらべらと解説を続けている。';
      text6 = '「…にビックチャアンス！プレイヤーの交代です。」';
      text7 = 'この怪異が何を言「っているかが全く理解できない。\n君はすぐにここを離れた」';

      commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [1000, 'dooropenSE'],
        [5000, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [3000, 'text', text3, 40, 310],
        [5000, 'text', text4, 40, 340],
        [3000, 'text', text5, 40, 370],
        [3000, 'text', text6, 40, 400],
        [3000, 'text', text7, 40, 430],
        [3000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;


    default:
      console.error('unknown special event');
      break;
  }
}