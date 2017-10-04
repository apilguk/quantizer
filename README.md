# Quantizer
[![Build Status](https://travis-ci.org/apilguk/quantizer.svg?branch=master)](https://travis-ci.org/apilguk/quantizer)

## Instalation

`npm install quantizer --save`

## Basic Usage
Quantizer is library wich helps you store and validate your immutable data structures, Quantizer represents data as simple unordered tree.


#### Map:

````js
import { State } from 'quantizer';

const user = State.Map({
  id: 1,
  name: 'John',
});
````

#### List:

````js
import { State } from 'quantizer';

const users = State.List([{
  id: 1,
  name: 'John',
}, {
  id: 2,
  name: 'Paul',
}]);
````

## API


#### Node:

Under the hood core element of Quantizer graph is **Node**, and as agreement other elements wich build blocks of the data structure is also **Node** instances.

Mehods: 
 - `set(value)` - set value of node
 - `get()` - return value of node

````js
import { State } from 'quantizer';

const node = State.Node();

node.set('foo');
node.get();
=> 'foo'

````

#### Map:
Key-value storage. `{ id: 1, name: 'John' }`

Mehods: 
 - `setAttribute(key, value)` - set value of the attribute.
 - `getAttribute(key)` - return value of attribute.
 - `set(value)` - clear structure and then save the serialized data.
 - `get(...keys)` - returns deserialized value of the node, there is few avaliable ways to get value, first  way is call `get()` wich return all the node attributes, other way is to dirrectly enumerate wich 		attributes will be deserialized `get('id', 'name')`.
 - `merge(value)` - merge value to the node, like Object.assign for plain objects.
 - `find(key)` - returns serialized attribute or `undefined` if value is not founnd.
 - `map(handler)` - iterator across the node, handler takes two arguments wich `attribute`, `keyName`, returns a list of values returned from handler.
 - `clear()` - clear current node.
 - `clone()` - clone current node.
 - `toJSON()` - convert node to JSON string.
 - `fromJSON(str)` - convert JSON string to node.

#### List:
Index-value storage. `[1, 2, 3]`
Mehods: 
- `set(value)` - clear structure and then save the serialized data.
- `get(args)` - returns deserialized data, `args` will be passed to `get` method of the child nodes.
- `push(value)` - push value to current node.
- `concat(list)` - concat list to current node.
- `remove(node)` - remode child node.
- `at(index)` - returns a child element by index, also avaliable `at('first')` and `at('last')`, returns first and last child from the list respectively.
- `where(query)` - returns child nodes that have a matches with the query, there is a few ways using it method, `where('id', 1)` returns node wich have `id === 1`, other way is tu pass couple params to find matches `where({ gender: 'male', age: 10 })`
- `map(handler)` - iterator across the node, handler takes two arguments wich `attribute`, `index`, returns a list of values returned from handler.
- `filter(handler)` - iterator across the node with calling filter function and return list of filtering results, if filter function returns `true` element will be passed to result list otherwise it will be skipped.
- `sortBy(key)` - sorts list by element valur or value of his key specified in argument.



## Validation

For validation Quantizer provide two instruments wich is **Type** and **Schema**, this instruments help to describe and validate data structures in a declarative way.

#### Type:

Is a core feature wich validate input data, **Type** should know about couple things:
- `name` - name of the type validator, will be used for formating errors.
- `validator` - validator function takes a value to validate and return boolean verdict.
- `instance` - instance of the Quantizer node wich will be used for serialization.
- `nested` - nested type of the node, currently supported by List.
- `required` - is value need to be required or no.

Type API is just two simple methods:
- `validate(value)` - returns errors report.
- `parse(value)` - serialize input value to the instance.

Example of the type:

````js
import { Type, State } from 'quantizer';

const type = Type({
	name: 'Number',
    validator: value => typeof value === 'number',
    instance: State.Number,
});

type.validate('foo');
=> new ValidationError('Number', 'String')

type.parse(1);
=> new State.Number(1)
````

**Build in types:**
- Any
- Boolean
- String
- Number
- List
- Map
- UUID
- ObjectID

#### Schema:

Actually, Schema is more variation of Type, it helps to describe complex structures


Schema API is just two simple methods like Type does:
- `validate(value)` - returns errors report.
- `parse(value)` - serialize input value to the instance.

````js
import { Type, Schema } from 'quantizer';

const user = new Schema('User', {
	id: Type.Number,
  name: Type.String,
});

type.validate([]);
=> new ValidationError('Map', 'List')

type.validate({
	id: 'John',
   name: 1,
});

=> {
  name: "User",
  count: 2,
  map: {
    id: new ValidationError('Number', 'String'),
    name: new ValidationError('String', 'Number'),
  }
}

type.parse({ id: 1, name: 'John' });
=> new State.Map({ id: 1, name: 'John' })

````

A few variations of using Schema:

````js
import { State, Schema } from 'quantizer';

const userSchema = new Schema('User', {
  id: Type.Number,
  name: Type.String,
});

// just type validation
const listWithTypeValidation = new Schema('UserList', {
	messages: [Type.Number],
});

// validate fields according Schema
const listWithSchemaValidation = new Schema('UserList', {
	messages: [userSchema],
});

// list like instance factory
class UserModel extends State.Map {
	static schema = userSchema;
    
  constructor(data) {
    super(data, UserModel.schema)
  }
}

const listWithIstanceFactory = new Schema('UserList', {
	messages: [UserModel],
});

// list type like instance factory
class UserModel extends State.List {
  constructor(value) {
    super(value, UserModel);
  }
}

const userListType = new Type({
	name: 'UsersList',
  instance: DocumentFieldList,
	validate: is.list,
});

const listTypeWithIstanceFactory = new Schema('UserList', {
	messages: userListType,
});
````
