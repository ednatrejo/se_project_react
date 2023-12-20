const weatherOptions = [
  {
    url: require("../images/Day/sunny-day.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../images/Day/cloudy-day.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/Day/fog-day.svg").default,
    day: true,
    type: "foggy",
  },
  {
    url: require("../images/Day/rain-day.svg").default,
    day: true,
    type: "rainy",
  },
  {
    url: require("../images/Day/snow-day.svg").default,
    day: true,
    type: "snowy",
  },
  {
    url: require("../images/Day/storm-day.svg").default,
    day: true,
    type: "stormy",
  },
  {
    url: require("../images/Night/cloudy-night.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../images/Night/fog-night.svg").default,
    day: false,
    type: "foggy",
  },
  {
    url: require("../images/Night/rain-night.svg").default,
    day: false,
    type: "rainy",
  },
  {
    url: require("../images/Night/snow-night.svg").default,
    day: false,
    type: "snowy",
  },
  {
    url: require("../images/Night/storm-night.svg").default,
    day: false,
    type: "stormy",
  },
];

const WeatherCard = ({ day, type, weatherTemp = 0 }) => {
  const imageSrc = weatherConditions.filter((i) => {
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
