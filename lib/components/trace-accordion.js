"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TracePanel = function (_Component) {
  _inherits(TracePanel, _Component);

  function TracePanel() {
    _classCallCheck(this, TracePanel);

    return _possibleConstructorReturn(this, (TracePanel.__proto__ || Object.getPrototypeOf(TracePanel)).apply(this, arguments));
  }

  _createClass(TracePanel, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        traceIndex: this.props.index
      };
    }
  }, {
    key: "render",
    value: function render() {
      //let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      //{children.map(c => cloneElement(c, {index: this.props.index}))}
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "tracePanel-top tracePanel-top--active" },
          "Trace ",
          this.props.index
        ),
        _react2.default.createElement(
          "div",
          { className: "tracePanel-panel" },
          this.props.children
        )
      );
    }
  }]);

  return TracePanel;
}(_react.Component);

TracePanel.childContextTypes = {
  traceIndex: _propTypes2.default.number
};

var TraceAccordion = function (_Component2) {
  _inherits(TraceAccordion, _Component2);

  function TraceAccordion(props, context) {
    _classCallCheck(this, TraceAccordion);

    var _this2 = _possibleConstructorReturn(this, (TraceAccordion.__proto__ || Object.getPrototypeOf(TraceAccordion)).call(this, props));

    _this2.data = context.data;
    _this2.renderPanel = _this2.renderPanel.bind(_this2);
    return _this2;
  }

  _createClass(TraceAccordion, [{
    key: "renderPanel",
    value: function renderPanel(d, i) {
      return _react2.default.createElement(
        TracePanel,
        { key: i, index: i },
        this.props.children
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "tracePanel" },
        this.data.map(this.renderPanel)
      );
    }
  }]);

  return TraceAccordion;
}(_react.Component);

TraceAccordion.contextTypes = {
  data: _propTypes2.default.array
};

exports.default = TraceAccordion;
module.exports = exports["default"];
//# sourceMappingURL=trace-accordion.js.map