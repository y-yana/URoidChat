const shiritori = new Vue({
  el: '#shiritori',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    inputText: '',
    warning: '',
    arrNum: 0,
    // textArr = 表示用配列
    textArr: [{ "id": 0, "text": "しりとり" }],
    // check = 重複チェック用配列
    check: ['しりとり'],
    result: ''
  },
  methods: {
    submit: function () {
      var newText = this.inputText
      var search = this.check.indexOf(newText);

      // 重複チェック
      if (search != -1) {
        this.result = '「' + newText + '」は既出なので、あなたの負けです！'
        document.getElementById('submitBtn').disabled = true
      }

      // 「ん」チェック
      var endStr = newText.slice(-1)
      if (endStr == 'ん') {
        this.result = '最後に「ん」がついたので、あなたの負けです！'
        document.getElementById('submitBtn').disabled = true
      }

      this.arrNum += 1

      this.check.push(newText)
      this.textArr.push({ id: this.arrNum, text: newText })

      this.inputText = ''
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
