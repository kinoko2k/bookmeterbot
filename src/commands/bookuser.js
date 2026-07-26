const embedUtils = require('../utils/embed');
const scraper = require('../scraper');

module.exports = {
  data: {
    name: 'bookuser',
    description: 'ユーザーの読書データを取得します',
    options: [
      {
        name: 'id',
        description: '読書メーターのユーザーID',
        type: 3, // STRING
        required: true,
      }
    ]
  },
  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.options.getString('id');
    
    try {
      const data = await scraper.getUserData(id);
      if (!data) {
        return interaction.editReply('データの取得に失敗しました。IDが間違っている可能性があります。');
      }
      const embed = embedUtils.createUserEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
      await interaction.editReply('エラーが発生しました。');
    }
  }
};
