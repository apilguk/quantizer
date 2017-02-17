export default class FactoryFunction {
  constructor(factory) {
    this.func = factory.bind(null);
  }

  get(...args) {
    return this.func(...args);
  }
}
