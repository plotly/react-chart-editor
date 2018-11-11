'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bem;

var _constants = require('./constants');

function bem(block, element, modifiers) {
  var i = void 0,
      modifier = void 0;
  var out = [];

  if (!block) {
    return _constants.baseClass;
  }
  if (Array.isArray(block)) {
    throw new Error('bem error: Argument `block` cannot be an array');
  } else if (Array.isArray(element)) {
    modifiers = element;
    element = null;
  }

  var className = block;

  if (element && element.length) {
    className += '__' + element;
  }

  out.push(className);
  if (modifiers) {
    for (i = 0; i < modifiers.length; i++) {
      modifier = modifiers[i];
      if (modifier && modifier.length) {
        out.push(className + '--' + modifier);
      }
    }
  }

  return out.join(' ');
} //
// BEM helper
//
// bem()                       => 'plotly-editor'
// bem('foo')                  => 'foo'
// bem('foo', 'bar')           => 'foo__bar'
// bem('foo', ['mod'])         => 'foo foo--mod'
// bem('foo', 'bar', ['mod'])  => 'foo__bar foo__bar--mod'
// bem('foo', ['mod1', mod2']) => 'foo foo--mod1 foo--mod2'

/* eslint-disable no-param-reassign */
//# sourceMappingURL=bem.js.map