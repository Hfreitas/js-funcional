// encapsular valores nulos/undefined para evitar quebras na aplicação

export class Maybe {
  static of(value) {
    return new Maybe(value);
  }

  constructor(value) {
    this._value = value;
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }

  map(fn) {
    if (this.isNothing()) return Maybe.of(null);
    return Maybe.of(fn(this._value));
  }

  getOrElse(value) {
    if (this.isNothing()) return value;
    return this._value;
  }
}
