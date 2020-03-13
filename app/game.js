import 'phaser';

import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import ShakePositionPlugin from 'phaser3-rex-plugins/plugins/shakeposition-plugin.js';
import TCRPPlugin from 'phaser3-rex-plugins/plugins/tcrp-plugin.js'

import Scenes from './scenes/scenes'

var audioContext = new ((window).AudioContext || (window).webkitAudioContext)();

var config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    //autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    width: 800,
    height: 600
  },
  audio: {
    context: audioContext,
  },
  plugins: {
    global: [{
      key: 'rexShakePosition',
      plugin: ShakePositionPlugin,
      start: true // start timing?
    },
    {
      key: 'rexTCRP',
      plugin: TCRPPlugin,
      start: true // start timing?
    }],
    scene: [{
      key: 'rexUI',
      plugin: UIPlugin,
      mapping: 'rexUI'
    }]
  },
  backgroundColor: '#000000',
  scene: Scenes
};

var game = new Phaser.Game(config);

// for ios
window.addEventListener('focus', function (event) {
  setTimeout(function () {
    console.log('resuming…')
    audioContext.resume();
  }, 1000);
},
  false);

// for ios
document.addEventListener('touchstart', initAudioContext);
function initAudioContext() {
  document.removeEventListener('touchstart', initAudioContext);
  // wake up AudioContext
  const emptySource = ctx.createBufferSource();
  emptySource.start();
  emptySource.stop();
}
