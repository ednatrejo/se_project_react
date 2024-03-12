import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { useContext } from "react";

const WeatherCard = ({ isDay, type, weatherTemp = 0 }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => {
    return item.isDay === isDay && item.type === type;
  });

  const imageSrcUrl = weatherOption ? weatherOption.url || "" : "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp + "\u00B0 " + currentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} alt={type} className="weather__image" />
    </section>
  );
};

export default WeatherCard;
