import ShakePosition from 'phaser3-rex-plugins/plugins/shakeposition.js';
import * as util from '../util'
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    //console.log('call game pleroad');
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

    //Objectの反応をONにする
    this.input.on('gameobjectup', panelFeedBack, this);

    //audio
    this.clickSE = this.sound.add('click');
    this.rswSE = this.sound.add('rsw');
    this.gaugeSE = this.sound.add('gauge');

    this.evMoveBGM = this.sound.add('evmove');
    this.poneSE = this.sound.add('pone');
    this.dooropenSE = this.sound.add('dooropen')

    /**
     * Scene events
     */
    //restart scene : イベントの再登録なし
    const eventScene = this.scene.get('floorEvent');
    eventScene.events.on('restert', () => {
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

      //locksw解除
      unlockSwitches(this);

    }, this);

    eventScene.events.on('toGameOver', () => {
      console.log('call togameover');
      this.scene.start('gameover');
    }, this);
  }
}

/**
 * UI FeedBack
 */
function panelFeedBack(pointer, obj) {

  switch (obj.name) {
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
            rsw.rotation = getAngleFromStep(rsw.step);
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
          }
          break;
        }
        case 2: {
          this.evDisplay.push(this.add.sprite(613, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(631, 75, 'textures', `evfont/${sw.no}.png`));
          break;
        }
        case 3: {
          this.evDisplay.push(this.add.sprite(649, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(667, 75, 'textures', `evfont/${sw.no}.png`));
          break;
        }
        case 4: {
          this.evDisplay.push(this.add.sprite(685, 75, 'textures', 'evfont/haifun.png'));
          this.evDisplay.push(this.add.sprite(703, 75, 'textures', `evfont/${sw.no}.png`));
          lockSwitches(this);

          //イベントの起点
          startFloorEvent(this);

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

function setupSwitches(scene){
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

    var swobj = switches[i];
    swobj.name = 'sw';
    swobj.no = i;
    var evname = 'sw' + i + 'on'
    swobj.setInteractive();

    const frameNames = scene.anims.generateFrameNames('textures', { start: 1, end: 2, prefix: 'buttons/' + i + '/', suffix: '.png' });
    scene.anims.create({ key: evname, frames: frameNames, frameRate: 10, repeat: 0 });
    swobj.anims.load(evname);
  }
}

function setupRotarySw(scene){
  scene.rswitches.push(scene.add.sprite(731, 175, 'textures', 'rotarysw.png'));
  scene.rswitches.push(scene.add.sprite(731, 239, 'textures', 'rotarysw.png'));
  scene.rswitches.push(scene.add.sprite(731, 299, 'textures', 'rotarysw.png'));

  const rswitches = scene.rswitches;

  for (let i = 0; i < rswitches.length; i++) {
    var swobj = rswitches[i];
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
    swobj.step = util.getRandomIntInclusive(swobj.stepMin, swobj.stepMax);

    if(swobj.step === swobj.stemMax){
      swobj.direction = 0;
    }else{
      swobj.direction = 1;
    }
    
  }
  setRotarySw(scene);
}

function setupGauge(scene){
  scene.gauge = scene.add.sprite(727, 342, 'textures', 'gauge.png');
  const gauge = scene.gauge;

  gauge.name = 'gauge';
  gauge.isLocked = false;
  
  gauge.stepMax = 15;
  gauge.stepMin = 0;
  gauge.step = util.getRandomIntInclusive(scene.gauge.stepMin, scene.gauge.stepMax); // 初期位置

  if(gauge.step === 15){
    gauge.direction = 0; // 1 is down : 0 is up
  }else{
    gauge.direction = 1;
  }

  gauge.shake =  new ShakePosition(scene.gauge, {
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
    swobj.rotation = getAngleFromStep(swobj.step);
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
    scene.arraw1.rotation = getAngleFromStep(arraw1step);
  }
  //arraw viwe 確定
  if (arraw2step === 8) {
    scene.arraw2.setVisible(false);
  } else {
    scene.arraw2.setVisible(true);
    scene.arraw2.rotation = getAngleFromStep(arraw2step);
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
  const inputNo = scene.inputNo;

  //4桁未満の対応
  if (inputNo.length < 4) {
    for (let i = inputNo.length; i < 4; i++) {
      inputNo[i] = 0; // 0埋め
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

  return {
    inputNo: scene.inputNo,
    arraws: [scene.arraw1.step, scene.arraw2.step], // reversed
    gauge: scene.gauge.step,
    code: code
  }
}

function getAngleFromStep(step) {
  //angle // is this utils?
  const angles = [0, 0.785, 1.570, 2.356, 3.141, -2.35, -1.57, -0.78]; // see https://phaser.io/examples/v3/view/game-objects/sprites/sprite-rotation
  return angles[step];
}

function getGeugeYpos(index) {
  //gauge step // bad system...
  const geugeYpos = [342, 351, 361, 371, 381, 390, 400, 410, 420, 430, 440, 449, 459, 469, 478, 488];
  return geugeYpos[index];
}

/** Events */

function startFloorEvent(scene) {

  //暫定 closecheck
  let floorData = getFloorData(scene)
  if (checkClose(floorData.code)) {
    // close中
    const code6 = floorData.code.slice(0, 10);
    if (code6 === "1606070204") {
      floorData.code = "999999990001"
    } else {
      floorData.code = "999999990000"
    }
    scene.scene.launch('floorSelector', floorData);

  } else {
    scene.evMoveBGM.play();
    scene.time.delayedCall(6000, (_this) => {
      _this.poneSE.play();
    }, [scene]);

    scene.time.delayedCall(7500, (_this) => {
      _this.dooropenSE.play();
    }, [scene]);

    scene.time.delayedCall(12500, (_this) => {
      console.log('to next scene');
      //ここで入力が確定する : overload sw input 対応
      _this.scene.launch('floorSelector', getFloorData(_this));
    }, [scene]);
  }
}

//special event
function all14event_view(scene) {
  lockSwitches(scene);

  scene.add.sprite(595, 75, 'textures', `evfont/14.png`);
  scene.add.sprite(613, 75, 'textures', 'evfont/haifun.png');
  scene.add.sprite(631, 75, 'textures', `evfont/14.png`);
  scene.add.sprite(649, 75, 'textures', 'evfont/haifun.png');
  scene.add.sprite(667, 75, 'textures', `evfont/14.png`);
  scene.add.sprite(685, 75, 'textures', 'evfont/haifun.png');
  scene.add.sprite(703, 75, 'textures', `evfont/14.png`);

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
  //scene.scene.launch('floorSelector', getFloorData(scene));
}

function checkClose(code) {
  let isClosed = false;
  const code6 = code.slice(0, 10);

  const closeList = ["2424222042", "1606070204", "0202202522", "2403102024", "2807182225", "2120191004"];

  closeList.forEach(num => {
    if (num === code6) {
      //closeCode = "999999990000";
      isClosed = true;
      console.log('hit', code6);
    }
  })

  return isClosed;
}