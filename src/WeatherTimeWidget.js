import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Thermometer, Menu, X, MapPin } from 'lucide-react';


const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'RU', name: 'Russia' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
];

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
  SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
};

const translations = {
  en: {
    settings: 'Settings',
    language: 'Language',
    country: 'Country',
    city: 'City',
    close: 'Close',
    autoLocation: 'Auto Location',
  },
  ru: {
    settings: 'Настройки',
    language: 'Язык',
    country: 'Страна',
    city: 'Город',
    close: 'Закрыть',
    autoLocation: 'Автоопределение',
  },
  es: {
    settings: 'Ajustes',
    language: 'Idioma',
    country: 'País',
    city: 'Ciudad',
    close: 'Cerrar',
    autoLocation: 'Ubicación automática',
  },
  de: {
    settings: 'Einstellungen',
    language: 'Sprache',
    country: 'Land',
    city: 'Stadt',
    close: 'Schließen',
    autoLocation: 'Automatische Ortung',
  },
  fr: {
    settings: 'Paramètres',
    language: 'Langue',
    country: 'Pays',
    city: 'Ville',
    close: 'Fermer',
    autoLocation: 'Localisation automatique',
  },
  it: {
    settings: 'Impostazioni',
    language: 'Lingua',
    country: 'Paese',
    city: 'Città',
    close: 'Chiudi',
    autoLocation: 'Posizione automatica',
  },
  ja: {
    settings: '設定',
    language: '言語',
    country: '国',
    city: '都市',
    close: '閉じる',
    autoLocation: '自動位置',
  },
  zh: {
    settings: '设置',
    language: '语言',
    country: '国家',
    city: '城市',
    close: '关闭',
    autoLocation: '自动定位',
  },
};

const WeatherTimeWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ type: 'sunny', temp: 13, condition: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      
      const hour = new Date().getHours();
      if (hour >= 21 || hour < 6) weatherType = 'night';

      setWeather({ 
        type: weatherType, 
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const WeatherIcon = () => {
    const iconProps = { size: '15vmin', className: "text-white animate-pulse" };
    switch(weather.type) {
      case 'sunny': return <Sun {...iconProps} />;
      case 'cloudy': return <Cloud {...iconProps} />;
      case 'rainy': return <CloudRain {...iconProps} />;
      case 'snowy': return <CloudSnow {...iconProps} />;
      case 'stormy': return <CloudLightning {...iconProps} />;
      case 'night': return <Moon {...iconProps} />;
      default: return null;
    }
  };


  const getBackgroundClass = () => {
    switch(weather.type) {
      case 'sunny': return 'bg-gradient-to-br from-blue-400 via-yellow-300 to-orange-500';
      case 'cloudy': return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
      case 'rainy': return 'bg-gradient-to-br from-blue-700 via-blue-500 to-gray-400';
      case 'snowy': return 'bg-gradient-to-br from-blue-100 via-gray-200 to-white';
      case 'stormy': return 'bg-gradient-to-br from-gray-700 via-purple-600 to-gray-800';
      case 'night': return 'bg-gradient-to-br from-indigo-900 via-purple-800 to-black';
      default: return 'bg-gradient-to-br from-blue-500 to-purple-600';
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    if (setting === 'country') {
      setSettings(prev => ({ ...prev, city: '' }));
    }
  };

  const t = (key) => translations[settings.language][key];
  return (
    <div className={`relative overflow-hidden shadow-lg text-white flex flex-col items-center justify-between transition-all duration-1000 ease-in-out w-full h-full ${getBackgroundClass()}`}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-4 left-4 z-20 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
      >
        {isMenuOpen ? <X size="6vmin" /> : <Menu size="6vmin" />}
      </button>

      {isMenuOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideIn">
            <h2 className="text-xl sm:text-2xl mb-4 font-bold text-center">{t('settings')}</h2>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">{t('language')}</label>
              <select 
                value={settings.language} 
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">{t('country')}</label>
              <select 
                value={settings.country} 
                onChange={(e) => handleSettingChange('country', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('autoLocation')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">{t('city')}</label>
              <select 
                value={settings.city} 
                onChange={(e) => handleSettingChange('city', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!settings.country}
              >
                <option value="">{t('autoLocation')}</option>
                {settings.country && cities[settings.country].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}

      <div className="w-full z-10 text-center mt-[5vh] animate-fadeIn">
        <div className="text-[10vmin] font-light mb-[2vh] animate-pulse">
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
      <div className="flex flex-col items-center z-10 mb-[5vh] animate-fadeIn">
        <div className="animate-float">
          <WeatherIcon />
        </div>
        <div className="text-[5vmin] capitalize font-light mt-[3vh] text-center animate-fadeInUp">
          {weather.condition}
        </div>
        <div className="flex items-center mt-[2vh] animate-fadeInUp delay-100">
          <Thermometer className="text-white mr-2" size="7vmin" />
          <span className="text-[7vmin] font-light">{weather.temp}°C</span>
        </div>
        <div className="mt-[3vh] flex items-center text-[3.5vmin] animate-fadeInUp delay-200">
          <MapPin size="5vmin" className="mr-2" />
          <span>{settings.city || settings.country || t('autoLocation')}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherTimeWidget;