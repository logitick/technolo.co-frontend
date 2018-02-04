define('@ember-decorators/argument/types', ['exports', '@ember-decorators/argument/-debug'], function (exports, _debug) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Node = exports.Element = exports.ClosureAction = exports.Action = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * Action type, covers both string actions and closure actions
   */
  var Action = exports.Action = (0, _debug.unionOf)('string', Function);

  /**
   * Action type, covers both string actions and closure actions
   */
  var ClosureAction = exports.ClosureAction = Function;

  /**
   * Element type polyfill for fastboot
   */
  var Element = exports.Element = window ? window.Element : function Element() {
    _classCallCheck(this, Element);
  };

  /**
   * Node type polyfill for fastboot
   */
  var Node = exports.Node = window ? window.Node : function Node() {
    _classCallCheck(this, Node);
  };
});