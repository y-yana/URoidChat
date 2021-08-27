const shiritori = new Vue({
  el: '#shiritori',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    inputText: '',
    warning: '',
    arrNum: 0,
    // textArr = 表示用配列
    textArr: [],
    // check = 重複チェック用配列
    check: ['しりとり'],
    result: '',
    submitBtnDisabled: false,
    replayQuestion: false
  },
  created: function () {
    this.resetArr()
    this.reset()
    this.input()
  },
  methods: {
    submit: function () {
      var newText = this.inputText
      var search = this.check.indexOf(newText);

      // 重複チェック
      if (search != -1) {
        this.result = '「' + newText + '」は既出なので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
      }

      // 「ん」チェック
      var endStr = newText.slice(-1)
      if (endStr == 'ん') {
        this.result = '最後に「ん」がついたので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
      }

      this.arrNum += 1

      this.check.push(newText)
      this.textArr.push({ id: this.arrNum, text: newText })

      this.inputText = ''
    },
    replay: function () {
      console.log('replay')
      this.resetArr()
      this.reset()
      this.input()
    },
    back: function () {
      console.log('back')
      this.reset()
      this.textArr.push({ id: this.arrNum, text: 'またあそぼうね！' })
    },
    resetArr: function () {
      this.submitBtnDisabled = false
      this.textArr = []
      this.check = ['しりとり']
    },
    reset: function () {
      this.result = ''
      this.replayQuestion = false
    },
    input: function () {
      this.textArr.push({ id: this.arrNum, text: 'すべてひらがなで回答してね' })
      this.textArr.push({id: this.arrNum, text: 'それでは私から始めます！' })
      this.textArr.push({ id: this.arrNum, text: 'しりとり' })
    }
  },
  watch: {
    inputText: function () {
      var textCheck = this.inputText
      var submitBtn = document.getElementById('submitBtn')

      if (textCheck.match(/^[ぁ-んー]+$/)) {
        submitBtn.disabled = false
        this.warning = ''
      } else {
        submitBtn.disabled = true
        if (textCheck != '') {
          this.warning = 'ひらがなで入力してください！'
        }
      }
    }
  }
});
