'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterValue = exports.FilterOperation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('../widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _TextInput = require('../widgets/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var operations = function operations(_) {
  return {
    inequality: [{ value: '!=', label: _('Target ≠ Reference') }, { value: '<', label: _('Target < Reference') }, { value: '<=', label: _('Target ≤ Reference') }, { value: '=', label: _('Target = Reference') }, { value: '>', label: _('Target > Reference') }, { value: '>=', label: _('Target ≥ Reference') }],
    inrange: [{ value: '[]', label: _('Lower ≤ Target ≤ Upper') }, { value: '()', label: _('Lower < Target < Upper') }, { value: '[)', label: _('Lower ≤ Target < Upper') }, { value: '(]', label: _('Lower < Target ≤ Upper') }],
    exrange: [{ value: ')(', label: _('Lower ≤ Target ≤ Upper') }, { value: '][', label: _('Lower < Target < Upper') }, { value: ')[', label: _('Lower ≤ Target < Upper') }, { value: '](', label: _('Lower < Target ≤ Upper') }],
    inset: [{ value: '{}', label: _('Include') }],
    exset: [{ value: '}{', label: _('Exclude') }]
  };
};

var findOperation = function findOperation(operator, _) {
  var op = 'inequality';
  var ops = operations(_);
  for (var key in ops) {
    if (ops.hasOwnProperty(key) && ops[key].map(function (o) {
      return o.value;
    }).indexOf(operator) !== -1) {
      op = key;
      break;
    }
  }
  return op;
};

var UnconnectedFilterOperation = function (_Component) {
  _inherits(UnconnectedFilterOperation, _Component);

  function UnconnectedFilterOperation(props, context) {
    _classCallCheck(this, UnconnectedFilterOperation);

    var _this = _possibleConstructorReturn(this, (UnconnectedFilterOperation.__proto__ || Object.getPrototypeOf(UnconnectedFilterOperation)).call(this, props, context));

    var _ = context.localize;


    _this.state = {
      operation: findOperation(_this.props.fullValue, _),
      operator: operations(_).inequality[0].value
    };

    _this.setOperation = _this.setOperation.bind(_this);
    return _this;
  }

  _createClass(UnconnectedFilterOperation, [{
    key: 'setOperation',
    value: function setOperation(value) {
      var _ = this.context.localize;

      var operator = operations(_)[value][0].value;
      this.setState({ operation: value, operator: operator });
      this.props.updatePlot(operator);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          fullValue = _props.fullValue,
          updatePlot = _props.updatePlot,
          optionRenderer = _props.optionRenderer,
          valueRenderer = _props.valueRenderer,
          backgroundDark = _props.backgroundDark,
          attr = _props.attr;
      var _ = this.context.localize;


      var operators = [{
        label: _('Inequality'),
        value: 'inequality'
      }, {
        label: _('Include Range'),
        value: 'inrange'
      }, {
        label: _('Exclude Range'),
        value: 'exrange'
      }, {
        label: _('Include Values'),
        value: 'inset'
      }, {
        label: _('Exclude Values'),
        value: 'exset'
      }];

      var opValue = fullValue && fullValue.length > 0 ? fullValue : this.state.operator;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { attr: attr }),
          _react2.default.createElement(_Dropdown2.default, {
            backgroundDark: backgroundDark,
            options: operators,
            value: findOperation(opValue, _),
            onChange: this.setOperation,
            clearable: false,
            optionRenderer: optionRenderer,
            valueRenderer: valueRenderer
          }),
          this.state.operation === 'inset' || this.state.operation === 'exset' ? null : _react2.default.createElement(_Dropdown2.default, {
            backgroundDark: backgroundDark,
            options: operations(_)[this.state.operation],
            value: opValue,
            onChange: updatePlot,
            clearable: false,
            optionRenderer: optionRenderer,
            valueRenderer: valueRenderer
          })
        )
      );
    }
  }]);

  return UnconnectedFilterOperation;
}(_react.Component);

UnconnectedFilterOperation.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func
}, _Field2.default.propTypes);
UnconnectedFilterOperation.contextTypes = {
  localize: _propTypes2.default.func
};

var UnconnectedFilterValue = function (_Component2) {
  _inherits(UnconnectedFilterValue, _Component2);

  function UnconnectedFilterValue(props, context) {
    _classCallCheck(this, UnconnectedFilterValue);

    var _this2 = _possibleConstructorReturn(this, (UnconnectedFilterValue.__proto__ || Object.getPrototypeOf(UnconnectedFilterValue)).call(this, props, context));

    _this2.state = { value: '', valueMax: '' };

    _this2.setValue = _this2.setValue.bind(_this2);
    _this2.setValueMax = _this2.setValueMax.bind(_this2);
    return _this2;
  }

  _createClass(UnconnectedFilterValue, [{
    key: 'setValue',
    value: function setValue(v) {
      var _context = this.context,
          _ = _context.localize,
          container = _context.container;

      var op = findOperation(container.operation, _);
      this.setState({ value: v });
      var val = void 0;
      val = op === 'inrange' || op === 'exrange' ? [v, this.state.valueMax] : v;
      if (op === 'inset' || op === 'exset') {
        val = val.split(',');
        val = val.map(function (v) {
          return v.trim();
        });
      }
      this.props.updatePlot(val);
    }
  }, {
    key: 'setValueMax',
    value: function setValueMax(v) {
      this.setState({ valueMax: v });
      this.props.updatePlot([this.state.value, v]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context2 = this.context,
          _ = _context2.localize,
          container = _context2.container;


      var operation = container && container.operation ? container.operation : '=';

      var _props2 = this.props,
          fullValue = _props2.fullValue,
          attr = _props2.attr,
          defaultValue = _props2.defaultValue;

      var op = findOperation(operation, _);

      var label1 = _('Reference');
      if (op === 'inrange' || op === 'exrange') {
        label1 = _('Lower Bound');
      } else if (op === 'inset' || op === 'exset') {
        label1 = _('Values');
      }

      var val1 = fullValue;
      if ((op === 'inset' || op === 'exset') && Array.isArray(fullValue)) {
        val1 = fullValue.join(', ');
      } else if (Array.isArray(fullValue)) {
        val1 = fullValue[0];
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { label: label1 }),
          _react2.default.createElement(_TextInput2.default, { value: val1, defaultValue: val1, onUpdate: this.setValue })
        ),
        !(op === 'inrange' || op === 'exrange') ? null : _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { label: _('Upper Bound'), attr: attr }),
          _react2.default.createElement(_TextInput2.default, {
            value: Array.isArray(fullValue) ? fullValue[1] : fullValue,
            defaultValue: defaultValue,
            onUpdate: this.setValueMax
          })
        )
      );
    }
  }]);

  return UnconnectedFilterValue;
}(_react.Component);

UnconnectedFilterValue.propTypes = _extends({
  defaultValue: _propTypes2.default.string,
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func
}, _Field2.default.propTypes);
UnconnectedFilterValue.contextTypes = {
  localize: _propTypes2.default.func,
  container: _propTypes2.default.object
};

var FilterOperation = exports.FilterOperation = (0, _lib.connectToContainer)(UnconnectedFilterOperation);
var FilterValue = exports.FilterValue = (0, _lib.connectToContainer)(UnconnectedFilterValue);
//# sourceMappingURL=FilterOperation.js.map