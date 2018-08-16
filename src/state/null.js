import TypedNode from '../node';

export default class Null extends TypedNode {
  constructor() {
    super();

    this.value = null;
  }
}
