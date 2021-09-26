const top_choice = new Audio("./static/sound/sound_effect/top_choice.mp3");
const cancel = new Audio("./static/sound/sound_effect/cancel.mp3");

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
        switch (value){
          case 0:
            top_choice.play();
            var tutorial = new Audio("./static/sound/top_voice/top_tutorial_chat.mp3");
            tutorial.play();
            break;
          case 1:
            top_choice.play();
            var tutorial = new Audio("./static/sound/top_voice/top_tutorial_shiritori.mp3");
            tutorial.play();
            break;
          case 2:
            top_choice.play();
            var tutorial = new Audio("./static/sound/top_voice/top_tutorial_quiz.mp3");
            tutorial.play();
            break;
          case 3:
            top_choice.play();
            var tutorial = new Audio("./static/sound/top_voice/top_tutorial_nigaoe.mp3");
            tutorial.play();
            break;
          /*case 4:
            top_choice.play();
            var tutorial = new Audio("./static/sound/top_voice/top_tutorial_oekaki.mp3");
            tutorial.play();
            break;*/
          default:
            cancel.play();
            console.log('Comming soon...');
        }
      }
      this.choiceGameNum = value
      if (value < 4) {
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
      var sound = document.getElementById('vueSound').value;
      if (sound == 'True') {
        cancel.play();
      }
    }
  }
});
