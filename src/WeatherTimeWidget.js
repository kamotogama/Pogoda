import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Thermometer, Menu, X, MapPin, ChevronRight, ChevronLeft, DollarSign } from 'lucide-react';

const countries = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  JP: 'Japan',
  RU: 'Russia',
  CN: 'China',
  IN: 'India',
  BR: 'Brazil',
  IT: 'Italy',
  ES: 'Spain',
  NL: 'Netherlands',
  SE: 'Sweden'
};

const cities = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  GB: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
  RU: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
  CN: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
  IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
  IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
  NL: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
  SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
};

const translations = {
  en: {
    settings: 'Settings',
    language: 'Language',
    country: 'Country',
    city: 'City',
    close: 'Close',
    autoLocation: 'Auto Location',
    topNews: 'Top News',
    countries: countries,
    cities: cities
  },
  ru: {
    settings: 'Настройки',
    language: 'Язык',
    country: 'Страна',
    city: 'Город',
    close: 'Закрыть',
    autoLocation: 'Автоопределение',
    topNews: 'Главные новости',
    countries: {
      US: 'США',
      GB: 'Великобритания',
      CA: 'Канада',
      AU: 'Австралия',
      DE: 'Германия',
      FR: 'Франция',
      JP: 'Япония',
      RU: 'Россия',
      CN: 'Китай',
      IN: 'Индия',
      BR: 'Бразилия',
      IT: 'Италия',
      ES: 'Испания',
      NL: 'Нидерланды',
      SE: 'Швеция'
    },
    cities: {
      US: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Хьюстон', 'Феникс', 'Филадельфия', 'Сан-Антонио', 'Сан-Диего', 'Даллас', 'Сан-Хосе'],
      GB: ['Лондон', 'Бирмингем', 'Манчестер', 'Глазго', 'Ливерпуль', 'Лидс', 'Шеффилд', 'Эдинбург', 'Бристоль', 'Лестер'],
      CA: ['Торонто', 'Монреаль', 'Ванкувер', 'Калгари', 'Эдмонтон', 'Оттава', 'Виннипег', 'Квебек', 'Гамильтон', 'Китченер'],
      AU: ['Сидней', 'Мельбурн', 'Брисбен', 'Перт', 'Аделаида', 'Голд-Кост', 'Ньюкасл', 'Канберра', 'Вуллонгонг', 'Логан'],
      DE: ['Берлин', 'Гамбург', 'Мюнхен', 'Кёльн', 'Франкфурт', 'Штутгарт', 'Дюссельдорф', 'Дортмунд', 'Эссен', 'Лейпциг'],
      FR: ['Париж', 'Марсель', 'Лион', 'Тулуза', 'Ницца', 'Нант', 'Страсбург', 'Монпелье', 'Бордо', 'Лилль'],
      JP: ['Токио', 'Йокогама', 'Осака', 'Нагоя', 'Саппоро', 'Фукуока', 'Кобе', 'Киото', 'Кавасаки', 'Сайтама'],
      RU: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону'],
      CN: ['Шанхай', 'Пекин', 'Гуанчжоу', 'Шэньчжэнь', 'Чэнду', 'Нанкин', 'Ухань', 'Сиань', 'Ханчжоу', 'Чунцин'],
      IN: ['Мумбаи', 'Дели', 'Бангалор', 'Хайдарабад', 'Ахмедабад', 'Ченнаи', 'Колката', 'Сурат', 'Пуна', 'Джайпур'],
      BR: ['Сан-Паулу', 'Рио-де-Жанейро', 'Сальвадор', 'Бразилиа', 'Форталеза', 'Белу-Оризонти', 'Манаус', 'Куритиба', 'Ресифи', 'Порту-Алегри'],
      IT: ['Рим', 'Милан', 'Неаполь', 'Турин', 'Палермо', 'Генуя', 'Болонья', 'Флоренция', 'Бари', 'Катания'],
      ES: ['Мадрид', 'Барселона', 'Валенсия', 'Севилья', 'Сарагоса', 'Малага', 'Мурсия', 'Пальма', 'Лас-Пальмас', 'Бильбао'],
      NL: ['Амстердам', 'Роттердам', 'Гаага', 'Утрехт', 'Эйндховен', 'Тилбург', 'Гронинген', 'Алмере', 'Бреда', 'Неймеген'],
      SE: ['Стокгольм', 'Гётеборг', 'Мальмё', 'Уппсала', 'Вестерос', 'Эребру', 'Линчёпинг', 'Хельсингборг', 'Йёнчёпинг', 'Норрчёпинг']
    }
  },
  es: {
    settings: 'Configuración',
    language: 'Idioma',
    country: 'País',
    city: 'Ciudad',
    close: 'Cerrar',
    autoLocation: 'Ubicación automática',
    topNews: 'Noticias principales',
    countries: {
      US: 'Estados Unidos',
      GB: 'Reino Unido',
      CA: 'Canadá',
      AU: 'Australia',
      DE: 'Alemania',
      FR: 'Francia',
      JP: 'Japón',
      RU: 'Rusia',
      CN: 'China',
      IN: 'India',
      BR: 'Brasil',
      IT: 'Italia',
      ES: 'España',
      NL: 'Países Bajos',
      SE: 'Suecia'
    },
    cities: {
      US: ['Nueva York', 'Los Ángeles', 'Chicago', 'Houston', 'Phoenix', 'Filadelfia', 'San Antonio', 'San Diego', 'Dallas', 'San José'],
      GB: ['Londres', 'Birmingham', 'Mánchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edimburgo', 'Bristol', 'Leicester'],
      CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec', 'Hamilton', 'Kitchener'],
      AU: ['Sídney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaida', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan'],
      DE: ['Berlín', 'Hamburgo', 'Múnich', 'Colonia', 'Fráncfort', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
      FR: ['París', 'Marsella', 'Lyon', 'Toulouse', 'Niza', 'Nantes', 'Estrasburgo', 'Montpellier', 'Burdeos', 'Lille'],
      JP: ['Tokio', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kioto', 'Kawasaki', 'Saitama'],
      RU: ['Moscú', 'San Petersburgo', 'Novosibirsk', 'Ekaterimburgo', 'Nizhni Nóvgorod', 'Kazán', 'Cheliábinsk', 'Omsk', 'Samara', 'Rostov del Don'],
      CN: ['Shanghái', 'Pekín', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
      IN: ['Bombay', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Calcuta', 'Surat', 'Pune', 'Jaipur'],
      BR: ['São Paulo', 'Río de Janeiro', 'Salvador', 'Brasilia', 'Fortaleza', 'Belo Horizonte', 'Manaos', 'Curitiba', 'Recife', 'Porto Alegre'],
      IT: ['Roma', 'Milán', 'Nápoles', 'Turín', 'Palermo', 'Génova', 'Bolonia', 'Florencia', 'Bari', 'Catania'],
      ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
      NL: ['Ámsterdam', 'Róterdam', 'La Haya', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groninga', 'Almere', 'Breda', 'Nimega'],
      SE: ['Estocolmo', 'Gotemburgo', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
    }
  },
  de: {
  settings: 'Einstellungen',
  language: 'Sprache',
  country: 'Land',
  city: 'Stadt',
  close: 'Schließen',
  autoLocation: 'Automatische Ortung',
  topNews: 'Top-Nachrichten',
  countries: {
    US: 'Vereinigte Staaten',
    GB: 'Vereinigtes Königreich',
    CA: 'Kanada',
    AU: 'Australien',
    DE: 'Deutschland',
    FR: 'Frankreich',
    JP: 'Japan',
    RU: 'Russland',
    CN: 'China',
    IN: 'Indien',
    BR: 'Brasilien',
    IT: 'Italien',
    ES: 'Spanien',
    NL: 'Niederlande',
    SE: 'Schweden'
  },
  cities: {
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    GB: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
    CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
    AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
    DE: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nizza', 'Nantes', 'Straßburg', 'Montpellier', 'Bordeaux', 'Lille'],
    JP: ['Tokio', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
    RU: ['Moskau', 'Sankt Petersburg', 'Nowosibirsk', 'Jekaterinburg', 'Nischni Nowgorod', 'Kasan', 'Tscheljabinsk', 'Omsk', 'Samara', 'Rostow am Don'],
    CN: ['Shanghai', 'Peking', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
    IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
    BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    IT: ['Rom', 'Mailand', 'Neapel', 'Turin', 'Palermo', 'Genua', 'Bologna', 'Florenz', 'Bari', 'Catania'],
    ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Saragossa', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    NL: ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    SE: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
  }
},
	fr: {
	  settings: 'Paramètres',
	  language: 'Langue',
	  country: 'Pays',
	  city: 'Ville',
	  close: 'Fermer',
	  autoLocation: 'Localisation automatique',
	  topNews: 'Actualités principales',
	  countries: {
		US: 'États-Unis',
		GB: 'Royaume-Uni',
		CA: 'Canada',
		AU: 'Australie',
		DE: 'Allemagne',
		FR: 'France',
		JP: 'Japon',
		RU: 'Russie',
		CN: 'Chine',
		IN: 'Inde',
		BR: 'Brésil',
		IT: 'Italie',
		ES: 'Espagne',
		NL: 'Pays-Bas',
		SE: 'Suède'
	  },
	  cities: {
		US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphie', 'San Antonio', 'San Diego', 'Dallas', 'San José'],
		GB: ['Londres', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Édimbourg', 'Bristol', 'Leicester'],
		CA: ['Toronto', 'Montréal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Québec', 'Hamilton', 'Kitchener'],
		AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adélaïde', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
		DE: ['Berlin', 'Hambourg', 'Munich', 'Cologne', 'Francfort', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
		FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
		JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
		RU: ['Moscou', 'Saint-Pétersbourg', 'Novossibirsk', 'Ekaterinbourg', 'Nijni Novgorod', 'Kazan', 'Tcheliabinsk', 'Omsk', 'Samara', 'Rostov-sur-le-Don'],
		CN: ['Shanghai', 'Pékin', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
		IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Calcutta', 'Surat', 'Pune', 'Jaipur'],
		BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
		IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palerme', 'Gênes', 'Bologne', 'Florence', 'Bari', 'Catane'],
		ES: ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Saragosse', 'Malaga', 'Murcie', 'Palma', 'Las Palmas', 'Bilbao'],
		NL: ['Amsterdam', 'Rotterdam', 'La Haye', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningue', 'Almere', 'Bréda', 'Nimègue'],
		SE: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
	  }
	},
	  it: {
    settings: 'Impostazioni',
    language: 'Lingua',
    country: 'Paese',
    city: 'Città',
    close: 'Chiudi',
    autoLocation: 'Posizione automatica',
    topNews: 'Notizie principali',
    countries: {
      US: 'Stati Uniti',
      GB: 'Regno Unito',
      CA: 'Canada',
      AU: 'Australia',
      DE: 'Germania',
      FR: 'Francia',
      JP: 'Giappone',
      RU: 'Russia',
      CN: 'Cina',
      IN: 'India',
      BR: 'Brasile',
      IT: 'Italia',
      ES: 'Spagna',
      NL: 'Paesi Bassi',
      SE: 'Svezia'
    },
    cities: {
      US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Filadelfia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
      GB: ['Londra', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edimburgo', 'Bristol', 'Leicester'],
      CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
      AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
      DE: ['Berlino', 'Amburgo', 'Monaco', 'Colonia', 'Francoforte', 'Stoccarda', 'Düsseldorf', 'Dortmund', 'Essen', 'Lipsia'],
      FR: ['Parigi', 'Marsiglia', 'Lione', 'Tolosa', 'Nizza', 'Nantes', 'Strasburgo', 'Montpellier', 'Bordeaux', 'Lille'],
      JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
      RU: ['Mosca', 'San Pietroburgo', 'Novosibirsk', 'Ekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov sul Don'],
      CN: ['Shanghai', 'Pechino', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanchino', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
      IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Calcutta', 'Surat', 'Pune', 'Jaipur'],
      BR: ['San Paolo', 'Rio de Janeiro', 'Salvador', 'Brasilia', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
      IT: ['Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania'],
      ES: ['Madrid', 'Barcellona', 'Valencia', 'Siviglia', 'Saragozza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
      NL: ['Amsterdam', 'Rotterdam', 'LAia', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nimega'],
      SE: ['Stoccolma', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
    }
  },

  ja: {
    settings: '設定',
    language: '言語',
    country: '国',
    city: '都市',
    close: '閉じる',
    autoLocation: '自動位置',
    topNews: 'トップニュース',
    countries: {
      US: 'アメリカ合衆国',
      GB: 'イギリス',
      CA: 'カナダ',
      AU: 'オーストラリア',
      DE: 'ドイツ',
      FR: 'フランス',
      JP: '日本',
      RU: 'ロシア',
      CN: '中国',
      IN: 'インド',
      BR: 'ブラジル',
      IT: 'イタリア',
      ES: 'スペイン',
      NL: 'オランダ',
      SE: 'スウェーデン'
    },
    cities: {
      US: ['ニューヨーク', 'ロサンゼルス', 'シカゴ', 'ヒューストン', 'フェニックス', 'フィラデルフィア', 'サンアントニオ', 'サンディエゴ', 'ダラス', 'サンノゼ'],
      GB: ['ロンドン', 'バーミンガム', 'マンチェスター', 'グラスゴー', 'リバプール', 'リーズ', 'シェフィールド', 'エディンバラ', 'ブリストル', 'レスター'],
      CA: ['トロント', 'モントリオール', 'バンクーバー', 'カルガリー', 'エドモントン', 'オタワ', 'ウィニペグ', 'ケベックシティ', 'ハミルトン', 'キッチナー'],
      AU: ['シドニー', 'メルボルン', 'ブリスベン', 'パース', 'アデレード', 'ゴールドコースト', 'ニューカッスル', 'キャンベラ', 'ウーロンゴン', 'ローガン'],
      DE: ['ベルリン', 'ハンブルク', 'ミュンヘン', 'ケルン', 'フランクフルト', 'シュトゥットガルト', 'デュッセルドルフ', 'ドルトムント', 'エッセン', 'ライプツィヒ'],
      FR: ['パリ', 'マルセイユ', 'リヨン', 'トゥールーズ', 'ニース', 'ナント', 'ストラスブール', 'モンペリエ', 'ボルドー', 'リール'],
      JP: ['東京', '横浜', '大阪', '名古屋', '札幌', '福岡', '神戸', '京都', '川崎', 'さいたま'],
      RU: ['モスクワ', 'サンクトペテルブルク', 'ノヴォシビルスク', 'エカテリンブルク', 'ニジニノヴゴロド', 'カザン', 'チェリャビンスク', 'オムスク', 'サマラ', 'ロストフナドヌー'],
      CN: ['上海', '北京', '広州', '深セン', '成都', '南京', '武漢', '西安', '杭州', '重慶'],
      IN: ['ムンバイ', 'デリー', 'バンガロール', 'ハイデラバード', 'アーメダバード', 'チェンナイ', 'コルカタ', 'スーラト', 'プネー', 'ジャイプル'],
      BR: ['サンパウロ', 'リオデジャネイロ', 'サルバドール', 'ブラジリア', 'フォルタレザ', 'ベロオリゾンテ', 'マナウス', 'クリチバ', 'レシフェ', 'ポルトアレグレ'],
      IT: ['ローマ', 'ミラノ', 'ナポリ', 'トリノ', 'パレルモ', 'ジェノバ', 'ボローニャ', 'フィレンツェ', 'バーリ', 'カターニア'],
      ES: ['マドリード', 'バルセロナ', 'バレンシア', 'セビリア', 'サラゴサ', 'マラガ', 'ムルシア', 'パルマ', 'ラスパルマス', 'ビルバオ'],
      NL: ['アムステルダム', 'ロッテルダム', 'ハーグ', 'ユトレヒト', 'アイントホーフェン', 'ティルブルフ', 'フローニンゲン', 'アルメレ', 'ブレダ', 'ナイメーヘン'],
      SE: ['ストックホルム', 'ヨーテボリ', 'マルメ', 'ウプサラ', 'ヴェステロース', 'エレブルー', 'リンシェーピング', 'ヘルシンボリ', 'ヨンショーピング', 'ノルショーピング']
    }
  },
  zh: {
  settings: '设置',
  language: '语言',
  country: '国家',
  city: '城市',
  close: '关闭',
  autoLocation: '自动定位',
  topNews: '热门新闻',
  countries: {
    US: '美国',
    GB: '英国',
    CA: '加拿大',
    AU: '澳大利亚',
    DE: '德国',
    FR: '法国',
    JP: '日本',
    RU: '俄罗斯',
    CN: '中国',
    IN: '印度',
    BR: '巴西',
    IT: '意大利',
    ES: '西班牙',
    NL: '荷兰',
    SE: '瑞典'
  },
  cities: {
    US: ['纽约', '洛杉矶', '芝加哥', '休斯顿', '菲尼克斯', '费城', '圣安东尼奥', '圣地亚哥', '达拉斯', '圣何塞'],
    GB: ['伦敦', '伯明翰', '曼彻斯特', '格拉斯哥', '利物浦', '利兹', '谢菲尔德', '爱丁堡', '布里斯托尔', '莱斯特'],
    CA: ['多伦多', '蒙特利尔', '温哥华', '卡尔加里', '埃德蒙顿', '渥太华', '温尼伯', '魁北克市', '哈密尔顿', '基奇纳'],
    AU: ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德', '黄金海岸', '纽卡斯尔', '堪培拉', '伍伦贡', '洛根市'],
    DE: ['柏林', '汉堡', '慕尼黑', '科隆', '法兰克福', '斯图加特', '杜塞尔多夫', '多特蒙德', '埃森', '莱比锡'],
    FR: ['巴黎', '马赛', '里昂', '图卢兹', '尼斯', '南特', '斯特拉斯堡', '蒙彼利埃', '波尔多', '里尔'],
    JP: ['东京', '横滨', '大阪', '名古屋', '札幌', '福冈', '神户', '京都', '川崎', '埼玉'],
    RU: ['莫斯科', '圣彼得堡', '新西伯利亚', '叶卡捷琳堡', '下诺夫哥罗德', '喀山', '车里雅宾斯克', '鄂木斯克', '萨马拉', '顿河畔罗斯托夫'],
    CN: ['上海', '北京', '广州', '深圳', '成都', '南京', '武汉', '西安', '杭州', '重庆'],
    IN: ['孟买', '德里', '班加罗尔', '海得拉巴', '艾哈迈达巴德', '钦奈', '加尔各答', '苏拉特', '浦那', '斋浦尔'],
    BR: ['圣保罗', '里约热内卢', '萨尔瓦多', '巴西利亚', '福塔莱萨', '贝洛奥里藏特', '马瑙斯', '库里蒂巴', '累西腓', '阿雷格里港'],
    IT: ['罗马', '米兰', '那不勒斯', '都灵', '巴勒莫', '热那亚', '博洛尼亚', '佛罗伦萨', '巴里', '卡塔尼亚'],
    ES: ['马德里', '巴塞罗那', '瓦伦西亚', '塞维利亚', '萨拉戈萨', '马拉加', '穆尔西亚', '帕尔马', '拉斯帕尔马斯', '毕尔巴鄂'],
    NL: ['阿姆斯特丹', '鹿特丹', '海牙', '乌特勒支', '埃因霍温', '蒂尔堡', '格罗宁根', '阿尔梅勒', '布雷达', '奈梅亨'],
    SE: ['斯德哥尔摩', '哥德堡', '马尔默', '乌普萨拉', '韦斯特罗斯', '厄勒布鲁', '林雪平', '赫尔辛堡', '延雪平', '北雪平']
  }
},

nl: {
  settings: 'Instellingen',
  language: 'Taal',
  country: 'Land',
  city: 'Stad',
  close: 'Sluiten',
  autoLocation: 'Automatische locatie',
  topNews: 'Topnieuws',
  countries: {
    US: 'Verenigde Staten',
    GB: 'Verenigd Koninkrijk',
    CA: 'Canada',
    AU: 'Australië',
    DE: 'Duitsland',
    FR: 'Frankrijk',
    JP: 'Japan',
    RU: 'Rusland',
    CN: 'China',
    IN: 'India',
    BR: 'Brazilië',
    IT: 'Italië',
    ES: 'Spanje',
    NL: 'Nederland',
    SE: 'Zweden'
  },
  cities: {
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    GB: ['Londen', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
    CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
    AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
    DE: ['Berlijn', 'Hamburg', 'München', 'Keulen', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    FR: ['Parijs', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Straatsburg', 'Montpellier', 'Bordeaux', 'Lille'],
    JP: ['Tokio', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
    RU: ['Moskou', 'Sint-Petersburg', 'Novosibirsk', 'Jekaterinenburg', 'Nizjni Novgorod', 'Kazan', 'Tsjeljabinsk', 'Omsk', 'Samara', 'Rostov aan de Don'],
    CN: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
    IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
    BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    IT: ['Rome', 'Milaan', 'Napels', 'Turijn', 'Palermo', 'Genua', 'Bologna', 'Florence', 'Bari', 'Catania'],
    ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    NL: ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    SE: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
  }
},

	sv: {
	  settings: 'Inställningar',
	  language: 'Språk',
	  country: 'Land',
	  city: 'Stad',
	  close: 'Stäng',
	  autoLocation: 'Automatisk plats',
	  topNews: 'Toppnyheter',
	  countries: {
		US: 'USA',
		GB: 'Storbritannien',
		CA: 'Kanada',
		AU: 'Australien',
		DE: 'Tyskland',
		FR: 'Frankrike',
		JP: 'Japan',
		RU: 'Ryssland',
		CN: 'Kina',
		IN: 'Indien',
		BR: 'Brasilien',
		IT: 'Italien',
		ES: 'Spanien',
		NL: 'Nederländerna',
		SE: 'Sverige'
	  },
	  cities: {
		US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
		GB: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
		CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
		AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
		DE: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
		FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
		JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
		RU: ['Moskva', 'Sankt Petersburg', 'Novosibirsk', 'Jekaterinburg', 'Nizjnij Novgorod', 'Kazan', 'Tjeljabinsk', 'Omsk', 'Samara', 'Rostov-na-Donu'],
		CN: ['Shanghai', 'Peking', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing'],
		IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
		BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
		IT: ['Rom', 'Milano', 'Neapel', 'Turin', 'Palermo', 'Genua', 'Bologna', 'Florens', 'Bari', 'Catania'],
		ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
		NL: ['Amsterdam', 'Rotterdam', 'Haag', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
		SE: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping']
	  }
	}

};



const WeatherTimeWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ type: 'sunny', temp: 13, condition: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currencies, setCurrencies] = useState([
    { from: 'USD', to: 'EUR', rate: 0 },
    { from: 'USD', to: 'GBP', rate: 0 },
    { from: 'USD', to: 'JPY', rate: 0 },
  ]);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('weatherSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      language: 'en',
      country: '',
      city: '',
    };
  });

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const isDarkMode = window.Telegram.WebApp.colorScheme === 'dark';
      document.body.classList.toggle('dark', isDarkMode);
    }
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherSettings', JSON.stringify(settings));
    fetchWeather();
    fetchNews();
    fetchCurrencies();
  }, [settings]);


  const fetchWeather = async () => {
    try {
      const location = settings.city || settings.country || 'auto:ip';
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=4fe8d41b43ea4f1fbe2103447242608&q=${location}&aqi=no&lang=${settings.language}`
      );
      const data = await response.json();
      
      const conditionCode = data.current.condition.code;
      let weatherType = 'sunny';
      
      if (conditionCode === 1000) weatherType = 'sunny';
      else if ([1003, 1006, 1009].includes(conditionCode)) weatherType = 'cloudy';
      else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) weatherType = 'rainy';
      else if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225].includes(conditionCode)) weatherType = 'snowy';
      else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) weatherType = 'stormy';
      
      setWeather({ 
        type: weatherType, 
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
// В fetchNews добавьте проверку, что данные получены
const fetchNews = async () => {
    try {
        const response = await fetch(`http://api.mediastack.com/v1/news?access_key=7be80a12ddf4ffe4a3ab21c51fba47a0&countries=${settings.country}&languages=${settings.language}&limit=10`);
        const data = await response.json();
        setNews(data.data || []);
    } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]); // Показать сообщение об ошибке
    }
};

// В fetchCurrencies добавьте возможность выбора валюты
const fetchCurrencies = async () => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`);
        const data = await response.json();
        setCurrencies([
            { from: selectedCurrency, to: 'EUR', rate: data.rates.EUR },
            { from: selectedCurrency, to: 'GBP', rate: data.rates.GBP },
            { from: selectedCurrency, to: 'JPY', rate: data.rates.JPY },
        ]);
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
};
  const WeatherIcon = () => {
    const iconProps = { size: '15vmin', className: `text-white weather-icon ${weather.type}-icon` };
    switch(weather.type) {
      case 'sunny': return <Sun {...iconProps} />;
      case 'cloudy': return <Cloud {...iconProps} />;
      case 'rainy': return <CloudRain {...iconProps} />;
      case 'snowy': return <CloudSnow {...iconProps} />;
      case 'stormy': return <CloudLightning {...iconProps} />;
      default: return <Sun {...iconProps} />;
    }
  };

  const DayNightIcon = () => {
    const hour = time.getHours();
    const iconProps = { size: '4vmin', className: "text-white opacity-80" };
    return (hour >= 6 && hour < 18) ? <Sun {...iconProps} /> : <Moon {...iconProps} />;
  };

  const getBackgroundClass = () => {
    const hour = time.getHours();
    const isNight = hour < 6 || hour >= 18;
    switch(weather.type) {
      case 'sunny': return isNight ? 'bg-night' : 'bg-sunny';
      case 'cloudy': return isNight ? 'bg-night' : 'bg-cloudy';
      case 'rainy': return isNight ? 'bg-night' : 'bg-rainy';
      case 'snowy': return isNight ? 'bg-night' : 'bg-snowy';
      case 'stormy': return 'bg-stormy';
      default: return 'bg-default';
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    if (setting === 'country') {
      setSettings(prev => ({ ...prev, city: '' }));
    }
    setIsMenuOpen(false);
  };

  const t = (key) => translations[settings.language][key];

  const NewsItem = ({ item, onClick }) => (
    <div className="news-item cursor-pointer" onClick={() => onClick(item)}>
      <h3 className="text-[3vmin] font-semibold text-shadow blue-neon">{item.title}</h3>
      <p className="text-[2.5vmin] mt-2 text-shadow truncate">{item.description}</p>
    </div>
  );

  const NewsModal = ({ news, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 blue-neon">{news.title}</h2>
        <p className="mb-4">{news.description}</p>
        <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline blue-neon">Read more</a>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded blue-neon">Close</button>
      </div>
    </div>
  );

  const CurrencyDisplay = () => (
    <div className="currency-display mt-4">
      <h3 className="text-[3vmin] font-semibold text-shadow blue-neon mb-2">Currency Exchange Rates</h3>
      {currencies.map((currency, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span className="blue-neon">{currency.from} to {currency.to}:</span>
          <span className="blue-neon">{currency.rate.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`weather-widget relative overflow-hidden shadow-lg text-white flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out w-full h-full min-h-screen p-4 ${getBackgroundClass()}`}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-4 left-4 z-20 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
      >
        {isMenuOpen ? <X size="6vmin" /> : <Menu size="6vmin" />}
      </button>

      {isMenuOpen && (
        <div className="menu-overlay absolute inset-0 z-30 flex items-center justify-center p-4">
          <div className="menu-content p-4 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl mb-4 font-bold text-center blue-neon">{t('settings')}</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold blue-neon">{t('language')}</label>
              <select 
                value={settings.language} 
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(translations).map((lang) => (
                  <option key={lang} value={lang}>{translations[lang].language}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold blue-neon">{t('country')}</label>
              <select 
                value={settings.country} 
                onChange={(e) => handleSettingChange('country', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('autoLocation')}</option>
                {Object.entries(t('countries')).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold blue-neon">{t('city')}</label>
              <select 
                value={settings.city} 
                onChange={(e) => handleSettingChange('city', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!settings.country}
              >
                <option value="">{t('autoLocation')}</option>
                {settings.country && t('cities')[settings.country].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/3 z-10 text-center mt-8">
        <div className="flex justify-center items-center space-x-4">
          <DayNightIcon />
          <div className="text-[8vmin] font-light text-shadow blue-neon">
            {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
          </div>
          <DayNightIcon />
        </div>
        <div className="text-[3vmin] mt-2 text-shadow blue-neon">
          {time.toLocaleDateString(settings.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="flex flex-col items-center z-10 my-8 md:w-1/3">
        <WeatherIcon />
        <div className="text-[5vmin] capitalize font-light mt-4 text-center text-shadow blue-neon">
          {weather.condition}
        </div>
        <div className="flex items-center mt-2">
          <Thermometer className="text-white mr-2 blue-neon" size="7vmin" />
          <span className="text-[7vmin] font-light text-shadow blue-neon">{weather.temp}°C</span>
        </div>
        <div className="mt-4 flex items-center text-[3.5vmin] text-shadow blue-neon">
          <MapPin size="5vmin" className="mr-2" />
          <span>{settings.city || settings.country || t('autoLocation')}</span>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center">
        <CurrencyDisplay />

        <div className="news-container mt-8 w-full max-w-md">
          <h2 className="text-[4vmin] font-bold mb-4 text-shadow blue-neon">{t('topNews')}</h2>
          {news.length > 0 ? (
            <>
              <NewsItem item={news[currentNewsIndex]} onClick={setSelectedNews} />
              <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentNewsIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1))}>
                  <ChevronLeft size="6vmin" className="blue-neon" />
                </button>
                <button onClick={() => setCurrentNewsIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1))}>
                  <ChevronRight size="6vmin" className="blue-neon" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-[3vmin] text-shadow blue-neon">{t('noNews')}</p>
          )}
        </div>
      </div>

      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default WeatherTimeWidget;