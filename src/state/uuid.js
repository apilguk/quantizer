import TypedNode from '../node';
import { sym, uuid } from '../utils';

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
