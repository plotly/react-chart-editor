'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _TraceRequiredPanel = require('./TraceRequiredPanel');

var _TraceRequiredPanel2 = _interopRequireDefault(_TraceRequiredPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderFold = (0, _lib.connectSliderToLayout)(_PlotlyFold2.default);

var SliderAccordion = function (_Component) {
  _inherits(SliderAccordion, _Component);

  function SliderAccordion() {
    _classCallCheck(this, SliderAccordion);

    return _possibleConstructorReturn(this, (SliderAccordion.__proto__ || Object.getPrototypeOf(SliderAccordion)).apply(this, arguments));
  }

  _createClass(SliderAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$layout$slide = _context.layout.sliders,
          sliders = _context$layout$slide === undefined ? [] : _context$layout$slide,
          _ = _context.localize;
      var children = this.props.children;


      var content = sliders.length > 0 && sliders.map(function (sli, i) {
        return _react2.default.createElement(
          SliderFold,
          { key: i, sliderIndex: i, name: _('Slider') + (' ' + (i + 1)) },
          children
        );
      });

      return _react2.default.createElement(
        _TraceRequiredPanel2.default,
        null,
        content ? content : null
      );
    }
  }]);

  return SliderAccordion;
}(_react.Component);

SliderAccordion.contextType = _context2.EditorControlsContext;

SliderAccordion.propTypes = {
  children: _propTypes2.default.node
};

exports.default = SliderAccordion;
//# sourceMappingURL=SliderAccordion.js.map