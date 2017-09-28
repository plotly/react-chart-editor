"use strict";

var _DownloadDropdown = require("../DownloadDropdown");

var _DownloadDropdown2 = _interopRequireDefault(_DownloadDropdown);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _testUtils = require("_utils/testUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<DownloadDropdown>", function () {
  it("renders community feature set when user null", function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_DownloadDropdown2.default, { currentUser: null, graphURLBase: "hodor.com" }));

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PNG";
    }).hasClass("dropdown-menu-item")).toBe(true);

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PDF";
    }).hasClass("dropdown-menu-item-restricted")).toBe(true);
  });

  it("renders community feature set by default", function () {
    var loggedInUser = (0, _testUtils.mockUser)({ feature_set_id: "" });
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_DownloadDropdown2.default, { currentUser: loggedInUser, graphURLBase: "hodor.com" }));

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PNG";
    }).hasClass("dropdown-menu-item")).toBe(true);

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PDF";
    }).hasClass("dropdown-menu-item-restricted")).toBe(true);
  });

  it("renders professional_2016_10 feature set", function () {
    var loggedInUser = (0, _testUtils.mockUser)({ feature_set_id: "professional_2016_10" });
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_DownloadDropdown2.default, { currentUser: loggedInUser, graphURLBase: "hodor.com" }));

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PNG";
    }).hasClass("dropdown-menu-item")).toBe(true);

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PDF";
    }).hasClass("dropdown-menu-item")).toBe(true);
  });

  it("renders on-prem feature set", function () {
    var loggedInUser = (0, _testUtils.mockUser)({ feature_set_id: "on_premise" });
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_DownloadDropdown2.default, { currentUser: loggedInUser, graphURLBase: "hodor.com" }));

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PNG";
    }).hasClass("dropdown-menu-item")).toBe(true);

    expect(wrapper.find("a").filterWhere(function (node) {
      return node.text() === "PDF";
    }).hasClass("dropdown-menu-item")).toBe(true);
  });
});
//# sourceMappingURL=DownloadDropdown-test.js.map