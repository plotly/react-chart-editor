'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _Numeric = require('./Numeric');

var _Numeric2 = _interopRequireDefault(_Numeric);

var _DataSelector = require('./DataSelector');

var _DataSelector2 = _interopRequireDefault(_DataSelector);

var _constants = require('../../lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedMarkerSize = function (_Component) {
  _inherits(UnconnectedMarkerSize, _Component);

  function UnconnectedMarkerSize(props, context) {
    _classCallCheck(this, UnconnectedMarkerSize);

    var _this = _possibleConstructorReturn(this, (UnconnectedMarkerSize.__proto__ || Object.getPrototypeOf(UnconnectedMarkerSize)).call(this, props, context));

    var type = null;
    if (!props.container.marker || props.container.marker && !props.container.marker.sizesrc) {
      type = 'constant';
    } else if (props.container.marker && Array.isArray(props.container.marker.size) && props.fullContainer.marker && Array.isArray(props.fullContainer.marker.size)) {
      type = 'variable';
    }

    _this.state = {
      type: type,
      value: {
        constant: type === 'constant' ? props.fullValue : '6',
        variable: type === 'variable' ? props.fullValue : null
      }
    };

    _this.setType = _this.setType.bind(_this);
    _this.setValue = _this.setValue.bind(_this);
    return _this;
  }

  _createClass(UnconnectedMarkerSize, [{
    key: 'setType',
    value: function setType(type) {
      this.setState({ type: type });
      this.props.updatePlot(this.state.value[type]);
      if (type === 'constant') {
        this.context.updateContainer(_defineProperty({}, 'marker.sizesrc', null));
      } else {
        var _context$updateContai2;

        this.context.updateContainer((_context$updateContai2 = {}, _defineProperty(_context$updateContai2, 'marker.size', null), _defineProperty(_context$updateContai2, 'marker.sizesrc', null), _context$updateContai2));
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(inputValue) {
      var type = this.state.type;


      this.setState(type === 'constant' ? { value: { constant: inputValue } } : { value: { variable: inputValue } });
      this.props.updatePlot(inputValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          attr = _props.attr,
          fullValue = _props.fullValue;
      var _ = this.context.localize;
      var _state = this.state,
          type = _state.type,
          value = _state.value;

      var options = [{ label: _('Constant'), value: 'constant' }, { label: _('Variable'), value: 'variable' }];
      var multiValued = this.props.multiValued || Array.isArray(fullValue) && fullValue.includes(_constants.MULTI_VALUED);

      return _react2.default.createElement(
        _Field2.default,
        _extends({}, this.props, { multiValued: multiValued, attr: attr }),
        _react2.default.createElement(_RadioBlocks2.default, { options: options, activeOption: type, onOptionChange: this.setType }),
        type === 'constant' ? _react2.default.createElement(_Numeric2.default, {
          suppressMultiValuedMessage: true,
          attr: 'marker.size',
          updatePlot: this.setValue,
          fullValue: value.constant
        }) : multiValued ? null : _react2.default.createElement(_DataSelector2.default, { suppressMultiValuedMessage: true, attr: 'marker.size', updatePlot: this.setValue })
      );
    }
  }]);

  return UnconnectedMarkerSize;
}(_react.Component);

UnconnectedMarkerSize.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func
}, _Field2.default.propTypes);

UnconnectedMarkerSize.contextTypes = {
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func
};

exports.default = (0, _lib.connectToContainer)(UnconnectedMarkerSize);
//# sourceMappingURL=MarkerSize.js.map