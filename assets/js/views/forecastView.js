import { View } from "./View";
import images from "../../images/images.svg";
class ForecastView extends View {
  #parentElement = document.querySelector("[data-5-day-forecast]");
  #data;

  _generateMarkup() {
    this.data = this.data.get("forecastDaily");
    return `
      <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
      <div class="card card-lg forecast-card">
              <ul class="grid">
                ${this.#generateCardItems()}
              </ul>
      </div>
    `;
  }

  #generateCardItems() {
    return this.data
      .map((data) => {
        return `
      <li class="card-item flex flex-between flex-center-y">
        <div class="icon-wrapper flex flex-center-y" style="--gap: .8rem">
        
          <svg class="image-icon weather-icon" style="width:36px;height:36px;">
            <use href="${images}#icon${data.icon}"></use>
          </svg>

          <div class="span">
            <p class="title-2">${data.temperature}°</p>
          </div>
        </div>

        <p class="label-1">${data.date.day} ${data.date.month}</p>

        <p class="label-1">${data.date.weekDay}</p>
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

export default new ForecastView();
