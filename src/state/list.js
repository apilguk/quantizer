import TypedNode from '../node';
import { indexedIterator, getSourceValue } from '../utils';
import is from '../is';
import DefaultNodesFactory from './default_factory';

export default class List extends TypedNode {
  constructor(value, of) {
    super();

    this.children = [];

    if (of) {
      if (!is.factory(of)) {
        this.type = of;
      } else {
        this.factory = of;
      }
    } else {
      this.factory = DefaultNodesFactory;
    }

    if (typeof value !== 'undefined') {
      this.set(value);
    }

    this[Symbol.iterator] = indexedIterator.bind(this);
  }

  clear() {
    this.children = [];

    return this;
  }

  concat(source) {
    if (!is.list(source)) {
      throw new Error('Input value is not a List type');
    }

    const sourceValue = getSourceValue(source);

    for (let i = 0; i < sourceValue.length; i += 1) {
      this.push(sourceValue[i]);
    }

    return this;
  }

  set(source) {
    this.clear();
    const sourceValue = getSourceValue(source);

    for (let i = 0; i < sourceValue.length; i += 1) {
      this.push(sourceValue[i]);
    }

    return this;
  }

  push(value) {
    const sourceValue = getSourceValue(value);

    if (this.type) {
      try {
        this.children.push(
          this
            .type
            .parse(sourceValue),
        );
      } catch (err) {
        throw err;
      }
    } else {
      this.children.push(this.factory.get(sourceValue));
    }

    return this;
  }

  get(...args) {
    return this.map(node => node
      .get(...args),
    );
  }

  get length() {
    return this.children.length;
  }

  map(handler) {
    let returnedValue;
    const result = [];

    for (let i = 0; i < this.children.length; i += 1) {
      returnedValue = handler(this.children[i], i);
      result.push(returnedValue);
    }

    return result;
  }

  at(index) {
    if (index === 'last') {
      return this.children[this.length - 1];
    }

    return this.children[index];
  }

  where(key, value) {
    let _key = key;
    let _value = value;

    if (typeof key === 'object') {
      const name = Object.keys(key)[0];
      _key = name;
      _value = key[name];
    }

    const result = this.filter(node => node.get(_key) === _value);

    if (result.length === 0) {
      return false;
    }

    return result;
  }

  filter(fn) {
    const result = [];

    this.map((node) => {
      if (fn(node) === true) {
        result.push(node);
      }

      return true;
    });

    if (result.length === 0) {
      return [];
    } else if (result.length === 1) {
      return result[0];
    }

    return result;
  }

  sortBy(key) {
    this.children.sort((a, b) => {
      if (a.get(key) > b.get(key)) {
        return 1;
      }

      if (a.get(key) < b.get(key)) {
        return -1;
      }

      return 0;
    });

    return this;
  }

  remove(toRemove) {
    if (Array.isArray(toRemove)) {
      for (let i = toRemove.length - 1; i >= 0; i -= 1) {
        this.remove(toRemove[i]);
      }
    } else {
      this.map((n, index) => {
        if (toRemove === n) {
          this.children.splice(index, 1);
        }

        return true;
      });
    }

    return this;
  }
}
