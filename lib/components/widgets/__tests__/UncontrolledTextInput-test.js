"use strict";

var _DelayedTextInput = require("@workspace/components/widgets/DelayedTextInput");

var _DelayedTextInput2 = _interopRequireDefault(_DelayedTextInput);

var _UncontrolledTextInput = require("@workspace/components/widgets/UncontrolledTextInput");

var _UncontrolledTextInput2 = _interopRequireDefault(_UncontrolledTextInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("UncontrolledTextInput", function () {
  var onUpdate = jest.fn();

  it("should render a DelayedTextInput if immediate is false", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_UncontrolledTextInput2.default, { value: "", onUpdate: onUpdate, immediate: false }));
    expect(component.find(_DelayedTextInput2.default).length).toBe(1);
  });

  it("should render a bare input if immediate is true", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_UncontrolledTextInput2.default, { value: "", onUpdate: onUpdate, immediate: true }));

    expect(component.find(_DelayedTextInput2.default).length).toBe(0);
  });
});
//# sourceMappingURL=UncontrolledTextInput-test.js.map