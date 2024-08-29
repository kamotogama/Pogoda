import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(req, res) {
  const { language = 'en' } = req.query;
  
  const feedUrls = {
    en: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    ru: 'https://lenta.ru/rss',
    es: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
    de: 'https://www.spiegel.de/international/index.rss',
    fr: 'https://www.lemonde.fr/en/rss/une.xml',
    it: 'https://www.corriere.it/rss/homepage.xml',
    ja: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
    zh: 'https://rsshub.app/reuters/world/cn',
    nl: 'https://www.nu.nl/rss/Algemeen',
    sv: 'https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/'
  };

  const feedUrl = feedUrls[language] || feedUrls.en;

  try {
    const feed = await parser.parseURL(feedUrl);
    const news = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      description: item.contentSnippet || item.content || ''
    }));
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}