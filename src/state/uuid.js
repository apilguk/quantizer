import TypedNode from '../node';
import { sym, uuid, printDeprecationWarning } from '../utils';

export default class UUID extends TypedNode {
  constructor(value) {
    super();

    if (value === sym('id')) {
      this.value = uuid();
    } else {
      this.value = value;
    }

    printDeprecationWarning('Usage of built-in UUID is deprecated. UUID Type and State will be removed soon.');
  }
}
