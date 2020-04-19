export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
  }

  preload() {

    this.fontsys = { fontSize: '20px', color: '#fff', maxLines: 2, padding: { x: 10, y: 10, left: 0, right: 0, top: 0, buttonm: 0 } };
  }

  create(data) {
    console.log('%c menu ', 'background: green; color: white; display: block;');

    // //Layouts
    this.tabs = this.rexUI.add.tabs({
      x: 270,
      y: 302,

      //background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x333333),

      panel: createGridTable(this, data),

      bottomButtons: [
        createButton(this, '未探索', 0.3),
        createButton(this, '探索済', 0.1),
      ],

      space: {
        // left: 20,
        // right: 20,
        // top: 20,
        // bottom: 20,
        bottomButtonsOffset: 20,
        bottomButton: 10
      }
    })
      .layout()
    // .drawBounds(this.add.graphics(), 0xff0000);

    this.tabs.getElement('panel')
      .on('cell.click', (cellContainer, cellIndex) => {
        // console.log(cellContainer.id);
        this.eventObj.events.emit('autoFloor', cellContainer.id, cellContainer.idString)
      });

    // this.print = this.add.text(0, 0, '');
    this.tabs
      .on('button.click', function (button, groupName, index) {
        if (this.currentTabIndex === index) return; // 同じtabclick : 早期return
        // this.print.text += groupName + '-' + index + '\n';

        //before
        const btns = this.tabs.getElement('bottomButtons');
        btns[this.currentTabIndex].getElement('background').setAlpha(0.1);

        //current
        btns[index].getElement('background').setAlpha(0.3);
        this.currentTabIndex = index;

        // console.log(this.grid);
        if (index === 0) {
          //未読
          this.grid.setItems(getMenuItems(data.menuItems));
          this.grid.scrollToTop();
          this.grid.setScrollerEnable = false;
          this.grid.setSliderEnable = false;
          this.grid.getElement('slider').setVisible(false);
          this.footer.setText(`${data.evCount}/${data.evTotal}`);
        } else {
          //既読
          this.grid.setItems(getMenuItems(data.endItems));
          if (data.endCount > 6) {
            this.grid.setScrollerEnable = true;
            this.grid.setSliderEnable = true;
            this.grid.getElement('slider').setVisible(true);
          }

          //footer special
          let footerText = `${data.endCount}/${data.evTotal}`;
          if(data.endCount === data.evTotal){
            footerText = `🌟${data.endCount}/${data.evTotal}`;
          }

          this.footer.setText(footerText);
        }
        // console.log(grid);

      }, this);

    this.grid = this.tabs.getElement('panel');
    this.grid.getElement('slider').setVisible(false);
    this.grid.setScrollerEnable = false;
    this.grid.setSliderEnable = false;
    this.footer = this.grid.getElement('footer').getChildren()[1];

    this.currentTabIndex = 0;
    //this.tabs.emitButtonClick('left', 0);

    // Events
    this.eventObj = this.scene.get('game');

    this.events.on('evmove', () => {
      console.log('call evmove');
      this.tw_1 = this.tweens.add({
        targets: this.tabs,
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

function createButton(scene, text, alpha) {
  return scene.rexUI.add.label({
    width: 100,
    height: 50,
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, { bl: 4, br: 4 }, 0xadb5e8).setAlpha(alpha),
    text: scene.add.text(0, 0, text, {
      fontSize: '20pt'
    }),
    space: {
      left: 10
    }
  });
}

function createGridTable(scene, data) {
  //footer special
  let footerText = `${data.evCount}/${data.evTotal}`;

  return scene.rexUI.add.gridTable({
    // x: 270,
    // y: 282,
    width: 500,
    height: 410,

    scrollMode: 0,

    background: scene.add.image(0, 0, 'menu_back').setAlpha(0.3),

    header: scene.rexUI.add.label({
      text: scene.add.text(0, 0, `クリックで自動入力`, {
        padding: {
          top: 5,
        },
      }),
    }),

    footer: scene.rexUI.add.sizer({
      //x: 400, y: 300,
      //width: 400, height: 40,
      orientation: 'x',
    })
      .add(
        scene.add.zone(),             // child
        1,              // proportion, fixed width
        'center'                     // align vertically
      )
      .add(
        scene.add.text(0, 0, footerText),// child
        0,                           // proportion, fixed width
        'right',                     // align vertically
        {
          left: 0,
          right: 30,
          top: 0,
          bottom: 0
        }
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

    slider: {
      track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x111217),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xadb5e8),
    },

    space: {
      left: 20,
      right: 10,
      top: 0,
      bottom: 3,

      table: 10,
      header: 0,
      footer: 0,
    },

    createCellContainerCallback: function (cell, cellContainer) {
      const _scene = cell.scene,
        width = cell.width,
        height = cell.height,
        item = cell.item,
        index = cell.index;

      if (item.removed) {
        return null;
      }
      if (cellContainer === null) {
        cellContainer = _scene.rexUI.add.label({
          width: width,
          height: height,

          orientation: 0,
          background: _scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0xffffff),
          icon: _scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
          text: _scene.add.text(0, 0, '', _scene.fontsys),

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

    items: getMenuItems(data.menuItems),

  });
}

function getMenuItems(items) {
  let target = [];
  return Object.assign(target, items)
}

function destructor(scene) {
  const gridTable = scene.tabs.getElement('panel');
  gridTable.removeAllListeners();
  gridTable.destroy(); // also destroy all children. : see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/containerlite/#compare-with-official-container
  scene.tabs.removeAllListeners();
  scene.tabs.destroy();

  scene.tweens.remove(scene.tw_1);
  scene.events.off('evmove');
  // scene.events.destroy(); // do not work : scene.event全体がおかしくなる
}