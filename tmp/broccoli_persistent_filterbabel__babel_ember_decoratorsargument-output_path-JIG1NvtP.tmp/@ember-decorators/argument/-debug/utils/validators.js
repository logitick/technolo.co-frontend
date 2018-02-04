define('@ember-decorators/argument/-debug/utils/validators', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeValidator = makeValidator;
  exports.resolveValidator = resolveValidator;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function instanceOf(type) {
    return makeValidator(type.toString(), function (value) {
      return value instanceof type;
    });
  }

  var primitiveTypeValidators = {
    any: makeValidator('any', function () {
      return true;
    }),
    object: makeValidator('object', function (value) {
      return typeof value !== 'boolean' && typeof value !== 'number' && typeof value !== 'string' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'symbol' && value !== null && value !== undefined;
    }),

    boolean: makeValidator('boolean', function (value) {
      return typeof value === 'boolean';
    }),
    number: makeValidator('number', function (value) {
      return typeof value === 'number';
    }),
    string: makeValidator('string', function (value) {
      return typeof value === 'string';
    }),
    symbol: makeValidator('symbol', function (value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol';
    }),

    null: makeValidator('null', function (value) {
      return value === null;
    }),
    undefined: makeValidator('undefined', function (value) {
      return value === undefined;
    })
  };

  function makeValidator(desc, fn) {
    fn.isValidator = true;
    fn.toString = function () {
      return desc;
    };
    return fn;
  }

  function resolveValidator(type) {
    if (type === null || type === undefined) {
      return type === null ? primitiveTypeValidators.null : primitiveTypeValidators.undefined;
    } else if (type.isValidator === true) {
      return type;
    } else if (typeof type === 'function' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
      // We allow objects for certain classes in IE, like Element, which have typeof 'object' for some reason
      return instanceOf(type);
    } else if (typeof type === 'string') {
      (true && !(primitiveTypeValidators[type] !== undefined) && Ember.assert('Unknown primitive type received: ' + type, primitiveTypeValidators[type] !== undefined));


      return primitiveTypeValidators[type];
    } else {
      (true && !(false) && Ember.assert('Types must either be a primitive type string, class, validator, or null or undefined, received: ' + type, false));
    }
  }
});