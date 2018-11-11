'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _PlotlyPanel = require('./PlotlyPanel');

var _PlotlyPanel2 = _interopRequireDefault(_PlotlyPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeSelectorFold = (0, _lib.connectRangeSelectorToAxis)(_PlotlyFold2.default);

var RangeSelectorAccordion = function (_Component) {
  _inherits(RangeSelectorAccordion, _Component);

  function RangeSelectorAccordion() {
    _classCallCheck(this, RangeSelectorAccordion);

    return _possibleConstructorReturn(this, (RangeSelectorAccordion.__proto__ || Object.getPrototypeOf(RangeSelectorAccordion)).apply(this, arguments));
  }

  _createClass(RangeSelectorAccordion, [{
    key: 'render',
    value: function render() {
      if (!this.context.fullContainer || !this.context.fullContainer.rangeselector || !this.context.fullContainer.rangeselector.visible ||
      // next line checks for "all" case
      this.context.fullContainer._axisGroup === 0) {
        return null;
      }

      var _context = this.context,
          _context$fullContaine = _context.fullContainer.rangeselector.buttons,
          buttons = _context$fullContaine === undefined ? [] : _context$fullContaine,
          _ = _context.localize;
      var children = this.props.children;


      var content = buttons.length && buttons.map(function (btn, i) {
        return _react2.default.createElement(
          RangeSelectorFold,
          { key: i, rangeselectorIndex: i, name: btn.label, canDelete: true },
          children
        );
      });

      var addAction = {
        label: _('Button'),
        handler: function handler(context) {
          var fullContainer = context.fullContainer,
              updateContainer = context.updateContainer;

          if (updateContainer) {
            var rangeselectorIndex = Array.isArray(fullContainer.rangeselector.buttons) ? fullContainer.rangeselector.buttons.length : 0;

            updateContainer(_defineProperty({}, 'rangeselector.buttons[' + rangeselectorIndex + ']', {}));
          }
        }
      };

      return _react2.default.createElement(
        _PlotlyPanel2.default,
        { addAction: addAction },
        content ? content : null
      );
    }
  }]);

  return RangeSelectorAccordion;
}(_react.Component);

RangeSelectorAccordion.contextType = _context2.EditorControlsContext;

RangeSelectorAccordion.propTypes = {
  children: _propTypes2.default.node
};

RangeSelectorAccordion.plotly_editor_traits = {
  no_visibility_forcing: true
};

exports.default = RangeSelectorAccordion;
//# sourceMappingURL=RangeSelectorAccordion.js.map