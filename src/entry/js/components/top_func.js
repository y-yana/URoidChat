const shiritori = new Vue({
  el: '#top',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    audio: true,
    info: null,
    modelMessage: '私と何をして遊びますか？？',
    gameChoice: true,
    tutorial: false,
    choiceGameNum: 0
  },
  mounted() {
    axios
      .get('./static/json/tutorial.json')
      .then(response => { this.info = response.data.allGames })
  },
  methods: {
    audioCheck: function (text) {
      if (text == "yes") {
        const voice = new Audio("./static/sound/sampleVoice.mp3")
        voice.play();
      }
      this.audio = false
    },
    showTutorial: function (value) {
      console.log(value)
      this.choiceGameNum = value
      if (value < 5) {
        console.log('ok')
        this.gameChoice = false
        this.tutorial = true
        this.modelMessage = this.info[this.choiceGameNum].dialogue
      } else {
        console.log('comming soon')
        this.gameChoice = true
        this.tutorial = false
        this.modelMessage = 'もうちょっと待っててね！'
      }
    },
    cancel: function () {
      this.gameChoice = true
      this.tutorial = false
      this.modelMessage = '私と何をして遊びますか？？'
    }
  }
});
