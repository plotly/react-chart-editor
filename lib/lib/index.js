"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAttrs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findAttrs = require("./find-attrs");

Object.defineProperty(exports, "findAttrs", {
  enumerable: true,
  get: function get() {
    return _findAttrs.findAttrs;
  }
});
exports.bem = bem;
exports.clamp = clamp;
exports.localize = localize;
exports.localizeString = localizeString;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _constants = require("./constants");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
// BEM helper
//
// bem()                       => 'plotly-editor'
// bem('foo')                  => 'plotly-editor__foo'
// bem('foo', 'bar')           => 'plotly-editor__foo__bar'
// bem('foo', ['mod'])         => 'plotly-editor__foo plotly-editor__foo--mod'
// bem('foo', 'bar', ['mod'])  => 'plotly-editor__foo__bar plotly-editor__foo__bar--mod'
// bem('foo', ['mod1', mod2']) => 'plotly-editor__foo plotly-editor__foo--mod1 plotly-editor__foo--mod2'
//
function bem(block, element, modifiers) {
  var i, modifier;
  var out = [];
  var c = _constants.baseClass;

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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function localize(Comp) {
  var LocalizedComponent = function (_Component) {
    _inherits(LocalizedComponent, _Component);

    function LocalizedComponent(props, context) {
      _classCallCheck(this, LocalizedComponent);

      var _this = _possibleConstructorReturn(this, (LocalizedComponent.__proto__ || Object.getPrototypeOf(LocalizedComponent)).call(this, props, context));

      var dictionaries = context.dictionaries;
      var locale = context.locale;

      _this.localize = function localize(str) {
        return localizeString(dictionaries, locale, str);
      };
      return _this;
    }

    _createClass(LocalizedComponent, [{
      key: "render",
      value: function render() {
        return _react2.default.createElement(Comp, _extends({ localize: this.localize }, this.props));
      }
    }]);

    return LocalizedComponent;
  }(_react.Component);

  LocalizedComponent.contextTypes = LocalizedComponent.contextTypes || {};
  LocalizedComponent.contextTypes.dictionaries = _propTypes2.default.object;
  LocalizedComponent.contextTypes.locale = _propTypes2.default.string;

  return LocalizedComponent;
}

function localizeString(dictionaries, locale, key) {
  var dict = dictionaries[locale];
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  } else {
    return key;
  }
}
//# sourceMappingURL=index.js.map