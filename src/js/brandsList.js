import { Element } from "./element";

export class ListHandler extends Element {
  _header = null;
  _list = null;
  _brands = [];
  _selectedBrand = null;

  constructor(container) {
    super(container);
    this._header = this._container.querySelector(".brands-title");
    this._list = this._container.querySelector(".list");
  }

  setBrands(brands, query) {
    this._brands = brands;
    this._header.innerText = `Рейтинг по запросу: ${query}`;
    // Здесь используется textContent вместо innerHtml
    // потому, что в момент исполнения список скрыт display: none
    // и изменения в DOM этого элемента парситься не будут
    this._list.textContent = "";
    this._selectedBrand = null;

    this._brands.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("brand");
      listItem.innerText = item;
      this._list.append(listItem);
    });
  }

  selectBrand(brand) {
    const brandIndex = this._brands.indexOf(brand);
    if (brandIndex === -1) {
      if (this._selectedBrand) {
        this._selectedBrand.classList.remove("brand-selected");
        this._selectedBrand = null;
      }
      return;
    }

    this._selectedBrand = this._list.children[brandIndex];
    this._selectedBrand.classList.add("brand-selected");
  }
}
