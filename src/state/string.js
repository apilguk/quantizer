import TypedNode from '../node';

export default class String extends TypedNode {
  constructor(value) {
    super();

    this.value = value || '';
  }
}
