import is from './is';
import DefaultNodesFactory from './state/default_factory';
import Type from './type';
import { Map, List } from './state';
import { sym } from './utils';
import { ValidationError, RequirementError, UndeclaredError } from './error';

export default class Schema {
  constructor(name = 'Unnamed', fileds, strict = false) {
    this[sym('schema')] = true;

    this.name = name;
    this.fields = {};
    this.strict = strict;

    if (fileds) {
      this.initTypes(fileds);
    }
  }

  setProps(props) {
    Object.assign(this, props);
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

        if (
          innerType === 'Schema' ||
          innerType === 'Type' ||
          is.node(input[0])
        ) {
          innerSchema = input[0];
        }

        this.fields[key] = new Type({
          name: innerSchema.name,
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

  validate(obj) {
    const objKeys = Object.keys(obj);
    const fieldsKeys = Object.keys(this.fields);
    let errors = {
      name: this.name,
      count: 0,
      map: {},
    };

    if (!is.map(obj)) {
      errors = new ValidationError('Map', Type.defineType(obj));

      return errors;
    }

    for (let i = 0; i < objKeys.length; i += 1) {
      const key = objKeys[i];
      const field = this.fields[key];

      if (typeof field !== 'undefined') {
        if (is.schema(field)) {
          field.strict = this.strict;
        }

        const validationError = field.validate(obj[key]);

        errors.map[key] = validationError;
        errors.count += validationError.count;
      }

      if (this.strict && typeof field === 'undefined') {
        errors.map[key] = new UndeclaredError(key);
        errors.count += 1;
      }
    }

    for (let i = 0; i < fieldsKeys.length; i += 1) {
      const key = fieldsKeys[i];
      const type = this.fields[key];

      if (
        type[sym('type')] &&
        type.required &&
        typeof obj[key] === 'undefined'
      ) {
        errors.map[key] = new RequirementError(key);
        errors.count += 1;
      }
    }

    return errors;
  }

  serialize(obj) {
    const result = {};

    for (const key in obj) {
      const field = this.fields[key];

      if (typeof field !== 'undefined') {
        result[key] = field.parse(obj[key]);
      } else {
        result[key] = DefaultNodesFactory.get(obj[key]);
      }
    }

    return result;
  }

  serializeField(key, value) {
    const field = this.fields[key];

    if (typeof field !== 'undefined') {
      return field.parse(value);
    }

    return DefaultNodesFactory.get(value);
  }

  parse(value) {
    return new Map(value, this);
  }

  find(key) {
    return this.attributes[key];
  }
}
