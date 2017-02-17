import TypedNode from '../node';

export default class Number extends TypedNode {
  constructor(value) {
    super();

    this.value = value || 0;
  }

  increase() {
    this.value += 1;
  }

  decrease() {
    this.value -= 1;
  }
}
