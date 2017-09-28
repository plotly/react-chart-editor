"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = require("./widgets/Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _connectWorkspacePlot = require("@workspace/utils/connectWorkspacePlot");

var _connectWorkspacePlot2 = _interopRequireDefault(_connectWorkspacePlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * The Anchor component is a control for specifing the `anchor` axis property
 * in plotly.js: https://plot.ly/javascript/reference/#layout-xaxis-anchor
 */

var Anchor = function Anchor(_ref) {
  var options = _ref.options,
      onChange = _ref.onChange,
      value = _ref.value;
  return _react2.default.createElement(_Dropdown2.default, {
    options: options,
    value: value,
    onChange: onChange,
    minWidth: "110px"
  });
};

Anchor.propTypes = {
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.array.isRequired,
  axisLetter: _propTypes2.default.oneOf(["x", "y"])
};

function mapPlotToProps(plot, props) {
  var axisLetter = props.axisLetter;

  var options = plot.keysAtPath(["_fullLayout"]).filter(function (key) {
    return key.startsWith(axisLetter + "axis");
  }).map(function (axisName) {
    return {
      label: axisName,
      value: axisName.replace("axis", "")
    };
  });
  options.unshift({ label: "Unanchored", value: "free" });
  return { options: options };
}

module.exports = (0, _connectWorkspacePlot2.default)(mapPlotToProps)(Anchor);
//# sourceMappingURL=Anchor.js.map