window.onload = function () {
  var openingElement = document.getElementById('openingFormContents');
  $(openingElement).addClass('is-fadein');
}

function fadeout() {
  $('#openingForm').fadeOut('slow');
}

$("#openingBtn").on('click', function(){
  var soundData = document.querySelector("input[name=sound]");
  var yourNameData = document.querySelector("input[name=yourName]");
  var AInameData = document.querySelector("input[name=AIname]");
  var vrmFileData = document.querySelector("input[name=vrmFile]");

  var formData = {
    sound: soundData.checked, // boolean
    yourName: yourNameData.value, // str
    AIname: AInameData.value, // str
    vrmFile: vrmFileData.value // str
  };

  var postFormData = JSON.stringify(formData);

  $.ajax("/opening", {
    type: "post",
    data: postFormData,
    dataType: "json",
  });

  setTimeout(fadeout, 900);

  if (soundData.checked == true) {
    const voice = new Audio("./static/sound/sampleVoice.mp3");
    setTimeout(function () {
      voice.play();
    },2000);
  }

})
