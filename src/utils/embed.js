const { EmbedBuilder } = require('discord.js');

module.exports = {
  /**
   * ユーザー情報のEmbed
   */
  createUserEmbed(data) {
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${data.userName} さんの読書データ`)
      .setURL(data.url)
      .addFields(
        { name: '📖 読んだ本', value: `${data.stats.read}冊`, inline: true },
        { name: '📚 読んでいる本', value: `${data.stats.reading}冊`, inline: true },
        { name: '📚 積読本', value: `${data.stats.stacked}冊`, inline: true },
        { name: '🌟 読みたい本', value: `${data.stats.wish}冊`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: '読書メーター' });
  },

  /**
   * 検索結果のEmbed
   */
  createSearchEmbed(keyword, results) {
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle(`「${keyword}」の検索結果`)
      .setTimestamp()
      .setFooter({ text: '読書メーター' });

    if (results[0] && results[0].image) {
      embed.setThumbnail(results[0].image);
    }

    results.forEach((book, i) => {
      embed.addFields({
        name: `${i + 1}. ${book.title}`,
        value: `👤 ${book.author}\n🔗 [詳細はこちら](${book.link})`
      });
    });

    return embed;
  },

  /**
   * ランキングのEmbed
   */
  createRankingEmbed(results) {
    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('🏆 読んだ本ランキング（総合）')
      .setURL('https://bookmeter.com/rankings')
      .setTimestamp()
      .setFooter({ text: '読書メーター' });

    results.forEach((book) => {
      embed.addFields({
        name: `${book.rank}位: ${book.title}`,
        value: `👤 ${book.author}\n🔗 [詳細はこちら](${book.link})`
      });
    });

    return embed;
  }
};
