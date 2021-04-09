import {useState, useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const API_KEY = process.env.REACT_APP_API_KEY;
const first = 'https://api.openweathermap.org/data/2.5/weather?';
const urlOptions = {
  lat: 0,
  lon: 0,
  q: '',
};

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const getUrl = (urlOptions) => {
    let url = Object.keys(urlOptions).reduce((url, option) => {
      if (urlOptions[option]) {
        url += `${option}=${urlOptions[option]}&`;
      }
      return url;
    }, first);
    return `${url}appid=${API_KEY}`;
  }

  const getCurrentTime = (offset) => {
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let newDate = new Date(utc + (3600000 * offset));
    return newDate.toLocaleString();
  }

  const getWeather = async (lat = '', lon = '', q = '') => {
    urlOptions.lat = lat;
    urlOptions.lon = lon;
    urlOptions.q = q;
    let url = getUrl(urlOptions);
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(true);
    setTime(getCurrentTime(weather && weather.timezone / 3600));
  };

  const getCity = (value) => {
    setCity(value);
  }

  const render = () => {
    if(city === '') {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      });
    } else {
      getWeather('', '', city);
    }
  }

  useEffect(() => {
    render();
  }, [city, time]);

  return (
    <div>
      {loading ? 
      <div id="wrap" className={time}>
        <Header logo={logo}/>
        <main>
          <Sidebar getCity={getCity} />
          <Content
            bg={`_${weather && weather.id}`}
            city={weather && weather.name}
            country={weather && weather.sys.country}
            celsius={weather && Math.floor(weather.main.temp - 273.15)}
            fahrenheit={weather && Math.floor(1.8*(weather.main.temp - 273) + 32)}
            time={time}
            status={weather && weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1, weather.weather[0].description.indexOf(' ')) + ' ' + weather.weather[0].description[weather.weather[0].description.indexOf(' ') + 1].toUpperCase() + weather.weather[0].description.slice(weather.weather[0].description.indexOf(' ') + 2)}
          />
        </main>
        <Footer />
      </div> : 
      <div className="spinner">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </div>}
    </div>
  );
}

export default App;
