"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customTokenLabel = undefined;

var _DropdownWithTextInput = require("./DropdownWithTextInput");

var _DropdownWithTextInput2 = _interopRequireDefault(_DropdownWithTextInput);

var _environment = require("@common/utils/environment");

var _environment2 = _interopRequireDefault(_environment);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ramda = require("ramda");

var _customPropTypes = require("@workspace/utils/customPropTypes");

var _i18n = require("@common/utils/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get mapbox token from currentUser. Return empty array if user not logged in
function getMapboxTokens(context) {
  var currentUser = context.currentUser;

  var tokens = currentUser.mapbox_access_tokens || [];
  if (tokens) {
    return tokens;
  }

  return [];
}

// Only public tokens work with Plotly.js mapbox chart
var filterSecretTokens = (0, _ramda.filter)(function (token) {
  var getHead = (0, _ramda.compose)(_ramda.head, (0, _ramda.split)("."));
  return getHead(token) === "pk";
});

var mapToOption = (0, _ramda.map)(function (option) {
  return {
    value: option,
    label: option
  };
});

var prependDefault = (0, _ramda.prepend)({
  value: _environment2.default.get("MAPBOX_DEFAULT_ACCESS_TOKEN"),
  label: "Plotly token"
});

var customTokenLabel = exports.customTokenLabel = "custom access token";
var appendCustom = (0, _ramda.append)({
  value: "custom",
  label: customTokenLabel
});

var getTokenOptions = (0, _ramda.compose)(appendCustom, prependDefault, mapToOption, filterSecretTokens, getMapboxTokens);

function MapboxTokenDropdown(props, context) {
  var onChange = props.onChange,
      _props$selectedToken = props.selectedToken,
      selectedToken = _props$selectedToken === undefined ? _environment2.default.get("MAPBOX_DEFAULT_ACCESS_TOKEN") : _props$selectedToken;


  var tokenOptions = getTokenOptions(context);

  // display inline-block is needed because:
  // http://stackoverflow.com/questions/2614091/simple-div-containing-span-wont-size-correctly

  return _react2.default.createElement(
    "div",
    { className: "menu-item" },
    _react2.default.createElement(
      "div",
      { className: "menu-item__title" },
      (0, _i18n._)("Mapbox Token")
    ),
    _react2.default.createElement(
      "div",
      { className: "menu-item__widget" },
      _react2.default.createElement(
        "span",
        { className: "widget-dropdown" },
        _react2.default.createElement(_DropdownWithTextInput2.default, {
          value: selectedToken,
          options: tokenOptions,
          onUpdate: onChange,
          clearable: false,
          minWidth: "125px"
        })
      )
    )
  );
}

MapboxTokenDropdown.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  selectedToken: _propTypes2.default.string
};

MapboxTokenDropdown.contextTypes = {
  currentUser: _customPropTypes.currentUserOrNull.isDefined
};

exports.default = MapboxTokenDropdown;
//# sourceMappingURL=MapboxTokenDropdown.js.map