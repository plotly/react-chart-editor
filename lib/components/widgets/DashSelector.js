"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require("./Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _customPropTypes = require("@workspace/utils/customPropTypes");

var customPropTypes = _interopRequireWildcard(_customPropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashSelector = _react2.default.createClass({
  displayName: "DashSelector",

  propTypes: {
    activeOption: customPropTypes.customOneOfType([PropTypes.oneOf(["solid", "dot", "dash", "longdash", "dashdot", "longdashdot"]), customPropTypes.isNull]).isDefined,
    onChange: PropTypes.func.isRequired,
    lineColor: PropTypes.string
  },

  // Set the initial state
  getInitialState: function getInitialState() {
    return {
      activeOption: this.props.activeOption,
      lineColor: this.props.lineColor
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption || nextProps.lineColor !== this.state.lineColor) {
      this.setState({
        activeOption: nextProps.activeOption,
        lineColor: nextProps.lineColor
      });
    }
  },
  onSelect: function onSelect(chosenDash) {
    this.props.onChange(chosenDash);
  },
  renderOption: function renderOption(option) {
    return _react2.default.createElement(
      "li",
      { className: "+ls-none" },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "span",
          { className: "+push-quarter-left" },
          _react2.default.createElement(
            "svg",
            { width: "100", height: "4" },
            _react2.default.createElement(
              "g",
              null,
              option.label
            )
          )
        )
      )
    );
  },
  renderValue: function renderValue(option) {
    return _react2.default.createElement(
      "span",
      null,
      _react2.default.createElement(
        "svg",
        { width: "100", height: "4" },
        _react2.default.createElement(
          "g",
          null,
          option.label
        )
      )
    );
  },
  renderDashList: function renderDashList(lineColor) {
    return [{
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeWidth: "4px"
        }
      }),
      value: "solid"
    }, {
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeDasharray: "3px, 3px",
          strokeWidth: "4px"
        }
      }),
      value: "dot"
    }, {
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeDasharray: "9px, 9px",
          strokeWidth: "4px"
        }
      }),
      value: "dash"
    }, {
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeDasharray: "15px, 15px",
          strokeWidth: "4px"
        }
      }),
      value: "longdash"
    }, {
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeDasharray: "9px, 3px, 3px, 3px",
          strokeWidth: "4px"
        }
      }),
      value: "dashdot"
    }, {
      label: _react2.default.createElement("path", {
        d: "M5,0h100",
        style: {
          fill: "none",
          stroke: lineColor,
          strokeOpacity: 1,
          strokeDasharray: "15px, 6px, 3px, 6px",
          strokeWidth: "4px"
        }
      }),
      value: "longdashdot"
    }, {
      label: "",
      value: null
    }];
  },
  render: function render() {
    return _react2.default.createElement(
      "span",
      { className: "widget-dropdown" },
      _react2.default.createElement(_Dropdown2.default, {
        value: this.state.activeOption,
        options: this.renderDashList(this.state.lineColor),
        onChange: this.onSelect,
        clearable: false,
        optionRenderer: this.renderOption,
        valueRenderer: this.renderValue,
        valueKey: "value",
        minWidth: "100%"
      })
    );
  }
});

module.exports = DashSelector;
//# sourceMappingURL=DashSelector.js.map