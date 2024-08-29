const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();
const NEWS_FILE = '../news.json';

async function fetchNews() {
  try {
    const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');
    const news = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      description: item.contentSnippet
    }));

    fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2));
    console.log('News updated successfully');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Запускаем парсер сразу и затем каждые 5 минут
fetchNews();
setInterval(fetchNews, 5 * 60 * 1000);