export default class ValidationError {
  constructor(expected, actual) {
    this.actual = actual;
    this.expected = expected;
  }
}
