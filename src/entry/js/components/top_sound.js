const opening_checkbox = new Audio("./static/sound/sound_effect/opening_checkbox.mp3");

document.getElementById("sound").onclick = function () {
  var soundCheck = document.getElementById("sound").checked
  if (soundCheck == true) {
    opening_checkbox.play();
  }
}
