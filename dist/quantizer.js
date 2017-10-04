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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sym = sym;
	exports.keyedIterator = keyedIterator;
	exports.indexedIterator = indexedIterator;
	exports.getSourceValue = getSourceValue;
	exports.uuid = uuid;
	function sym(name) {
	  return '[[' + name + ']]';
	}

	function keyedIterator() {
	  var _this = this;

	  var index = 0;

	  return {
	    next: function next() {
	      var done = (index += 1) >= _this.keys.length;
	      return {
	        value: _this.find(_this.keys[index]),
	        done: done
	      };
	    }
	  };
	}

	function indexedIterator() {
	  var _this2 = this;

	  var index = 0;

	  return {
	    next: function next() {
	      var value = _this2.at(index);
	      var done = (index += 1) > _this2.length;
	      return {
	        value: value,
	        done: done
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

	function uuid() {
	  var dt = new Date().getTime();
	  var value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = (dt + Math.random() * 16) % 16 | 0;
	    dt = Math.floor(dt / 16);
	    return (c === 'x' ? r : r && 0x3 || 0x8).toString(16);
	  });
	  return value;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
	    return typeof value === 'undefined';
	  },
	  func: function func(value) {
	    return typeof value !== 'undefined' && typeof value === 'function';
	  },
	  promise: function promise(value) {
	    return typeof value !== 'undefined' && typeof value.then === 'function';
	  },
	  list: function list(value) {
	    return typeof value !== 'undefined' && Array.isArray(value);
	  },
	  number: function number(value) {
	    return typeof value !== 'undefined' && typeof value === 'number';
	  },
	  boolean: function boolean(value) {
	    return typeof value !== 'undefined' && typeof value === 'boolean';
	  },
	  string: function string(value) {
	    return typeof value !== 'undefined' && typeof value === 'string';
	  },
	  map: function map(value) {
	    return typeof value !== 'undefined' && !(value === null) && !Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	  },
	  factory: function factory(value) {
	    return typeof value !== 'undefined' && value[(0, _utils.sym)('factory')];
	  },
	  node: function node(value) {
	    return typeof value !== 'undefined' && !!value[(0, _utils.sym)('node')];
	  },
	  schema: function schema(value) {
	    return typeof value !== 'undefined' && !!value[(0, _utils.sym)('schema')];
	  },
	  sym: function sym(value) {
	    return typeof value !== 'undefined' && is.string(value) && /\[\[(\w+)\]\]/g.test(value);
	  }, /* eslint no-useless-escape: 1 */
	  type: function type(value) {
	    return typeof value !== 'undefined' && !!value[(0, _utils.sym)('type')];
	  },
	  uuid: function uuid(value) {
	    return typeof value !== 'undefined' && is.string(value);
	  }, // needs a true validation
	  object_id: function object_id(value) {
	    return typeof value !== 'undefined' && is.string(value);
	  }, // needs a true validation
	  error: function error(value) {
	    return typeof value !== 'undefined' && !!value[(0, _utils.sym)('error')];
	  }
	};

	exports.default = is;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _factory = __webpack_require__(8);

	var _factory2 = _interopRequireDefault(_factory);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _node = __webpack_require__(2);

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

	exports.default = new _factory2.default(function (value) {
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _utils = __webpack_require__(1);

	var _error = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Type.
	 */

	var Type = function () {
	  /**
	   * @param {{
	   *   name: {number} - name of the type validator, will be used for formating errors.
	   *   validate: {function} - validator function takes a value to validate and return
	   *     boolean verdict.
	   *   instance: {Node} - instance of the Quantizer node wich will be used for serialization.
	   *   required: {boolean} - is value need to be required or no.
	   *   nested: {Type|Schema|Node} - nested type of the node, currently supported by List.
	   * }} - params of the type.
	   *
	   * @returns {Type}
	   */
	  function Type(_ref) {
	    var _this = this;

	    var name = _ref.name,
	        validate = _ref.validate,
	        instance = _ref.instance,
	        required = _ref.required,
	        nested = _ref.nested;

	    _classCallCheck(this, Type);

	    this[(0, _utils.sym)('type')] = true;

	    this.name = name;
	    this.validate = validate;
	    this.instance = instance;
	    this.required = required;
	    this.nested = nested;

	    if (nested) {
	      this.validate = function (value) {
	        var errors = {
	          name: _this.name,
	          count: 0,
	          list: []
	        };

	        if (!validate(value)) {
	          return new _error.ValidationError('List', Type.defineType(value));
	        }

	        for (var i = 0; i < value.length; i += 1) {
	          if (_is2.default.node(nested)) {
	            var validationError = nested.schema.validate(value[i]);

	            if (validationError.count > 0) {
	              errors.list.push(validationError);
	              errors.count += validationError.count;
	            }
	          } else {
	            var _validationError = nested.validate(value[i]);

	            if (_validationError.count > 0) {
	              errors.list.push(_validationError);
	              errors.count += _validationError.count;
	            }
	          }
	        }

	        return errors;
	      };
	    } else {
	      this.validate = function (value) {
	        var errors = {
	          name: _this.name,
	          count: 0
	        };

	        if (!validate(value)) {
	          errors = new _error.ValidationError(_this.name, Type.defineType(value));

	          return errors;
	        }

	        return errors;
	      };
	    }

	    if (!required) {
	      this.isRequired = new Type(_extends({}, this, { required: true }));
	    }

	    return this;
	  }

	  _createClass(Type, [{
	    key: 'parse',
	    value: function parse(value) {
	      var TypeInstace = this.instance;

	      return new TypeInstace(value, this.nested);
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
	        case _is2.default.func(value):
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UUID = exports.ObjectID = exports.List = exports.Map = exports.String = exports.Number = exports.Boolean = exports.Any = undefined;

	var _any = __webpack_require__(16);

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

	var _object_id = __webpack_require__(17);

	var _object_id2 = _interopRequireDefault(_object_id);

	var _uuid = __webpack_require__(18);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UndeclaredError = exports.RequirementError = exports.ValidationError = exports.DefaultError = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function tab(depth) {
	  return '  '.repeat(depth);
	}

	var DefaultError = exports.DefaultError = function () {
	  function DefaultError(message) {
	    _classCallCheck(this, DefaultError);

	    this[(0, _utils.sym)('error')] = true;
	    this.count = 1;
	    this.message = message;
	  }

	  _createClass(DefaultError, [{
	    key: 'formatMessage',
	    value: function formatMessage() {
	      return this.message;
	    }
	  }], [{
	    key: 'FormatError',
	    value: function FormatError(err) {
	      function formatErrorPart(obj, depth, padBrackets) {
	        if (depth === 0 && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	          return '\n' + obj.name + ' ' + formatErrorPart(obj, 1);
	        }

	        if (obj instanceof DefaultError) {
	          return '\'' + obj.formatMessage().slice(0, -1) + '\'\n';
	        }

	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.list) {
	          return '[\n' + obj.list.map(function (o) {
	            return formatErrorPart(o, depth + 1, true);
	          }).join('') + tab(depth - 1) + ']\n';
	        }

	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.map) {
	          var children = obj.map;
	          var padLeft = tab(padBrackets ? depth - 1 : 0);

	          return padLeft + '{\n' + Object.keys(children).filter(function (key) {
	            if (key === 'name' && typeof children[key] === 'string') {
	              return false;
	            }
	            if (key === 'count') {
	              return false;
	            }
	            return true;
	          }).map(function (key) {
	            return '' + tab(depth) + key + ': ' + formatErrorPart(children[key], depth + 1);
	          }).join('') + tab(depth - 1) + '}\n';
	        }

	        return '';
	      }
	      return formatErrorPart(err, 0);
	    }
	  }, {
	    key: 'Throw',
	    value: function Throw(err) {
	      throw new Error(DefaultError.FormatError(err));
	    }
	  }]);

	  return DefaultError;
	}();

	var ValidationError = exports.ValidationError = function (_DefaultError) {
	  _inherits(ValidationError, _DefaultError);

	  function ValidationError(expected, actual) {
	    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    _classCallCheck(this, ValidationError);

	    var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, 'Expected ' + expected + ' but ' + actual + '\n'));

	    _this.expected = expected;
	    _this.actual = actual;
	    _this.key = key;
	    return _this;
	  }

	  return ValidationError;
	}(DefaultError);

	var RequirementError = exports.RequirementError = function (_DefaultError2) {
	  _inherits(RequirementError, _DefaultError2);

	  function RequirementError(keyName) {
	    _classCallCheck(this, RequirementError);

	    var _this2 = _possibleConstructorReturn(this, (RequirementError.__proto__ || Object.getPrototypeOf(RequirementError)).call(this, 'Value ' + keyName + ' required but undefined\n'));

	    _this2.keyName = keyName;
	    return _this2;
	  }

	  return RequirementError;
	}(DefaultError);

	var UndeclaredError = exports.UndeclaredError = function (_DefaultError3) {
	  _inherits(UndeclaredError, _DefaultError3);

	  function UndeclaredError(keyName) {
	    _classCallCheck(this, UndeclaredError);

	    var _this3 = _possibleConstructorReturn(this, (UndeclaredError.__proto__ || Object.getPrototypeOf(UndeclaredError)).call(this, 'Field ' + keyName + ' undeclared at Schema]\n'));

	    _this3.keyName = keyName;
	    return _this3;
	  }

	  return UndeclaredError;
	}(DefaultError);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Factory = function () {
	  function Factory(factory) {
	    _classCallCheck(this, Factory);

	    this[(0, _utils.sym)('factory')] = true;

	    this.func = factory.bind(null);
	  }

	  _createClass(Factory, [{
	    key: 'get',
	    value: function get() {
	      return this.func.apply(this, arguments);
	    }
	  }]);

	  return Factory;
	}();

	exports.default = Factory;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _default_factory = __webpack_require__(4);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	var _utils = __webpack_require__(1);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_TypedNode) {
	  _inherits(List, _TypedNode);

	  function List(value) {
	    var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    _classCallCheck(this, List);

	    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

	    _this.children = [];
	    _this.schema = schema;

	    if (_this.constructor.schema) {
	      _this.schema = _this.constructor.schema;
	    }

	    if (_this.schema) {
	      if (_is2.default.node(_this.schema)) {
	        var Instance = _this.schema;

	        if (Instance.schema) {
	          _this.nested = {
	            parse: function parse() {
	              for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	                args[_key2] = arguments[_key2];
	              }

	              return new (Function.prototype.bind.apply(Instance, [null].concat(args)))();
	            },
	            validate: Instance.schema.validate.bind(Instance.schema)
	          };
	        } else {
	          _this.nested = {
	            parse: function parse() {
	              for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	                args[_key3] = arguments[_key3];
	              }

	              return new (Function.prototype.bind.apply(Instance, [null].concat(args)))();
	            },
	            validate: function validate() {
	              return { count: 0 };
	            }
	          };
	        }
	      } else if (_is2.default.schema(_this.schema) || _is2.default.type(_this.schema)) {
	        _this.nested = _this.schema;
	      } else if (_is2.default.factory(_this.schema)) {
	        _this.nested = {
	          parse: function parse() {
	            var _this$schema;

	            return (_this$schema = _this.schema).get.apply(_this$schema, arguments);
	          },
	          validate: function validate() {
	            return { count: 0 };
	          }
	        };
	      }
	    } else {
	      _this.nested = {
	        parse: function parse() {
	          return _default_factory2.default.get.apply(_default_factory2.default, arguments);
	        },
	        validate: function validate() {
	          return { count: 0 };
	        }
	      };
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

	      var validationErr = this.nested.validate(sourceValue);

	      if (validationErr.count > 0) {
	        throw validationErr;
	      } else {
	        this.children.push(this.nested.parse(sourceValue));
	      }

	      return this;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	        args[_key4] = arguments[_key4];
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

	      if (index === 'first') {
	        return this.children[0];
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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

	    if (_this.constructor.schema) {
	      _this.schema = _this.constructor.schema;
	    }

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
	        this.attributes[key] = this.schema.serializeField(key, value);
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
	      this.keys = [];
	      this.attributes = {};
	    }
	  }, {
	    key: 'merge',
	    value: function merge(source) {
	      var sourceValue = (0, _utils.getSourceValue)(source);

	      if (this.schema) {
	        var validationErr = this.schema.validate(source);

	        if (validationErr.count > 0) {
	          throw validationErr;
	        }
	      }

	      if (!this.schema) {
	        for (var name in sourceValue) {
	          this.setAttribute(name, sourceValue[name]);
	        }
	      } else {
	        this.attributes = Object.assign(this.attributes, this.schema.serialize(source));
	      }
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
	      return this.attributes[key];
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Map(this.get(), this.schema);
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.State = exports.is = exports.Schema = exports.Type = exports.TypedNode = exports.Factory = exports.Utils = undefined;

	var _utils = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_utils);

	var _factory = __webpack_require__(8);

	var _factory2 = _interopRequireDefault(_factory);

	var _node = __webpack_require__(2);

	var _node2 = _interopRequireDefault(_node);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _schema = __webpack_require__(15);

	var _schema2 = _interopRequireDefault(_schema);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	var _default_factory = __webpack_require__(4);

	var _default_factory2 = _interopRequireDefault(_default_factory);

	var _state = __webpack_require__(6);

	var State = _interopRequireWildcard(_state);

	__webpack_require__(19);

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _error = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Schema = function () {
	  function Schema() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unnamed';
	    var fileds = arguments[1];
	    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    _classCallCheck(this, Schema);

	    this[(0, _utils.sym)('schema')] = true;

	    this.name = name;
	    this.fields = {};
	    this.strict = strict;

	    if (fileds) {
	      this.initTypes(fileds);
	    }
	  }

	  _createClass(Schema, [{
	    key: 'setProps',
	    value: function setProps(props) {
	      Object.assign(this, props);
	    }
	  }, {
	    key: 'initTypes',
	    value: function initTypes(types) {
	      for (var key in types) {
	        var input = types[key];

	        if (_is2.default.type(input) || _is2.default.schema(input)) {
	          this.fields[key] = input;
	        } else if (_is2.default.map(input)) {
	          this.fields[key] = new Schema(key, input);
	        } else if (_is2.default.list(input)) {
	          var instance = input[0];

	          if (_is2.default.type(instance) || _is2.default.schema(instance)) {
	            this.fields[key] = new _type2.default({
	              name: instance.name,
	              instance: _state.List,
	              validate: instance.validate.bind(instance),
	              nested: instance
	            });
	          } else if (_is2.default.node(instance)) {
	            this.fields[key] = new _type2.default({
	              name: instance.name || key,
	              instance: _state.List,
	              validate: _is2.default.list,
	              nested: instance
	            });
	          } else if (_is2.default.map(instance)) {
	            this.fields[key] = new _type2.default({
	              name: instance.name || key,
	              instance: _state.List,
	              validate: _is2.default.list,
	              nested: new Schema(key, instance)
	            });
	          }
	        } else if (_is2.default.node(input)) {
	          this.fields[key] = new _type2.default({
	            name: input.name || key,
	            instance: input,
	            validate: _is2.default.map
	          });
	        }
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate(obj) {
	      var objKeys = Object.keys(obj);
	      var fieldsKeys = Object.keys(this.fields);
	      var errors = {
	        name: this.name,
	        count: 0,
	        map: {}
	      };

	      if (!_is2.default.map(obj)) {
	        errors = new _error.ValidationError('Map', _type2.default.defineType(obj));

	        return errors;
	      }

	      for (var i = 0; i < objKeys.length; i += 1) {
	        var key = objKeys[i];
	        var field = this.fields[key];

	        if (typeof field !== 'undefined') {
	          if (_is2.default.schema(field)) {
	            field.strict = this.strict;
	          }

	          var validationError = field.validate(obj[key]);

	          if (validationError.count > 0) {
	            errors.map[key] = validationError;
	            errors.count += validationError.count;
	          }
	        }

	        if (this.strict && typeof field === 'undefined') {
	          errors.map[key] = new _error.UndeclaredError(key);
	          errors.count += 1;
	        }
	      }

	      for (var _i = 0; _i < fieldsKeys.length; _i += 1) {
	        var _key = fieldsKeys[_i];
	        var type = this.fields[_key];

	        if (type[(0, _utils.sym)('type')] && type.required && typeof obj[_key] === 'undefined') {
	          errors.map[_key] = new _error.RequirementError(_key);
	          errors.count += 1;
	        }
	      }

	      return errors;
	    }
	  }, {
	    key: 'serialize',
	    value: function serialize(obj) {
	      var result = {};

	      for (var key in obj) {
	        var field = this.fields[key];

	        if (typeof field !== 'undefined') {
	          result[key] = field.parse(obj[key]);
	        } else {
	          result[key] = _default_factory2.default.get(obj[key]);
	        }
	      }

	      return result;
	    }
	  }, {
	    key: 'serializeField',
	    value: function serializeField(key, value) {
	      var field = this.fields[key];

	      if (typeof field !== 'undefined') {
	        return field.parse(value);
	      }

	      return _default_factory2.default.get(value);
	    }
	  }, {
	    key: 'parse',
	    value: function parse(value) {
	      return new _state.Map(value, this);
	    }
	  }, {
	    key: 'find',
	    value: function find(key) {
	      return this.attributes[key];
	    }
	  }]);

	  return Schema;
	}();

	exports.default = Schema;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
	      _this.value = (0, _utils.uuid)();
	    } else {
	      _this.value = value;
	    }
	    return _this;
	  }

	  return UUID;
	}(_node2.default);

	exports.default = UUID;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _state = __webpack_require__(6);

	var State = _interopRequireWildcard(_state);

	var _type = __webpack_require__(5);

	var _type2 = _interopRequireDefault(_type);

	var _is = __webpack_require__(3);

	var _is2 = _interopRequireDefault(_is);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	_type2.default.Any = new _type2.default({
	  name: 'Any',
	  instance: State.Any,
	  validate: function validate() {
	    return true;
	  }
	});

	_type2.default.Boolean = new _type2.default({
	  name: 'Boolean',
	  instance: State.Boolean,
	  validate: _is2.default.boolean
	});

	_type2.default.List = new _type2.default({
	  name: 'List',
	  instance: State.List,
	  validate: _is2.default.list
	});

	_type2.default.Map = new _type2.default({
	  name: 'Map',
	  instance: State.Map,
	  validate: _is2.default.map
	});

	_type2.default.Number = new _type2.default({
	  name: 'Number',
	  instance: State.Number,
	  validate: _is2.default.number
	});

	_type2.default.String = new _type2.default({
	  name: 'String',
	  instance: State.String,
	  validate: _is2.default.string
	});

	_type2.default.UUID = new _type2.default({
	  name: 'UUID',
	  instance: State.UUID,
	  validate: _is2.default.uuid
	});

	_type2.default.ObjectID = new _type2.default({
	  name: 'ObjectID',
	  instance: State.ObjectID,
	  validate: _is2.default.object_id
	});

/***/ })
/******/ ])
});
;