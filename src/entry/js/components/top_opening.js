jQuery(function () {
  var webStorage = function () {
    if (sessionStorage.getItem('access')) {
      // 2回目以降のアクセス
      console.log('2回目以降のアクセスです');
      var openingForm = document.getElementById('openingForm');
      openingForm.style.display = 'none';
    } else {
      // 初回アクセス
      sessionStorage.setItem('access', 0);
      console.log('初回アクセスです');
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
  var soundData = document.querySelector("input[name=sound]");
  var yourNameData = document.querySelector("input[name=yourName]");
  var AInameData = document.querySelector("input[name=AIname]");
  //var vrmFileData = document.querySelector("input[name=vrmFile]");

  var formData = {
    sound: soundData.checked, // boolean
    yourName: yourNameData.value, // str
    AIname: AInameData.value, // str
    //vrmFile: vrmFileData.value // str
  };

  var postFormData = JSON.stringify(formData);

  $.ajax("/opening", {
    type: "post",
    data: postFormData,
    dataType: "json",
  });

  //追加
  /*
  var formData = new FormData($('#uploadForm')[0]);
  console.log(formData)
  $.ajax({
    url: '/upload',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    timeout: 10000
}).done(function (data) {
 
  //PATHの受取
  path = JSON.parse(data.values).path

  var modelChangeBtn = document.getElementById("modelChange")

  modelChangeBtn.value = path;

  modelChangeBtn.click();


}).fail(function () {
  console.log('fail');
});
*/


  setTimeout(fadeout, 900);

  if (soundData.checked == true) {
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
    },1500);
  }
})
