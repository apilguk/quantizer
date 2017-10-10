import { sym } from './utils';

const is = {
  _null: value => value === null,
  _undefined: value => typeof value === 'undefined',
  func: value => (typeof value !== 'undefined') && typeof value === 'function',
  promise: value => (typeof value !== 'undefined') && typeof value.then === 'function',
  list: value => (typeof value !== 'undefined') && Array.isArray(value),
  number: value => (typeof value !== 'undefined') && typeof value === 'number',
  boolean: value => (typeof value !== 'undefined') && typeof value === 'boolean',
  string: value => (typeof value !== 'undefined') && typeof value === 'string',
  map: value => (typeof value !== 'undefined') && !(value === null) && !Array.isArray(value) && (typeof value === 'object'),
  factory: value => (typeof value !== 'undefined') && value[sym('factory')],
  node: value => (typeof value !== 'undefined') && !!value[sym('node')],
  schema: value => (typeof value !== 'undefined') && !!value[sym('schema')],
  sym: value => (typeof value !== 'undefined') && is.string(value) && (/\[\[(\w+)]]/g).test(value),
  type: value => (typeof value !== 'undefined') && !!value[sym('type')],
  uuid: value => (typeof value !== 'undefined') && (is.string(value)), // needs a true validation
  object_id: value => (typeof value !== 'undefined') && typeof value === 'string' && /^[a-f0-9]{24}$/.test(value),
  error: value => (typeof value !== 'undefined') && !!value[sym('error')],
};

export default is;
