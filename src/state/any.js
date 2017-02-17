import TypedNode from '../node';
import DefaultNodesFactory from './default_factory';

export default class Any extends TypedNode {
  constructor(value) {
    super();

    return DefaultNodesFactory.get(value);
  }
}
