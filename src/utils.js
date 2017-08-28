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
      const value = this.at(index);
      const done = (index += 1) > this.length;
      return {
        value,
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

export function uuid() {
  let dt = new Date().getTime();
  const value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + (Math.random() * 16)) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r && 0x3) || 0x8)).toString(16);
  });
  return value;
}
