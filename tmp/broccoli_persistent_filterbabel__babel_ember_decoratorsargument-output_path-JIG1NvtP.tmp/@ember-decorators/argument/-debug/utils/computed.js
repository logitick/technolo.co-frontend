define('@ember-decorators/argument/-debug/utils/computed', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isMandatorySetter = isMandatorySetter;
  exports.isDescriptor = isDescriptor;
  exports.isDescriptorTrap = isDescriptorTrap;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function isMandatorySetter(setter) {
    return setter && setter.toString().match('You must use .*set()') !== null;
  }

  function isDescriptor(maybeDesc) {
    return maybeDesc !== null && (typeof maybeDesc === 'undefined' ? 'undefined' : _typeof(maybeDesc)) === 'object' && maybeDesc.isDescriptor;
  }

  function isDescriptorTrap(maybeDesc) {
    return maybeDesc !== null && (typeof maybeDesc === 'undefined' ? 'undefined' : _typeof(maybeDesc)) === 'object' && !!maybeDesc.__DESCRIPTOR__;
  }
});