import * as State from './state';
import is from './is';
import { sym } from './utils';

export default class Type {
  constructor(opts) {
    this[sym('type')] = true;

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
      case typeof value === 'function':
        return 'Function';
      case is.node(value):
        return 'TypedNode';
      default:
        return 'Unknown';
    }
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

Type.UUID = new Type({
  name: 'UUID',
  instance: State.UUID,
  validate: is.uuid,
});

Type.ObjectID = new Type({
  name: 'ObjectID',
  instance: State.ObjectID,
  validate: is.object_id,
});
