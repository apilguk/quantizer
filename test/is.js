import { expect, assert } from 'chai';
import { is, TypedNode, Schema, Type, Factory, State } from '../src';

const NUMBER = 10;
const STRING = 'str';
const BOOL_TRUE = true;
const BOOL_FALSE = false;
const NULL = null;
const UNDEFINED = undefined;
const FUNCTION = () => {};
const LIST = [];
const MAP = {};
const PROMISE = Promise.resolve();
const UUID = new State.UUID('[[id]]').get();
const ObjectID = new State.ObjectID('[[id]]').get();
class NODE extends TypedNode {
};

describe('is', () => {
  it('_null', () => {
    expect(is._null(NULL)).to.be.true;
  });
  it('_undefined', () => {
    expect(is._undefined(UNDEFINED)).to.be.true;
  });
  it('number', () => {
    expect(is.number(NUMBER)).to.be.true;
  });
  it('string', () => {
    expect(is.string(STRING)).to.be.true;
  });
  it('boolean', () => {
    expect(is.boolean(BOOL_FALSE)).to.be.true;
    expect(is.boolean(BOOL_TRUE)).to.be.true;
  });
  it('function', () => {
    expect(is.func(FUNCTION)).to.be.true;
  });
  it('list', () => {
    expect(is.list(LIST)).to.be.true;
  });
  it('map', () => {
    expect(is.map(MAP)).to.be.true;
  });
  it('schema', () => {
    expect(is.schema(new Schema())).to.be.true;
  });
  it('type', () => {
    expect(is.type(new Type({ name: 's' }))).to.be.true;
  });
  it('node', () => {
    expect(is.node(new NODE())).to.be.true;
  });
  it('factory', () => {
    expect(is.factory(new Factory(() => {}))).to.be.true;
  });
  it('sym', () => {
    expect(is.sym('[[id]]')).to.be.true;
  });
  it('promise', () => {
    expect(is.promise(PROMISE)).to.be.true;
  });
  it('uuid', () => {
    expect(is.uuid(UUID)).to.be.true;
  });
  it('object_id', () => {
    expect(is.object_id(ObjectID)).to.be.true;
  });
});
