import { assert } from 'chai';
import { is, Type, State } from '../src';
import { ValidationError } from '../src/error';

describe('Type', () => {
  it('constructor', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: State.List,
      validate: is.list,
      required: false,
      nested: Type.String,
    });

    assert.isDefined(createdType.name);
    assert.isDefined(createdType.validationFunction);
    assert.isDefined(createdType.instance);
    assert.isDefined(createdType.required);
    assert.isDefined(createdType.nested);
  });

  it('serialization', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: State.Number,
      validate: is.number,
    });

    assert.deepEqual(createdType.parse(4), new State.Number(4));
  });

  it('validation', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: State.Number,
      validate: is.number,
    });

    const err = createdType.validate('str');

    assert.deepEqual(err, new ValidationError('TestType', 'String'));
  });

  it('validation with nested type', () => {
    const createdType = new Type({
      name: 'TestType',
      instance: State.List,
      validate: is.number,
      nested: Type.String,
    });

    const err = createdType.validate('str');

    assert.deepEqual(err, new ValidationError('List', 'String'));
  });
});
