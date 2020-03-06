//var target = document.getElementsByClassName('GamePlayerCore')[0]
var target = document.getElementById('phaser-game')
var btn = document.getElementById('fullscreenSwitch')

var styleBeforeW = 800;
var styleBeforeH = 600;

target.addEventListener('fullscreenchange', (event) => {
  // document.fullscreenElement は、全画面モードにある要素があれば
  // それを指します。要素がなければ、このプロパティの値は null に
  // あります。
  if (document.fullscreenElement) {
    console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
  } else {
    console.log('Leaving full-screen mode.');

    target.firstChild.style.width = styleBeforeW;
    target.firstChild.style.height = styleBeforeH;
  }
});


/*フルスクリーン実行用ファンクション*/
function goFS() {
  if (target.requestFullscreen) {
    //変更前の値を取得
    styleBeforeW = target.firstChild.style.width;
    styleBeforeH = target.firstChild.style.height;
    target.requestFullscreen() // HTML5 Fullscreen API仕様
  } else {
    alert('ご利用のブラウザはフルスクリーン操作に対応していません')
    return
  }
}