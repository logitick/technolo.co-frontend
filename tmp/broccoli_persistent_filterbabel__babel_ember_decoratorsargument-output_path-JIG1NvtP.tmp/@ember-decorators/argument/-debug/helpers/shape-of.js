define('@ember-decorators/argument/-debug/helpers/shape-of', ['exports', '@ember-decorators/argument/-debug/utils/validators'], function (exports, _validators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = shapeOf;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function shapeOf(shape) {
    (true && !(arguments.length === 1) && Ember.assert('The \'shapeOf\' helper must receive exactly one shape', arguments.length === 1));
    (true && !((typeof shape === 'undefined' ? 'undefined' : _typeof(shape)) === 'object') && Ember.assert('The \'shapeOf\' helper must receive an object to match the shape to, received: ' + shape, (typeof shape === 'undefined' ? 'undefined' : _typeof(shape)) === 'object'));
    (true && !(Object.keys(shape).length > 0) && Ember.assert('The object passed to the \'shapeOf\' helper must have at least one key:type pair', Object.keys(shape).length > 0));


    var typeDesc = [];

    for (var key in shape) {
      shape[key] = (0, _validators.resolveValidator)(shape[key]);

      typeDesc.push(key + ':' + shape[key]);
    }

    return (0, _validators.makeValidator)('shapeOf({' + typeDesc.join() + '})', function (value) {
      for (var _key in shape) {
        if (shape[_key](Ember.get(value, _key)) !== true) {
          return false;
        }
      }

      return true;
    });
  }
});