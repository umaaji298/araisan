export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
  }

  preload() {

    this.fontsys = { fontSize: '20px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
  }

  create(data) {
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
        text: this.add.text(0, 0, `ランダム表示 / クリックで自動入力`),
        space: {
          // left: 20,
          // right: 20,
          top: 0,
          // bottom: 20,
          // icon: 10
        }
      }),

      footer: this.rexUI.add.sizer({
        //x: 400, y: 300,
        //width: 400, height: 40,
        orientation: 'x',
      })
        .add(
          this.add.zone(),             // child
          1,              // proportion, fixed width
          'center'                     // align vertically
        )
        .add(
          this.add.text(0, 0, `${data.evCount}/${data.evTotal}`),// child
          0,                           // proportion, fixed width
          'right'                     // align vertically
        )
        .layout(),

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
        top: 6,
        bottom: 5,

        table: 10,
        header: 5,
        footer: 0,
      },

      createCellContainerCallback: function (cell, cellContainer) {
        const scene = cell.scene,
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
        cellContainer.id = item.id;
        cellContainer.idString = item.idString;
        return cellContainer;
      },

      items: data.menuItems,
    })
      .layout()
    //.drawBounds(this.add.graphics(), 0xff0000);

    this.gridTable
      .on('cell.click', (cellContainer, cellIndex) => {
        // console.log(cellContainer.id);
        this.eventObj.events.emit('autoFloor', cellContainer.id, cellContainer.idString)
      });
    // .on('cell.over', function (cellContainer, cellIndex) {
    //   cellContainer.getElement('background')
    //     .setStrokeStyle(2, 0xaaaaaa)
    //     .setDepth(1);
    //   // console.log(cellContainer);
    // }, this)
    // .on('cell.out', function (cellContainer, cellIndex) {
    //   cellContainer.getElement('background')
    //     .setStrokeStyle(2, 0xffffff)
    //     .setDepth(0);
    // }, this)

    this.eventObj = this.scene.get('game');

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

function destructor(scene) {
  scene.gridTable.removeAllListeners();
  scene.gridTable.destroy(); // also destroy all children. : see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/containerlite/#compare-with-official-container
  scene.tweens.remove(scene.tw_1);
  scene.events.off('evmove');
  // scene.events.destroy(); // do not work : scene.event全体がおかしくなる
}