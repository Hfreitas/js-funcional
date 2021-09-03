/* eslint-disable no-extend-native */
// Implementação de flatMap
if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (cb) {
    return this.map(cb).reduce(
      (destArray, array) => destArray.concat(array),
      []
    );
  };
}
