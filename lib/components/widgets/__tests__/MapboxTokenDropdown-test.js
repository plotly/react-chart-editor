"use strict";

var _DropdownWithTextInput = require("../DropdownWithTextInput");

var _DropdownWithTextInput2 = _interopRequireDefault(_DropdownWithTextInput);

var _environment = require("@common/utils/environment");

var _environment2 = _interopRequireDefault(_environment);

var _MapboxTokenDropdown = require("../MapboxTokenDropdown");

var _MapboxTokenDropdown2 = _interopRequireDefault(_MapboxTokenDropdown);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ramda = require("ramda");

var _testUtils = require("_utils/testUtils");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultToken = {
  value: _environment2.default.get("MAPBOX_DEFAULT_ACCESS_TOKEN"),
  label: "Plotly token"
};

var customToken = {
  value: "custom",
  label: _MapboxTokenDropdown.customTokenLabel
};

describe("<MapboxTokenDropdown />", function () {
  function render(props) {
    var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var mergeDefault = (0, _ramda.merge)({
      onChange: jest.fn(),
      selectedToken: ""
    });
    var currentUser = (0, _testUtils.mockUser)({
      feature_set_id: "community",
      mapbox_access_tokens: tokens
    });

    var finalProps = mergeDefault(props);
    var context = { currentUser: currentUser };

    return (0, _enzyme.shallow)(_react2.default.createElement(_MapboxTokenDropdown2.default, finalProps), { context: context });
  }

  it("passes plotly token as default to dropdown", function () {
    var wrapper = render();
    var dropdown = wrapper.find(_DropdownWithTextInput2.default);

    expect(dropdown.prop("options")).toEqual([defaultToken, customToken]);
  });

  it("correctly extracts mapbox tokens from currentUser", function () {
    var tokens = ["pk.dank.memes", "pk.ay.lmao"];

    var wrapper = render({}, tokens);
    var dropdown = wrapper.find(_DropdownWithTextInput2.default);
    expect(dropdown.prop("options")).toEqual([defaultToken, {
      value: tokens[0],
      label: tokens[0]
    }, {
      value: tokens[1],
      label: tokens[1]
    }, customToken]);
  });

  it("filters out private tokens", function () {
    var tokens = ["sk.dank.memes", "sk.ay.lmao"];

    var wrapper = render({}, tokens);
    var dropdown = wrapper.find(_DropdownWithTextInput2.default);
    expect(dropdown.prop("options")).toEqual([defaultToken, customToken]);
  });

  it("only shows plotly icon if user is not logged in", function () {
    var context = { currentUser: {} };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_MapboxTokenDropdown2.default, { onChange: jest.fn() }), {
      context: context
    });
    var dropdown = wrapper.find(_DropdownWithTextInput2.default);

    expect(dropdown.prop("options")[0]).toEqual(defaultToken);
  });
});
//# sourceMappingURL=MapboxTokenDropdown-test.js.map