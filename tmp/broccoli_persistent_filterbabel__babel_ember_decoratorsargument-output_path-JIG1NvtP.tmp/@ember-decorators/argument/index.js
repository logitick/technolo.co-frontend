define('@ember-decorators/argument/index', ['exports', 'ember-get-config', '@ember-decorators/argument/-debug'], function (exports, _emberGetConfig, _debug) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.argument = argument;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var valueMap = new WeakMap();

  function valuesFor(obj) {
    if (!valueMap.has(obj)) {
      valueMap.set(obj, Object.create(null));
    }

    return valueMap.get(obj);
  }

  var internalArgumentDecorator = function internalArgumentDecorator(target, key, desc, options) {
    if (true) {
      var validations = (0, _debug.getValidationsForKey)(target, key);
      validations.isArgument = true;
      validations.typeRequired = Ember.getWithDefault(_emberGetConfig.default, '@ember-decorators/argument.typeRequired', false);
    }

    // always ensure the property is writeable, doesn't make sense otherwise (babel bug?)
    desc.writable = true;
    desc.configurable = true;

    if (desc.initializer === null || desc.initializer === undefined) {
      desc.initializer = undefined;
      return;
    }

    var initializer = desc.initializer;

    var get = function get() {
      var values = valuesFor(this);

      if (!Object.hasOwnProperty.call(values, key)) {
        values[key] = initializer.call(this);
      }

      return values[key];
    };

    var set = void 0;

    if (options.defaultIfNullish === true) {
      set = function set(value) {
        if (value !== undefined && value !== null) {
          valuesFor(this)[key] = value;
        }
      };
    } else if (options.defaultIfUndefined === true) {
      set = function set(value) {
        if (value !== undefined) {
          valuesFor(this)[key] = value;
        }
      };
    } else {
      set = function set(value) {
        valuesFor(this)[key] = value;
      };
    }

    return {
      get: get,
      set: set
    };
  };

  function argument(maybeOptions, maybeKey, maybeDesc) {
    if (typeof maybeKey === 'string' && (typeof maybeDesc === 'undefined' ? 'undefined' : _typeof(maybeDesc)) === 'object') {
      return internalArgumentDecorator(maybeOptions, maybeKey, maybeDesc, { defaultIfUndefined: false });
    }

    return function (target, key, desc) {
      return internalArgumentDecorator(target, key, desc, maybeOptions);
    };
  }
});