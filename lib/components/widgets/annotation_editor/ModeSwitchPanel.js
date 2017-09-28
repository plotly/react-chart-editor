"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeSwitchPanel = _react2.default.createClass({
  displayName: "ModeSwitchPanel",

  propTypes: {
    modesToButtonLabels: _react.PropTypes.object.isRequired,
    modesToComponents: _react.PropTypes.object.isRequired,
    modeTransitions: _react.PropTypes.object.isRequired,
    defaultMode: _react.PropTypes.string
  },

  getInitialState: function getInitialState() {
    var modes = Object.keys(this.props.modeTransitions);
    var initialMode = this.props.defaultMode || modes[0];

    return {
      // Initialize state with the default (initial) mode
      mode: initialMode
    };
  },
  onClickChangeMode: function onClickChangeMode() {
    var mode = this.state.mode;

    var newMode = this.props.modeTransitions[mode];

    this.setState({ mode: newMode });
  },
  render: function render() {
    var mode = this.state.mode;
    var _props = this.props,
        modesToButtonLabels = _props.modesToButtonLabels,
        modesToComponents = _props.modesToComponents;


    var ComponentByMode = modesToComponents[mode];
    var buttonLabel = modesToButtonLabels[mode];

    return _react2.default.createElement(
      "div",
      { className: "mode-switch-panel" },
      _react2.default.createElement(
        "div",
        { className: "mode-switch-panel__content" },
        ComponentByMode
      ),
      _react2.default.createElement(
        "div",
        { className: "mode-switch-panel__toggle" },
        _react2.default.createElement(
          "button",
          {
            className: "btnbase btn--secondary",
            onClick: this.onClickChangeMode
          },
          buttonLabel
        )
      )
    );
  }
});

exports.default = ModeSwitchPanel;
module.exports = exports["default"];
//# sourceMappingURL=ModeSwitchPanel.js.map