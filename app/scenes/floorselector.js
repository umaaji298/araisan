export default class FloorSelector extends Phaser.Scene {

  constructor() {
    super('floorSelector');
  }

  preload() {
    //data
    this.evSelector = new Map([
      // key arraw 2keta : value ev*data [0] or [1]
      ['00', ['0', '1', '0', '1']],
      ['01', ['1', '0', '0', '0']],
      ['02', ['0', '1', '0', '0']],
      ['03', ['1', '0', '1', '1']],
      ['04', ['0', '0', '1', '0']],
      ['05', ['1', '0', '1', '0']],
      ['06', ['0', '1', '1', '0']],
      ['07', ['1', '1', '1', '0']],
      ['08', ['0', '0', '0', '1']],
      ['09', ['1', '0', '0', '1']],
      ['10', ['0', '0', '0', '0']],
      ['11', ['1', '1', '0', '1']],
      ['12', ['0', '0', '1', '1']],
      ['13', ['1', '1', '0', '0']],
      ['14', ['0', '1', '1', '1']],
      ['15', ['1', '1', '1', '1']],
      ['16', ['0', '0', '1', '1']], // 組み合わせ数が足りないため、手動で入力
      ['17', ['1', '1', '0', '0']], // 組み合わせ数が足りないため、手動で入力
      ['18', ['1', '0', '1', '0']], // 組み合わせ数が足りないため、手動で入力 // 78 ありえないけど一応
      ['08', ['0', '0', '0', '0']], // 組み合わせ数が足りないため、手動で入力 // 88 非表示の場合
    ]);

    this.ev1data = [
      ["0", "となりの", "ＴＳした", "ゼラチナス", "4", "狂気に飲まれた", "多脚の", "メスガキの", "健康的に日焼けした", "箱化した", "極限まで鍛えた", "デパートの", "奇妙な仮面を付けた", "ひどい匂いのする", "生まれたての", "有り金を溶かした", "モデル体型の", "あお向けに倒れた", "君の", "何かに操られた", "概念となった", "プロ野球選手の", "噛むとほろ苦い", "君を殴った", "脳を交換した", "妹の", "生まれたての", "爆発寸前の", "召喚に応じた"],
      ["0", "人型の", "蟲型の", "不定形の", "4", "神となった", "\G人の", "機械の", "太った", "植物の", "影のような", "小さい", "巨大な", "時を止めてくる", "あなたは１４に向かった", "異質の", "古い書物に描かれた", "夜の", "頭が\G個ある", "ふたなりの", "水中の", "空飛ぶ", "発情した", "ひからびた", "首だけの", "閉じ込められた", "フレンズ化した", "黒く塗りつぶされた", "血まみれの"],
    ];
    this.ev2data = [
      ["0", "裸フレンズが", "ケルピーが", "ニセイさんが", "4", "クラウケンが", "異形が", "古狩人が", "ジャンレノが", "宇宙人が", "ボンドルド卿が", "霊体が", "かーさばが", "壁の絵が", "キタキツネが", "警察が", "ホオジロザメが", "狐ババアが", "ショタが", "ピザ屋が", "狂犬フレンズが", "ワシさんが", "「あけて」君が", "死体が", "\G人ミサキが", "光が", "闇が", "悪鬼が", "機械が"],
      ["0", "みんみが", "オオカワウソが", "ガチおじが", "4", "怪異が", "おじぞうさんが", "かたまりが", "人形が", "全裸の異性が", "としあきが", "地下ラッコが", "コツメカワウソが", "荒耶宗蓮が", "メリーさんが", "探索者が", "ギンギツネが", "アライさんが", "フェネックが", "きんたまが", "モブフレンズが", "肉食ちゃんが", "草食ちゃんが", "木魚マンが", "お稲荷様が", "目玉が", "ネズミボトルが", "待機カワウソが", "じごくボスが"]
    ];
    this.ev3data = [
      ["0", "催眠アプリを急に使って", "貴重な秘薬をがぶ飲みして", "何も知らない幼体に変化して", "4", "震えが止まらぬ老体に変化して", "暗く君の死を予言して", "廃墟から窺うようにして", "大草原でうたた寝をしながら", "ぼーっと無反応な様子で", "ご神体に祈りを捧げながら", "\Gもの魔法陣を展開して", "燃やせるごみを出しながら", "早口で君を罵倒しながら", "敵の大群を押し留めながら", "いやらしく何かを察した様子で", "マンションの清掃をしながら", "音もなく死角に潜んで", "一心不乱に何かを製造しながら", "星々が輝く屋上で", "取引を持ちかけてきて", "尊大な態度で君を挑発して", "岩の上からつまらなさそうにして", "もう間に合わないと君に覆いかぶさり", "まもなく応援が来ると断言して", "疲れた顔でもう何もないと言い", "秘密があるんだと耳打ちして", "怒りで我を忘れて", "決戦への士気を高揚させて"],
      ["0", "はいずりながら", "ゆっくりと近づきながら", "武器を振りかざして", "4", "天井に張り付きながら", "高速で走りながら", "楽しげに踊りながら", "君を見つめながら", "夢中で何かを食べながら", "気安く話しかけながら", "笑いながら", "自分を切りつけながら", "君と大きく距離をとって", "謎の液体を飛ばしながら", "さっと照明を消して", "ここは安全だと叫びながら", "小さく助けてとつぶやいて", "泥のようなものを投擲しながら", "変形しながら", "下着をずらしながら", "口から血を吐きながら", "ようこそと手招きして", "震えながらお金を差し出して", "血走った目で君を睨みつけて", "気弱げにしゃがみこんで", "エレベーターを塞ぎながら", "苦しげに来るなと言いながら", "薔薇に絡まりながら"],
    ];
    this.ev4data = [
      ["0", "君の金を\G円奪った。", "君を無理に強化した。", "君をエレベーターに帰した。", "4", "大爆発した。", "ついに負けを認めた。", "互いの健闘を祈った。", "君を仲間に加えた。", "信じられないものを出した。", "君のこたつでくつろいだ。", "君を何かに売り払った。", "君とエレベーターに乗り込んだ。", "あの情報を教えてくれた。", "毒を散布した。", "作りすぎた肉じゃがをくれた。", "君を罠にはめた。", "君を母にした。", "君を操った。", "君と楽しく飲んだ。", "眠ってしまった…", "何かを産み出した。", "壁に大穴を開けた！", "創作物を見せてきた。", "怪異を打ち払った。", "大声で敵を呼び寄せた！", "真の姿になった。", "ある部位から光線を発した。", "もじもじしていた。"],
      ["0", "挨拶をしてきた。", "襲ってきた。", "帰れと警告してきた。", "4", "君の落とし物を届けてくれた。", "手打ちうどんをごちそうしてくれた。", "ずっと後をつけてくる…", "何かを探していた。", "フロアの物を破壊していた。", "君を殺しに来た。", "他の怪異から君を守った。", "君の大切なものを奪った。", "君にキスをした。", "君に決闘を申し込んだ。", "君を閉じ込めた。", "君と\G年ほど暮らした。", "君に寄生した。", "あたりに火を付けた。", "ベランダから飛び降りた！", "君を無視した。", "君を誘った。", "君を囮にして逃げた。", "壁に消えていった…", "君の服を脱がした。", "君の髪の毛を毟った！", "君に何かの魔法をかけたようだ…", "君の血を啜った。", "息絶えた…"],
    ];

    //event.jsonよりイベント呼び出し
    //this.spEvents = this.cache.json.get('events');
    this.spEvents = this.cache.json.get('events');

    //gauge 数値データ置き換え
    this.numTag = ["１／２", "７", "５", "７７", "３", "１０", "０．１", "１", "千万", "２", "１２", "０", "（検閲）", "無", "百万", "０．０１"];
  }

  create(data) {
    console.log('%c floorSelector ', 'background: green; color: white; display: block;');
    console.log('floordata', data);

    const evKey = (data.arraws[0] % 2).toString() + data.arraws[1];
    const gauge = data.gauge;

    const checkedCode = checkEvent(data.code, this)

    if (checkedCode) {

      //イベントデコード : todo コスト重いか…！
      // todo 制御文字の構文解析はここでやる感じ
      const event = this.spEvents[checkedCode];

      //\Gの置き換え
      const index = Math.floor((Number(evKey) + gauge) % this.numTag.length);
      const fixevent = event.text.replace(/\G/g, this.numTag[index])

      const commands = scriptsToEvents(fixevent, checkedCode);

      this.scene.start('floorEvent', { commands });
    } else {
      //normal event

      const select = this.evSelector.get(evKey);

      const texts = new Array();
      texts.push(this.ev1data[select[0]][data.inputNo[0]]);
      texts.push(this.ev2data[select[1]][data.inputNo[1]]);
      texts.push(this.ev3data[select[2]][data.inputNo[2]]);
      texts.push(this.ev4data[select[3]][data.inputNo[3]]);

      const textsFix = new Array();

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const index = Math.floor((Number(evKey) + gauge + i) % this.numTag.length);
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

  console.log(code, code4, code6);
  console.log(scene.spEvents);

  if (scene.spEvents.hasOwnProperty(code)) {
    resultCode = code;
    //    commands = scene.spEvents[code];
  } else if (scene.spEvents.hasOwnProperty(code6)) {
    resultCode = code6;
  } else if (scene.spEvents.hasOwnProperty(code4)) {
    resultCode = code4;
  }

  return resultCode;
}

/**
 * ここではやらない
 * @param {*} textdata 
 */
function scriptsToEvents(textdata, id) {
  const strings = textdata.split(',');

  const baseX = 40;
  const baseY = 117;
  const fixY = (10 - strings.length) * 20 + baseY;

  const commands = new Array();
  commands.push([0, 'preText', 'エレベータを降りた\nとしあきは見た…']);

  let wait = 3000; // 次の文章表示時間 : 

  for (let i = 0; i < strings.length; i++) {

    const lineWord = strings[i];
    const waittimeClass = Math.floor(lineWord.length / 12);
    const oneScript = [wait, 'text', strings[i], baseX, fixY + (40 * i)];

    wait = 2000; // eye forcus time

    switch (waittimeClass) {
      case 0: {
        wait += 1000;
        break;
      }
      case 1: {
        wait += 3000;
        break;
      }
      case 2: {
        wait += 4000;
      }
    }

    commands.push(oneScript);
  }

  //special fix

  if (id === '14141414') {
    return commands.concat([[5000, "poneSE"], [1000, [["dooropenSE"], ["fadeOut", 6000]]], [6000, "toGameOver"]]);
  } else if (id === '999999990000') {
    commands.push([wait, 'next']);
    return commands.slice(1);
  }
  else if (id === '999999990001') {
    commands.push([wait, 'next']);
    return commands.slice(1);
  }

  // 次へボタン表示
  commands.push([wait, 'next']);

  return commands;

}