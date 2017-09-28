"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingBars = _react2.default.createClass({
  displayName: "LoadingBars",

  propTypes: {
    className: _react2.default.PropTypes.string,
    loadingText: _react2.default.PropTypes.string
  },

  renderLoadingText: function renderLoadingText() {
    if (!this.props.loadingText) return null;

    return _react2.default.createElement(
      "h2",
      { className: "plotlybars-text", ref: "loadingText" },
      this.props.loadingText
    );
  },
  render: function render() {
    var bars = [];

    for (var i = 1; i < 8; i++) {
      var className = "plotlybars-bar b" + i;
      bars.push(_react2.default.createElement("div", { key: i, className: className }));
    }

    var wrapperClass = "plotlybars-wrapper";
    if (this.props.className) wrapperClass += " " + this.props.className;

    return _react2.default.createElement(
      "div",
      { id: "plotlybars", className: wrapperClass },
      _react2.default.createElement(
        "div",
        { className: "plotlybars" },
        bars
      ),
      this.renderLoadingText()
    );
  }
});

module.exports = LoadingBars;
//# sourceMappingURL=LoadingBars.js.map