import { latitude, longitude, APIkey, currentTime } from "./constants";
import { processServerResponse } from "./Utils";

export const getForecastWeather = () => {
  const weatherApi =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
    `).then(processServerResponse);
  //call getWeatherCondition in the .then()
  //then save it to a state variable to pass to WeatherCard component
  // const [weatherCondition, setWeatherCondition] = useState(null);?
  return weatherApi;
};

export const parseWeatherData = (data) => {
  if (!data) {
    return null;
  }

  const weather = {
    temperature: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
  weather.city = data.name;
  weather.type = getWeatherType(weather.temperature);
  return weather;
};

export const getWeatherType = (weatherTemp) => {
  if (weatherTemp >= 86) {
    return "hot";
  } else if (weatherTemp >= 66 && weatherTemp <= 85) {
    return "warm";
  } else if (weatherTemp <= 65) {
    return "cold";
  }
};

export const getDay = (sunrise, sunset) => {
  const sunriseUnix = sunrise * 1000;
  const sunsetUnix = sunset * 1000;
  if (sunsetUnix >= currentTime && currentTime >= sunriseUnix) {
    return true;
  } else if (sunsetUnix <= currentTime && currentTime <= sunriseUnix) {
    return false;
  } else {
    return false;
  }
};

export const getWeatherCondition = (weatherId) => {
  if (200 <= weatherId && weatherId <= 232) {
    return "stormy";
  } else if (300 <= weatherId && weatherId <= 531) {
    return "rainy";
  } else if (600 <= weatherId && weatherId <= 622) {
    return "snowy";
  } else if (801 <= weatherId && weatherId <= 804) {
    return "cloudy";
  } else if (weatherId === 800) {
    return "clear";
  } else if (weatherId === 741) {
    return "foggy";
  }
};
