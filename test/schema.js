import { assert } from 'chai';
import { is, Schema, Type } from '../src';

const Num = value => ({ value });
const testError = new Error('Expected Num but found String');

describe('Schema', () => {
  it('initType', () => {
    const schema = new Schema('TestSchema', {
      id: new Type({
        name: 'Num',
        instance: Num,
        validate: () => true,
      }),
    });
    assert.deepEqual(schema.name, 'TestSchema');
  });

  describe('just validation', () => {
    it('all valid', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });
      assert.deepEqual(schema.justValidate({ x: 1, y: 1 }), true);
    });

    it('invalid field', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });
      try {
        schema.justValidate({ x: 'a', y: 1 });
      } catch (err) {
        assert.deepEqual(err, { x: { actual: 'String', expected: 'Num' } });
      }
    });

    it('no required field', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          required: true,
          validate: is.number,
        }),
      });
      try {
        schema.justValidate({ x: 2 });
      } catch (err) {
        assert.deepEqual(err, { y: 'Value is not defined' });
      }
    });

    it('deep validate', () => {
      const schema1 = new Schema('TestSchema1', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });
      const schema2 = new Schema('TestSchema2', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: schema1,
      });
      try {
        schema2.justValidate({ x: 2, y: { x: 'a' } });
      } catch (err) {
        assert.deepEqual(err, { y: { x: { actual: 'String', expected: 'Num' } }});
      }
    });
  });

  describe('validation', () => {
    it('field with correct values', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });
      assert.deepEqual(schema.validateField('x', 1), { value: 1 });
    });

    it('field with incorrect values', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });

      try {
        schema.validateField('x', 'str');
      } catch (err) {
        assert.deepEqual(err, testError);
      }
    });

    it('with correct values', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });

      assert.deepEqual(schema.validate({ x: 1, y: 1 }), { x: { value: 1 }, y: { value: 1 } });
    });

    it('with incorrect values', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });

      try {
        schema.validate({ x: 'str', y: 'str' });
      } catch (err) {
        assert.deepEqual(err, {
          x: testError,
          y: testError,
        });
      }
    });

    it('with not providing required value', () => {
      const schema = new Schema('TestSchema', {
        x: new Type({
          name: 'Num',
          instance: e => ({ value: e }),
          validate: () => true,
          required: true,
        }),
        y: new Type({
          name: 'Num',
          instance: Num,
          validate: is.number,
        }),
      });
      try {
        schema.validate({ y: 2 });
      } catch (err) {
        assert.deepEqual(err, { x: 'Value is not defined' });
      }
    });

    it('deep schema with incorrect values', () => {
      const Milestone = new Schema('MessageSchema', {
        id: Type.String,
      });

      const MessageSchema = new Schema('MessageSchema', {
        id: Type.String,
        text: Type.String,
        history: [Milestone],
      });

      const UserSchema = new Schema('UserSchema', {
        id: Type.String,
        age: Type.Number,
        messages: [MessageSchema],
      });

      const schema = new Schema('CellSchema', {
        name: Type.String,
        profile: UserSchema,
      });

      try {
        schema.validate({
          name: 1,
          profile: {
            id: 1,
            messages: [
              {
                id: 1,
                history: [
                  { id: 1 },
                ],
              }],
          },
        });
      } catch (err) {
        assert.deepEqual(err, {
          name: testError,
          profile: {
            id: testError,
            messages: {
              history: {
                id: testError,
              },
              id: testError,
            },
          },
        });
      }
    });
  });
});
