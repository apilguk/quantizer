import is from './is';
import DefaultNodesFactory from './state/default_factory';
import Type from './type';
import { Map, Any, List } from './state';
import { sym } from './utils';

export default class Schema {
  constructor(name = 'Unnamed', fileds) {
    this[sym('schema')] = true;

    this.name = name;
    this.fields = {};

    if (fileds) {
      this.initTypes(fileds);
    }
  }

  initTypes(types) {
    for (const key in types) {
      const input = types[key];
      const type = Type.defineType(input);

      if (type === 'Type' || type === 'Schema') {
        this.fields[key] = input;
      } else if (type === 'Map') {
        this.fields[key] = new Type({
          name: key,
          instance: Map,
          validate: is.map,
          of: new Schema(key, input),
        });
      } else if (type === 'List') {
        const innerType = Type.defineType(input[0]);
        let innerSchema = new Schema(key, input[0]);

        if (innerType === 'Schema' || innerType === 'Type') {
          innerSchema = input[0];
        }

        this.fields[key] = new Type({
          name: key,
          instance: List,
          validate: is.list,
          of: innerSchema,
        });
      }
    }
  }

  getDefault(key) {
    try {
      if (this.fields[key]) {
        return this.fields[key].getDefaultValue();
      }

      return new Error(`Undefined value - ${key}`);
    } catch (err) {
      throw err;
    }
  }

  validateField(key, value) {
    const field = this.fields[key];

    if (field instanceof Any) {
      return new Any(value);
    }

    if (typeof field === 'undefined') {
      return DefaultNodesFactory.get(value);
    }

    return field.parse(value);
  }

  validate(obj) {
    const result = {};
    const errors = {};
    let validationFailed = false;

    for (const key in obj) {
      const value = obj[key];

      try {
        result[key] = this.validateField(key, value);
      } catch (err) {
        validationFailed = true;
        errors[key] = err;
      }
    }

    if (validationFailed) {
      throw errors;
    }

    return result;
  }

  parse(value) {
    return new Map(value, this);
  }

  find(key) {
    return typeof this.attributes[key] !== 'undefined'
      ? this.attributes[key]
      : undefined;
  }
}
