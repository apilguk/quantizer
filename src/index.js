import * as Utils from './utils';
import Factory from './factory';
import TypedNode from './node';
import Type from './type';
import Schema from './schema';
import is from './is';
import DefaultFactory from './state/default_factory';
import * as State from './state';
import initBuildInTypes from './types_build_in'; /* eslint no-unused-vars: 0 */

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
