import Factory from './factory';

export function factoryCreator(fn) {
  return new Factory(fn);
}

export function sym(name) {
  return `[[${name}]]`;
}

export function keyedIterator() {
  let index = 0;

  return {
    next: () => {
      const done = (index += 1) >= this.keys.length;
      return {
        value: this.find(this.keys[index]),
        done,
      };
    },
  };
}

export function indexedIterator() {
  let index = 0;

  return {
    next: () => {
      const done = (index += 1) > this.length;
      return {
        value: this.at(index),
        done,
      };
    },
  };
}

export function getSourceValue(source) {
  if (source[sym('node')]) {
    return source.get();
  }

  return source;
}
