import is from './is';
import DefaultNodesFactory from './state/default_factory';
import Type from './type';
import { Map, List } from './state';
import { sym } from './utils';
import { ValidationError, RequirementError, UndeclaredError } from './error';

export default class Schema {
  constructor(name = 'Unnamed', fields, strict = false) {
    this[sym('schema')] = true;

    if (!name) {
      throw new Error('Schema: Missed name.');
    }

    this.name = name;
    this.fields = {};
    this.strict = strict;

    Schema.ValidateSchema(fields);
    this.init(fields);
  }

  setProps(props) {
    Object.assign(this, props);
  }

  init(fields) {
    for (const key in fields) {
      const input = fields[key];

      if (is.type(input) || is.schema(input)) {
        this.fields[key] = input;
      } else if (is.map(input)) {
        this.fields[key] = new Schema(key, input);
      } else if (is.list(input)) {
        const instance = input[0];

        if (is.type(instance) || is.schema(instance)) {
          this.fields[key] = new Type({
            name: instance.name,
            instance: List,
            validate: instance.validate.bind(instance),
            nested: instance,
          });
        } else if (is.node(instance)) {
          this.fields[key] = new Type({
            name: instance.name || key,
            instance: List,
            validate: is.list,
            nested: instance,
          });
        } else if (is.map(instance)) {
          this.fields[key] = new Type({
            name: instance.name || key,
            instance: List,
            validate: is.list,
            nested: new Schema(key, instance),
          });
        }
      } else if (is.node(input)) {
        this.fields[key] = new Type({
          name: input.name || key,
          instance: input,
          validate: is.map,
        });
      }
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
      errors = new ValidationError('Map', Type.DefineType(obj));

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

        if (validationError.count > 0) {
          errors.map[key] = validationError;
          errors.count += validationError.count;
        }
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

  static ValidateSchema(fields) {
    if (!fields) {
      throw new Error('Schema: Fields declaration undefined.');
    }

    for (const key in fields) {
      const input = fields[key];

      if (
        !is.map(input) &&
        !is.list(input) &&
        !is.schema(input) &&
        !is.type(input) &&
        !is.func(input)
      ) {
        throw new Error('Schema: Unsupported type of field.');
      }
    }
  }
}
