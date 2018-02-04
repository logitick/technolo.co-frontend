define('@ember-decorators/argument/-debug/validated-component', ['exports', 'ember-get-config', '@ember-decorators/argument/-debug/utils/validations-for', '@ember-decorators/argument/-debug/utils/validation-decorator'], function (exports, _emberGetConfig, _validationsFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var validatedComponent = void 0;

  var whitelist = {
    ariaRole: true,
    class: true,
    classNames: true,
    id: true,
    isVisible: true,
    tagName: true
  };

  if (true) {
    validatedComponent = Ember.Component.extend();

    validatedComponent.reopenClass({
      create: function create(props) {
        // First create the instance to realize any dynamically added bindings or fields
        var instance = this._super.apply(this, arguments);

        var prototype = Object.getPrototypeOf(instance);
        var validations = (0, _validationsFor.getValidationsFor)(prototype) || {};
        if (Ember.getWithDefault(_emberGetConfig.default, '@ember-decorators/argument.ignoreComponentsWithoutValidations', false) && Object.keys(validations).length === 0) {
          return instance;
        }

        var attributes = instance.attributeBindings || [];
        var classNames = (instance.classNameBindings || []).map(function (binding) {
          return binding.split(':')[0];
        });

        for (var key in props.attrs) {
          var isValidArgOrAttr = key in validations && validations[key].isArgument || key in whitelist || attributes.indexOf(key) !== -1 || classNames.indexOf(key) !== -1;

          (true && !(isValidArgOrAttr) && Ember.assert('Attempted to assign \'' + key + '\' value on a ' + this + ' component, but no argument was defined for that key. Use the @argument helper on the class field to define an argument which can be passed into the component', isValidArgOrAttr));
        }

        return instance;
      }
    });
  } else {
    validatedComponent = Ember.Component;
  }

  exports.default = validatedComponent;
});