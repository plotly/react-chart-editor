'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = localize;
exports.localizeString = localizeString;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Comp, _extends({ localize: this.localize }, this.props));
      }
    }]);

    return LocalizedComponent;
  }(_react.Component);

  LocalizedComponent.displayName = 'Localized' + (0, _.getDisplayName)(Comp);
  LocalizedComponent.contextTypes = LocalizedComponent.contextTypes || {};
  LocalizedComponent.contextTypes.dictionaries = _propTypes2.default.object;
  LocalizedComponent.contextTypes.locale = _propTypes2.default.string;

  LocalizedComponent.plotly_editor_traits = Comp.plotly_editor_traits;

  return LocalizedComponent;
}

function localizeString(dictionaries, locale, key) {
  var dict = dictionaries[locale];
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  }
  return key;
}
//# sourceMappingURL=localize.js.map