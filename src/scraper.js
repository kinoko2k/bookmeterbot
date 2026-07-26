const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://bookmeter.com';

let lastRequestTime = 0;
const WAIT_TIME = 5000; // 5秒の待機時間を設ける

async function waitIfNeeded() {
  const now = Date.now();
  const diff = now - lastRequestTime;
  if (diff < WAIT_TIME) {
    const sleepTime = WAIT_TIME - diff;
    await new Promise(resolve => setTimeout(resolve, sleepTime));
  }
  lastRequestTime = Date.now();
}

/**
 * ユーザーの読書データを取得する
 * @param {string} userId ユーザーID
 * @returns {Promise<Object>} 読書データ
 */
async function getUserData(userId) {
  try {
    await waitIfNeeded(); // 5秒の待機時間を設ける
    
    const url = `${BASE_URL}/users/${userId}`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(response.data);

    const userName = $('title').text().split(' - ')[0] || 'Unknown User';

    const stats = {};
    $('.userdata-nav li, .content__tab li, .profilenav__item').each((i, el) => {
      const text = $(el).text();
      if (text.includes('読んだ本')) {
        stats.read = text.replace(/[^0-9]/g, '');
      } else if (text.includes('読んでいる本')) {
        stats.reading = text.replace(/[^0-9]/g, '');
      } else if (text.includes('積読本')) {
        stats.stacked = text.replace(/[^0-9]/g, '');
      } else if (text.includes('読みたい本')) {
        stats.wish = text.replace(/[^0-9]/g, '');
      }
    });

    return {
      userId,
      userName,
      url,
      stats: {
        read: stats.read || '0',
        reading: stats.reading || '0',
        stacked: stats.stacked || '0',
        wish: stats.wish || '0',
      }
    };
  } catch (error) {
    console.error(`Error fetching user data for ${userId}:`, error.message);
    return null;
  }
}

/**
 * 本を検索する
 * @param {string} keyword 検索キーワード
 * @returns {Promise<Array>} 検索結果
 */
async function searchBooks(keyword) {
  try {
    await waitIfNeeded(); // 5秒の待機時間を設ける
    
    const url = `${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}&partial=true`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(response.data);

    const books = [];
    
    $('.group__book').each((i, el) => {
      if (i >= 5) return false;

      const titleEl = $(el).find('.detail__title a');
      const title = titleEl.text().trim();
      const link = BASE_URL + titleEl.attr('href');
      
      const author = $(el).find('.detail__authors a').text().trim();
      
      const imgEl = $(el).find('img');
      const image = imgEl.attr('src') || '';

      if (title) {
        books.push({ title, author, link, image });
      }
    });

    return books;
  } catch (error) {
    console.error(`Error searching for books with keyword "${keyword}":`, error.message);
    return [];
  }
}

/**
 * ランキングを取得する
 * @returns {Promise<Array>} ランキング
 */
async function getRanking() {
  try {
    await waitIfNeeded(); // 5秒の待機時間を設ける
    
    const url = `${BASE_URL}/rankings`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(response.data);

    const rankings = [];

    $('.group__book').each((i, el) => {
      if (i >= 10) return false;

      const rank = i + 1;
      const titleEl = $(el).find('.detail__title a');
      const title = titleEl.text().trim();
      const link = BASE_URL + titleEl.attr('href');
      const author = $(el).find('.detail__authors a').text().trim();

      if (title) {
        rankings.push({ rank, title, author, link });
      }
    });

    return rankings;
  } catch (error) {
    console.error(`Error fetching rankings:`, error.message);
    return [];
  }
}

module.exports = {
  getUserData,
  searchBooks,
  getRanking
};
