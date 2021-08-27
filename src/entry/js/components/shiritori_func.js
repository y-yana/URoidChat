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
    replayQuestion: false
  },
  created: function () {
    this.reset()
  },
  methods: {
    submit: function () {
      var newText = this.inputText
      var search = this.check.indexOf(newText);

      // 重複チェック
      if (search != -1) {
        this.result = '「' + newText + '」は既出なので、あなたの負けです！'
        document.getElementById('submitBtn').disabled = true
        this.replayQuestion = true
      }

      // 「ん」チェック
      var endStr = newText.slice(-1)
      if (endStr == 'ん') {
        this.result = '最後に「ん」がついたので、あなたの負けです！'
        document.getElementById('submitBtn').disabled = true
        this.replayQuestion = true
      }

      this.arrNum += 1

      this.check.push(newText)
      this.textArr.push({ id: this.arrNum, text: newText })

      this.inputText = ''
    },
    replay: function () {
      console.log('replay')
      this.reset()
    },
    back: function () {
      console.log('back')
    },
    reset: function () {
      this.textArr = []
      this.check = ['しりとり']
      this.result = ''
      this.textArr.push({ id: this.arrNum, text: 'すべてひらがなで回答してね' })
      this.textArr.push({id: this.arrNum, text: 'それでは私から始めます！' })
      this.textArr.push({ id: this.arrNum, text: 'しりとり' })
      this.replayQuestion = false
    }
  },
  watch: {
    inputText: function () {
      var textCheck = this.inputText
      var submitBtn = document.getElementById('submitBtn')

      if (textCheck.match(/^[ぁ-んー　]+$/)) {
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
