const BASE_URL =
  "https://search.wb.ru/exactmatch/ru/common/v4/search?dest=-1221148,-140294,-1751445,-364763&lang=ru&locale=ru&resultset=catalog";

export class DataLoader {
  _query = "";

  constructor(query) {
    this._query = query.replaceAll(" ", "+");
  }

  async getBrands() {
    try {
      let page = 1;
      let brandsList = [];

      while (true) {
        // Читаем из API данные постранично
        const response = await fetch(`${BASE_URL}&page=${page++}&query=${this._query}`);
        const resultChunk = await response.json();

        // Если вместо данных вернулся пустой объект или массив с данными пуст, останавливаем перебор
        if (Object.keys(resultChunk).length === 0 || resultChunk.data.products.length === 0) break;

        // Добавляем все бренды из этой порции данных в общий массив
        const brandsChunk = resultChunk.data.products.map((item) => item.brand);
        brandsList = brandsList.concat(brandsChunk);
      }

      // Очищаем от дубликатов и пустых значений и возвращаем результат
      const clearedBrandsList = [...new Set(brandsList)].filter((item) => item !== "");
      return clearedBrandsList;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
