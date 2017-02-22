import uuid from 'uuid';
import TypedNode from '../node';

export default class UUID extends TypedNode {
  constructor(value) {
    super();

    this.value = value || uuid();
  }
}
