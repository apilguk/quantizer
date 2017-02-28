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

	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
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

	var _factory = __webpack_require__(7);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function factoryCreator(fn) {
	  return new _factory2.default(fn);
	}

	function sym(name) {
	  return '[[' + name + ']]';
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

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


	TypedNode[(0, _utils.sym)('node')] = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _utils = __webpack_require__(1);

	var is = {
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
	    return value[(0, _utils.sym)('factory')];
	  },
	  node: function node(value) {
	    return !!value[(0, _utils.sym)('node')];
	  },
	  schema: function schema(value) {
	    return !!value[(0, _utils.sym)('schema')];
	  },
	  sym: function sym(value) {
	    return is.string(value) && /\[\[(\w+)\]\]/g.test(value);
	  }, /* eslint no-useless-escape: 1 */
	  type: function type(value) {
	    return !!value[(0, _utils.sym)('type')];
	  },
	  uuid: function uuid(value) {
	    return is.sym(value) || is.string(value) || is.number(value);
	  },
	  object_id: function object_id(value) {
	    return is.sym(value) || is.string(value) || is.number(value);
	  }
	};

	exports.default = is;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(1);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _boolean = __webpack_require__(8);

	var _boolean2 = _interopRequireDefault(_boolean);

	var _number = __webpack_require__(11);

	var _number2 = _interopRequireDefault(_number);

	var _string = __webpack_require__(12);

	var _string2 = _interopRequireDefault(_string);

	var _list = __webpack_require__(9);

	var _list2 = _interopRequireDefault(_list);

	var _map = __webpack_require__(10);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _state = __webpack_require__(6);

	var State = _interopRequireWildcard(_state);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Type = function () {
	  function Type(opts) {
	    _classCallCheck(this, Type);

	    this[(0, _utils.sym)('type')] = true;

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
	      switch (true) {
	        case _is2.default._undefined(value):
	          return 'Undefined';
	        case _is2.default._null(value):
	          return 'Null';
	        case _is2.default.schema(value):
	          return 'Schema';
	        case _is2.default.type(value):
	          return 'Type';
	        case _is2.default.list(value):
	          return 'List';
	        case _is2.default.number(value):
	          return 'Number';
	        case _is2.default.string(value):
	          return 'String';
	        case _is2.default.boolean(value):
	          return 'Boolean';
	        case _is2.default.map(value):
	          return 'Map';
	        case typeof value === 'function':
	          return 'Function';
	        case _is2.default.node(value):
	          return 'TypedNode';
	        default:
	          return 'Unknown';
	      }
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

	Type.UUID = new Type({
	  name: 'UUID',
	  instance: State.UUID,
	  validate: _is2.default.uuid
	});

	Type.ObjectID = new Type({
	  name: 'ObjectID',
	  instance: State.ObjectID,
	  validate: _is2.default.object_id
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UUID = exports.ObjectID = exports.List = exports.Map = exports.String = exports.Number = exports.Boolean = exports.Any = undefined;

	var _any = __webpack_require__(17);

	var _any2 = _interopRequireDefault(_any);

	var _boolean = __webpack_require__(8);

	var _boolean2 = _interopRequireDefault(_boolean);

	var _number = __webpack_require__(11);

	var _number2 = _interopRequireDefault(_number);

	var _string = __webpack_require__(12);

	var _string2 = _interopRequireDefault(_string);

	var _list = __webpack_require__(9);

	var _list2 = _interopRequireDefault(_list);

	var _map = __webpack_require__(10);

	var _map2 = _interopRequireDefault(_map);

	var _object_id = __webpack_require__(18);

	var _object_id2 = _interopRequireDefault(_object_id);

	var _uuid = __webpack_require__(19);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Any = _any2.default;
	exports.Boolean = _boolean2.default;
	exports.Number = _number2.default;
	exports.String = _string2.default;
	exports.Map = _map2.default;
	exports.List = _list2.default;
	exports.ObjectID = _object_id2.default;
	exports.UUID = _uuid2.default;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FactoryFunction = function () {
	  function FactoryFunction(factory) {
	    _classCallCheck(this, FactoryFunction);

	    this[(0, _utils.sym)('factory')] = true;

	    this.func = factory.bind(null);
	  }

	  _createClass(FactoryFunction, [{
	    key: 'get',
	    value: function get() {
	      return this.func.apply(this, arguments);
	    }
	  }]);

	  return FactoryFunction;
	}();

	exports.default = FactoryFunction;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _utils = __webpack_require__(1);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _default_factory = __webpack_require__(4);

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
	        if (!_is2.default.type(of) && !_is2.default.schema(of)) {
	          var Instance = of;

	          _this.type = {
	            parse: function parse() {
	              for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	                args[_key2] = arguments[_key2];
	              }

	              return new (Function.prototype.bind.apply(Instance, [null].concat(args)))();
	            }
	          };
	        } else {
	          _this.type = of;
	        }
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

	      // console.log(this.type)

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
	      for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	        args[_key3] = arguments[_key3];
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _utils = __webpack_require__(1);

	var _default_factory = __webpack_require__(4);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _node = __webpack_require__(2);

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
/* 13 */
/***/ function(module, exports) {

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	module.exports = bytesToUuid;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(rnds8);
	    return rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}

	module.exports = rng;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.State = exports.is = exports.Schema = exports.Type = exports.TypedNode = exports.Factory = exports.Utils = undefined;

	var _utils = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_utils);

	var _factory = __webpack_require__(7);

	var _factory2 = _interopRequireDefault(_factory);

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _schema = __webpack_require__(16);

	var _schema2 = _interopRequireDefault(_schema);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _default_factory = __webpack_require__(4);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	var _state = __webpack_require__(6);

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
	  return _default_factory2.default.get(value);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _default_factory = __webpack_require__(4);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _state = __webpack_require__(6);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Schema = function () {
	  function Schema() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unnamed';
	    var fileds = arguments[1];

	    _classCallCheck(this, Schema);

	    this[(0, _utils.sym)('schema')] = true;

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

	          if (innerType === 'Schema' || innerType === 'Type' || _is2.default.node(input[0])) {
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
	        return _default_factory2.default.get(value);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Any = function (_TypedNode) {
	  _inherits(Any, _TypedNode);

	  function Any(value) {
	    _classCallCheck(this, Any);

	    var _this = _possibleConstructorReturn(this, (Any.__proto__ || Object.getPrototypeOf(Any)).call(this));

	    _this.value = value;
	    return _this;
	  }

	  return Any;
	}(_node2.default);

	exports.default = Any;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ObjectID = function (_TypedNode) {
	  _inherits(ObjectID, _TypedNode);

	  function ObjectID(value) {
	    _classCallCheck(this, ObjectID);

	    var _this = _possibleConstructorReturn(this, (ObjectID.__proto__ || Object.getPrototypeOf(ObjectID)).call(this));

	    if (value === (0, _utils.sym)('id')) {
	      _this.value = ObjectID.GenerateValue();
	    } else {
	      _this.value = value;
	    }
	    return _this;
	  }

	  _createClass(ObjectID, [{
	    key: 'getTimestamp',
	    value: function getTimestamp() {
	      return new Date(parseInt(this.get().substring(0, 8), 16) * 1000);
	    }
	  }], [{
	    key: 'GenerateValue',
	    value: function GenerateValue(timestamp) {
	      var h = 16;
	      var process = function process(s) {
	        return Math.floor(s).toString(h);
	      };
	      return process((timestamp || Date.now()) / 1000) + ' '.repeat(h).replace(/./g, function () {
	        return process(Math.random() * h);
	      });
	    }
	  }]);

	  return ObjectID;
	}(_node2.default);

	exports.default = ObjectID;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _uuid = __webpack_require__(20);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UUID = function (_TypedNode) {
	  _inherits(UUID, _TypedNode);

	  function UUID(value) {
	    _classCallCheck(this, UUID);

	    var _this = _possibleConstructorReturn(this, (UUID.__proto__ || Object.getPrototypeOf(UUID)).call(this));

	    if (value === (0, _utils.sym)('id')) {
	      _this.value = (0, _uuid2.default)();
	    } else {
	      _this.value = value;
	    }
	    return _this;
	  }

	  return UUID;
	}(_node2.default);

	exports.default = UUID;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var v1 = __webpack_require__(21);
	var v4 = __webpack_require__(22);

	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;

	module.exports = uuid;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var rng = __webpack_require__(14);
	var bytesToUuid = __webpack_require__(13);

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : bytesToUuid(b);
	}

	module.exports = v1;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var rng = __webpack_require__(14);
	var bytesToUuid = __webpack_require__(13);

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid(rnds);
	}

	module.exports = v4;


/***/ }
/******/ ])
});
;