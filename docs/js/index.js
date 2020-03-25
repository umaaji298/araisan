var target = document.getElementById('phaser-game');
// const btn = document.getElementById('fullscreenSwitch');
var footnavi = document.getElementById('footnavi');

var styleBeforeW = 800;
var styleBeforeH = 600;

target.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
  } else {
    console.log('Leaving full-screen mode.');

    //phaserのscreenfitサイズがおかしくなるので再設定
    target.firstChild.style.width = styleBeforeW;
    target.firstChild.style.height = styleBeforeH;

    footnavi.disabled = false;
  }
});


/*フルスクリーン実行用ファンクション*/
function goFS() {
  if (target.requestFullscreen) {

    //special fix(よくない)
    footnavi.disabled = true;    

    //変更前の値を取得
    styleBeforeW = target.firstChild.style.width;
    styleBeforeH = target.firstChild.style.height;

    target.requestFullscreen() // HTML5 Fullscreen API仕様

  } else {
    alert('ご利用のブラウザはフルスクリーン操作に対応していません')
    return
  }
}