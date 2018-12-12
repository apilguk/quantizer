import chai from 'chai';

import { assert } from 'chai';
import { is, Schema, Type, State } from '../src';
import { ValidationError, RequirementError } from '../src/error';


describe('Schema', () => {
  describe('regular declaration', () => {
    it('initialization', () => {
      const schemaA = new Schema('CellSchema', {
        name: Type.String,
        profile: {
          id: Type.String,
          age: Type.String,
          messages: [{
            id: Type.String,
            text: Type.String,
            history: [{
              id: Type.String,
            }],
          }],
        },
      });

      const expectedFields = {
        name: Type.String,
        profile: new Schema('profile', {
          id: Type.String,
          age: Type.String,
          messages: new Type({
            name: 'messages',
            instance: State.List,
            validate: is.list,
            nested: new Schema('messages', {
              id: Type.String,
              text: Type.String,
              history: new Type({
                name: 'history',
                instance: State.List,
                validate: is.list,
                nested: new Schema('history', {
                  id: Type.String,
                }),
              }),
            }),
          }),
        }),
      };

      assert.deepEqual(JSON.stringify(schemaA.fields), JSON.stringify(expectedFields));
    });

    it('validation', () => {
      const schemaA = new Schema('CellSchema', {
        name: Type.String,
        profile: {
          id: Type.String,
          age: Type.String,
          messages: [{
            id: Type.String,
            text: Type.String,
            history: [{
              id: Type.String,
            }],
          }],
        },
      });

      const validationError = schemaA.validate({
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
                            name: 'history',
                          },
                        ],
                        name: 'history',
                      },
                      id: new ValidationError('String', 'Number'),
                    },
                    name: 'messages',
                  },
                ],
                name: 'messages',
              },
            },
            name: 'profile',
          },
        },
        name: 'CellSchema',
      });
    });

    it('serialization', () => {
      const schemaA = new Schema('CellSchema', {
        name: Type.String,
        profile: {
          id: Type.String,
          age: Type.String,
          messages: [{
            id: Type.String,
            text: Type.String,
            history: [{
              id: Type.String,
            }],
          }],
        },
      });

      const actualNode = schemaA.parse({
        name: 'John',
        profile: {
          id: '1',
          age: '24',
          messages: [
            { id: '1', text: 'foo', history: [{ id: '1' }, { id: '2' }] },
            { id: '2', text: 'bar', history: [{ id: '1' }, { id: '2' }] },
          ],
        },
      });

      const expectedNode = new State.Map({
        name: 'John',
        profile: {
          id: '1',
          age: '24',
          messages: [
            { id: '1', text: 'foo', history: [{ id: '1' }, { id: '2' }] },
            { id: '2', text: 'bar', history: [{ id: '1' }, { id: '2' }] },
          ],
        },
      });

      assert.deepEqual(JSON.stringify(actualNode), JSON.stringify(expectedNode));
    });
  });

  describe('declaration with nested types and schemas', () => {
    it('initialization', () => {
      const schemaA = new Schema('MilestoneSchema', {
        id: Type.String,
      });

      const schemaB = new Schema('MessageSchema', {
        id: Type.String,
        text: Type.String,
        history: [schemaA],
      });

      const schemaC = new Schema('UserSchema', {
        id: Type.String,
        age: Type.String,
        messages: [schemaB],
      });

      const schemaD = new Schema('CellSchema', {
        name: Type.String,
        profile: schemaC,
      });

      const expectedFields = {
        name: Type.String,
        profile: new Schema('UserSchema', {
          id: Type.String,
          age: Type.String,
          messages: new Type({
            name: 'MessageSchema',
            instance: State.List,
            validate: is.list,
            nested: new Schema('MessageSchema', {
              id: Type.String,
              text: Type.String,
              history: new Type({
                name: 'MilestoneSchema',
                instance: State.List,
                validate: is.list,
                nested: new Schema('MilestoneSchema', {
                  id: Type.String,
                }),
              }),
            }),
          }),
        }),
      };

      assert.deepEqual(JSON.stringify(schemaD.fields), JSON.stringify(expectedFields));
    });

    it('validation', () => {
      const schemaA = new Schema('MilestoneSchema', {
        id: Type.String,
      });

      const schemaB = new Schema('MessageSchema', {
        id: Type.String,
        text: Type.String,
        history: [schemaA],
      });

      const schemaC = new Schema('UserSchema', {
        id: Type.String,
        age: Type.String,
        messages: [schemaB],
      });

      const schemaD = new Schema('CellSchema', {
        name: Type.String,
        profile: schemaC,
      });

      const validationError = schemaD.validate({
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

    it('serialization', () => {
      const schemaA = new Schema('MilestoneSchema', {
        id: Type.String,
      });

      const schemaB = new Schema('MessageSchema', {
        id: Type.String,
        text: Type.String,
        history: [schemaA],
      });

      const schemaC = new Schema('UserSchema', {
        id: Type.String,
        age: Type.String,
        messages: [schemaB],
      });

      const schemaD = new Schema('CellSchema', {
        name: Type.String,
        profile: schemaC,
      });

      const actualNode = schemaD.parse({
        name: 'John',
        profile: {
          id: '1',
          age: '24',
          messages: [
            { id: '1', text: 'foo', history: [{ id: '1' }, { id: '2' }] },
            { id: '2', text: 'bar', history: [{ id: '1' }, { id: '2' }] },
          ],
        },
      });

      const expectedNode = new State.Map({
        name: 'John',
        profile: {
          id: '1',
          age: '24',
          messages: [
            { id: '1', text: 'foo', history: [{ id: '1' }, { id: '2' }] },
            { id: '2', text: 'bar', history: [{ id: '1' }, { id: '2' }] },
          ],
        },
      });

      assert.deepEqual(JSON.stringify(actualNode), JSON.stringify(expectedNode));
    });
  });

  describe('declaration with nested instances', () => {
    it('initialization', () => {
      const schemaA = new Schema('TestInstance', {
        id: Type.Number,
        name: Type.String,
      });

      class TestInstance extends State.Map {
        static schema = schemaA;
      }

      const schemaB = new Schema('CellSchema', {
        list: [TestInstance],
      });

      const expectedFields = {
        list: new Type({
          name: 'TestInstance',
          validate: is.list,
          instance: State.List,
          nested: TestInstance,
        }),
      };

      assert.deepEqual(JSON.stringify(schemaB.fields), JSON.stringify(expectedFields));
    });

    it('validation', () => {
      const schemaA = new Schema('TestInstance', {
        id: Type.Number,
        name: Type.String,
      });

      class TestInstance extends State.Map {
        static schema = schemaA;
      }

      const schemaB = new Schema('CellSchema', {
        list: [TestInstance],
      });

      const validationError = schemaB.validate({
        list: [{ id: 'str', name: 1 }],
      });

      const expectedError = {
        count: 2,
        map: {
          list: {
            count: 2,
            list: [
              {
                count: 2,
                map: {
                  id: new ValidationError('Number', 'String'),
                  name: new ValidationError('String', 'Number'),
                },
                name: 'TestInstance',
              },
            ],
            name: 'TestInstance',
          },
        },
        name: 'CellSchema',
      };

      assert.deepEqual(validationError, expectedError);
    });

    it('serialization', () => {
      const schemaA = new Schema('TestInstance', {
        id: Type.Number,
        name: Type.String,
      });

      class TestInstance extends State.Map {
        static schema = schemaA;
      }

      const schemaB = new Schema('CellSchema', {
        list: [TestInstance],
      });

      const actualNode = schemaB.parse({
        list: [{ id: 1, name: 'John' }],
      });

      const expectedNode = new State.Map({}, schemaB);
      const innerList = new State.List([], TestInstance);

      innerList.push({ id: 1, name: 'John' });

      expectedNode.keys = ['list'];
      expectedNode.attributes = {
        list: innerList,
      };

      assert.deepEqual(JSON.stringify(actualNode), JSON.stringify(expectedNode));
    });
  });

  describe('common tests', () => {

    it('one correct value', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ x: 1 }), {
        name: 'TestSchema',
        count: 0,
        map: {},
      });
    });

    it('one incorrect values', () => {
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

    it('couple correct values', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number,
        y: Type.Number,
      });

      assert.deepEqual(schema.validate({ x: 1, y: 1 }), {
        count: 0,
        map: {},
        name: 'TestSchema',
      });
    });

    it('couple incorrect value', () => {
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

    it('without required field', () => {
      const schema = new Schema('TestSchema', {
        x: Type.Number.isRequired,
        y: Type.Number,
      });

      const err = schema.validate({ y: 2 });

      assert.deepEqual(err, {
        name: 'TestSchema',
        count: 1,
        map: {
          x: new RequirementError('x'),
        },
      });
    });

    it('factory from instance', () => {

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

    it('validation is soft for nulls', () => {
      const schema = new Schema('A', { x: Type.String });
      const validationError = schema.validate({
        x: null,
      });

      assert.deepEqual(validationError.count, 0);
    });

    it('validation is soft for nested nulls', () => {
      const schema = new Schema('A', { x: new Schema('Nested', { x: Type.Map }) });
      const validationError = schema.validate({
        x: null,
      });

      assert.deepEqual(validationError.count, 0);
    });
  });
});
