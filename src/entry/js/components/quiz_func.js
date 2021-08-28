const quiz = new Vue({
  el: '#quiz',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    select: true,
    option: true
  },
  methods: {
    createQuiz: function (value) {
      console.log(value)
    }
  }
});
