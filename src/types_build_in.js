import * as State from './state';

import Type from './type';
import is from './is';
import { DeprecationWarning } from './error';

Type.Any = new Type({
  name: 'Any',
  instance: State.Any,
  validate: () => (true),
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

const UUID = new Type({
  name: 'UUID',
  instance: State.UUID,
  validate: is.uuid,
});

Object.defineProperty(Type, 'UUID', {
  get: () => {
    DeprecationWarning.FormatError('built-in UUID Type');
    return UUID;
  },
  enumerable: false,
  configurable: false,
});

Type.ObjectID = new Type({
  name: 'ObjectID',
  instance: State.ObjectID,
  validate: is.object_id,
});
