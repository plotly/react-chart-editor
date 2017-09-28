"use strict";

var _AnchorPositioning = require("../AnchorPositioning");

var _AnchorPositioning2 = _interopRequireDefault(_AnchorPositioning);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("AnchorPositioning", function () {
  function render(customProps) {
    var onOptionChange = jest.fn();
    var props = customProps || {
      onOptionChange: onOptionChange,
      activeOption: "middle center"
    };

    return (0, _enzyme.mount)(_react2.default.createElement(_AnchorPositioning2.default, props));
  }

  it("initialy checks only the default active option", function () {
    var component = render();

    var selectedOption = component.find(".radio-item__input").filterWhere(function (e) {
      return e.props().checked;
    });

    expect(selectedOption.length).toBe(1);
    expect(selectedOption.props().value).toBe("middle center");
  });

  it("fires our onOptionChange prop onChange", function () {
    var component = render();

    var topLeftOption = component.find(".radio-item__input").filterWhere(function (e) {
      return e.props().value === "top left";
    });

    topLeftOption.props().onChange({ target: { value: topLeftOption.props().value } });

    expect(component.props().onOptionChange).toBeCalledWith("top left");

    var bottomRightOption = component.find(".radio-item__input").filterWhere(function (e) {
      return e.props().value === "bottom right";
    });

    bottomRightOption.props().onChange({ target: { value: bottomRightOption.props().value } });
    expect(component.props().onOptionChange).toBeCalledWith("bottom right");
  });
});
//# sourceMappingURL=AnchorPositioning-test.js.map