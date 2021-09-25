const oekakiRoom = new Vue({
  el: '#roomChoiceArea',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    roomData: [
      {
        roomName: 'HTML'
      },
      {
        roomName: 'css'
      },
      {
        roomName: 'JavaScript'
      },
      {
        roomName: 'Sass'
      },
      {
        roomName: 'TypeScript'
      },
      {
        roomName: 'Vue.js'
      },
      {
        roomName: 'Three.js'
      },
      {
        roomName: 'Python'
      },
      {
        roomName: 'Flask'
      },
      {
        roomName: 'jQuery'
      },
      {
        roomName: 'webpack'
      },
      {
        roomName: 'WebSocket'
      },
      {
        roomName: 'Docker'
      },
      {
        roomName: 'Unity'
      },
      {
        roomName: 'Heroku'
      }
    ]
  },
  methods: {
    sendVue: function (roomName) {
      //console.log('sendVue')
      //console.log(roomName)
      var roomNameInput = document.getElementById('roomNameInput')
      roomNameInput.value = roomName
      document.getElementById('roomSubmit').click();
    }
  }
});
