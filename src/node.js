import { sym } from './utils';

export default class TypedNode {
  constructor() {
    this[sym('node')] = true;
  }

  get() {
    return this.value;
  }

  set(value) {
    this.value = value;
  }
}

TypedNode[sym('node')] = true;
