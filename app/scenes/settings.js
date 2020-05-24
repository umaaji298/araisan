export default class Settings extends Phaser.Scene {

  constructor() {
    super({ key: 'settings' });
  }

  create() {
    console.log('%c Settings ', 'background: green; color: white; display: block;');

    this.cameras.main.setBackgroundColor('rgba(50,50,50,0.5)');

    this.add.text(400, 100, "Settings", {
      fontSize: 30,
    }).setOrigin(0.5);

    this.buttons = this.rexUI.add.buttons({
      x: 400, y: 300,
      // width: 100,
      orientation: 'y',

      buttons: [
        createButton(this, '探索済みデータをすべて消す'),
        createButton(this, '戻る'),
      ],

      align: 'center',
      expand: false,
      space: 50,
    })
      .layout()
    // //.drawBounds(this.add.graphics(), 0xff0000)

    //start menu
    this.eventObj = this.scene.get('start');

    this.buttons
      .on('button.click', function (button, index, pointer, event) {
        switch (index) {
          case 0: {
            if (storageAvailable('localStorage')) {
              localStorage.removeItem('endEvents');
            }
            button.getElement('text').setText('消去しました。');
            break;
          }
          case 1: {
            const scene = button.scene;
            scene.eventObj.events.emit('settingsExit'); // intaractive復活
            destructor(scene);
            scene.scene.stop('settings');
            break;
          }
        }
      });
  }
}

var createButton = function (scene, text) {
  return scene.rexUI.add.label({
    width: 40,
    height: 40,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, 0x111217).setStrokeStyle(1, 0xadb5e8, 1),
    text: scene.add.text(20, 20, text, {
      fontSize: 18,
      color: '#fff',
      padding: {
        top: 5,
      },
    }),
    space: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  });
}

function destructor(scene) {
  scene.buttons.removeListener('button.click');
  scene.buttons.destroy();
}
