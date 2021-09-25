const top_choice = new Audio("./static/sound/sound_effect/top_choice.mp3");

const shiritori = new Vue({
  el: '#top',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
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
    showTutorial: function (value) {
      var sound = document.getElementById('vueSound').value;
      if (sound == 'True') {
        top_choice.play();
      }
      this.choiceGameNum = value
      if (value < 5) {
        this.gameChoice = false
        this.tutorial = true
        this.modelMessage = this.info[this.choiceGameNum].dialogue
      } else {
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
