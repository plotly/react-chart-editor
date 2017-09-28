"use strict";

var _ColorPicker = require("../ColorPicker");

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tinycolor = require("tinycolor2");

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _ramda = require("ramda");

var _testUtils = require("_utils/testUtils");

var _enzyme = require("enzyme");

var _notification = require("@common/actions/notification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock("../../../../common/actions/notification");

describe("ColorPicker", function () {
  function render() {
    var additionalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "community";

    var currentUser = (0, _testUtils.mockUser)({ feature_set_id: user });

    var defaultProps = {
      selectedColor: "#fff",
      onColorChange: jest.fn(),
      dispatch: jest.fn()
    };

    var context = { currentUser: currentUser };

    var props = (0, _ramda.merge)(defaultProps, additionalProps);

    return (0, _enzyme.mount)(_react2.default.createElement(_ColorPicker2.default, props), { context: context });
  }

  it("should overwrite local state with props when the parent\n        component passes in a new color", function () {
    /*
             * Passing in default values should populate the local state
             * and the component DOM elements correctly.
             */
    var initialSelectedColor = "rgba(100, 10, 10, 0.8)";
    var onColorChange = jest.fn();
    var wrapper = render({
      selectedColor: initialSelectedColor,
      onColorChange: onColorChange
    });

    var selectedColorText = void 0,
        swatchElement = void 0,
        swatchBackgroundColor = void 0;

    // initial user values should be rendered and assigned to local state.
    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual((0, _tinycolor2.default)(initialSelectedColor).toHexString());
    expect(swatchBackgroundColor).toEqual(initialSelectedColor);
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(initialSelectedColor);

    /*
             * Simulate a parent component sending new selected color prop.
             * Internal state should change and component should update and
             * props should match internal state.
             */
    var newColorFromProps = "rgba(28, 88, 88, 0.6)";
    wrapper.setProps({
      selectedColor: newColorFromProps
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual((0, _tinycolor2.default)(newColorFromProps).toHexString());
    expect(swatchBackgroundColor).toEqual(newColorFromProps);
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(newColorFromProps);

    // Simulate a completed user interaction with the ColorPicker.
    var mockUserSelectedColor = "rgba(88, 20, 28, 0.2)";
    wrapper.instance().onSelectedColorChange((0, _tinycolor2.default)({ r: 88, g: 20, b: 28, a: 0.2 }));

    // Local state should be set, and onColorChange fired
    expect(wrapper.state().selectedColor.toRgbString()).toEqual(mockUserSelectedColor);

    expect(onColorChange).toBeCalledWith(mockUserSelectedColor);

    /*
             * Pretend that user change was not accepted by the store.
             * Next props will change local state back to store state values.
             */
    var colorFromStore = "rgba(28, 88, 88, 0.6)";
    wrapper.setProps({
      selectedColor: colorFromStore
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    expect(selectedColorText).toEqual((0, _tinycolor2.default)(colorFromStore).toHexString());
    expect(swatchBackgroundColor).toEqual(colorFromStore);

    /*
             * Test passing in a HEX color from the store.
             * Our component only handles RGBA values internally for now, so
             * it should be equivalent, but it will spit out RGBA.
             */
    var hexColor = "#FFFFFF"; // White!
    wrapper.setProps({
      selectedColor: hexColor
    });

    selectedColorText = wrapper.ref("selectedColorText").text();
    swatchElement = wrapper.ref("swatch");
    swatchBackgroundColor = swatchElement.prop("style").backgroundColor;

    // Component will display HEX as text
    expect(selectedColorText).toEqual((0, _tinycolor2.default)(hexColor).toHexString());

    // Here we expect the RGBA version of #FFFFFF as the style prop.
    var RGBAWhite = "rgb(255, 255, 255)";
    expect(swatchBackgroundColor).toEqual(RGBAWhite);
  });

  describe("colour tiering", function () {
    it("doesnt open upgrade dialogue if free colour is selected", function () {
      var wrapper = render();
      wrapper.setState({ isVisible: true });

      var picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#ffffff" });

      expect(wrapper.props().dispatch).not.toBeCalled();
    });

    it("opens notif and renders probadge if pro colour is selected", function () {
      var wrapper = render();
      wrapper.setState({ isVisible: true });

      var picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#aaa112" });

      var callArgs = _notification.showNotification.mock.calls[0];
      var opts = callArgs[1];
      expect(opts.showOnce).toBe(true);
    });

    it("should not open upgrade dialogue if logged in as pro", function () {
      var wrapper = render({}, "professional_2016_10");
      wrapper.setState({ isVisible: true });

      var picker = wrapper.ref("react-color");
      picker.props().onChangeComplete({ hex: "#aaa112" });

      expect(wrapper.props().dispatch).not.toBeCalled();
    });
  });
});
//# sourceMappingURL=ColorPicker-test.js.map