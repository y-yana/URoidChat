document.getElementById('enterTheRoom').onclick = function () {
  // room選択画面の非表示
  var roomChoiceArea = document.getElementById('roomChoiceArea');
  roomChoiceArea.style.display = 'none';
  // topに戻るボタンの非表示
  var topMoveBtn = document.getElementById('topMoveBtn');
  topMoveBtn.style.display = 'none';
  // room選択画面に戻るボタンの表示
  var leaveButton = document.getElementById('leaveButton');
  leaveButton.style.display = 'block';
  // room名&ニックネームの表示
  var messageHeader = document.getElementById('messageHeader');
  messageHeader.style.display = 'block';
  // おえかき画面の表示
  var oekakiRoomArea = document.getElementById('oekakiRoomArea');
  oekakiRoomArea.style.display = 'block';
}
