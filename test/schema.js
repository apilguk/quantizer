import { assert } from 'chai';
import { is, Schema, Type } from '../src';
import { ValidationError } from '../src/error';

const Num = value => ({ value });

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

  describe('validation', () => {
    it('field with correct values', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ x: 1 }), {
        name: 'TestSchema',
        count: 0,
        map: {
          x: {
            count: 0,
            name: 'Number',
          },
        },
      });
    });

    it('field with incorrect values', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ x: 'str', y: 'str' }), {
        name: 'TestSchema',
        count: 2,
        map: {
          x: new ValidationError('Number', 'String'),
          y: new ValidationError('Number', 'String'),
        },
      });
    });

    it('with correct values', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ x: 1, y: 1 }), {
        count: 0,
        map: {
          x: {
            count: 0,
            name: 'Number',
          },
          y: {
            count: 0,
            name: 'Number',
          },
        },
        name: 'TestSchema',
      });
    });

    it('with incorrect values', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ y: 'str' }), {
        name: 'TestSchema',
        count: 1,
        map: {
          y: new ValidationError('Number', 'String'),
        },
      });
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
        assert.deepEqual(err, { x: 'Value x required but undefined' });
      }
    });

    it('deep schema with incorrect values', () => {
      const Milestone = new Schema('MilestoneSchema', {
        id: Type.String,
      });

      const MessageSchema = new Schema('MessageSchema', {
        id: Type.String,
        text: Type.String,
        history: [Milestone],
      });

      const UserSchema = new Schema('UserSchema', {
        id: Type.String,
        age: Type.String,
        messages: [MessageSchema],
      });

      const schema = new Schema('CellSchema', {
        name: Type.String,
        profile: UserSchema,
      });

      const validationError = schema.validate({
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

      assert.deepEqual(validationError, {
        count: 4,
        map: {
          name: new ValidationError('String', 'Number'),
          profile: {
            count: 3,
            map: {
              id: new ValidationError('String', 'Number'),
              messages: {
                count: 2,
                list: [
                  {
                    count: 2,
                    map: {
                      history: {
                        count: 1,
                        list: [
                          {
                            count: 1,
                            map: {
                              id: new ValidationError('String', 'Number'),
                            },
                            name: 'MilestoneSchema',
                          },
                        ],
                        name: 'MilestoneSchema',
                      },
                      id: new ValidationError('String', 'Number'),
                    },
                    name: 'MessageSchema',
                  },
                ],
                name: 'MessageSchema',
              },
            },
            name: 'UserSchema',
          },
        },
        name: 'CellSchema',
      });
    });
  });
});
