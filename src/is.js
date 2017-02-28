import { sym } from './utils';

const is = {
  _null: value => value === null,
  _undefined: value => value === undefined,
  func: value => typeof value === 'function',
  promise: value => value && typeof value.then === 'function',
  list: value => Array.isArray(value),
  number: value => typeof value === 'number',
  boolean: value => typeof value === 'boolean',
  string: value => typeof value === 'string',
  map: value => !(value === null) && !Array.isArray(value) && (typeof value === 'object'),
  factory: value => value[sym('factory')],
  node: value => !!value[sym('node')],
  schema: value => !!value[sym('schema')],
  sym: value => is.string(value) && (/\[\[(\w+)\]\]/g).test(value), /* eslint no-useless-escape: 1 */
  type: value => !!value[sym('type')],
  uuid: value => is.sym(value) || (is.string(value) && value.length === 36),
  object_id: value => is.sym(value) || (is.string(value) && value.length === 24),
};

export default is;
