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

  it('serialization', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 0,
    });

    assert.deepEqual(createdType.parse(4), { value: 4 });
  });

  it('validation', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 0,
    });

    const err = createdType.validate('str');

    assert.deepEqual(err, new ValidationError('TestType', 'String'));
  });

  it('default value', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 5,
    });

    assert.deepEqual(createdType.getDefaultValue(), { value: 5 });
  });


  it('validation of the default value', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: PrimitiveNode,
      validate: is.number,
      defaultValue: 'str',
    });

    const err = createdType.getDefaultValue();

    assert.deepEqual(err, new ValidationError('TestType', 'String'));
  });
});
