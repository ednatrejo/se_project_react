import { latitude, longitude, APIkey } from "./constants";
import { processServerResponse } from "./Utils";

export const getForecastWeather = () => {
  const weatherApi =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
    `).then(processServerResponse);
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
