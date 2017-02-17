import * as State from './state';
import is from './is';

import { sym } from './utils';

export default class Type {
  constructor(opts) {
    this.name = opts.name;
    this.validate = opts.validate;
    this.instance = opts.instance;
    this.required = opts.required;
    this.defaultValue = opts.defaultValue;
    this.of = opts.of;

    return this;
  }

  parse(value) {
    const TypeInstace = this.instance;

    if (!this.validate(value)) {
      throw {
        actual: Type.defineType(value),
        expected: this.name,
      };
    }

    return new TypeInstace(value, this.of);
  }

  getDefaultValue() {
    if (typeof this.defaultValue !== 'undefined') {
      return this.parse(this.defaultValue);
    }

    if (this.required) {
      throw `${this.name}: Default value is not defined.`;
    }

    return null;
  }

  static defineType(value) {
    if (is._undefined(value)) {
      return 'Undefined';
    } else if (is._null(value)) {
      return 'Null';
    } else if (is.schema(value)) {
      return 'Schema';
    } else if (is.type(value)) {
      return 'Type';
    } else if (is.list(value)) {
      return 'List';
    } if (is.number(value)) {
      return 'Number';
    } else if (is.string(value)) {
      return 'String';
    } else if (is.boolean(value)) {
      return 'Boolean';
    } else if (is.map(value)) {
      return 'Map';
    } else if (typeof value === 'function') {
      return 'Function';
    } else if (value[sym('node')]) {
      return value[sym('type')].name;
    }

    return 'Unknown';
  }
}


Type.Any = new Type({
  name: 'Any',
  instance: State.Any,
  validate: () => true,
});

Type.Boolean = new Type({
  name: 'Boolean',
  instance: State.Boolean,
  validate: is.boolean,
});

Type.List = new Type({
  name: 'List',
  instance: State.List,
  validate: is.list,
});

Type.Map = new Type({
  name: 'Map',
  instance: State.Map,
  validate: is.map,
});

Type.Number = new Type({
  name: 'Number',
  instance: State.Number,
  validate: is.number,
});

Type.String = new Type({
  name: 'String',
  instance: State.String,
  validate: is.string,
});
