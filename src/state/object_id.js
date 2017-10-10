import TypedNode from '../node';
import { sym } from '../utils';

export default class ObjectID extends TypedNode {
  constructor(value) {
    super();

    if (value === sym('id')) {
      this.value = ObjectID.GenerateValue();
    } else {
      this.value = value;
    }
  }

  static GenerateValue(timestamp) {
    const h = 16;
    const process = s => Math.floor(s).toString(h);
    return process((timestamp || Date.now()) / 1000).padStart(8, 0).slice(-8) + ' '
        .repeat(h)
        .replace(/./g, () => process(Math.random() * h));
  }

  getTimestamp() {
    return new Date(parseInt(this.get().substring(0, 8), 16) * 1000);
  }

}
