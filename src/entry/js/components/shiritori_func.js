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
    endStr: 'り',
    submitBtnDisabled: false,
    replayQuestion: false,
    submitCheck: 'NG',
    ajaxText: ''
  },
  created: function () {
    this.resetArr()
    this.reset()
    this.input()
  },
  methods: {
    submit: function () {
      this.submitCheck = 'NG'
      this.endStr = this.inputText.slice(-1)
      this.textCheck()
      this.pushNewText(this.inputText)
      this.inputText = ''
    },
    replay: function () {
      this.resetArr()
      this.reset()
      this.input()
    },
    back: function () {
      this.reset()
      this.textArr.push({ id: this.arrNum, text: 'またあそぼうね！' })
    },
    textCheck: function () {
      // 重複チェック
      if (this.check.indexOf(this.inputText) != -1) {
        this.result = '「' + this.inputText + '」は既出なので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
        return
      }
      // 「ん」チェック
      if (this.endStr == 'ん') {
        this.result = '最後に「ん」がついたので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
        return
      }
      this.ajaxGetMessage()
    },
    pushNewText: function (text) {
      this.arrNum += 1
      this.check.push(text)
      this.textArr.push({ id: this.arrNum, text: text })
    },
    resetArr: function () {
      this.submitBtnDisabled = false
      this.textArr = []
      this.check = ['しりとり']
      this.endStr = 'り'
    },
    reset: function () {
      this.result = ''
      this.replayQuestion = false
    },
    input: function () {
      this.textArr.push({ id: this.arrNum, text: 'すべてひらがなで回答してね' })
      this.textArr.push({id: this.arrNum, text: 'それでは私から始めるよ！' })
      this.textArr.push({ id: this.arrNum, text: 'しりとり' })
    },
    enter: function () {
        if(this.submitCheck == 'OK'){
          this.submit()
        }
    },
    ajaxGetMessage: function () {
      var postMessage = this.endStr
      let self = this;
      $.ajax("/shiritori/ajax/", {
            type: "post",
            data: postMessage,
            dataType: "text",
        }).done(function (data) {
          console.log("Ajax通信 成功");
          self.ajaxText = data
          self.endStr = self.ajaxText.slice(-1)
          self.pushNewText(self.ajaxText)
        }).fail(function (data) {
          console.log("Ajax通信 失敗");
        });
    }
  },
  watch: {
    inputText: function () {
      var textCheck = this.inputText
      var submitBtn = document.getElementById('submitBtn')
      var firstStr = textCheck.slice(0,1)

      if (textCheck.match(/^[ぁ-んー]+$/)) {
        if (firstStr != this.endStr) {
          submitBtn.disabled = true
          this.submitCheck = 'NG'
          this.warning = '<span class="material-icons">error_outline</span>「' + this.endStr + '」から始まる単語を入力してね！'
        } else {
          submitBtn.disabled = false
          this.submitCheck = 'OK'
          this.warning = ''
        }
      } else {
        submitBtn.disabled = true
        this.submitCheck = 'NG'
        if (textCheck != '') {
          this.warning = '<span class="material-icons">error_outline</span>ひらがなで入力してね！'
        }
      }
    }
  }
});
