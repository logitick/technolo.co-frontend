define('@ember-decorators/argument/-debug/helpers/union-of', ['exports', '@ember-decorators/argument/-debug/utils/validators'], function (exports, _validators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unionOf;
  function unionOf() {
    for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    (true && !(arguments.length > 1) && Ember.assert('The \'unionOf\' helper must receive more than one type', arguments.length > 1));


    var validators = types.map(_validators.resolveValidator);

    return (0, _validators.makeValidator)('unionOf(' + validators.join() + ')', function (value) {
      return validators.some(function (validator) {
        return validator(value);
      });
    });
  }
});