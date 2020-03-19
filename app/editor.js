import 'phaser';

import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import Scenes from './scenes_editor/scenes'

var audioContext = new ((window).AudioContext || (window).webkitAudioContext)();

var config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-editor',
    // mode: Phaser.Scale.FIT,
    mode:Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  audio: {
    context: audioContext,
  },
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: UIPlugin,
      mapping: 'rexUI'
    }]
  },
  backgroundColor: '#000000',
  scene: Scenes
};

var game;

$('#preview').click(()=>{
  console.log('preview clicked');
  $('#preview').hide();
  $('#preview_close').show();
  game = new Phaser.Game(config);
})

$('#preview_close').click(()=>{
  console.log('preview_close clicked');
  $('#preview_close').hide();
  $('#preview').show();
  game.plugins.removeScenePlugin('rexUI'); // needs remove scene plugin
  game.destroy(true);
})


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
