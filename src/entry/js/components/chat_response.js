window.addEventListener('DOMContentLoaded',() => {
  // canvasサイズの制御
  // 表示用のサイズを格納する変数
  var newWidth
  var newHeight

  // 画面サイズを取得
  var getWidth = window.innerWidth;
  var getHeight = window.innerHeight;

  // レスポンシブ対応
  if (getWidth <= 950) {
    // 比率計算(mobile)
    newWidth = Math.floor(getWidth * 0.8)
    newHeight = Math.floor(getHeight * 0.8)
    // #chatAreaの高さを設定
    var chatArea = document.getElementById('chatArea')
    chatArea.style.height = '16rem'
    var setting = document.getElementById('setting')
    setting.style.display = 'none'
  } else {
    // 比率計算(desktop)
    newWidth = Math.floor(getWidth * (2 / 5))
    newHeight = Math.floor(getHeight * (5 / 7))
    // #chatAreaの高さを設定
    var chatArea = document.getElementById('chatArea')
    chatArea.style.height = newHeight + 'px'

  // canvas生成
  var modelArea = document.getElementById('modelArea');
  modelArea.innerHTML = '<canvas id="canvas" width="' + newWidth + 'px" height="' + newHeight + 'px"></canvas>';
  }});