export class Element {
  _container = null;
  constructor(element) {
    this._container = element;
  }

  hide() {
    this._container.classList.add("hidden");
  }

  show() {
    this._container.classList.remove("hidden");
  }
}
