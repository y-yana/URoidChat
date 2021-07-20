document.getElementById('muteBtn').onclick = function () {
  var parent = document.getElementById('muteBtn');

  // 現在の子要素のidを取得
  var mute_check = $(this).children().attr('id');

  // 現在の子要素を削除
  var element = document.getElementById(mute_check);
  element.remove();

  var newElement = document.createElement('button');
  var newContent = document.createElement("span");

  if (mute_check == 'mute') {
    newElement.setAttribute("id", "unmute");
    newContent.setAttribute("class", "material-icons");
    var text = document.createTextNode("volume_up");
    newContent.appendChild(text);
    mute_num = 0;
  } else {
    newElement.setAttribute("id", "mute");
    newContent.setAttribute("class", "material-icons");
    var text = document.createTextNode("volume_off");
    newContent.appendChild(text);
    mute_num = 1;
  }

  // 要素を追加
  newElement.appendChild(newContent);
  parent.appendChild(newElement);
}
