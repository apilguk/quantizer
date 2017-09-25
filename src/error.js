import { sym } from './utils';
import is from './is';

export class DefaultError {
  constructor() {
    this[sym('error')] = true;
    this.count = 1;
  }

  static formatError(err) {
    return err;
  }
}

export class ValidationError extends DefaultError {
  constructor(expected, actual, key = false) {
    super();

    this.expected = expected;
    this.actual = actual;
    this.key = key;
  }

  formatMessage() {
    return `Expected ${this.expected} but ${this.actual}\n`;
  }
}

export class RequirementError extends DefaultError {
  constructor(keyName) {
    super();

    this.keyName = keyName;
  }

  formatMessage() {
    return `Value ${this.keyName} required but undefined\n`;
  }
}

export class UndeclaredError extends DefaultError {
  constructor(keyName) {
    super();

    this.keyName = keyName;
  }

  formatMessage() {
    return `Field ${this.keyName} undeclared at Schema]\n`;
  }
}
