import TypedNode from '../node';

export default class Any extends TypedNode {
  constructor(value) {
    super();

    this.value = value;
  }
}
