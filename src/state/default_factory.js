import { factoryCreator } from '../utils';
import Type from '../type';
import TypedNode from '../node';
import Boolean from './boolean';
import Number from './number';
import String from './string';
import List from './list';
import Map from './map';

export default factoryCreator((value) => {
  if (value instanceof TypedNode) {
    return value;
  }

  switch (Type.defineType(value)) {
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
    default:
      return value;
  }
});
