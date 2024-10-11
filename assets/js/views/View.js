export class View {
  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }
}
