import "../models/model";
import { dataKeys } from "../config";

import * as model from "../models/model";
import currentWeatherView from "../views/currentWeatherView";
import headerView from "../views/headerView";
import hightLightsView from "../views/hightLightsView";
import forecastView from "../views/forecastView";
import forecastHourly from "../views/forecastHourly";

import searchView from "../views/searchView";

const controllerCurrentWeather = function () {
  currentWeatherView.render(model.state.weatherData);
};

const controllerHightlights = function () {
  hightLightsView.render(model.state.weatherData);
};

const controllerForecast = function () {
  forecastView.render(model.state.weatherData);

  forecastHourly.render(model.state.weatherData);
};

const controllerLoadWeatherData = async function () {
  await controllerAllWeatherData();
};

const controllerAllWeatherData = async function () {
  try {
    await model.fetchData();

    controllerCurrentWeather();
    controllerHightlights();
    controllerForecast();
  } catch (error) {
    console.error(error);
  }
};

const controllerSearchField = async function (place) {
  try {
    await model.fetchDataPlaces(place);
    searchView.render(model.state.placesData);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  headerView.addHandlerActiveCurrentLocationBtn();
  headerView.addHandlerUpdateWindowLoacation();
  headerView.addhandlerLoad(controllerLoadWeatherData);
  headerView.addHandlerSearchView();
  headerView.addHandlerSearchField(controllerSearchField);
};

init();
