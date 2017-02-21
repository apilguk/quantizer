import TypedNode from '../node';

export default class ObjectID extends TypedNode {
  constructor(value) {
    super();

    this.value = value || ObjectID.GenerateValue();
  }

  static GenerateValue() {
    const h = 16;
    const process = s => Math.floor(s).toString(h);
    return process(Date.now() / 1000) + ' '
        .repeat(h)
        .replace(/./g, () => process(Math.random() * h));
  }

}
