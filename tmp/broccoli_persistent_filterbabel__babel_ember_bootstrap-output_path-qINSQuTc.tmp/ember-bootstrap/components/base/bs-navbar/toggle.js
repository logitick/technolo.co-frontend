define('ember-bootstrap/components/base/bs-navbar/toggle', ['exports', 'ember-bootstrap/templates/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _toggle.default,
    tagName: 'button',

    classNameBindings: ['collapsed'],
    collapsed: true,

    /**
     * Bootstrap 4 Only: Defines the alignment of the toggler. Valid values are 'left' and 'right'
     * to set the `navbar-toggler-*` class.
     *
     * @property align
     * @type String
     * @default null
     * @public
     */

    /**
     * @event onClick
     * @public
     */
    onClick: function onClick() {},
    click: function click() {
      this.onClick();
    }
  });
});