import Parser from 'rss-parser';
import { Translate } from '@google-cloud/translate/build/src/v2';

const parser = new Parser();

// Инициализация Google Translate
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  key: process.env.GOOGLE_CLOUD_API_KEY
});

const feedUrls = {
  en: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  ru: 'https://lenta.ru/rss',
  es: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
  de: 'https://www.spiegel.de/international/index.rss',
  fr: 'https://www.lemonde.fr/en_rss/rss_en.xml',
  it: 'https://www.corriere.it/rss/homepage.xml',
  ja: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
  zh: 'http://www.xinhuanet.com/english/rss/worldrss.xml',
  nl: 'https://www.nu.nl/rss/Algemeen',
  sv: 'https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/'
};

async function translateText(text, targetLanguage) {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Return original text if translation fails
  }
}

export default async function handler(req, res) {
  const { lang = 'en' } = req.query;
  
  const feedUrl = feedUrls[lang] || feedUrls.en;

  try {
    const feed = await parser.parseURL(feedUrl);
    let news = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      description: item.contentSnippet || item.content
    }));

    // Translate news if the feed language is different from the target language
    if (lang !== 'en') {
      news = await Promise.all(news.map(async (item) => ({
        title: await translateText(item.title, lang),
        description: await translateText(item.description, lang)
      })));
    }

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}