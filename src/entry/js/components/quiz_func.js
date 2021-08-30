const quiz = new Vue({
  el: '#quiz',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    selectQuiz: true,
    askQuestion: false,
    yourResult: false,
    quizNameOption: true,
    quizAnswerOption: false,
    resultRanking: false,
    info: null,
    quiz: null,
    quizNumArr: [],
    quizName: '',
    selectQuizNum: 0,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answerNum: '',
    answerText: '',
    questionNumUse: 0,
    questionNumShow: 1,
    trueCounter: 0,
    nextQuestionBtnText: '次の問題'
  },
  mounted() {
    axios
      .get('./static/json/quiz.json')
      .then(response => { this.info = response.data.quiz })
  },
  methods: {
    createQuiz: async function (value) {
      this.selectQuizNum = value
      await this.getQuizDataJSON()
      this.createArr()
      this.shuffleArr()
      this.quizNumArr = this.quizNumArr.slice(0, 10)
      this.getQuizDataDetail()
      this.selectQuiz = false
      this.quizNameOption = false
      this.askQuestion = true
      this.quizAnswerOption = true
    },
    getQuizDataJSON: async function () {
      let ret = null
      await axios
        .get('./static/json/' + this.info[this.selectQuizNum].quizName + '.json')
        .then(response => { this.quiz = response.data })
      return ret
    },
    createArr: function () {
      var i = 0
      this.quizNumArr.splice(0, this.quizNumArr.length)
      for (i = 0; i < 37; i++){
        this.quizNumArr.push(i);
      }
      console.log(this.quizNumArr)
    },
    shuffleArr: function () {
      var n = 37
      var temp = 0
      var j = 0
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
      this.answerNum = quizGet.answerNum
      this.answerText = quizGet.answerText
    },
    nextQuestion: function () {
      this.questionNumUse += 1
      this.questionNumShow += 1
      if (this.questionNumUse < 10) {
        this.getQuizDataDetail()
      } else {
        this.questionNumUse = 0
        this.questionNumShow = 1
        this.askQuestion = false
        this.quizAnswerOption = false
        this.yourResult = true
        this.resultRanking = true
      }
    },
    judgeSelectAnswer: function (ans) {
      console.log(ans)
      if (this.answerNum == ans) {
        console.log('○')
        this.trueCounter += 1
      } else {
        console.log('×')
      }
      if (this.questionNumUse == 9) {
        this.nextQuestionBtnText = '結果を見る'
      }
    },
    replaySameQuiz: function () {
      console.log('replay')
      this.yourResult = false
      this.resultRanking = false
      this.askQuestion = true
      this.quizAnswerOption = true
      this.resetQuizPlayData()
      this.createQuiz(this.selectQuizNum)
    },
    replayAnotherQuiz: function () {
      console.log('another')
      this.yourResult = false
      this.resultRanking = false
      this.selectQuiz = true
      this.quizNameOption = true
      this.resetQuizPlayData()
    },
    resetQuizPlayData: function () {
      this.trueCounter = 0
      this.nextQuestionBtnText = '次の問題'
    }
  }
});
