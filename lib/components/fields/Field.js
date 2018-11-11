'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldDelete = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuPanel = require('../containers/MenuPanel');

var _MenuPanel2 = _interopRequireDefault(_MenuPanel);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _plotlyIcons = require('plotly-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldDelete = exports.FieldDelete = function (_Component) {
  _inherits(FieldDelete, _Component);

  function FieldDelete() {
    _classCallCheck(this, FieldDelete);

    return _possibleConstructorReturn(this, (FieldDelete.__proto__ || Object.getPrototypeOf(FieldDelete)).apply(this, arguments));
  }

  _createClass(FieldDelete, [{
    key: 'render',
    value: function render() {
      var onClick = this.props.onClick;

      return _react2.default.createElement(
        'div',
        { className: 'field__delete', onClick: onClick },
        _react2.default.createElement(_plotlyIcons.CloseIcon, null)
      );
    }
  }]);

  return FieldDelete;
}(_react.Component);

var Field = function (_Component2) {
  _inherits(Field, _Component2);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
  }

  _createClass(Field, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          center = _props.center,
          children = _props.children,
          label = _props.label,
          multiValued = _props.multiValued,
          suppressMultiValuedMessage = _props.suppressMultiValuedMessage,
          units = _props.units,
          extraComponent = _props.extraComponent,
          fieldContainerClassName = _props.fieldContainerClassName;
      var _ = this.context.localize;


      var fieldClass = void 0;
      if (!label) {
        fieldClass = (0, _classnames3.default)('field__no-title', {
          'field__no-title--center': center
        });
      } else {
        fieldClass = (0, _classnames3.default)('field__widget', {
          'field__widget--units': Boolean(units)
        });
      }

      var tooltip = this.context.attr;
      if (this.context.description) {
        tooltip += ' – ' + this.context.description.replace(/`/g, '"').replace(/\*/g, '"');
      }

      var containerClassName = (0, _classnames3.default)((0, _lib.bem)('field'), _defineProperty({}, fieldContainerClassName, Boolean(fieldContainerClassName)));

      return _react2.default.createElement(
        'div',
        { className: containerClassName },
        label ? _react2.default.createElement(
          'div',
          { className: (0, _lib.bem)('field', 'title') },
          this.context.showFieldTooltips ? _react2.default.createElement(
            'div',
            {
              className: (0, _lib.bem)('field', 'title-text'),
              'aria-label': tooltip,
              'data-microtip-position': 'bottom-right',
              'data-microtip-size': 'large',
              role: 'tooltip'
            },
            label
          ) : _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('field', 'title-text') },
            label
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: fieldClass },
          children,
          extraComponent ? extraComponent : null,
          multiValued && !suppressMultiValuedMessage ? _react2.default.createElement(
            _MenuPanel2.default,
            { label: (0, _constants.getMultiValueText)('title', _), ownline: true, question: true },
            _react2.default.createElement(
              'div',
              { className: 'info__title' },
              (0, _constants.getMultiValueText)('title', _)
            ),
            _react2.default.createElement(
              'div',
              { className: 'info__text' },
              (0, _constants.getMultiValueText)('text', _)
            ),
            _react2.default.createElement(
              'div',
              { className: 'info__sub-text' },
              (0, _constants.getMultiValueText)('subText', _)
            )
          ) : null
        ),
        units ? _react2.default.createElement(
          'div',
          { className: (0, _lib.bem)('field', 'units') },
          _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('field', 'units-text') },
            units
          )
        ) : null
      );
    }
  }]);

  return Field;
}(_react.Component);

Field.propTypes = {
  center: _propTypes2.default.bool,
  label: _propTypes2.default.any,
  units: _propTypes2.default.string,
  multiValued: _propTypes2.default.bool,
  suppressMultiValuedMessage: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  extraComponent: _propTypes2.default.any,
  fieldContainerClassName: _propTypes2.default.string
};

Field.contextTypes = {
  localize: _propTypes2.default.func,
  description: _propTypes2.default.string,
  attr: _propTypes2.default.string,
  showFieldTooltips: _propTypes2.default.bool
};

Field.defaultProps = {
  center: false,
  multiValued: false
};

FieldDelete.propTypes = {
  onClick: _propTypes2.default.func
};
exports.default = Field;
//# sourceMappingURL=Field.js.map