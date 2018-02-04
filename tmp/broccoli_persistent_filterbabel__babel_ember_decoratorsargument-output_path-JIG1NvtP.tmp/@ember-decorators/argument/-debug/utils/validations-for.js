define("@ember-decorators/argument/-debug/utils/validations-for", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getValidationsFor = getValidationsFor;
  exports.getOrCreateValidationsFor = getOrCreateValidationsFor;
  exports.getValidationsForKey = getValidationsForKey;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var validationMetaMap = new WeakMap();

  var FieldValidations = function FieldValidations() {
    var parentValidations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, FieldValidations);

    if (parentValidations === null) {
      this.isRequired = false;
      this.isImmutable = false;
      this.isArgument = false;
      this.typeRequired = false;

      this.typeValidators = [];
    } else {
      var isRequired = parentValidations.isRequired,
          isImmutable = parentValidations.isImmutable,
          isArgument = parentValidations.isArgument,
          typeRequired = parentValidations.typeRequired,
          typeValidators = parentValidations.typeValidators;


      this.isRequired = isRequired;
      this.isImmutable = isImmutable;
      this.isArgument = isArgument;
      this.typeRequired = typeRequired;

      this.typeValidators = typeValidators.slice();
    }
  };

  function getValidationsFor(target) {
    // Reached the root of the prototype chain
    if (target === null) return;

    return validationMetaMap.get(target) || getValidationsFor(Object.getPrototypeOf(target));
  }

  function getOrCreateValidationsFor(target) {
    if (!validationMetaMap.has(target)) {
      var parentMeta = getValidationsFor(Object.getPrototypeOf(target));
      validationMetaMap.set(target, Object.create(parentMeta || null));
    }

    return validationMetaMap.get(target);
  }

  function getValidationsForKey(target, key) {
    var validations = getOrCreateValidationsFor(target);

    if (!Object.hasOwnProperty.call(validations, key)) {
      var parentValidations = validations[key];
      validations[key] = new FieldValidations(parentValidations);
    }

    return validations[key];
  }
});