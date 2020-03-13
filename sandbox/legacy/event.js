
function doSpecialEvent(specialNo, scene, data) {
  let text1, text2, text3, text4, text5, text6, text7, text8, text9, text10;
  let commands;

  switch (specialNo) {
    case 1:
      text1 = 'アライさんの家があるフロアだ。';
      text2 = '「ん？誰か降りたのだ？」';
      text3 = '「アライさーんご飯できたよ～」';
      text4 = '「あけて…あけて…」';
      text5 = '…ヨシ。';
      text6 = 'フレンズ達の安全を確認した君は、\n次の階へと向かう。';

      commands = [
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
      text1 = '「水没した駐車場か…」';
      text2 = '全体に亀裂が入り、深い水が溜まっている。';
      text3 = '静かな水面には軍用風のゴムボート。';
      text4 = '…そして「信じろ」のメモ書き。';
      text5 = '君は、素早くボートの所有IDを照合した。';
      text6 = 'これはだいぶ前から未帰還となっている\nベテラン探索者のもののようだ。';
      text7 = '君は悪態をつくと、\nボートに穴を開け、急いでEVに飛び乗った。';

      commands = [
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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

    case 108:
      text1 = '崩れ果てた建物、穴だらけの道、渦を巻いた雲！';
      text2 = 'ここはあらゆる全てがくすんだ赤で表現される。';
      text3 = 'はるか遠方で、\n冗談のように巨大な何かが塔を崩した。';
      text4 = '打ち捨てらmiれた頭部だけのじごくボスがわめynく。'
      text5 = '「みカmiセテ！ココハジゴクmmmmチホウi」';
      text6 = '君nみは、何かが決ん定的に\n終わってしまったのを感じみん。';
      text7 = 'みみ…？';
      text8 = 'みみ…？';
      text9 = 'みみ…？';

      commands = [
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
        [3000, 'text', text1, 40, 150],
        [3000, 'text', text2, 40, 180],
        [5000, 'text', text3, 40, 220],
        [5000, 'text', text4, 40, 280],
        [5000, 'text', text5, 40, 310],
        [5000, 'text', text6, 40, 340],
        [4000, 'text', text7, 40, 400],
        [3000, 'text', text8, 40, 420],
        [3000, 'text', text8, 40, 440],
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
        [0, 'preText', 'としあきは\n１４に辿り着いた…', 80, 70, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
        [0, 'preText', 'エレベータを降りた\nとしあきは見た…', 80, 50, 350, 76],
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
      //未実装階の場合 // todo 反応しないが不整合
      text1 = '…？';
      text2 = '珍しくエレベーターが反応しない。';
      text3 = 'どうやらこの階は、今は封印されているようだ。';
      text4 = '「このマンションの神の噂を聞いたことは？';
      text5 = '…そうか。まぁいずれ時が来れば、';
      text6 = 'この階の秘密も明らかになるだろうさ」';
      text7 = '中性的な顔立ちの青年が、興味なさげにうそぶいた。';

      commands = [
        [5000, 'text', text1, 40, 210],
        [3000, 'text', text2, 40, 250],
        [5000, 'text', text3, 40, 310],
        [5000, 'text', text4, 40, 340],
        [8000, 'text', text5, 40, 370],
        [6000, 'text', text6, 40, 400],
        [6000, 'text', text7, 40, 430],
        [5000, 'next'],
      ];

      scene.scene.start('floorEvent', { commands });
      break;

  }
}