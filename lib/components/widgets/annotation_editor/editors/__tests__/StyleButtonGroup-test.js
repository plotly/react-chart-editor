"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _immutable = require("immutable");

var _StyleButton = require("../StyleButton");

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _StyleButtonGroup = require("../StyleButtonGroup");

var _StyleButtonGroup2 = _interopRequireDefault(_StyleButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = [{
  label: _react2.default.createElement(
    "span",
    null,
    "B"
  ),
  value: "BOLD"
}, {
  label: _react2.default.createElement(
    "span",
    null,
    "I"
  ),
  value: "ITALIC"
}];

describe("StyleButtonGroup", function () {
  it("Renders configured style buttons", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_StyleButtonGroup2.default, { styles: styles, onToggle: function onToggle() {} }));

    expect(component.children().length).toBe(styles.length);

    var boldButton = component.find(_StyleButton2.default).at(0);
    var italicButton = component.find(_StyleButton2.default).at(1);

    expect(boldButton.props().value).toBe(styles[0].value);
    expect(italicButton.props().value).toBe(styles[1].value);
  });

  it("Sets active state for correct button", function () {
    var currentStyle = (0, _immutable.OrderedSet)([styles[1].value]);

    var component = (0, _enzyme.shallow)(_react2.default.createElement(_StyleButtonGroup2.default, {
      currentStyle: currentStyle,
      styles: styles,
      onToggle: function onToggle() {}
    }));

    var boldButton = component.find(_StyleButton2.default).at(0);
    var italicButton = component.find(_StyleButton2.default).at(1);

    expect(boldButton.props().active).toBe(false);
    expect(italicButton.props().active).toBe(true);
  });
});
//# sourceMappingURL=StyleButtonGroup-test.js.map