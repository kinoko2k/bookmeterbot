const { getUserData, searchBooks, getRanking } = require('./scraper');

async function runTests() {
  console.log('--- 読書メーターテスト ---');

  console.log('\n[1] ユーザー情報の取得テスト');
  const userId = '1';
  const userData = await getUserData(userId);
  console.log(userData);

  console.log('\n[2] 本の検索テスト');
  const searchKeyword = 'javascript';
  const searchResult = await searchBooks(searchKeyword);
  console.log(`「${searchKeyword}」の検索結果:`, searchResult.length > 0 ? searchResult : '見つかりませんでした。HTML構造が変わっている可能性があります。');

  console.log('\n[3] ランキングの取得テスト');
  const ranking = await getRanking();
  console.log('ランキング上位:', ranking.length > 0 ? ranking : '取得できませんでした。HTML構造が変わっている可能性があります。');
}

runTests();
