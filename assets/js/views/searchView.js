import { View } from "./View";
class SearchView extends View {
  #parentElement = document.querySelector("[data-search-result]");
  #data;
  _generateMarkup() {
    return `
      <ul class="view-list" data-search-list="">
        ${this.#generateSearchResults()}
      </ul>
    `;
  }

  #generateSearchResults() {
    return this.data
      .map((data) => {
        return `
        <li class="view-item">
          <span class="m-icon">location_on</span>

          <div>
            <p class="item-title">${data.name}</p>

            <p class="label-2 item-subtitle">State of ${data.state}, ${data.country}</p>
          </div>

          <a href="/${data.name}?lat=${data.latitude}&lon=${data.longitude}" class="item-link has-state" data-search-toggler=""></a>
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
export default new SearchView();
