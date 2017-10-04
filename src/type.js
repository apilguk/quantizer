import is from './is';
import { sym } from './utils';
import { ValidationError } from './error';

/**
 * Type.
 */

export default class Type {
  /**
   * @param {{
   *   name: {number} - name of the type validator, will be used for formating errors.
   *   validate: {function} - validator function takes a value to validate and return
   *     boolean verdict.
   *   instance: {Node} - instance of the Quantizer node wich will be used for serialization.
   *   required: {boolean} - is value need to be required or no.
   *   nested: {Type|Schema|Node} - nested type of the node, currently supported by List.
   * }} - params of the type.
   *
   * @returns {Type}
   */
  constructor({ name, validate, instance, required, nested }) {
    this[sym('type')] = true;

    this.name = name;
    this.validate = validate;
    this.instance = instance;
    this.required = required;
    this.nested = nested;

    if (nested) {
      this.validate = (value) => {
        const errors = {
          name: this.name,
          count: 0,
          list: [],
        };

        if (!validate(value)) {
          return new ValidationError('List', Type.defineType(value));
        }

        for (let i = 0; i < value.length; i += 1) {
          if (is.node(nested)) {
            const validationError = nested.schema.validate(value[i]);

            if (validationError.count > 0) {
              errors.list.push(validationError);
              errors.count += validationError.count;
            }
          } else {
            const validationError = nested.validate(value[i]);

            if (validationError.count > 0) {
              errors.list.push(validationError);
              errors.count += validationError.count;
            }
          }
        }

        return errors;
      };
    } else {
      this.validate = (value) => {
        let errors = {
          name: this.name,
          count: 0,
        };

        if (!validate(value)) {
          errors = new ValidationError(this.name, Type.defineType(value));

          return errors;
        }

        return errors;
      };
    }

    if (!required) {
      this.isRequired = new Type({ ...this, required: true });
    }

    return this;
  }

  parse(value) {
    const TypeInstace = this.instance;

    return new TypeInstace(value, this.nested);
  }

  static defineType(value) {
    switch (true) {
      case is._undefined(value):
        return 'Undefined';
      case is._null(value):
        return 'Null';
      case is.schema(value):
        return 'Schema';
      case is.type(value):
        return 'Type';
      case is.list(value):
        return 'List';
      case is.number(value):
        return 'Number';
      case is.string(value):
        return 'String';
      case is.boolean(value):
        return 'Boolean';
      case is.map(value):
        return 'Map';
      case is.func(value):
        return 'Function';
      case is.node(value):
        return 'TypedNode';
      default:
        return 'Unknown';
    }
  }
}

