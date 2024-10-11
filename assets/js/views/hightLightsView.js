import { View } from "./View";
class HightLightsView extends View {
  #parentElement = document.querySelector("[data-hightlights]");
  #data;

  #generateAirQuality(quality) {
    switch (quality) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
    }
  }

  _generateMarkup() {
    this.data = [
      this.data.get("currentWeatherData"),
      this.data.get("aireQualityIndexData"),
    ];
    const [currentWeatherData, aireQualityIndexData] = this.data;
    return `
    <div class="card card-lg">
              <h2 class="title-2" id="hightlights">Todays Highlights</h2>

              <div class="highlight-list grid" style="--gap: 2rem">
                <div class="card card-sm hightlight-card one">
                  <h3 class="title-3">Air Quality Index</h3>

                  <div class="wrapper">
                    <span class="m-icon">air</span>

                    <ul class="card-list">
                      <li class="card-item">
                        <p class="title-1">23.3</p>

                        <p class="label-1">PM<sub>2.5</sub></p>
                      </li>

                      <li class="card-item">
                        <p class="title-1">23.3</p>

                        <p class="label-1">PM<sub>2.5</sub></p>
                      </li>

                      <li class="card-item">
                        <p class="title-1">23.3</p>

                        <p class="label-1">PM<sub>2.5</sub></p>
                      </li>

                      <li class="card-item">
                        <p class="title-1">23.3</p>

                        <p class="label-1">PM<sub>2.5</sub></p>
                      </li>
                    </ul>
                  </div>

                  <span class="badg aqi-${
                    aireQualityIndexData.Quality
                  } label-1" title="aqi message">${this.#generateAirQuality(
      aireQualityIndexData.Quality
    )}</span>
                </div>

                <div class="card card-sm hightlight-card two">
                  <h3 class="title-3">Surise &amp; Sunset</h3>
                  <div class="card-list">
                    <div class="card-item">
                      <span class="m-icon">clear_day</span>
                      <div>
                        <p class="label-1">Sunrise</p>
                        <p class="title-1">${currentWeatherData.sunrise} AM</p>
                      </div>
                    </div>

                    <div class="card-item">
                      <span class="m-icon">clear_night</span>
                      <div>
                        <p class="label-1">Sunset</p>
                        <p class="title-1">${currentWeatherData.sunset} PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card card-sm hightlight-card">
                  <h3 class="title-3">Humidity</h3>
                  <div class="wrapper">
                    <span class="m-icon">humidity_percentage</span>
                    <p class="title-1">${
                      currentWeatherData.humidity
                    }<sub>%</sub></p>
                  </div>
                </div>

                <div class="card card-sm hightlight-card">
                  <h3 class="title-3">Pressure</h3>
                  <div class="wrapper">
                    <span class="m-icon">airwave</span>
                    <p class="title-1">${
                      currentWeatherData.pressure
                    }<sub>hPa</sub></p>
                  </div>
                </div>

                <div class="card card-sm hightlight-card">
                  <h3 class="title-3">Visibility</h3>
                  <div class="wrapper">
                    <span class="m-icon">visibility</span>
                    <p class="title-1">${
                      currentWeatherData.visibility
                    }<sub>km</sub></p>
                  </div>
                </div>

                <div class="card card-sm hightlight-card">
                  <h3 class="title-3">Feels Like</h3>
                  <div class="wrapper">
                    <span class="m-icon">thermostat</span>
                    <p class="title-1">${
                      currentWeatherData.feelsLike
                    }°<sup>c</sup></p>
                  </div>
                </div>
              </div>
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

export default new HightLightsView();
