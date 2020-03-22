const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class Menu extends Phaser.Scene {

  constructor() {
    super('menu');
  }

  preload() {
  }

  create(data) {

    console.log('%c menu ', 'background: green; color: white; display: block;');

    var tabs = this.rexUI.add.tabs({
      x: 270,
      y: 282,

      //background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x333333),

      //panel: this.rexUI.add.roundRectangle(0, 0, 500, 407, 0, 0x283593),

      panel: this.rexUI.add.gridTable({
        background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x283593),

        table: {
          width: 250,
          height: 400,

          cellWidth: 120,
          cellHeight: 60,
          columns: 1,
          mask: {
            padding: 2,
          },
        },

        createCellContainerCallback: function (cell) {
          var scene = cell.scene,
            width = cell.width,
            height = cell.height,
            item = cell.item,
            index = cell.index;
          return scene.rexUI.add.label({
            width: width,
            height: height,

            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
            text: scene.add.text(0, 0, item.id),

            space: {
              icon: 10,
              left: 15
            }
          });
        },
      }),

      bottomButtons: [
        createButton(this, '同／期'),
        createButton(this, '新／期'),
      ],

      space: {
        bottomButtonsOffset: 10,
        bottomButton: 10
      },

      items: getItems(100)
    })
      .layout()
      .drawBounds(this.add.graphics(), 0xff0000);

    this.print = this.add.text(0, 0, '');
    tabs
      .on('button.click', function (button, groupName, index) {
        this.print.text += groupName + '-' + index + '\n';
        // tabs.getElement('panel').setFillStyle(button.fillColor);
      }, this)

  }
}

var createButton = function (scene, text) {
  return scene.rexUI.add.label({
    width: 100,
    height: 50,
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, { bl: 4, br: 4 }, 0x283593),
    text: scene.add.text(0, 0, text, {
      fontSize: '20pt'
    }),
    space: {
      left: 10
    }
  });
}

var getItems = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push({
      id: i,
      color: Random(0, 0xffffff)
    });
  }
  return data;
}