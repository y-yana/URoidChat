const shiritori = new Vue({
  el: '#top',
  // FlaskとVueを共存させるためにDelimiterを変更する
  delimiters: ["[[", "]]"],
  data: {
    items: [
      {
        id: 1,
        root: '/chat',
        title: 'おはなし'
      },
      {
        id: 2,
        root: '/shiritori',
        title: 'しりとり'
      },
      {
        id: 3,
        root: '/quiz',
        title: 'クイズ'
      },
      {
        id: 4,
        root: '/nigaoe',
        title: 'にがおえ'
      },
      {
        id: 5,
        root: '/oekaki',
        title: 'おえかき'
      },
      {
        id: 6,
        root: '/',
        title: 'Comming soon...'
      },
      {
        id: 7,
        root: '/',
        title: 'Comming soon...'
      }
    ],
    modelMessage: '私と何をして遊びますか？？'
  },
  methods: {
  }
});
