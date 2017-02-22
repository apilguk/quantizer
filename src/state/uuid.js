import uuid from 'uuid';
import TypedNode from '../node';
import { sym } from '../utils';

export default class UUID extends TypedNode {
  constructor(value) {
    super();

    if (value === sym('id')) {
      this.value = uuid();
    } else {
      this.value = value;
    }
  }
}
