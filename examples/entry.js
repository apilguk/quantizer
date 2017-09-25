import Type from '../src/type';
import * as State from '../src/state';
import TypedNode from '../src/node';
import Schema from '../src/schema';
import is from '../src/is';
import { ValidationError, RequirementError } from '../src/error';
import Quantiser from '../src';

window.Quantiser = Quantiser;
window.ValidationError = ValidationError;
window.RequirementError = RequirementError;
window.TypedNode = TypedNode;
window.Type = Type;
window.State = State;
window.Schema = Schema;
window.is = is;

const Milestone = new Schema('MessageSchema', {
  id: Type.String,
});

const MessageSchema = new Schema('MessageSchema', {
  id: Type.String,
  text: Type.String,
  history: [Milestone],
});

const UserSchema = new Schema('UserSchema', {
  id: Type.String,
  age: Type.Number,
  messages: [MessageSchema],
});

window.schema = new Schema('CellSchema', {
  id: Type.String,
  profile: UserSchema,
});


window.cell = new State.Map({}, window.schema);
