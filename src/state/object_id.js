import TypedNode from '../node';

export default class ObjectID extends TypedNode {
  constructor(value) {
    super();

    this.value = value || ObjectID.GenerateValue();
  }

  static GenerateValue(timestamp) {
    const h = 16;
    const process = s => Math.floor(s).toString(h);
    return process((timestamp || Date.now()) / 1000) + ' '
        .repeat(h)
        .replace(/./g, () => process(Math.random() * h));
  }

  getTimestamp() {
    return new Date(parseInt(this.get().substring(0, 8), 16) * 1000);
  }

}
