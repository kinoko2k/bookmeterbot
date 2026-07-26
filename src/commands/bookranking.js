const embedUtils = require('../utils/embed');
const scraper = require('../scraper');

module.exports = {
  data: {
    name: 'bookranking',
    description: '本のランキングを表示します',
  },
  async execute(interaction) {
    await interaction.deferReply();
    
    try {
      const results = await scraper.getRanking();
      if (results.length === 0) {
        return interaction.editReply('ランキングの取得に失敗しました。');
      }
      const embed = embedUtils.createRankingEmbed(results);
      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
      await interaction.editReply('エラーが発生しました。');
    }
  }
};
