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
   * }} - Params of the type.
   *
   * @returns {Type}
   */

  constructor(params) {
    const { name, validate, instance, required, nested } = params;
    Type.ValidateType(params);

    this[sym('type')] = true;
    this.name = name;
    this.validationFunction = validate;
    this.instance = instance;
    this.required = required;
    this.nested = nested;

    if (!required) {
      this.isRequired = new Type({ ...this, required: true });
    }

    return this;
  }

  validate(value) {
    let errors = {
      name: this.name,
      count: 0,
    };

    if (this.nested) {
      errors.list = [];

      if (!this.validationFunction(value) && !is._null(value)) {
        return new ValidationError('List', Type.DefineType(value));
      }

      for (let i = 0; i < value.length; i += 1) {
        if (is.factory(this.nested)) break;

        if (is.node(this.nested)) {
          const validationError = this.nested.schema.validate(value[i]);

          if (validationError.count > 0) {
            errors.list.push(validationError);
            errors.count += validationError.count;
          }
        } else {
          const validationError = this.nested.validate(value[i]);

          if (validationError.count > 0) {
            errors.list.push(validationError);
            errors.count += validationError.count;
          }
        }
      }

      return errors;
    }

    if (!this.validationFunction(value) && !is._null(value)) {
      errors = new ValidationError(this.name, Type.DefineType(value));

      return errors;
    }

    return errors;
  }

  parse(value) {
    const TypeInstace = this.instance;

    return new TypeInstace(value, this.nested);
  }

  static ValidateType(params) {
    if (!params.name) {
      throw new Error('Type: Missing type name.');
    }

    if (!params.instance) {
      throw new Error('Type: Missing validation function.');
    }

    if (!params.instance) {
      throw new Error('Type: Missing type instance.');
    }

    if (!is.func(params.instance) && !is.factory(params.instance)) {
      throw new Error('Type: Instance should be constructor or factory.');
    }

    if (!is.func(params.validate) && !is.func(params.validationFunction)) {
      throw new Error('Type: Validate function is not a function.');
    }

    if (!is.string(params.name)) {
      throw new Error('Type: Name is not a string.');
    }

    if (params.required && !is.boolean(params.required)) {
      throw new Error('Type: Required is not a boolean.');
    }

    if (
      params.nested &&
      (!is.func(params.nested) &&
      !is.schema(params.nested) &&
      !is.factory(params.nested) &&
      !is.type(params.nested))
    ) {
      throw new Error('Type: Unsupported nested instance it should be constructor, schema, factory or another type.');
    }

    if (
      params.nested &&
      is.node(params.nested) &&
      typeof params.nested.schema === 'undefined'
    ) {
      throw new Error('Type: Neasted type currenly supported nodes with attached schemas.');
    }
  }

  static DefineType(value) {
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

