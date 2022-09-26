"use strict";

import "./index.scss";
import { ListHandler } from "./js/brandsList";
import { DataLoader } from "./js/dataLoader";
import { Informer } from "./js/informer";

const queryInput = document.getElementById("searchQuery");
const brandInput = document.getElementById("brandName");
const searchButton = document.querySelector(".button");
const informerContainer = document.querySelector(".informer");
const brandsListContainer = document.querySelector(".brands-container");

let currentQuery = "";
const brandsList = new ListHandler(brandsListContainer);
const informer = new Informer(informerContainer);

queryInput.addEventListener("input", (e) => (currentQuery = e.target.value.trim()));
brandInput.addEventListener("input", (e) => brandsList.selectBrand(e.target.value.trim()));
searchButton.addEventListener("click", getData);

async function getData() {
  brandsList.hide();
  informer.show("Загрузка данных");

  const dataLoader = new DataLoader(currentQuery);
  const brands = await dataLoader.getBrands();

  if (brands.length === 0) {
    informer.show("Список брендов пуст");
    setTimeout(() => informer.hide(), 5000);
    return;
  }

  informer.hide();
  brandsList.setBrands(brands, currentQuery);
  brandsList.show();
}
