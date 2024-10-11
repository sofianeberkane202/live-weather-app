const api_key = "6d855bdb240fa9308541d1c96dcf37c9";
const link = "https://api.openweathermap.org/data/2.5/";
const geocodingLink = "http://api.openweathermap.org/geo/1.0/direct";
const typeOfDataArray = ["weather", "forecast", "air_pollution"];
const typeOfData = {
  currentWeather: "weather",
  // forecastHourly: "forecast/hourly",
  forecastDaily: "forecast",
  aireQualityIndex: "air_pollution",
};

export { api_key, link, typeOfData, typeOfDataArray, geocodingLink };
