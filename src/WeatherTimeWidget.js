import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Thermometer, Menu, X, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

// ... (оставьте определения countries, cities и translations без изменений)

const WeatherTimeWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ type: 'sunny', temp: 13, condition: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
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

  const fetchNews = async () => {
    try {
      // Простой парсер новостей (пример с использованием RSS-ленты BBC)
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/world/rss.xml`);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      const newsItems = Array.from(items).slice(0, 5).map(item => ({
        title: item.getElementsByTagName("title")[0].textContent,
        description: item.getElementsByTagName("description")[0].textContent
      }));
      setNews(newsItems);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const WeatherIcon = () => {
	  const iconProps = { size: '15vmin', className: `weather-icon ${weather.type}` };
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
  };

  const t = (key) => translations[settings.language][key];

  const NewsItem = ({ item }) => (
    <div className="news-item">
      <h3 className="text-[3vmin] font-semibold text-shadow">{item.title}</h3>
      <p className="text-[2.5vmin] mt-2 text-shadow">{item.description}</p>
    </div>
  );

  const MobileNews = () => (
    <div className="mt-8 news-container">
      <h2 className="text-[4vmin] font-bold mb-4 text-shadow">{t('topNews')}</h2>
      {news.length > 0 ? (
        <NewsItem item={news[currentNewsIndex]} />
      ) : (
        <p className="text-[3vmin] text-shadow">{t('noNews')}</p>
      )}
      {news.length > 1 && (
        <div className="flex justify-between mt-4">
          <button onClick={() => setCurrentNewsIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1))}>
            <ChevronLeft size="6vmin" />
          </button>
          <button onClick={() => setCurrentNewsIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1))}>
            <ChevronRight size="6vmin" />
          </button>
        </div>
      )}
    </div>
  );

  const DesktopNews = () => (
    <div className="news-container absolute left-0 top-0 bottom-0 w-1/3 overflow-y-auto">
      <h2 className="text-[4vmin] font-bold mb-4 text-shadow">{t('topNews')}</h2>
      {news.length > 0 ? (
        news.map((item, index) => <NewsItem key={index} item={item} />)
      ) : (
        <p className="text-[3vmin] text-shadow">{t('noNews')}</p>
      )}
    </div>
  );
  
  return (
	  <div className={`weather-widget relative overflow-hidden shadow-lg text-white flex flex-col items-center justify-between transition-all duration-1000 ease-in-out w-full h-full ${getBackgroundClass()}`}>
		<button 
		  onClick={() => setIsMenuOpen(!isMenuOpen)}
		  className="absolute top-4 left-4 z-20 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
		>
		  {isMenuOpen ? <X size="6vmin" /> : <Menu size="6vmin" />}
		</button>

		{isMenuOpen && (
		  <div className="menu-overlay absolute inset-0 z-30 flex items-center justify-center p-4 animate-fadeIn">
			<div className="menu-content bg-black bg-opacity-80 p-4 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideInUp">
			  <h2 className="text-xl sm:text-2xl mb-4 font-bold text-center text-white">{t('settings')}</h2>
			  <div className="mb-4">
				<label className="block mb-2 font-semibold text-white">{t('language')}</label>
				<select 
				  value={settings.language} 
				  onChange={(e) => handleSettingChange('language', e.target.value)}
				  className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
				  {Object.keys(translations).map((lang) => (
					<option key={lang} value={lang}>{translations[lang].language}</option>
				  ))}
				</select>
			  </div>
			  <div className="mb-4">
				<label className="block mb-2 font-semibold text-white">{t('country')}</label>
				<select 
				  value={settings.country} 
				  onChange={(e) => handleSettingChange('country', e.target.value)}
				  className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
				  <option value="">{t('autoLocation')}</option>
				  {Object.entries(t('countries')).map(([code, name]) => (
					<option key={code} value={code}>{name}</option>
				  ))}
				</select>
			  </div>
			  <div className="mb-4">
				<label className="block mb-2 font-semibold text-white">{t('city')}</label>
				<select 
				  value={settings.city} 
				  onChange={(e) => handleSettingChange('city', e.target.value)}
				  className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				  disabled={!settings.country}
				>
				  <option value="">{t('autoLocation')}</option>
				  {settings.country && t('cities')[settings.country].map((city) => (
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

		<div className="w-full z-10 text-center mt-8">
		  <div className="flex justify-center items-center space-x-4">
			<DayNightIcon />
			<div className="text-[8vmin] font-light text-outline">
			  {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
			</div>
			<DayNightIcon />
		  </div>
		  <div className="text-[3vmin] mt-2 text-outline">
			{time.toLocaleDateString(settings.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
		  </div>
		</div>

		<div className="flex flex-col items-center z-10 my-8">
		  <WeatherIcon />
		  <div className="text-[5vmin] capitalize font-light mt-4 text-center text-outline">
			{weather.condition}
		  </div>
		  <div className="flex items-center mt-2">
			<Thermometer className="text-white mr-2" size="7vmin" />
			<span className="text-[7vmin] font-light text-outline">{weather.temp}°C</span>
		  </div>
		  <div className="mt-4 flex items-center text-[3.5vmin] text-outline">
			<MapPin size="5vmin" className="mr-2" />
			<span>{settings.city || settings.country || t('autoLocation')}</span>
		  </div>
		</div>

		<div className="news-container">
		  <h2 className="text-[4vmin] font-bold mb-4 text-outline">{t('topNews')}</h2>
		  {news.length > 0 ? (
			news.map((item, index) => (
			  <div key={index} className="news-item">
				<h3 className="news-title text-outline">{item.title}</h3>
				<p className="news-description text-outline">{item.description}</p>
			  </div>
			))
		  ) : (
			<p className="text-[3vmin] text-outline">{t('noNews')}</p>
		  )}
		</div>
	  </div>
	);