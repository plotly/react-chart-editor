"use strict";

var _FontSelector = require("../FontSelector");

var _FontSelector2 = _interopRequireDefault(_FontSelector);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _workspace = require("@workspace/constants/workspace");

var _ramda = require("ramda");

var _testUtils = require("_utils/testUtils");

var _enzyme = require("enzyme");

var _notification = require("@common/actions/notification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock("../../../../common/actions/notification");

describe("FontSelector", function () {
  function render() {
    var additionalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "community";

    var currentUser = (0, _testUtils.mockUser)({ feature_set_id: user });

    var defaultProps = {
      activeOption: "Open Sans",
      onChange: jest.fn(),
      dispatch: jest.fn()
    };

    var context = { currentUser: currentUser };

    var props = (0, _ramda.merge)(defaultProps, additionalProps);

    return (0, _enzyme.mount)(_react2.default.createElement(_FontSelector2.default, props), { context: context });
  }

  it("passes on the new value on change and updates state", function () {
    var wrapper = render();
    var dropdown = wrapper.ref("dropdown");

    expect(wrapper).toBeDefined();
    expect(wrapper.state().activeOption).toEqual("Open Sans");
    expect(wrapper.props().onChange).not.toBeCalled();

    dropdown.props().onChange("Droid Serif");

    expect(wrapper.props().onChange).toBeCalledWith("Droid Serif");
    expect(wrapper.state().activeOption).toEqual("Droid Serif");
  });

  it("should update local state on new props from parent", function () {
    var wrapper = render();

    expect(wrapper.state().activeOption).toEqual("Open Sans");
    wrapper.setProps({
      activeOption: "Raleway"
    });
    expect(wrapper.state().activeOption).toEqual("Raleway");
  });

  it("When received null props from parents still updates\n        local state", function () {
    var wrapper = render();

    expect(wrapper.state().activeOption).toEqual("Open Sans");
    wrapper.setProps({
      activeOption: null
    });
    expect(wrapper.state().activeOption).toEqual(null);
  });

  it("adds new fonts if they don't already exist", function () {
    var newFont = '"Cindi Mayweather", Arial';
    var wrapper = render({ activeOption: newFont });
    var expectedOption = {
      label: "Cindi Mayweather",
      value: newFont,
      key: newFont
    };
    expect(wrapper.state().activeOption).toEqual(expectedOption.value);
    expect(wrapper.state().fontList[0]).toEqual(expectedOption);
  });

  it("adds new fonts if they don't already exist on re-render", function () {
    var newFont = '"Cindi Mayweather", Arial';
    var expectedOption = {
      label: "Cindi Mayweather",
      value: newFont,
      key: newFont
    };

    var wrapper = render();
    wrapper.setProps({ activeOption: newFont });

    expect(wrapper.state().activeOption).toEqual(expectedOption.value);
    expect(wrapper.state().fontList[0]).toEqual(expectedOption);
  });

  it("does not add MIXED_VALUES to the font list", function () {
    var value = _workspace.MIXED_VALUES;

    var wrapper = render();
    wrapper.setProps({ activeOption: value });

    wrapper.state().fontList.forEach(function (font) {
      expect(font).not.toBe(value);
    });
  });

  it("sets active option empty if MIXED_VALUES is passed", function () {
    var value = _workspace.MIXED_VALUES;

    var wrapper = render();
    wrapper.setProps({ activeOption: value });

    expect(wrapper.state().activeOption).toBe("");
  });

  it("should not open upgrade dialogue if free font is selected", function () {
    var freeFont = "Open Sans, To be Prettied";

    var wrapper = render();

    var dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(freeFont);

    expect(wrapper.props().dispatch).not.toBeCalled();
  });

  it("should open upgrade dialogue if pro font is selected", function () {
    var proFont = "Overpass";
    var wrapper = render();

    var dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(proFont);

    var callArgs = _notification.showNotification.mock.calls[0];
    var opts = callArgs[1];
    expect(opts.showOnce).toBe(true);
  });

  it("should not open upgrade dialogue if logged in as pro", function () {
    var proFont = "Overpass";
    var wrapper = render({}, "professional_2016_10");

    var dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(proFont);

    expect(wrapper.props().dispatch).not.toBeCalled();
  });
});
//# sourceMappingURL=FontSelector-test.js.map