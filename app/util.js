/**
 * ランダム整数値を生成する
 * @param {*} min ランダム最小値
 * @param {*} max ランダム最大値
 */

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/**
 * ","で区切られた文字列をTCPRコードに変換する
 * 先頭に、preTextが必ず含まれる
 * 最後に、nextが必ず含まれる
 * 文字表示速度は自動: 3sec / 5sec / 6secc
 * @param {*} textdata 
 */
export function scriptsToEvents(textdata) {
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

  // 次へボタン表示
  commands.push([wait, 'next']);

  return commands;
}