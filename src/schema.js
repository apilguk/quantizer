import is from './is';
import DefaultNodesFactory from './state/default_factory';
import Type from './type';
import { Map, List } from './state';
import { sym } from './utils';
import { ValidationError, RequirementError, UndeclaredError, DefaultError } from './error';

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
      // const type = Type.defineType(input);

      if (is.type(input) || is.schema(input)) {
        this.fields[key] = input;
      } else if (is.map(input)) {
        const schema = new Schema(key, input);

        this.fields[key] = new Type({
          name: key,
          instance: Map,
          validate: schema.validate.bind(schema),
          of: schema,
        });
      } else if (is.list(input)) {
        const instance = input[0];

        if (is.schema(instance) || is.type(instance)) {
          this.fields[key] = new Type({
            name: instance.name,
            instance: List,
            validate: instance.validate,
            of: instance,
          });
        }

        if (is.node(instance) && instance.schema && is.schema(instance.schema)) {
          this.fields[key] = new Type({
            name: instance.name,
            instance: List,
            validate: instance.schema.validate.bind(instance.schema),
            of: instance,
          });
        }

      } else {
        // console.log(is.schema(input), input)

      }
    }
  }

  getDefault(key) {
    if (this.fields[key]) {
      return this.fields[key].getDefaultValue();
    }

    return new DefaultError(key);
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

  find(key) {
    return this.attributes[key];
  }

  static BindSchema(node, schema) {
    node.validate = schema.validate.bind(schema);
  }
}
