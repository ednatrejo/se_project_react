import "./WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/Day/sunny-day.svg").default,
    day: true,
    type: "sunny-day",
  },
  {
    url: require("../../images/Day/cloudy-day.svg").default,
    day: true,
    type: "cloudy-day",
  },
  {
    url: require("../../images/Day/fog-day.svg").default,
    day: true,
    type: "foggy-day",
  },
  {
    url: require("../../images/Day/rain-day.svg").default,
    day: true,
    type: "rainy-day",
  },
  {
    url: require("../../images/Day/snow-day.svg").default,
    day: true,
    type: "snowy-day",
  },
  {
    url: require("../../images/Day/storm-day.svg").default,
    day: true,
    type: "storm-day",
  },
  {
    url: require("../../images/Night/cloudy-night.svg").default,
    day: false,
    type: "cloudy-night",
  },
  {
    url: require("../../images/Night/fog-night.svg").default,
    day: false,
    type: "fog-night",
  },
  {
    url: require("../../images/Night/rain-night.svg").default,
    day: false,
    type: "rain-night",
  },
  {
    url: require("../../images/Night/snow-night.svg").default,
    day: false,
    type: "snow-night",
  },
  {
    url: require("../../images/Night/storm-night.svg").default,
    day: false,
    type: "storm-night",
  },
];

const WeatherCard = ({ day, type, weatherTemp = 0 }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp} F</div>
      <img src={imageSrcUrl} className="weather_image" alt="weather" />
    </section>
  );
};

export default WeatherCard;
