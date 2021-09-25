const oekakiRoom = new Vue({
  el: '#roomChoiceArea',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    roomData: ['HTML','css','JavaScript','Sass','TypeScript','Vue.js','Three.js','Python','Flask','jQuery','webpack','WebSocket','Docker','Unity','Heroku'
    ]
  },
  methods: {
    sendVue: function (roomName) {
      var roomNameInput = document.getElementById('roomNameInput')
      roomNameInput.value = roomName
      document.getElementById('roomSubmit').click();
    }
  }
});
