const quiz = new Vue({
  el: '#quiz',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    select: true,
    option: true,
    info: null,
    quiz: null
  },
  mounted() {
    axios
      .get('./static/json/quiz.json')
      .then(response => { this.info = response.data.quiz })
  },
  methods: {
    createQuiz: function (value) {
      this.getQuizData(value)
    },
    getQuizData: function (value) {
      axios
        .get('./static/json/' + this.info[value].quizName + '.json')
        .then(response => { this.quiz = response.data })
    }
  }
});
