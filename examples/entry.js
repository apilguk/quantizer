import Type from '../src/type';
import * as State from '../src/state';
import TypedNode from '../src/node';
import Schema from '../src/schema';
import { ValidationError } from '../src/error';
import Quantiser from '../src';

window.Quantiser = Quantiser;
window.ValidationError = ValidationError;
window.TypedNode = TypedNode;
window.Type = Type;
window.State = State;
window.Schema = Schema;

const Milestone = new Schema('MessageSchema', {
  id: Type.String,
});

const MessageSchema = new Schema('MessageSchema', {
  id: Type.String,
  text: Type.String,
  history: [Milestone],
});

const UserSchema = new Schema('UserSchema', {
  id: Type.ObjectID,
  age: Type.Number,
  messages: [MessageSchema],
});

window.schema = new Schema('CellSchema', {
  id: Type.ObjectID,
  profile: UserSchema,
});

