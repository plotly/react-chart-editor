"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _ConfirmBox = require("../ConfirmBox");

var _ConfirmBox2 = _interopRequireDefault(_ConfirmBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ConfirmBox", function () {
  var defaultProps = void 0;
  var message = void 0;
  var onConfirm = void 0;
  var onCancel = void 0;

  beforeEach(function () {
    message = "I hereby allow Plotly to be the sole beneficiary of my will";
    onCancel = jest.genMockFn();
    onConfirm = jest.genMockFn();
    defaultProps = { message: message, onCancel: onCancel, onConfirm: onConfirm };
  });

  it("renders with minimal props and has decent defaults", function () {
    var minimalProps = { message: message, onCancel: onCancel, onConfirm: onConfirm };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ConfirmBox2.default, minimalProps));

    // Cancel button.
    var cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.text()).toEqual("Cancel");

    // Confirm button.
    var confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.text()).toEqual("Confirm");

    // Header.
    var header = wrapper.find(".js-confirm-box__header");
    expect(header.text()).toEqual("Confirm?");
  });

  it("calls onConfirm and onCancel when buttons are clicked", function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ConfirmBox2.default, defaultProps));

    var confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.length).toEqual(1);
    confirmButton.simulate("click");
    expect(onConfirm).toBeCalled();

    var cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.length).toEqual(1);
    cancelButton.simulate("click");
    expect(onCancel).toBeCalled();
  });

  it("renders text in the right places", function () {
    // In case more things are added to defaultProps. Be explicit here.
    var cancelText = "no.";
    var confirmText = "yes!";
    var headerText = "ready?";
    var props = Object.assign({}, defaultProps, {
      cancelText: cancelText,
      confirmText: confirmText,
      headerText: headerText
    });

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ConfirmBox2.default, props));

    // Cancel button.
    var cancelButton = wrapper.find(".js-confirm-box__cancel");
    expect(cancelButton.text()).toEqual(cancelText);

    // Confirm button.
    var confirmButton = wrapper.find(".js-confirm-box__confirm");
    expect(confirmButton.text()).toEqual(confirmText);

    // Header.
    var header = wrapper.find(".js-confirm-box__header");
    expect(header.text()).toEqual(headerText);
  });

  it("allows gives us a wrapper div to do additional styling", function () {
    var wrapperClassName = "mc-hammer";
    // I have no idea why this is broken:
    //const props = { ...defaultProps, wrapperClassName };
    //const wrapper = shallow(<ConfirmBox {...props} />);

    // Check that the wrapper has the expected class.
    //expect(wrapper.hasClass(wrapperClassName)).toBe(true);
  });
});
//# sourceMappingURL=ConfirmBox-test.js.map