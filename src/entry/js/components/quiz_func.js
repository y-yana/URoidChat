const quiz = new Vue({
  el: '#quiz',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    select: true,
    quizNameOption: true,
    info: null,
    quiz: null,
    quizNumArr: [],
    i: 0,
    j: 0,
    n: 37,
    temp: 0
  },
  mounted() {
    axios
      .get('./static/json/quiz.json')
      .then(response => { this.info = response.data.quiz })
    this.createArr()
  },
  methods: {
    createArr: function () {
      var i = this.i
      this.quizNumArr.splice(0, this.quizNumArr.length)
      for (i = 0; i < 37; i++){
        this.quizNumArr.push(i);
      }
      console.log(this.quizNumArr)
    },
    createQuiz: function (value) {
      this.getQuizData(value)
      this.shuffleArr()
    },
    getQuizData: function (value) {
      axios
        .get('./static/json/' + this.info[value].quizName + '.json')
        .then(response => { this.quiz = response.data })
    },
    shuffleArr: function () {
      var n = this.n
      var temp = this.temp
      var j = this.j
      var arr = this.quizNumArr
      while (n) {
        j = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[j];
        arr[j] = temp;
      }
      console.log(this.quizNumArr)
    }
  }
});
