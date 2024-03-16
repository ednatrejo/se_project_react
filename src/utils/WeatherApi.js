import { latitude, longitude, APIkey } from "./constants";
import { processServerResponse } from "./Utils";

export const getForecastWeather = () => {
  const weatherApi =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
    `).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temp),
      C: Math.round(((temp - 32) * 5) / 9),
    },
  };
  return weather;
};

export const parseLocation = (data) => {
  const city = data.name;
  return city;
};
