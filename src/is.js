import Type from './type';
import TypedNode from './node';
import Factory from './factory';
import Schema from './schema';

export default {
  _null: value => value === null,
  _undefined: value => value === undefined,
  func: value => typeof value === 'function',
  promise: value => value && typeof value.then === 'function',
  list: value => Array.isArray(value),
  number: value => typeof value === 'number',
  boolean: value => typeof value === 'boolean',
  string: value => typeof value === 'string',
  map: value => !(value === null) && !Array.isArray(value) && (typeof value === 'object'),
  factory: value => value instanceof Factory,
  node: value => value instanceof TypedNode,
  schema: value => value instanceof Schema,
  type: value => value instanceof Type,
  uuid: value => typeof value === 'string' && value.length === 36,
  object_id: value => typeof value === 'string' && value.length === 24,
};
