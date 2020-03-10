
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
    //window.GAME = this; // what?
  }

  preload() {
    console.log('call game pleroad');
  }

  create() {
    console.log('call game create');
    console.log(this);

    if (!this.retry) {
      //リトライ時はフェードしない
      this.cameras.main.fadeIn(2000, 0, 0, 0);

      //restart scene : イベントの再登録なし
      const eventScene = this.scene.get('floorEvent');
      eventScene.events.on('restert', () => {
        console.log('call restert');
        this.retry = true;
        this.scene.restart('game');
        // this.scene.start('game');
      }, this);

      eventScene.events.on('toGameOver', () => {
        console.log('call togameover');
        this.scene.start('gameover');
      }, this);
    }

    this.switches = new Array(); // normal sw
    this.rswitches = new Array(); // rotary sw
    this.inputNo = new Array(); // 階表示用データ

    //panel
    this.add.image(650, 300, 'panel');

    //normal sw : this is darty code
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

      swobj.rotation = getAngleFromStep(swobj.step);
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
    //this.input.enableDebug(this.gauge); // view hitbox

    this.input.on('gameobjectup', panelFeedBack, this);

    //audio
    this.clickSE = this.sound.add('click');
    this.rswSE = this.sound.add('rsw');
    this.gaugeSE = this.sound.add('gauge');
  }
}

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
          //イベントの起点
          this.scene.launch('floorSelector', getFloorData(this));
          //this.evMoveBGM.play();
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
  secne.gauge.y = getGeugeYpos(secne.gauge.step);

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
    scene.arraw1.rotation = getAngleFromStep(arraw1step);
  }
  //arraw viwe 確定
  if (arraw2step === -1) {
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

function getFloorData(scene) {
  return {
    inputNo: scene.inputNo,
    arraws: [scene.arraw2.step, scene.arraw1.step], // reversed
    gauge: scene.gauge.step
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
  scene.scene.launch('floorSelector', getFloorData(scene));
}