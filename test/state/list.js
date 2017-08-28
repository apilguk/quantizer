import chai, { expect, assert } from 'chai';
import spiesPlugin from 'chai-spies';
import { State, Type, Utils } from '../../src';

chai.use(spiesPlugin);

describe('List', () => {
  it('public methods', () => {
    const list = new State.List();

    assert.isDefined(list.set);
    assert.isDefined(list.push);
    assert.isDefined(list.get);
    assert.isDefined(list.map);
    assert.isDefined(list.at);
    assert.isDefined(list.where);
    assert.isDefined(list.remove);
    assert.isDefined(list.sortBy);
    assert.isDefined(list.filter);
  });

  it('push', () => {
    const list = new State.List();

    list.push('one');
    list.push('two');

    assert.deepEqual(list.get(), ['one', 'two']);
  });

  it('set', () => {
    const list = new State.List(['foo', 'bar']);

    list.set(['one', 'two']);
    assert.deepEqual(list.get(), ['one', 'two']);
  });

  it('concat', () => {
    const list = new State.List(['foo', 'bar']);

    list.set(['one', 'two']);
    assert.deepEqual(list.get(), ['one', 'two']);
  });

  it('get', () => {
    const list = new State.List(['foo', 'bar']);

    assert.deepEqual(list.get(), ['foo', 'bar']);
  });

  it('map', () => {
    const src = ['foo', 'bar'];
    const list = new State.List(src);
    const handler = chai.spy(() => {});

    list.map(handler);

    list.map((n, index) => {
      assert.deepEqual(n.get(), src[index]);
    });

    expect(handler).to.have.been.called.exactly(2);
  });

  describe('where', () => {
    it('object query', () => {
      const id = 1;
      const list = new State.List([{ id: 1 }, { id: 2 }]);
      const result = list.where({ id });

      assert.deepEqual(result.get(), { id: 1 });
    });

    it('single result', () => {
      const list = new State.List([{ id: 1 }, { id: 2 }]);
      const result = list.where('id', 1);

      assert.deepEqual(result.get(), { id: 1 });
    });

    it('multyple result', () => {
      const list = new State.List([{ id: 1 }, { id: 2 }, { id: 1 }]);
      const result = list.where('id', 1).map(model => model.get());

      assert.deepEqual(result, [{ id: 1 }, { id: 1 }]);
    });
  });

  it('remove', () => {
    const list = new State.List([{ id: 1 }, { id: 2 }]);
    const toRemove = list.where('id', 1);

    list.remove(toRemove);
    assert.deepEqual(list.get(), [{ id: 2 }]);
  });

  describe('sortBy', () => {
    it('object key', () => {
      const list = new State.List([
        { id: 1 },
        { id: 4 },
        { id: 2 },
        { id: 5 },
        { id: 3 },
      ]);
      const result = list.sortBy('id').get();

      assert.deepEqual(result, [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
    });

    it('value', () => {
      const list = new State.List([5, 1, 4, 2, 3]);
      const result = list.sortBy().get();

      assert.deepEqual(result, [1, 2, 3, 4, 5]);
    });
  });

  it('length', () => {
    const list = new State.List(['foo', 'bar']);

    expect(list.length).to.equal(2);
  });

  it('at', () => {
    const list = new State.List(['foo', 'bar']);
    const result = list.at(0).get();

    expect(result).to.equal('foo');
  });

  describe('static', () => {
    it('from type instance', () => {
      class SomeClass extends State.Map {}
      const type = new Type({
        name: 'SomeClass',
        instance: SomeClass,
        validate: value => true,
      });
      const list = new State.List([], type);

      list.push({});
      list.push({});

      assert.instanceOf(list.at(0), SomeClass);
      assert.instanceOf(list.at(1), SomeClass);
    });

    it('from instance', () => {
      class SomeClass extends State.Map {}
      const list = new State.List([], SomeClass);

      list.push({});
      list.push({});

      assert.instanceOf(list.at(0), SomeClass);
      assert.instanceOf(list.at(1), SomeClass);
    });

    it('from factory', () => {
      const factory = Utils.factoryCreator((data) => {
        if (data.type === 'gold') {
          return new State.Map({ color: 'yellow' });
        }
        if (data.type === 'silver') {
          return new State.Map({ color: 'grey' });
        }
      });
      const list = new State.List([], factory);

      list.push({ type: 'gold' });
      list.push({ type: 'silver' });

      expect(list.at(0).get('color')).to.equal('yellow');
      expect(list.at(1).get('color')).to.equal('grey');
    });
  });

  it('iterator', () => {
    const list = new State.List([1, 2, 3], State.Number);
    const res = [];
    for (const i of list) {
      res.push(i.get());
    }
    assert.deepEqual(res, [1, 2, 3]);
  });
});
