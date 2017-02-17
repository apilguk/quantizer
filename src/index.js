import * as Utils from './utils';
import Factory from './factory';
import Schema from './schema';
import TypedNode from './node';
import Type from './type';
import is from './is';
import * as State from './state';
import DefaultFactory from './state/default_factory';

export {
  Utils,
  Factory,
  TypedNode,
  Type,
  Schema,
  is,
  State,
};

export default value => DefaultFactory.get(value);
