export const latitude = 32.77;
export const longitude = 96.79;
export const APIkey = "a4a372cf5eefc49e73e8a43692b75cf5";

export const weatherOptions = [
  {
    url: require("../images/Day/sunny-day.svg").default,
    day: true,
    type: "sunny-day",
  },
  {
    url: require("../images/Day/cloudy-day.svg").default,
    day: true,
    type: "cloudy-day",
  },
  {
    url: require("../images/Day/fog-day.svg").default,
    day: true,
    type: "foggy-day",
  },
  {
    url: require("../images/Day/rain-day.svg").default,
    day: true,
    type: "rainy-day",
  },
  {
    url: require("../images/Day/snow-day.svg").default,
    day: true,
    type: "snowy-day",
  },
  {
    url: require("../images/Day/storm-day.svg").default,
    day: true,
    type: "storm-day",
  },
  {
    url: require("../images/Night/cloudy-night.svg").default,
    day: false,
    type: "cloudy-night",
  },
  {
    url: require("../images/Night/fog-night.svg").default,
    day: false,
    type: "fog-night",
  },
  {
    url: require("../images/Night/rain-night.svg").default,
    day: false,
    type: "rain-night",
  },
  {
    url: require("../images/Night/snow-night.svg").default,
    day: false,
    type: "snow-night",
  },
  {
    url: require("../images/Night/storm-night.svg").default,
    day: false,
    type: "storm-night",
  },
];

export const currentTime = Date.now();
