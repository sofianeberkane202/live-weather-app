import { api_key, link, geocodingLink } from "./api";

export const getJsonData = async function (url) {
  try {
    const respose = await fetch(url);
    if (!respose.ok) throw new Error("invalid URL");
    const data = await respose.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const generateURL = function (typeData) {
  const query = window.location.search.slice(1);
  console.log("Q", query);
  return `${link}${typeData}?${query}&units=metric&appid=${api_key}`;
};

export const generateGeoCodeUrl = function (place) {
  const placeUrl = place.replaceAll(" ", "%20");
  return `${geocodingLink}?q=${placeUrl}&limit=5&appid=${api_key}`;
};

const getUserLocation = function () {
  return new Promise((resolve, rejected) =>
    navigator.geolocation.getCurrentPosition(resolve, rejected)
  );
};

export const featchLocation = async function () {
  try {
    const position = await getUserLocation();
    const { latitude, longitude } = position.coords;

    return { latitude, longitude };
  } catch (error) {
    console.error(error);
  }
};

// ---------------------------
//  - generateData
// --------------------------

export const generateCurrentWeatherData = function (data) {
  const [weather] = data.weather;
  const sunrise = timeConversion(data.sys.sunrise);
  const sunset = timeConversion(data.sys.sunset);

  const date = new Date();
  const formater = new Intl.DateTimeFormat(getLocalLanguage(), {
    day: "numeric",
    month: "short",
    weekday: "long",
  });

  const weatherDate = formater.format(date);

  const { humidity, pressure, feels_like, temp } = data.main;
  const visibility = Math.round(data.visibility / 1000);
  return {
    name: data.name,
    country: data.sys.country,
    weather,
    sunrise,
    sunset,
    date: weatherDate,
    humidity,
    pressure,
    feelsLike: feels_like,
    temperature: Math.round(temp),
    visibility,
  };
};

export const generateAireQualityIndexData = function (data) {
  return {
    Quality: data.list[0].main.aqi,
  };
};

export const generateForecast5Days = function (data) {
  const newData = data.map((d) => {
    const time = generateTime(d.dt_txt);
    const date = generateDate(d.dt);

    return {
      date,
      time,
      temperature: Math.round(d.main.temp),
      wind: d.wind,
      icon: d.weather[0].icon,
    };
  });

  return newData;
};

export const generateplacesData = function (data) {
  const newData = data.map((d) => {
    return {
      country: d.country,
      name: d.name,
      state: d.state,
      latitude: d.lat,
      longitude: d.lon,
    };
  });
  return newData;
};

const timeConversion = function (time) {
  const timeStamp = time * 1000;
  const date = new Date(timeStamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const getLocalLanguage = function () {
  const languages = navigator.languages;
  const defaultLanguage = navigator.language;
  const [localLanguage] = languages.filter(
    (lang) => lang.includes("-") && lang.includes(defaultLanguage)
  );
  return localLanguage;
};

const generateDate = function (time) {
  const timestamp = time * 1000;
  const date = new Date(timestamp);
  const local = getLocalLanguage();
  const formatterDay = new Intl.DateTimeFormat(local, { day: "numeric" });
  const formatterWeekDay = new Intl.DateTimeFormat(local, { weekday: "long" });
  const formatterMonth = new Intl.DateTimeFormat(local, { month: "short" });

  const [day, weekDay, month] = [
    formatterDay.format(date),
    formatterWeekDay.format(date),
    formatterMonth.format(date),
  ];

  return { day, weekDay, month };
};

const generateTime = function (time) {
  const T = +time.split(" ")[1].split(":")[0];
  if (T >= 0 && T <= 11) return `${`${T}`.padStart(2, 0)} AM`;
  return `${`${T}`.padStart(2, 0)} PM`;
};

export const getforecast5Days = function (data) {
  let currentDay;
  const weatherDataEachDay = data
    .map((d) => {
      if (!currentDay || currentDay !== d.date.day) {
        currentDay = d.date.day;
        return d;
      }
    })
    .filter((d) => d);
  return weatherDataEachDay;
};
