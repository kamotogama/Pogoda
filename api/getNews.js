const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { language = 'en' } = req.query;
  let url;

  switch(language) {
    case 'ru':
      url = 'https://www.rt.com/news/';
      break;
    case 'es':
      url = 'https://www.bbc.com/mundo';
      break;
    default:
      url = 'https://www.bbc.com/news';
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const news = [];

    $('a[data-analytics-label="top-stories"]').each((i, elem) => {
      if (i < 5) {
        const title = $(elem).find('h3').text().trim();
        const description = $(elem).find('p').text().trim();
        if (title && description) {
          news.push({ title, description });
        }
      }
    });

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};