import * as helper from "../helper";
import { api_key, typeOfData, link, typeOfDataArray } from "../api";
export const state = {
  weatherData: new Map(),
  weatherURLs: new Map(),
  placesData: [],
};

export const fetchData = async function () {
  try {
    await getURLs();

    const promises = Array.from(
      state.weatherURLs.entries(),
      async ([typeData, url]) => {
        const data = await helper.getJsonData(url);
        if (typeOfData.currentWeather === typeData)
          return { data, typeData: "currentWeatherData" };
        if (typeOfData.forecastDaily === typeData)
          return { data, typeData: "forcast5DaysData" };

        if (typeOfData.aireQualityIndex === typeData)
          return { data, typeData: "aireQualityIndexData" };
      }
    );

    const weatherData = await Promise.all(promises);

    weatherData.forEach((data) => {
      if (data.typeData === "currentWeatherData") {
        state.weatherData.set(
          data.typeData,
          helper.generateCurrentWeatherData(data.data)
        );
      } else if (data.typeData === "aireQualityIndexData") {
        state.weatherData.set(
          data.typeData,
          helper.generateAireQualityIndexData(data.data)
        );
      } else if (data.typeData === "forcast5DaysData") {
        state.weatherData.set(
          "forecastHourly",
          helper.generateForecast5Days(data.data.list)
        );

        state.weatherData.set(
          "forecastDaily",
          helper.getforecast5Days(state.weatherData.get("forecastHourly"))
        );
      }
    });
    console.log(state.weatherData);
  } catch (error) {
    console.error(error);
  }
};

const getURLs = async function () {
  for (const typeweatherData of typeOfDataArray) {
    const url = helper.generateURL(typeweatherData);

    state.weatherURLs.set(typeweatherData, url);
  }
};

export const fetchDataPlaces = async function (place) {
  try {
    const url = helper.generateGeoCodeUrl(place);
    console.log(url);
    // return;
    const data = await helper.getJsonData(url);

    state.placesData = helper.generateplacesData(data);
    console.log(state.placesData);
  } catch (error) {
    console.log(error);
  }
};

fetchDataPlaces("tazmalt");
