import { assert } from 'chai';
import { State, Schema, Type } from '../../src';
import { RequirementError } from '../../src/error';


describe('Map', () => {
  it('public methods', () => {
    const map = new State.Map({});

    assert.isDefined(map.getAttribute);
    assert.isDefined(map.setAttribute);
    assert.isDefined(map.get);
    assert.isDefined(map.set);
    assert.isDefined(map.keys);
  });

  it('keys', () => {
    const map = new State.Map({ x: 10, y: 20 });

    assert.deepEqual(map.keys, ['x', 'y']);
  });

  it('getAttribute method', () => {
    const map = new State.Map({ x: 10, y: 20 });

    assert.deepEqual(map.getAttribute('x'), 10);
  });

  it('get', () => {
    const map = new State.Map({ x: 10, y: 20 });

    assert.deepEqual(map.get(), { x: 10, y: 20 });
  });

  it('get one attribute', () => {
    const map = new State.Map({ x: 10, y: 20 });

    assert.deepEqual(map.get('x'), 10);
  });

  it('get few attributes', () => {
    const map = new State.Map({ x: 10, y: 20, z: 30 });

    assert.deepEqual(map.get('x', 'z'), { x: 10, z: 30 });
  });

  it('set', () => {
    const map = new State.Map({ x: 10 });

    map.set({ y: 20 });
    assert.deepEqual(map.get(), { y: 20 });
  });

  it('merge', () => {
    const map = new State.Map({ x: 10 });

    map.merge({ y: 20 });
    assert.deepEqual(map.get(), { x: 10, y: 20 });
  });

  it('set attribute', () => {
    const map = new State.Map();

    map.setAttribute('y', 20);
    assert.deepEqual(map.get(), { y: 20 });
  });

  it('set with floating types', () => {
    const map = new State.Map({ x: 10 });

    assert.instanceOf(map.find('x'), State.Number);
    map.set({ x: {} });
    assert.instanceOf(map.find('x'), State.Map);
    map.set({ x: [] });
    assert.instanceOf(map.find('x'), State.List);
  });

  it('set without required field', () => {
    const schema = new Schema('TestSchema', { x: Type.String.isRequired });
    const err = schema.validate({ y: '0' });

    assert.deepEqual(err, {
      name: 'TestSchema',
      count: 1,
      map: {
        x: new RequirementError('x'),
      },
    });
  });

  it('set with Any value', () => {
    const schema = new Schema('TestSchema', {
      x: Type.Any,
    });

    const map = new State.Map({ x: 10 }, schema);

    map.set({ x: [] });
    assert.deepEqual(map.find('x').get(), []);

    map.set({ x: 'foo' });
    assert.deepEqual(map.find('x').value, 'foo');

    map.set({ x: {} });
    assert.deepEqual(map.find('x').get(), {});
  });
});
