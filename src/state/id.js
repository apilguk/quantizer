import UUID from 'uuid';
import TypedNode from '../node';

export default class ID extends TypedNode {
  constructor(value) {
    super();

    this.value = value || UUID();
  }
}
