// memoiza uma função e n parametros
/* o primeiro argumento do bind é o this que a função se refere,
 não queremos alterar esse this no partialize */
export const partialize = (fn, ...args) => fn.bind(null, ...args);

// a ultima que entra é a primeira a executar
export const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((previous, fn) => fn(previous), value);

// a primeira que entra é a primeira a executar
export const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((previous, fn) => fn(previous), value);

// chama a função até n vezes
export const takeUntil = (times, fn) => () => times-- > 0 && fn();

// limita a chamada de uma função em determinado intervalo de tempo
export const debounceTime = (ms, fn) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
};
