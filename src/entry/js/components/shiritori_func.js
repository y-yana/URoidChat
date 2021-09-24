const shiritori = new Vue({
  el: '#shiritori',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    difficultyChoice: true,
    playGame: false,
    timerMode: false,
    modePicked: null,
    difficultyPicked: null,
    inputText: '',
    warning: '',
    arrNum: 0,
    // textArr = 表示用配列
    textArr: [],
    // check = 重複チェック用配列
    check: ['しりとり'],
    classVue: ['getMessageComponent'],
    result: '',
    endStr: 'り',
    submitBtnDisabled: false,
    replayQuestion: false,
    submitCheck: 'NG',
    ajaxText: '',
    timerVal: 10,
    difficultyVal: null,
    intervalID: null
  },
  created: function () {
    this.resetArr()
    this.reset()
    this.input()
  },
  methods: {
    gameStart: function () {
      this.difficultyVal = this.difficultyPicked
      this.difficultyChoice = false
      this.playGame = true
      if (this.modePicked == "timer") {
        this.timerMode = true
        this.timerVal = this.difficultyVal
        this.timerStart()
      } else {
        this.timerMode = false
      }
    },
    submit: function () {
      if (this.inputText == '') {
        console.log('空欄のままです！')
        return
      }
      this.submitCheck = 'NG'
      this.endStr = this.inputText.slice(-1)
      this.textCheck()
      this.pushNewText(this.inputText)
      this.classVue.push('sendMessageComponent')
      this.inputText = ''
      this.scroll()
    },
    replay: function () {
      this.resetArr()
      this.reset()
      this.input()
      if (this.timerMode == true) {
        this.timerMode = true
        this.timerVal = this.difficultyVal
        this.timerStart()
      }
    },
    back: function () {
      this.resetArr()
      this.reset()
      this.input()
      this.difficultyChoice = true
      this.playGame = false
    },
    textCheck: function () {
      if (this.check.indexOf(this.inputText) != -1) {
        this.result = '「' + this.inputText + '」は既出なので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
        clearInterval(this.intervalID)
        return
      }
      if (this.endStr == 'ん') {
        this.result = '最後に「ん」がついたので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
        clearInterval(this.intervalID)
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
      this.arrNum = 0
      this.textArr = []
      this.classVue = ['getMessageComponent']
      this.check = ['しりとり']
      this.endStr = 'り'
    },
    reset: function () {
      this.inputText = ''
      this.result = ''
      this.warning = ''
      this.replayQuestion = false
      this.modePicked = null
      this.difficultyPicked = null
    },
    input: function () {
      this.textArr.push({ id: this.arrNum, text: 'すべてひらがなで回答してね' })
      this.arrNum += 1
      this.classVue.push('getMessageComponent')
      this.textArr.push({ id: this.arrNum, text: 'それでは私から始めるよ！' })
      this.arrNum += 1
      this.classVue.push('getMessageComponent')
      this.textArr.push({ id: this.arrNum, text: 'しりとり' })
    },
    enter: function () {
        if(this.submitCheck == 'OK'){
          this.submit()
        }
    },
    ajaxGetMessage: async function () {
      var json_text = {
        word: this.inputText,
        difficult: this.difficultyVal
      }
      var postMessage = JSON.stringify(json_text);
      let self = this;
      await $.ajax("/shiritori/ajax/", {
            type: "post",
            data: postMessage,
            dataType: "json",
        }).done(function (data) {
          console.log("Ajax通信 成功");
          const getData= JSON.parse(data.values)
          self.ajaxText = getData.res_shiritori
          self.endStr = getData.endstr
          self.pushNewText(self.ajaxText)
          self.classVue.push('getMessageComponent')
          if (self.endStr == 'ん') {
            self.result = '最後に「ん」がついたので、私の負けです…'
            self.submitBtnDisabled = true
            self.replayQuestion = true
            clearInterval(self.intervalID)
            return
          }
        }).fail(function (data) {
          console.log("Ajax通信 失敗");
        });
      if (this.modePicked == "timer") {
        if (this.replayQuestion != true) {
          this.timerMode = true
          this.timerVal = this.difficultyVal
          clearInterval(this.intervalID)
          this.timerStart()
        }
      }
      this.scroll()
    },
    timerStart: function () {
      let self = this;
      this.timerVal = this.difficultyVal
      this.intervalID = setInterval(function () { self.updateProgress() }, 1000)
    },
    updateProgress: function () {
      this.timerVal -= 1
      if (this.timerVal == 0) {
        clearInterval(this.intervalID)
        this.result = 'タイムオーバーなので、あなたの負けです！'
        this.submitBtnDisabled = true
        this.replayQuestion = true
        this.scroll()
        return
      }
    },
    scroll: function () {
      this.$nextTick(function() {
        var container = this.$el.querySelector(".shiritoriChatArea")
        container.scrollTop = container.scrollHeight
      })
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
          this.warning = '<span class="material-icons">error_outline</span><span>「' + this.endStr + '」から始まる単語を入力してね！</span>'
        } else {
          submitBtn.disabled = false
          this.submitCheck = 'OK'
          this.warning = ''
        }
      } else {
        submitBtn.disabled = true
        this.submitCheck = 'NG'
        if (textCheck != '') {
          this.warning = '<span class="material-icons">error_outline</span><span>ひらがなで入力してね！</span>'
        }
      }
    }
  }
});
