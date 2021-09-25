jQuery(function () {
  var webStorage = function () {
    if (sessionStorage.getItem('access')) {
      // 2回目以降のアクセス
      //console.log('2回目以降のアクセスです');
      var openingForm = document.getElementById('openingForm');
      openingForm.style.display = 'none';
    } else {
      // 初回アクセス
      sessionStorage.setItem('access', 0);
      //console.log('初回アクセスです');
      var openingElement = document.getElementById('openingFormContents');
      $(openingElement).addClass('is-fadein');
    }
  }
  webStorage();
});

function fadeout() {
  $('#openingForm').fadeOut('slow');
}

$("#openingBtn").on('click', function(){
  var soundData = document.getElementById("sound").checked
  var yourNameData = document.getElementById("yourName").value;
  var AInameData = document.getElementById("AIname").value;

  var formData = {
    sound: soundData,
    yourName: yourNameData,
    AIname: AInameData,
  };

  var postFormData = JSON.stringify(formData);

  $.ajax("/opening", {
    type: "post",
    data: postFormData,
    dataType: "json",
  });

  setTimeout(fadeout, 1300);

  if (soundData == true) {
    document.getElementById('vueSound').value = 'True';

    const opening_start = new Audio("./static/sound/sound_effect/opening_start.mp3");
    opening_start.play();

    var now = new Date();
    var Hour = now.getHours();

    if (Hour >= 5 && Hour < 11) {
      const voice = new Audio("./static/sound/greeting/morning.mp3");
    } else if (Hour >= 11 && Hour < 19) {
      const voice = new Audio("./static/sound/greeting/daytime.mp3");
    } else {
      const voice = new Audio("./static/sound/greeting/night.mp3");
    }

    setTimeout(function () {
      voice.play();
    },1700);
  }
})
