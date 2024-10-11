import { View } from "./View";
import images from "../../images/images.svg";

class ForecastHourlyView extends View {
  #parentElement = document.querySelector(".hourly-forecast");
  #data;
  _generateMarkup() {
    this.data = this.data.get("forecastHourly");
    return `
      <h2 class="title-2">Today at</h2>
      <div class="slider-container grid">
        ${this.#generateHourlyForecastWeather()}
        ${this.#generateHourlyForecastWeatherWind()}
      </div>
  

    `;
  }

  #generateHourlyForecastWeather() {
    return `
        <ul class="slider-list flex" data-temp="">
          ${this.#generateHourlyForecastWeatherItems()}
        </ul>
    `;
  }

  #generateHourlyForecastWeatherItems() {
    return this.data
      .map((data) => {
        return `
         <li class="slider-item">
            <div class="card card-sm slider-card">
              <p class="body-3">${data.time}</p>

              <svg class="image-icon weather-icon" style="width:36px;height:36px;">
                <use href="${images}#icon${data.icon}"></use>
              </svg>

              <p class="body-3">${data.temperature}°</p>
            </div>
          </li>
      `;
      })
      .join("");
  }

  #generateHourlyForecastWeatherWind() {
    return `
        <ul class="slider-list flex" data-temp="">
          ${this.#generateHourlyForecastWeatherWindItems()}
        </ul>
    `;
  }

  #generateHourlyForecastWeatherWindItems() {
    return this.data
      .map((data) => {
        return `
         <li class="slider-item">
            <div class="card card-sm slider-card">
              <p class="body-3">${data.time}</p>

              <svg class="image-icon weather-icon" style="width:36px;height:36px;    
              transform: rotate(${data.wind.deg}deg);}">
                <use href="${images}#icondirection"></use>
              </svg>

              <p class="body-3">${data.wind.speed}km/h</p>
            </div>
          </li>
      `;
      })
      .join("");
  }

  // getters and setters
  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }

  get parentElement() {
    return this.#parentElement;
  }
}

export default new ForecastHourlyView();
