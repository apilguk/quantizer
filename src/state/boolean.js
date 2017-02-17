import TypedNode from '../node';

export default class Boolean extends TypedNode {
  constructor(value = false) {
    super();

    this.value = value;
  }

  invert() {
    this.value = !this.value;
  }
}
