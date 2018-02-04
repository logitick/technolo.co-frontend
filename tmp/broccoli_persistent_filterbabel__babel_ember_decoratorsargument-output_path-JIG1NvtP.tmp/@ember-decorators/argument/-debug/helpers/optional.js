define('@ember-decorators/argument/-debug/helpers/optional', ['exports', '@ember-decorators/argument/-debug/utils/validators'], function (exports, _validators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = optional;


  var nullValidator = (0, _validators.resolveValidator)(null);
  var undefinedValidator = (0, _validators.resolveValidator)(undefined);

  function optional(type) {
    (true && !(arguments.length === 1) && Ember.assert('The \'optional\' helper must receive exactly one type. Use the \'unionOf\' helper to create a union type.', arguments.length === 1));


    var validator = (0, _validators.resolveValidator)(type);
    var validatorDesc = validator.toString();

    (true && !(validatorDesc !== 'null') && Ember.assert('Passsing \'null\' to the \'optional\' helper does not make sense.', validatorDesc !== 'null'));
    (true && !(validatorDesc !== 'undefined') && Ember.assert('Passsing \'undefined\' to the \'optional\' helper does not make sense.', validatorDesc !== 'undefined'));


    return (0, _validators.makeValidator)('optional(' + validator + ')', function (value) {
      return validator(value) || nullValidator(value) || undefinedValidator(value);
    });
  }
});