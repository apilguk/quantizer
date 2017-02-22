import { expect, assert } from 'chai';
import { State } from '../../src';


describe('ID types', () => {
  describe('UUID', () => {
    it('Init without value', () => {
      const id = new State.UUID();

      assert.equal(id.get().length, 36);
    });

    it('Init with value', () => {
      const value = 'idididid';
      const id = new State.UUID(value);

      assert.equal(id.get(), value);
    });
  });

  describe('ObjectID', () => {
    it('Init without value', () => {
      const id = new State.ObjectID();

      assert.equal(id.get().length, 24);
    });

    it('Init with value', () => {
      const value = 'idididid';
      const id = new State.ObjectID(value);

      assert.equal(id.get(), value);
    });

    it('Timestamp', () => {
      const timestamp = Math.floor(Date.now() / 1000) * 1000;
      const value = State.ObjectID.GenerateValue(timestamp);
      const id = new State.ObjectID(value);

      assert.equal(id.getTimestamp().valueOf(), timestamp);
    });
  });
});
