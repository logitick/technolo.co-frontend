define('ember-bootstrap/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/base/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _menu.default.extend({
    tagName: 'ul',

    classNames: ['dropdown-menu'],
    classNameBindings: ['alignClass']
  });
});