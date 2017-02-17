(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["quantizer"] = factory();
	else
		root["quantizer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TypedNode = function () {
	  function TypedNode() {
	    _classCallCheck(this, TypedNode);

	    this[(0, _utils.sym)('node')] = true;
	  }

	  _createClass(TypedNode, [{
	    key: 'get',
	    value: function get() {
	      return this.value;
	    }
	  }, {
	    key: 'set',
	    value: function set(value) {
	      this.value = value;
	    }
	  }]);

	  return TypedNode;
	}();

	exports.default = TypedNode;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.factoryCreator = factoryCreator;
	exports.sym = sym;
	exports.keyedIterator = keyedIterator;
	exports.indexedIterator = indexedIterator;
	exports.getSourceValue = getSourceValue;

	var _factory = __webpack_require__(5);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function factoryCreator(fn) {
	  return new _factory2.default(fn);
	}

	function sym(name) {
	  return '<' + name + '>';
	}

	function keyedIterator() {
	  var _this = this;

	  var index = 0;

	  return {
	    next: function next() {
	      return {
	        value: _this.find(_this.keys[index]),
	        done: (index += 1) >= _this.keys.length
	      };
	    }
	  };
	}

	function indexedIterator() {
	  var _this2 = this;

	  var index = 0;

	  return {
	    next: function next() {
	      return {
	        value: _this2.at(index),
	        done: (index += 1) >= _this2.length
	      };
	    }
	  };
	}

	function getSourceValue(source) {
	  if (source[sym('node')]) {
	    return source.get();
	  }

	  return source;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _factory = __webpack_require__(5);

	var _factory2 = _interopRequireDefault(_factory);

	var _schema = __webpack_require__(8);

	var _schema2 = _interopRequireDefault(_schema);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  _null: function _null(value) {
	    return value === null;
	  },
	  _undefined: function _undefined(value) {
	    return value === undefined;
	  },
	  func: function func(value) {
	    return typeof value === 'function';
	  },
	  promise: function promise(value) {
	    return value && typeof value.then === 'function';
	  },
	  list: function list(value) {
	    return Array.isArray(value);
	  },
	  number: function number(value) {
	    return typeof value === 'number';
	  },
	  boolean: function boolean(value) {
	    return typeof value === 'boolean';
	  },
	  string: function string(value) {
	    return typeof value === 'string';
	  },
	  map: function map(value) {
	    return !(value === null) && !Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	  },
	  factory: function factory(value) {
	    return value instanceof _factory2.default;
	  },
	  node: function node(value) {
	    return value instanceof _node2.default;
	  },
	  schema: function schema(value) {
	    return value instanceof _schema2.default;
	  },
	  type: function type(value) {
	    return value instanceof _type2.default;
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _state = __webpack_require__(7);

	var State = _interopRequireWildcard(_state);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Type = function () {
	  function Type(opts) {
	    _classCallCheck(this, Type);

	    this.name = opts.name;
	    this.validate = opts.validate;
	    this.instance = opts.instance;
	    this.required = opts.required;
	    this.defaultValue = opts.defaultValue;
	    this.of = opts.of;

	    return this;
	  }

	  _createClass(Type, [{
	    key: 'parse',
	    value: function parse(value) {
	      var TypeInstace = this.instance;

	      if (!this.validate(value)) {
	        throw {
	          actual: Type.defineType(value),
	          expected: this.name
	        };
	      }

	      return new TypeInstace(value, this.of);
	    }
	  }, {
	    key: 'getDefaultValue',
	    value: function getDefaultValue() {
	      if (typeof this.defaultValue !== 'undefined') {
	        return this.parse(this.defaultValue);
	      }

	      if (this.required) {
	        throw this.name + ': Default value is not defined.';
	      }

	      return null;
	    }
	  }], [{
	    key: 'defineType',
	    value: function defineType(value) {
	      if (_is2.default._undefined(value)) {
	        return 'Undefined';
	      } else if (_is2.default._null(value)) {
	        return 'Null';
	      } else if (_is2.default.schema(value)) {
	        return 'Schema';
	      } else if (_is2.default.type(value)) {
	        return 'Type';
	      } else if (_is2.default.list(value)) {
	        return 'List';
	      }if (_is2.default.number(value)) {
	        return 'Number';
	      } else if (_is2.default.string(value)) {
	        return 'String';
	      } else if (_is2.default.boolean(value)) {
	        return 'Boolean';
	      } else if (_is2.default.map(value)) {
	        return 'Map';
	      } else if (typeof value === 'function') {
	        return 'Function';
	      } else if (value[(0, _utils.sym)('node')]) {
	        return value[(0, _utils.sym)('type')].name;
	      }

	      return 'Unknown';
	    }
	  }]);

	  return Type;
	}();

	exports.default = Type;


	Type.Any = new Type({
	  name: 'Any',
	  instance: State.Any,
	  validate: function validate() {
	    return true;
	  }
	});

	Type.Boolean = new Type({
	  name: 'Boolean',
	  instance: State.Boolean,
	  validate: _is2.default.boolean
	});

	Type.List = new Type({
	  name: 'List',
	  instance: State.List,
	  validate: _is2.default.list
	});

	Type.Map = new Type({
	  name: 'Map',
	  instance: State.Map,
	  validate: _is2.default.map
	});

	Type.Number = new Type({
	  name: 'Number',
	  instance: State.Number,
	  validate: _is2.default.number
	});

	Type.String = new Type({
	  name: 'String',
	  instance: State.String,
	  validate: _is2.default.string
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FactoryFunction = function () {
	  function FactoryFunction(factory) {
	    _classCallCheck(this, FactoryFunction);

	    this.func = factory.bind(null);
	  }

	  _createClass(FactoryFunction, [{
	    key: "get",
	    value: function get() {
	      return this.func.apply(this, arguments);
	    }
	  }]);

	  return FactoryFunction;
	}();

	exports.default = FactoryFunction;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _boolean = __webpack_require__(9);

	var _boolean2 = _interopRequireDefault(_boolean);

	var _number = __webpack_require__(12);

	var _number2 = _interopRequireDefault(_number);

	var _string = __webpack_require__(13);

	var _string2 = _interopRequireDefault(_string);

	var _list = __webpack_require__(10);

	var _list2 = _interopRequireDefault(_list);

	var _map = __webpack_require__(11);

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _utils.factoryCreator)(function (value) {
	  if (value instanceof _node2.default) {
	    return value;
	  }

	  switch (_type2.default.defineType(value)) {
	    case 'Map':
	      return new _map2.default(value);
	    case 'List':
	      return new _list2.default(value);
	    case 'String':
	      return new _string2.default(value);
	    case 'Number':
	      return new _number2.default(value);
	    case 'Boolean':
	      return new _boolean2.default(value);
	    default:
	      return value;
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.List = exports.Map = exports.ID = exports.String = exports.Number = exports.Boolean = exports.Any = undefined;

	var _any = __webpack_require__(15);

	var _any2 = _interopRequireDefault(_any);

	var _boolean = __webpack_require__(9);

	var _boolean2 = _interopRequireDefault(_boolean);

	var _number = __webpack_require__(12);

	var _number2 = _interopRequireDefault(_number);

	var _string = __webpack_require__(13);

	var _string2 = _interopRequireDefault(_string);

	var _list = __webpack_require__(10);

	var _list2 = _interopRequireDefault(_list);

	var _map = __webpack_require__(11);

	var _map2 = _interopRequireDefault(_map);

	var _id = __webpack_require__(16);

	var _id2 = _interopRequireDefault(_id);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Any = _any2.default;
	exports.Boolean = _boolean2.default;
	exports.Number = _number2.default;
	exports.String = _string2.default;
	exports.ID = _id2.default;
	exports.Map = _map2.default;
	exports.List = _list2.default;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _state = __webpack_require__(7);

	var _state2 = _interopRequireDefault(_state);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Schema = function () {
	  function Schema(name, fileds) {
	    _classCallCheck(this, Schema);

	    this.name = name;
	    this.fields = {};

	    if (fileds) {
	      this.initTypes(fileds);
	    }
	  }

	  _createClass(Schema, [{
	    key: 'initTypes',
	    value: function initTypes(types) {
	      for (var key in types) {
	        var input = types[key];
	        var type = _type2.default.defineType(input);

	        if (type === 'Type' || type === 'Schema') {
	          this.fields[key] = input;
	        } else if (type === 'Map') {
	          this.fields[key] = new _type2.default({
	            name: key,
	            instance: _state.Map,
	            validate: _is2.default.map,
	            of: new Schema(key, input)
	          });
	        } else if (type === 'List') {
	          var innerType = _type2.default.defineType(input[0]);
	          var innerSchema = new Schema(key, input[0]);

	          if (innerType === 'Schema' || innerType === 'Type') {
	            innerSchema = input[0];
	          }

	          this.fields[key] = new _type2.default({
	            name: key,
	            instance: _state.List,
	            validate: _is2.default.list,
	            of: innerSchema
	          });
	        }
	      }
	    }
	  }, {
	    key: 'getDefault',
	    value: function getDefault(key) {
	      try {
	        if (this.fields[key]) {
	          return this.fields[key].getDefaultValue();
	        }

	        return new Error('Undefined value - ' + key);
	      } catch (err) {
	        throw err;
	      }
	    }
	  }, {
	    key: 'validateField',
	    value: function validateField(key, value) {
	      var field = this.fields[key];

	      if (field instanceof _state.Any) {
	        return new _state.Any(value);
	      }

	      if (typeof field === 'undefined') {
	        return _state2.default.get(value);
	      }

	      return field.parse(value);
	    }
	  }, {
	    key: 'validate',
	    value: function validate(obj) {
	      var result = {};
	      var errors = {};
	      var validationFailed = false;

	      for (var key in obj) {
	        var value = obj[key];

	        try {
	          result[key] = this.validateField(key, value);
	        } catch (err) {
	          validationFailed = true;
	          errors[key] = err;
	        }
	      }

	      if (validationFailed) {
	        throw errors;
	      }

	      return result;
	    }
	  }, {
	    key: 'parse',
	    value: function parse(value) {
	      return new _state.Map(value, this);
	    }
	  }, {
	    key: 'find',
	    value: function find(key) {
	      return typeof this.attributes[key] !== 'undefined' ? this.attributes[key] : undefined;
	    }
	  }]);

	  return Schema;
	}();

	exports.default = Schema;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Boolean = function (_TypedNode) {
	  _inherits(Boolean, _TypedNode);

	  function Boolean() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    _classCallCheck(this, Boolean);

	    var _this = _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).call(this));

	    _this.value = value;
	    return _this;
	  }

	  _createClass(Boolean, [{
	    key: 'invert',
	    value: function invert() {
	      this.value = !this.value;
	    }
	  }]);

	  return Boolean;
	}(_node2.default);

	exports.default = Boolean;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _utils = __webpack_require__(2);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _default_factory = __webpack_require__(6);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_TypedNode) {
	  _inherits(List, _TypedNode);

	  function List(value, of) {
	    _classCallCheck(this, List);

	    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

	    _this.children = [];

	    if (of) {
	      if (!_is2.default.factory(of)) {
	        _this.type = of;
	      } else {
	        _this.factory = of;
	      }
	    } else {
	      _this.factory = _default_factory2.default;
	    }

	    if (typeof value !== 'undefined') {
	      _this.set(value);
	    }

	    _this[Symbol.iterator] = _utils.indexedIterator.bind(_this);
	    return _this;
	  }

	  _createClass(List, [{
	    key: 'clear',
	    value: function clear() {
	      this.children = [];

	      return this;
	    }
	  }, {
	    key: 'concat',
	    value: function concat(source) {
	      if (!_is2.default.list(source)) {
	        throw new Error('Input value is not a List type');
	      }

	      var sourceValue = (0, _utils.getSourceValue)(source);

	      for (var i = 0; i < sourceValue.length; i += 1) {
	        this.push(sourceValue[i]);
	      }

	      return this;
	    }
	  }, {
	    key: 'set',
	    value: function set(source) {
	      this.clear();
	      var sourceValue = (0, _utils.getSourceValue)(source);

	      for (var i = 0; i < sourceValue.length; i += 1) {
	        this.push(sourceValue[i]);
	      }

	      return this;
	    }
	  }, {
	    key: 'push',
	    value: function push(value) {
	      var sourceValue = (0, _utils.getSourceValue)(value);

	      if (this.type) {
	        try {
	          this.children.push(this.type.parse(sourceValue));
	        } catch (err) {
	          throw err;
	        }
	      } else {
	        this.children.push(this.factory.get(sourceValue));
	      }

	      return this;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.map(function (node) {
	        return node.get.apply(node, args);
	      });
	    }
	  }, {
	    key: 'map',
	    value: function map(handler) {
	      var returnedValue = void 0;
	      var result = [];

	      for (var i = 0; i < this.children.length; i += 1) {
	        returnedValue = handler(this.children[i], i);
	        result.push(returnedValue);
	      }

	      return result;
	    }
	  }, {
	    key: 'at',
	    value: function at(index) {
	      if (index === 'last') {
	        return this.children[this.length - 1];
	      }

	      return this.children[index];
	    }
	  }, {
	    key: 'where',
	    value: function where(key, value) {
	      var _key = key;
	      var _value = value;

	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        var name = Object.keys(key)[0];
	        _key = name;
	        _value = key[name];
	      }

	      var result = this.filter(function (node) {
	        return node.get(_key) === _value;
	      });

	      if (result.length === 0) {
	        return false;
	      }

	      return result;
	    }
	  }, {
	    key: 'filter',
	    value: function filter(fn) {
	      var result = [];

	      this.map(function (node) {
	        if (fn(node) === true) {
	          result.push(node);
	        }

	        return true;
	      });

	      if (result.length === 0) {
	        return [];
	      } else if (result.length === 1) {
	        return result[0];
	      }

	      return result;
	    }
	  }, {
	    key: 'sortBy',
	    value: function sortBy(key) {
	      this.children.sort(function (a, b) {
	        if (a.get(key) > b.get(key)) {
	          return 1;
	        }

	        if (a.get(key) < b.get(key)) {
	          return -1;
	        }

	        return 0;
	      });

	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(toRemove) {
	      var _this2 = this;

	      if (Array.isArray(toRemove)) {
	        for (var i = toRemove.length - 1; i >= 0; i -= 1) {
	          this.remove(toRemove[i]);
	        }
	      } else {
	        this.map(function (n, index) {
	          if (toRemove === n) {
	            _this2.children.splice(index, 1);
	          }

	          return true;
	        });
	      }

	      return this;
	    }
	  }, {
	    key: 'length',
	    get: function get() {
	      return this.children.length;
	    }
	  }]);

	  return List;
	}(_node2.default);

	exports.default = List;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _utils = __webpack_require__(2);

	var _default_factory = __webpack_require__(6);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Map = function (_TypedNode) {
	  _inherits(Map, _TypedNode);

	  function Map(value) {
	    var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    _classCallCheck(this, Map);

	    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

	    _this.attributes = {};
	    _this.keys = [];
	    _this.schema = schema;

	    if (value !== undefined) {
	      _this.set(value);
	    }

	    _this[Symbol.iterator] = _utils.keyedIterator.bind(_this);
	    return _this;
	  }

	  _createClass(Map, [{
	    key: 'setAttribute',
	    value: function setAttribute(key, value) {
	      if (!this.schema) {
	        this.attributes[key] = _default_factory2.default.get(value);
	      } else {
	        this.attributes[key] = this.schema.validateField(key, value);
	      }

	      if (this.keys.indexOf(key) === -1) {
	        this.keys.push(key);
	      }

	      return this;
	    }
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute(key) {
	      if (this.attributes[key] !== undefined) {
	        return this.attributes[key].get();
	      }

	      return undefined;
	    }
	  }, {
	    key: 'set',
	    value: function set(source) {
	      this.clear();
	      this.keys = Object.keys(source);
	      this.merge(source);

	      return this;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.attributes = {};
	    }
	  }, {
	    key: 'merge',
	    value: function merge(source) {
	      var sourceValue = (0, _utils.getSourceValue)(source);

	      if (!this.schema) {
	        for (var name in sourceValue) {
	          this.setAttribute(name, sourceValue[name]);
	        }

	        return;
	      }

	      var newAttributes = this.schema.validate(source);
	      this.attributes = Object.assign(this.attributes, newAttributes);
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var result = {};
	      var list = args.length ? args : this.keys;

	      if (arguments.length === 1) {
	        return this.getAttribute(list[0]);
	      }

	      for (var i = 0; i < list.length; i += 1) {
	        var key = list[i];
	        result[key] = this.getAttribute(key);
	      }
	      return result;
	    }
	  }, {
	    key: 'map',
	    value: function map(handler) {
	      var result = [];

	      for (var i = 0; i < this.keys.length; i += 1) {
	        var key = this.keys[i];
	        var value = handler(this.attributes[key], key);

	        result.push(value);
	      }

	      return result;
	    }
	  }, {
	    key: 'find',
	    value: function find(key) {
	      return typeof this.attributes[key] !== 'undefined' ? this.attributes[key] : undefined;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Map(this.get());
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return JSON.stringify(this.get());
	    }
	  }, {
	    key: 'fromJSON',
	    value: function fromJSON(str) {
	      return this.set(JSON.parse(str));
	    }
	  }]);

	  return Map;
	}(_node2.default);

	exports.default = Map;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Number = function (_TypedNode) {
	  _inherits(Number, _TypedNode);

	  function Number(value) {
	    _classCallCheck(this, Number);

	    var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this));

	    _this.value = value || 0;
	    return _this;
	  }

	  _createClass(Number, [{
	    key: 'increase',
	    value: function increase() {
	      this.value += 1;
	    }
	  }, {
	    key: 'decrease',
	    value: function decrease() {
	      this.value -= 1;
	    }
	  }]);

	  return Number;
	}(_node2.default);

	exports.default = Number;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var String = function (_TypedNode) {
	  _inherits(String, _TypedNode);

	  function String(value) {
	    _classCallCheck(this, String);

	    var _this = _possibleConstructorReturn(this, (String.__proto__ || Object.getPrototypeOf(String)).call(this));

	    _this.value = value || '';
	    return _this;
	  }

	  return String;
	}(_node2.default);

	exports.default = String;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.State = exports.is = exports.Schema = exports.Type = exports.TypedNode = exports.Factory = exports.Utils = undefined;

	var _utils = __webpack_require__(2);

	var Utils = _interopRequireWildcard(_utils);

	var _factory = __webpack_require__(5);

	var _factory2 = _interopRequireDefault(_factory);

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _schema = __webpack_require__(8);

	var _schema2 = _interopRequireDefault(_schema);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _state = __webpack_require__(7);

	var State = _interopRequireWildcard(_state);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.Utils = Utils;
	exports.Factory = _factory2.default;
	exports.TypedNode = _node2.default;
	exports.Type = _type2.default;
	exports.Schema = _schema2.default;
	exports.is = _is2.default;
	exports.State = State;

	exports.default = function (value) {
	  return State.default.get(value);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	var _default_factory = __webpack_require__(6);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Any = function (_TypedNode) {
	  _inherits(Any, _TypedNode);

	  function Any(value) {
	    var _ret;

	    _classCallCheck(this, Any);

	    var _this = _possibleConstructorReturn(this, (Any.__proto__ || Object.getPrototypeOf(Any)).call(this));

	    return _ret = _default_factory2.default.get(value), _possibleConstructorReturn(_this, _ret);
	  }

	  return Any;
	}(_node2.default);

	exports.default = Any;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _node = __webpack_require__(1);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ID = function (_TypedNode) {
	  _inherits(ID, _TypedNode);

	  function ID() {
	    _classCallCheck(this, ID);

	    return _possibleConstructorReturn(this, (ID.__proto__ || Object.getPrototypeOf(ID)).apply(this, arguments));
	  }

	  return ID;
	}(_node2.default);

	exports.default = ID;

/***/ }
/******/ ])
});
;