import { assert } from 'chai';
import { is, Type } from '../src';
import { ValidationError } from '../src/error';

const PrimitiveNode = value => ({ value });

describe('Type', () => {
  it('constructor', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: () => {},
      required: false,
      nested: PrimitiveNode,
    });

    assert.isDefined(createdType.name);
    assert.isDefined(createdType.validate);
    assert.isDefined(createdType.instance);
    assert.isDefined(createdType.required);
    assert.isDefined(createdType.nested);
  });

  it('serialization', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
    });

    assert.deepEqual(createdType.parse(4), { value: 4 });
  });

  it('validation', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
    });

    const err = createdType.validate('str');

    assert.deepEqual(err, new ValidationError('TestType', 'String'));
  });

  it('validation with nested type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      nested: Number,
    });

    const err = createdType.validate('str');

    assert.deepEqual(err, new ValidationError('List', 'String'));
  });
});
