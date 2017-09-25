import TypedNode from '../node';
import { keyedIterator, getSourceValue } from '../utils';
import { DefaultError } from '../error';
import DefaultNodesFactory from './default_factory';

export default class Map extends TypedNode {
  constructor(value, schema = false) {
    super();

    this.attributes = {};
    this.keys = [];
    this.schema = schema;

    if (value !== undefined) {
      this.set(value);
    }

    this[Symbol.iterator] = keyedIterator.bind(this);
  }

  setAttribute(key, value) {
    if (!this.schema) {
      this.attributes[key] = DefaultNodesFactory.get(value);
    } else {
      this.attributes[key] = this.schema.serializeField(key, value);
    }

    if (this.keys.indexOf(key) === -1) {
      this.keys.push(key);
    }

    return this;
  }

  getAttribute(key) {
    return getSourceValue(this.attributes[key]);
  }

  set(source) {
    this.clear();
    this.keys = Object.keys(source);
    this.merge(source);

    return this;
  }

  clear() {
    this.keys = [];
    this.attributes = {};
  }

  merge(source) {
    const sourceValue = getSourceValue(source);

    if (this.schema) {
      const validationErr = this.schema.validate(source);

      if (validationErr._count_ > 0) {
        throw DefaultError.formatError(validationErr);
      }
    }

    if (!this.schema) {
      for (const name in sourceValue) {
        this.setAttribute(name, sourceValue[name]);
      }
    } else {
      this.attributes = Object.assign(this.attributes, this.schema.serialize(source));
    }
  }

  get(...args) {
    const result = {};
    const list = args.length
      ? args
      : this.keys;

    if (arguments.length === 1) {
      return this.getAttribute(list[0]);
    }

    for (let i = 0; i < list.length; i += 1) {
      const key = list[i];
      result[key] = this.getAttribute(key);
    }
    return result;
  }

  map(handler) {
    const result = [];

    for (let i = 0; i < this.keys.length; i += 1) {
      const key = this.keys[i];
      const value = handler(this.attributes[key], key);

      result.push(value);
    }

    return result;
  }

  find(key) {
    return this.attributes[key];
  }

  clone() {
    return new Map(this.get(), this.schema);
  }

  toJSON() {
    return JSON.stringify(this.get());
  }

  fromJSON(str) {
    return this.set(JSON.parse(str));
  }
}

