"use strict";

var _enzyme = require("enzyme");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ToolMenuItemSubmenu = require("../ToolMenuItemSubmenu");

var _ToolMenuItemSubmenu2 = _interopRequireDefault(_ToolMenuItemSubmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ToolMenuItemSubmenu", function () {
  it("opens and closes according to state", function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _ToolMenuItemSubmenu2.default,
      {
        iconClass: "icon-plotlylogo",
        title: "First Submenu",
        mainText: "This is the main text."
      },
      _react2.default.createElement("div", null)
    ));

    // Make sure the component is rendered as expected
    expect(wrapper.state("isOpen")).toBe(false);

    // Check if a click changes the state back and forth
    wrapper.find(_ToolMenuItemSubmenu2.default).find("span").at(1).simulate("click");

    expect(wrapper.state("isOpen")).toEqual(true);

    wrapper.find(_ToolMenuItemSubmenu2.default).find("div").at(1).simulate("click");

    expect(wrapper.state("isOpen")).toEqual(false);
  });
});
//# sourceMappingURL=ToolMenuItemSubmenu-test.js.map