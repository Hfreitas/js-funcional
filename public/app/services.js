import { handleStatus } from './utils/promise-helpers.js';
import {
  filterDataByValue,
  getValuesFromData,
  sumValues,
} from './utils/filterData.js';
import { logger } from './utils/logger.js';
import { partialize, takeUntil, pipe } from './utils/operators.js';

const API_URL = 'http://localhost:3000/notas';

export const appService = {
  async listAll() {
    return fetch(API_URL)
      .then(handleStatus)
      .catch((err) => {
        logger(err);
        return Promise.reject('Internal error');
      });
  },
  async sumItems(key) {
    // parcializo funções genericas e componho
    const getItems = partialize(getValuesFromData, 'itens');

    const filterItems = partialize(filterDataByValue, 'codigo', key);

    const sumItemsValues = partialize(sumValues, 'valor');

    const data = await this.listAll();

    return pipe(getItems, filterItems, sumItemsValues)(data);
  },
};
