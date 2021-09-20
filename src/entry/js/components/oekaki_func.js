/*
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
*/

const oekakiRoom = new Vue({
  el: '#roomChoiceArea',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    roomData: [
      {
        roomName: 'HTML',
        id: 'roomName-1'
      },
      {
        roomName: 'css',
        id: 'roomName-2'
      },
      {
        roomName: 'JavaScript',
        id: '3'
      },
      {
        roomName: 'Sass',
        id: '4'
      },
      {
        roomName: 'TypeScript',
        id: '5'
      },
      {
        roomName: 'Vue.js',
        id: '6'
      },
      {
        roomName: 'Three.js',
        id: '7'
      },
      {
        roomName: 'Python',
        id: '8'
      },
      {
        roomName: 'Flask',
        id: '9'
      },
      {
        roomName: 'jQuery',
        id: '10'
      },
      {
        roomName: 'webpack',
        id: '11'
      },
      {
        roomName: 'WebSocket',
        id: '12'
      },
      {
        roomName: 'Docker',
        id: '13'
      },
      {
        roomName: 'Unity',
        id: '14'
      },
      {
        roomName: 'Heroku',
        id: '15'
      }
    ]
  },
  methods: {
    sendVue: function (roomName) {
      console.log('sendVue')
      console.log(roomName)
      var roomNameInput = document.getElementById('roomNameInput')
      roomNameInput.value = roomName
      document.getElementById('roomSubmit').click();
    }
  }
});
