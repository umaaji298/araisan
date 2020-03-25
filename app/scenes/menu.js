export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
  }

  preload() {

    this.fontsys = { fontSize: '20px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };

    //events.jsonよりイベント呼び出し
    let mainArray = this.cache.json.get('events');
    let diffArray = this.cache.json.get('events_diff');

    this.spEventArray = diffArray.concat(mainArray);
  }

  create() {
    console.log('%c menu ', 'background: green; color: white; display: block;');

    this.gridTable = this.rexUI.add.gridTable({
      x: 270,
      y: 282,
      width: 500,
      height: 407,

      scrollMode: 0,

      background: this.add.image(0, 0, 'menu_back').setAlpha(0.3),

      header: this.rexUI.add.label({
        // background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
        text: this.add.text(0, 0, 'ランダムに表示'),
        align: 'center',
        space: {
          // left: 20,
          // right: 20,
          top: 0,
          // bottom: 20,
          // icon: 10
        }
      }),

      table: {
        cellWidth: undefined,
        cellHeight: 60,

        columns: 1,

        mask: {
          padding: 2,
        },

        reuseCellContainer: true,
      },

      // slider: {
      //   track: this.rexUI.add.roundRectangle(0, 0, 16, 16, 0, COLOR_DARK),
      //   thumb: this.rexUI.add.roundRectangle(0, 0, 16, 16, 0, COLOR_LIGHT),
      // },
      slider: false,

      space: {
        left: 20,
        right: 20,
        top: 5,
        bottom: 20,

        table: 10,
        header: 5,
        // footer: 10,
      },

      createCellContainerCallback: function (cell, cellContainer) {
        var scene = cell.scene,
          width = cell.width,
          height = cell.height,
          item = cell.item,
          index = cell.index;

        if (item.removed) {
          return null;
        }
        if (cellContainer === null) {
          cellContainer = scene.rexUI.add.label({
            width: width,
            height: height,

            orientation: 0,
            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0xffffff),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
            text: scene.add.text(0, 0, '', scene.fontsys),

            space: {
              icon: 10,
              left: 15,
            }
          });
          // console.log(cell.index + ': create new cell-container');
        } else {
          // console.log(cell.index + ': reuse cell-container');
        }

        cellContainer.setAlpha(1);
        // Set properties from item value
        cellContainer.setMinSize(width, height); // Size might changed in this demo
        cellContainer.getElement('text').setText(item.text); // Set text of text object
        cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
        cellContainer.getElement('background').setStrokeStyle(2, 0xffffff).setDepth(0);
        return cellContainer;
      },

      items: getItems(6, this)
    })
      .layout()
    //.drawBounds(this.add.graphics(), 0xff0000);

    this.gridTable
      .on('cell.over', function (cellContainer, cellIndex) {
        cellContainer.getElement('background')
          .setStrokeStyle(2, 0xaaaaaa)
          .setDepth(1);
        // console.log(cellContainer);
      }, this)
      .on('cell.out', function (cellContainer, cellIndex) {
        cellContainer.getElement('background')
          .setStrokeStyle(2, 0xffffff)
          .setDepth(0);
      }, this)

    this.events.on('evmove', () => {
      console.log('call evmove');

      this.tw_1 = this.tweens.add({
        targets: this.gridTable,
        alpha: 0,
        dulation: 300,
        ease: 'Poser2',
        onCompleteScope: this,
        onComplete: function (tween, targets, param) {
          console.log('conmplete');
          destructor(this);
          this.scene.stop('menu');
        }
      }, this);
    }, this);

  }
}

let getItems = function (count, scene) {
  let data = [];

  for (let i = 0; i < count; i++) {
    const evNo = Phaser.Math.Between(0, scene.spEventArray.length - 1)
    const ev = scene.spEventArray[evNo];

    if (ev[1].floorName === 'Under Maintenance') {
      i--;
      continue;
    }

    //console.log(evNo, ev);
    //todo コスト減らす？
    const [sw1, sw2, sw3, sw4, ...other] = ev[1].idString.split(',');
    const idString = `${sw1}-${sw2}-${sw3}-${sw4}${other.join('')}`
    //console.log(idString);

    const text = `${idString} / ${ev[1].floorName}`

    data.push({
      text: text,
      color: Phaser.Math.Between(0, 0xffffff)
    });
  }
  return data;
}

function destructor(scene) {
  scene.gridTable.removeAllListeners();
  scene.gridTable.destroy(); // also destroy all children. : see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/containerlite/#compare-with-official-container
  scene.tweens.remove(scene.tw_1);
  scene.events.off('evmove');
  // scene.events.destroy(); // do not work : scene.event全体がおかしくなる
}