import "./array-utils.js";

export const getValuesFromData = (key = "", data = []) =>
  data.map((values) => values.$flatMap((item) => item[key]));

export const filterDataByValue = (key, value, data = []) =>
  data.map((values) => values.filter((item) => item[key] === value));

export const sumValues = (key = "", data = []) =>
  data.map((values) => values.reduce((acc, item) => acc + item[key], 0));

/* utilizando closures para referenciar o contexto da 
declaração da função retornada e fazer o curry
*/
export const searchAndSumItemsValues =
  (key) =>
  (data = []) =>
    data
      .$flatMap(({ itens }) => itens)
      .reduce((acc, item) => (item.codigo === key ? acc + item.valor : acc), 0);
