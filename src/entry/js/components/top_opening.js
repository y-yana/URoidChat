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

  // ここにsoundがtrueの場合に音声を再生させる処理を書く

  })
