import * as Utils from './utils';
import * as State from './state';
import Factory from './factory';
import Type from './type';
import Schema from './schema';
import TypedNode from './node';
import DefaultFactory from './state/default_factory';
import is from './is';
import './types_build_in';

export {
  Utils,
  Factory,
  TypedNode,
  Type,
  Schema,
  State,
  is,
};

export default value => DefaultFactory.get(value);
