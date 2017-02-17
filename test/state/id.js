import { expect, assert } from 'chai';
import { is, Schema, Type, State } from '../../src';


describe('ID', () => {
  it('Init without value', () => {
    const id = new State.ID();
    assert.equal(id.get().length, 36);
  });

  it('Iinit with value', () => {
    const value = 'idididid';
    const id = new State.ID(value);
    assert.equal(id.get(), value);
  });
});
