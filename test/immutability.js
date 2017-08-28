import { expect, assert } from 'chai';
import { State } from '../src';

describe('Immutability', () => {
  it('Map', () => {
    const innerStruct = {
      lesson: 1,
      module: 1,
    };
    const test = new State.Map({
      id: 1,
      name: 'John',
      progress: innerStruct,
    });

    const result = test.get();

    result.id = 10;
    result.progress.lesson = 2;
    result.name = 'Mark';

    assert.deepEqual(test.get(), {
      id: 1,
      name: 'John',
      progress: {
        lesson: 1,
        module: 1,
      },
    });

    assert.deepEqual(result, {
      id: 10,
      name: 'Mark',
      progress: {
        lesson: 2,
        module: 1,
      },
    });

    assert.deepEqual(innerStruct, {
      lesson: 1,
      module: 1,
    });
  });

  it('List', () => {
    const test = new State.List(['one', 'two']);
    const result = test.get();

    result.push('three');
    assert.deepEqual(test.get(), ['one', 'two']);
  });
});
