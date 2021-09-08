const shiritori = new Vue({
  el: '#top',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    items: [
      {
        id: 0,
        root: '/chat',
        title: 'おはなし'
      },
      {
        id: 1,
        root: '/shiritori',
        title: 'しりとり'
      },
      {
        id: 2,
        root: '/quiz',
        title: 'クイズ'
      },
      {
        id: 3,
        root: '/nigaoe',
        title: 'にがおえ'
      },
      {
        id: 4,
        root: '/oekaki',
        title: 'おえかき'
      },
      {
        id: 5,
        root: '/',
        title: 'Comming soon...'
      },
      {
        id: 6,
        root: '/',
        title: 'Comming soon...'
      }
    ],
    modelMessage: '私と何をして遊びますか？？',
    gameChoice: true,
    tutorial: false
  },
  methods: {
    showTutorial: function (value) {
      console.log(value)
      if (value < 5) {
        console.log('ok')
        this.gameChoice = false
        this.tutorial = true
      } else {
        console.log('comming soon')
        this.gameChoice = true
        this.tutorial = false
        this.modelMessage = 'もうちょっと待っててね！'
      }
    },
    cancel: function () {
      this.gameChoice = true
      this.tutorial = false
      this.modelMessage = '私と何をして遊びますか？？'
    },
    play: function () {
      console.log('play')
    }
  }
});
