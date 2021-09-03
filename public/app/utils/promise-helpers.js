/* eslint-disable prefer-promise-reject-errors */
export const handleStatus = (res) =>
  res.ok ? res.json() : Promise.reject(res.statusText);

export const timeoutPromise = (promiseFn, ms) => {
  const timeout = new Promise((resolve, reject) => {
    return setTimeout(
      () => reject(`Limite de tempo excedido (limite: ${ms} milissegundos)`),
      ms
    );
  });

  return Promise.race([timeout, promiseFn]);
};

export const delay = (ms) => (data) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      return resolve(data);
    }, ms)
  );

export const retry = (retries, retriesDelayTime, promiseFn) => {
  return promiseFn().catch((err) => {
    return delay(retriesDelayTime)().then(() =>
      retries > 1
        ? retry(retries - 1, retriesDelayTime, promiseFn)
        : Promise.reject(err)
    );
  });
};
