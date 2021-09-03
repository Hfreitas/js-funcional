import { handleStatus } from "./utils/promise-helpers.js";
import {
  filterDataByValue,
  getValuesFromData,
  sumValues,
} from "./utils/filterData.js";
import { logger } from "./utils/logger.js";
import { partialize, pipe } from "./utils/operators.js";
import { Maybe } from "./utils/maybe.js";

const API_URL = "http://localhost:3000/notas";

export const appService = {
  async listAll() {
    return fetch(API_URL)
      .then(handleStatus)
      .then((response) => Maybe.of(response))
      .catch((err) => {
        logger(err);
        return Promise.reject(err);
      });
  },
  async sumItems(key) {
    // parcializo funções genericas e componho
    const getItems = partialize(getValuesFromData, "itens");

    const filterItems = partialize(filterDataByValue, "codigo", key);

    const sumItemsValues = partialize(sumValues, "valor");

    // data retorna uma monada Maybe
    const data = await this.listAll();

    const transformPipeline = pipe(getItems, filterItems, sumItemsValues)(data);

    return transformPipeline.getOrElse(0);
  },
};
