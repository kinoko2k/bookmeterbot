module.exports = [
  {
    name: 'bookuser',
    description: 'ユーザーの読書データを取得します',
    options: [
      {
        name: 'id',
        description: '読書メーターのユーザーID',
        type: 3,
        required: true,
      }
    ]
  },
  {
    name: 'booksearch',
    description: '本の情報を検索します',
    options: [
      {
        name: 'keyword',
        description: '本の名前 / キーワード',
        type: 3,
        required: true,
      }
    ]
  },
  {
    name: 'bookranking',
    description: '本のランキングを表示します',
  }
];
