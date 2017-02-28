import { expect, assert } from 'chai';
import { State, Schema, Type, is } from '../../src';

describe('ID types', () => {
  describe('UUID', () => {
    it('init without value', () => {
      const id = new State.UUID('[[id]]');

      assert.equal(id.get().length, 36);
    });

    it('init with value', () => {
      const value = 'idididid';
      const id = new State.UUID(value);

      assert.equal(id.get(), value);
    });
  });

  describe('ObjectID', () => {
    it('init without value', () => {
      const id = new State.ObjectID('[[id]]');

      assert.equal(id.get().length, 24);
    });

    it('init with value', () => {
      const value = 'idididid';
      const id = new State.ObjectID(value);

      assert.equal(id.get(), value);
    });

    it('timestamp', () => {
      const timestamp = Math.floor(Date.now() / 1000) * 1000;
      const value = State.ObjectID.GenerateValue(timestamp);
      const id = new State.ObjectID(value);

      assert.equal(id.getTimestamp().valueOf(), timestamp);
    });
  });

  describe('Schema with ID', () => {
    it('object id', () => {
      const schema = new Schema('Document', {
        id: Type.ObjectID,
      });
      const model = new State.Map({ id: '[[id]]'}, schema)
      const autoGeneratedID = model.get('id');

      expect(is.object_id(autoGeneratedID)).to.be.true;
    });

    it('object uuid', () => {
      const schema = new Schema('Document', {
        id: Type.UUID,
      });
      const model = new State.Map({ id: '[[id]]'}, schema)
      const autoGeneratedID = model.get('id');

      expect(is.uuid(autoGeneratedID)).to.be.true;
    });
  });
});
