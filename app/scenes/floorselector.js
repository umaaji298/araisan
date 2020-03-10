export default class FloorSelector extends Phaser.Scene {

  constructor() {
    super('floorSelector');
  }

  init(data) {
    console.log('call init', data);
    this.floordata = data;
  }

  preload() {
    //data
    this.ev1data = ["0", "人型の", "蟲型の", "不定形の", "4", "半透明の", "複数の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "花にまみれた", "あなたは１４に向かった", "異質の", "光に包まれた", "夜の", "頭が２つある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"];
    this.ev2data = ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンキタが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "のじゃ巫女が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"];
    this.ev3data = ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "踊りながら", "君を見つめながら", "何かを食べながら", "ウインクしながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"];
    this.ev4data = ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんを\nごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と１０年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"];
  }

  create(data) {
    console.log('%c floorSelector ', 'background: green; color: white; display: block;');

    //console.log(data);
    // const data = this.floordata;
    //console.log(data.inputNo,data.arraws,data.gauge);

    let preTxtTime = 11000;
    let text1Time = preTxtTime + 3000;
    let text2Time = text1Time + 3000;
    let text3Time = text2Time + 3000;
    let text4Time = text3Time + 3000;
    let nextTime = text4Time + 3000;

    let text1 = this.ev1data[data.inputNo[0]];
    let text2 = this.ev2data[data.inputNo[1]];
    let text3 = this.ev3data[data.inputNo[2]];
    let text4 = this.ev4data[data.inputNo[3]];

    //todo check datas specialeventcheck is here
    if (data.inputNo[0] === 14) {
      text1Time = preTxtTime + 6000;
      text2Time = text1Time + 6000;
      text3Time = text2Time + 6500;
      text4Time = text3Time + 6500;
      let text5Time = text4Time + 6000;
      let poneSETime2 = text5Time + 6000;
      let doorcloseTime = poneSETime2 + 1000;
      let endTime = doorcloseTime + 6000;


      text1 = 'ドン！という大きな音に驚く。';
      text2 = 'それは君が床に崩れ落ちた音だ。';
      text3 = '床に血溜まりを広げ、\n痛みに悶える。';
      text4 = 'だが、どこか安らぎも感じている。';
      let text5 = 'もう怪異に悩まされることはない…'

      const commands = [
        [0, 'evMoveBGM'],
        [6000, 'poneSE'],
        [7000, 'dooropenSE'],
        [preTxtTime, 'preText', 'としあきは\n１４に辿り着いた…',80,70,350,76],
        [text1Time, 'text', text1, 40, 220],
        [text2Time, 'textRed', text2, 40, 250],
        [text3Time, 'textRed', text3, 40, 300],
        [text4Time, 'text', text4, 40, 400],
        [text5Time, 'text', text5, 40, 500],
        [poneSETime2, 'poneSE'],
        [doorcloseTime,[
          ['dooropenSE'],
          ['fadeOut',6000],
        ]],
        [endTime,'toGameOver']
      ];

      this.scene.start('floorEvent', { commands });

    } else {
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
        [7000, 'dooropenSE'],
        [preTxtTime, 'preText', 'エレベーターを降りた\nとしあきは見た…',80,50,350,76],
        [text1Time, 'text', text1, 40, 210],
        [text2Time, 'text', text2, 40, 250],
        [text3Time, 'text', text3, 40, 290],
        [text4Time, 'text', text4, 40, 330],
        [nextTime, 'next'],
      ];

      this.scene.start('floorEvent', { commands });
    }
  }
}