const embedUtils = require('../utils/embed');
const scraper = require('../scraper');

module.exports = {
  data: {
    name: 'booksearch',
    description: '本の情報を検索します',
    options: [
      {
        name: 'keyword',
        description: '本の名前 / キーワード',
        type: 3, // STRING
        required: true,
      }
    ]
  },
  async execute(interaction) {
    await interaction.deferReply();
    const keyword = interaction.options.getString('keyword');
    
    try {
      const results = await scraper.searchBooks(keyword);
      if (results.length === 0) {
        return interaction.editReply(`「${keyword}」に関する本が見つかりませんでした。`);
      }
      const embed = embedUtils.createSearchEmbed(keyword, results);
      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
      await interaction.editReply('エラーが発生しました。');
    }
  }
};
