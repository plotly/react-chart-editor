"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bem = bem;
exports._ = _;
exports.clamp = clamp;

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* BEM helper
*
* bem()                       => 'plotly-editor'
* bem('foo')                  => 'plotly-editor__foo'
* bem('foo', 'bar')           => 'plotly-editor__foo__bar'
* bem('foo', ['mod'])         => 'plotly-editor__foo plotly-editor__foo--mod'
* bem('foo', 'bar', ['mod'])  => 'plotly-editor__foo__bar plotly-editor__foo__bar--mod'
* bem('foo', ['mod1', mod2']) => 'plotly-editor__foo plotly-editor__foo--mod1 plotly-editor__foo--mod2'
*/
function bem(block, element, modifiers) {
  var i, modifier;
  var out = [];
  var c = _constants2.default.baseClass;

  if (Array.isArray(block)) {
    modifiers = block;
    block = null;
    element = null;
  } else if (Array.isArray(element)) {
    modifiers = element;
    element = null;
  }

  if (block && block.length) {
    c += "__" + block;
  }

  if (element && element.length) {
    c += "__" + element;
  }

  out.push(c);
  if (modifiers) {
    for (i = 0; i < modifiers.length; i++) {
      modifier = modifiers[i];
      if (modifier && modifier.length) {
        out.push(c + "--" + modifier);
      }
    }
  }

  return out.join(" ");
}

function _(dictionaries, locale, key) {
  var dict = dictionaries[locale];
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  } else {
    return key;
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
//# sourceMappingURL=common.js.map