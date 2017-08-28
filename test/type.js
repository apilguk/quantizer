import { expect, assert } from 'chai';
import { is, Type } from '../src';

const PrimitiveNode = value => ({ value });
const testError = {
  actual: 'String',
  expected: 'TestType',
};

describe('Type', () => {
  it('constructor', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: () => {},
      required: false,
      defaultValue: 0,
      of: PrimitiveNode,
    });

    assert.isDefined(createdType.name);
    assert.isDefined(createdType.validate);
    assert.isDefined(createdType.instance);
    assert.isDefined(createdType.required);
    assert.isDefined(createdType.defaultValue);
    assert.isDefined(createdType.of);
  });

  it('parsing with correct type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 0,
    });

    createdType.parse(1);
    assert.deepEqual(createdType.parse(1), { value: 1 });
  });

  it('parsing with incorrect type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 0,
    });

    try {
      createdType.parse('str');
    } catch (err) {
      assert.deepEqual(err, testError);
    }
  });

  it('get default value with correct type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 5,
    });

    assert.deepEqual(createdType.getDefaultValue(), { value: 5 });
  });

  it('get default value with incorrect type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 'str',
    });

    try {
      createdType.getDefaultValue();
    } catch (err) {
      assert.deepEqual(err, testError);
    }
  });
});
