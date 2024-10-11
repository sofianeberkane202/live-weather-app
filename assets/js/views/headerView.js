import { featchLocation } from "../helper";
class HeaderView {
  #parentElement = document.querySelector(".header");

  addHandlerSearchView() {
    this.#parentElement.addEventListener("click", (e) => {
      const $searchhViewBtn = e.target.closest("[data-search-toggler]");
      if (!$searchhViewBtn) return;

      const $searchView =
        this.#parentElement.querySelector("[data-search-view]");
      $searchView.classList.toggle("active");
    });
  }

  addHandlerSearchField(handler) {
    const $seatchField = this.#parentElement.querySelector(
      "[data-search-field]"
    );
    document.addEventListener("keyup", (e) => {
      if (e.target === $seatchField) {
        if ($seatchField.value) {
          $seatchField.classList.add("searching");
          handler($seatchField.value);
        } else $seatchField.classList.remove("searching");
      }
    });
  }

  addHandlerActiveCurrentLocationBtn() {
    window.addEventListener("load", () => {
      if (navigator.geolocation) {
        const $currentLocationBtn = this.#parentElement.querySelector(
          "[data-current-location-btn]"
        );

        navigator.geolocation.getCurrentPosition(
          (l) => $currentLocationBtn.setAttribute("aria-disabled", false),
          (err) => $currentLocationBtn.setAttribute("aria-disabled", true)
        );
      }
    });
  }

  addHandlerCurrentLocationWeather(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      const $currentLocationBtn = e.target.closest(
        "[data-current-location-btn]"
      );
      if (!$currentLocationBtn) return;
      handler();
    });
  }

  addHandlerUpdateWindowLoacation() {
    this.#parentElement.addEventListener("click", async (e) => {
      console.log("enter");
      const $currentLocationBtn = e.target.closest(
        "[data-current-location-btn]"
      );
      if (!$currentLocationBtn) return;

      const position = await featchLocation();

      const url = `./current-location?lat=${position.latitude}&lon=${position.longitude}`;
      window.location.href = url;
    });
  }

  addhandlerLoad(handler) {
    window.addEventListener("load", () => {
      console.log("load", window.location.href);
      if (!window.location.search) return;
      handler();
    });
  }
}

export default new HeaderView();
