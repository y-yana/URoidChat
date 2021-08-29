const quiz = new Vue({
  el: '#quiz',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    selectQuiz: true,
    askQuestion: true,
    quizNameOption: true,
    quizAnswerOption: true,
    resultRanking: true,
    info: null,
    quiz: null,
    quizNumArr: [],
    i: 0,
    j: 0,
    n: 37,
    temp: 0,
    quizName: '',
    selectQuizNum: 0,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    questionNumUse: 0,
    questionNumShow: 1
  },
  mounted() {
    axios
      .get('./static/json/quiz.json')
      .then(response => { this.info = response.data.quiz })
  },
  methods: {
    createQuiz: function (value) {
      this.selectQuizNum = value
      this.getQuizDataJSON()
      this.createArr()
      this.shuffleArr()
      this.quizNumArr = this.quizNumArr.slice(0, 10)
      this.getQuizDataDetail()
    },
    getQuizDataJSON: function () {
      axios
        .get('./static/json/' + this.info[this.selectQuizNum].quizName + '.json')
        .then(response => { this.quiz = response.data })
    },
    createArr: function () {
      var i = this.i
      this.quizNumArr.splice(0, this.quizNumArr.length)
      for (i = 0; i < 37; i++){
        this.quizNumArr.push(i);
      }
      console.log(this.quizNumArr)
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
    },
    getQuizDataDetail: function () {
      var quizGet = this.quiz[this.info[this.selectQuizNum].quizName][this.quizNumArr[this.questionNumUse]]
      this.question = quizGet.question
      this.option1 = quizGet.option1
      this.option2 = quizGet.option2
      this.option3 = quizGet.option3
      this.option4 = quizGet.option4
      this.answer = quizGet.answer
    },
    nextQuestion: function () {
      this.questionNumUse += 1
      this.questionNumShow += 1
      if (this.questionNumUse < 10) {
        this.getQuizDataDetail()
      } else {
        this.questionNumUse = 0
        this.questionNumShow = 1
      }
    },
    judgeSelectAnswer: function (ans) {
      console.log(ans)
      console.log('option' + ans)
      var selectOptionName = 'option' + ans
      if (this.answer == selectOptionName) {
        console.log('○')
      } else {
        console.log('×')
      }
    }
  }
});
