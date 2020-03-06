var target = document.getElementsByClassName('GamePlayerCore')[0]
var btn = document.getElementById('fullscreenSwitch')

/*フルスクリーン実行用ファンクション*/
function goFS() {
  if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen() //Chrome15+, Safari5.1+, Opera15+
  } else if (target.mozRequestFullScreen) {
    target.mozRequestFullScreen() //FF10+
  } else if (target.msRequestFullscreen) {
    target.msRequestFullscreen() //IE11+
  } else if (target.requestFullscreen) {
    target.requestFullscreen() // HTML5 Fullscreen API仕様
  } else {
    alert('ご利用のブラウザはフルスクリーン操作に対応していません')
    return
  }
}