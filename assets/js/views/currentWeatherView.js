import images from "../../images/images.svg";
import { View } from "./View";
class CurrentWeatherView extends View {
  #parentElement = document.querySelector("[data-current-weather]");
  #data;

  _generateMarkup() {
    this.data = this.data.get("currentWeatherData");

    const { icon, description } = this.data.weather;
    return `
      <div class="card card-lg current-weather-card">
              <h2 class="title-2 card-title">Now</h2>

              <div class="wrapper mg-block-12 flex flex-center-y">
                <p class="heading">${this.data.temperature}&deg;<sup>c</sup></p>

                <svg class="image-icon weather-icon" style='width:64px;height:64px;'>
                  <use href="${images}#icon${icon}"></use>
                </svg>
              </div>

              <p class="body-3">${description}</p>

              <ul class="meta-list flex flex-column" style="--gap: 12px">
                <li class="meta-item flex flex-center-y" style="--gap: 1rem">
                  <span class="m-icon">calendar_today</span>
                  <p class="title-3 meta-text">${this.data.date}</p>
                </li>

                <li class="meta-item flex flex-center-y">
                  <span class="m-icon">location_on</span>
                  <p class="title-3 meta-text">${this.data.name}, ${this.data.country}</p>
                </li>
              </ul>
      </div>
    `;
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

export default new CurrentWeatherView();
