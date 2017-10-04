import { sym } from './utils';

export default class Factory {
  constructor(factory) {
    this[sym('factory')] = true;

    this.func = factory.bind(null);
  }

  get(...args) {
    return this.func(...args);
  }
}
