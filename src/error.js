import { sym } from './utils';

function tab(depth) {
  return '  '.repeat(depth);
}

const printedWarnings = [];

/**
 * @param {DeprecationWarning} warning
 */
export function printDeprecationWarning(warning) {
  const message = warning.formatMessage();
  if (printedWarnings.indexOf(message) === -1) {
    printedWarnings.push(message);
    console.warn(`QUANTIZER DEPRECATION WARNING️: ${message}`);
  }
}


export class DefaultError {
  constructor(message) {
    this[sym('error')] = true;
    this.count = 1;
    this.message = message;
  }

  formatMessage() {
    return this.message;
  }

  static FormatError(err) {
    function formatErrorPart(obj, depth, padBrackets) {
      if (depth === 0 && typeof obj === 'object') {
        return `\n${obj.name} ${formatErrorPart(obj, 1)}`;
      }

      if (obj instanceof DefaultError) {
        return `'${obj.formatMessage().slice(0, -1)}'\n`;
      }

      if (typeof obj === 'object' && obj.list) {
        return `[\n${
          obj.list.map(o => formatErrorPart(o, depth + 1, true)).join('')
        }${tab(depth - 1)}]\n`;
      }

      if (typeof obj === 'object' && obj.map) {
        const children = obj.map;
        const padLeft = tab(padBrackets ? depth - 1 : 0);

        return `${padLeft}{\n${
          Object.keys(children).filter((key) => {
            if (key === 'name' && typeof children[key] === 'string') {
              return false;
            }
            if (key === 'count') {
              return false;
            }
            return true;
          })
            .map(key =>
              `${tab(depth)}${key}: ${formatErrorPart(children[key], depth + 1)}`).join('')
        }${tab(depth - 1)}}\n`;
      }

      return '';
    }
    return formatErrorPart(err, 0);
  }

  static Throw(err) {
    throw new Error(DefaultError.FormatError(err));
  }
}

export class ValidationError extends DefaultError {
  constructor(expected, actual, key = false) {
    super(`Expected ${expected} but ${actual}\n`);

    this.expected = expected;
    this.actual = actual;
    this.key = key;
  }
}

export class RequirementError extends DefaultError {
  constructor(keyName) {
    super(`Value ${keyName} required but undefined\n`);

    this.keyName = keyName;
  }
}

export class UndeclaredError extends DefaultError {
  constructor(keyName) {
    super(`Field ${keyName} undeclared at Schema]\n`);

    this.keyName = keyName;
  }
}

export class DeprecationError extends DefaultError {
  constructor(feature, removedVersion) {
    super(`Usage of ${feature} is deprecated. This feature was removed${removedVersion ? ` ${removedVersion}` : ''}.\n`);

    this.feature = feature;
  }
}

export class DeprecationWarning extends DefaultError {
  constructor(feature) {
    super(`Usage of ${feature} is deprecated. This feature will be removed soon.\n`);

    this.feature = feature;
  }
}
