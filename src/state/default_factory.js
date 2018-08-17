import Factory from '../factory';
import Type from '../type';
import TypedNode from '../node';
import Boolean from './boolean';
import Number from './number';
import String from './string';
import Null from './null';
import List from './list';
import Map from './map';

export default new Factory((value) => {
  if (value instanceof TypedNode) {
    return value;
  }

  switch (Type.DefineType(value)) {
    case 'Map':
      return new Map(value);
    case 'List':
      return new List(value);
    case 'String':
      return new String(value);
    case 'Number':
      return new Number(value);
    case 'Boolean':
      return new Boolean(value);
    case 'Null':
      return new Null(value);
    default:
      return value;
  }
});
