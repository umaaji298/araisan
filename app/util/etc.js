/**
 * ArrawのStepからradに変換する
 * @param {*} step 
 */

export function getAngleFromStep(step) {
  //angle // is this utils?
  const angles = [0, 0.785, 1.570, 2.356, 3.141, -2.35, -1.57, -0.78]; // see https://phaser.io/examples/v3/view/game-objects/sprites/sprite-rotation
  return angles[step];
}

/**
 * ","で区切られた文字列をTCPRコードに変換する
 * 先頭に、preTextが必ず含まれる
 * 最後に、nextが必ず含まれる
 * 文字表示速度は自動: 3sec / 5sec / 6secc
 * TCRP commands
 *     const commands = [
 *        ['// ??'],               // [NaN, ...] -> ignored
 *        [0, 'print', 'hello'],        // [dt, fnName, param0, param1, ...]
 *        [1000, ['print', 'world']],   // [dt, [fnName, param0, param1, ...]]
 *        [3000, [                      // [dt, [command0, command1, ...]]
 *            ['print', '--'],
 *            ['print', 'phaser3'],
 *        ]]
 *      ];
 * @param {*} script 
 */
export function scriptsToEvents(script, autoText) {
  const strings = script.split(',');

  const baseX = 40;
  const baseY = 117;
  const fixY = (10 - strings.length) * 20 + baseY;

  const commands = new Array();
  commands.push([0, 'roundText', 'エレベータを降りた\nとしあきは見た…', 280, 77, 20, 10]);

  let wait = 3000; // 次の文章表示時間 : 

  for (let i = 0; i < strings.length; i++) {

    const lineWord = strings[i];
    const waittimeClass = Math.floor(lineWord.length / 12);
    const oneScript = [wait, 'text', strings[i], baseX, fixY + (40 * i)];

    //next wait 
    if(autoText === false){
      wait = 3000;
    }
    else if (lineWord === "") {
      wait = 500;
    } else {
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
          break;
        }
      }
    }

    commands.push(oneScript);
  }

  // 次へボタン表示
  commands.push([wait, 'next', '次の階へ', 400, 553, 20, 16]);

  return commands;
}