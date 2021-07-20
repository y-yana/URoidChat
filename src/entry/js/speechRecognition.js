window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = '';

var recNow = document.getElementById('recNow');

$(document).on('click', '#recStart_', function () {
  // 点滅開始
  recNow.style.display = 'block';
  recNow.classList.add('recNow');

  // 録音開始ボタンの削除
  var recStartBtn = document.getElementById('recStart_');
  recStartBtn.style.display ="none";

  // 録音終了ボタンを追加
  var recStopBtn = document.getElementById('recStop_');
  recStopBtn.style.display ="block";

  // 送信ボタンの無効化
  $("#chatSubmitBtn").prop("disabled", true);

  // 録音開始
  recognition.start();
})

$(document).on('click', '#recStop_', function () {
  // 点滅終了
  recNow.classList.remove("recNow");
  recNow.style.display = 'none';

  // 録音終了ボタンの削除
  var recStopBtn = document.getElementById('recStop_');
  recStopBtn.style.display ="none";

  // 録音開始ボタンを追加
  var recStartBtn = document.getElementById('recStart_');
  recStartBtn.style.display ="block";

  // 録音終了
  recognition.stop();

  // 送信ボタンの有効化
  $("#chatSubmitBtn").prop("disabled", false);
})

recognition.onresult = function (event) {
  let interimTranscript = '';
  finalTranscript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      transcript += "。\n";
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  document.getElementById("chatMessage").value = finalTranscript + interimTranscript;
}

// 録音中表示の点滅
$(function () {
  setInterval(function () {
    $('.recNow').fadeOut(1000, function () { $(this).fadeIn(1000) });
  }, 2000);
});
