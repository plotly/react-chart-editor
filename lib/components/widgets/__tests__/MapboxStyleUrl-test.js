"use strict";

var _enzyme = require("enzyme");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MapboxStyleUrlController = require("@workspace/components/widgets/MapboxStyleUrlController");

var _MapboxStyleUrlController2 = _interopRequireDefault(_MapboxStyleUrlController);

var _MapboxTokenDropdown = require("@workspace/components/widgets/MapboxTokenDropdown");

var _MapboxTokenDropdown2 = _interopRequireDefault(_MapboxTokenDropdown);

var _testUtils = require("_utils/testUtils");

var _customPropTypes = require("@workspace/utils/customPropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoggedInUserContextHolder(_ref) {
  var children = _ref.children;

  return children;
}

LoggedInUserContextHolder.contextTypes = {
  currentUser: _customPropTypes.currentUserOrNull.isDefined
};

describe("MapboxStyleUrlController", function () {
  function render(value) {
    var currentUser = (0, _testUtils.mockUser)({
      feature_set_id: "community",
      mapbox_access_tokens: [value.accesstoken]
    });

    var context = { currentUser: currentUser };

    return (0, _enzyme.mount)(_react2.default.createElement(
      LoggedInUserContextHolder,
      null,
      _react2.default.createElement(_MapboxStyleUrlController2.default, {
        value: value,
        updatePlot: {
          style: jest.fn(),
          accesstoken: jest.fn()
        },
        dispatch: jest.fn()
      })
    ), { context: context });
  }

  it("renders without warnings", function () {
    var wrapper = render({ style: "basic", accesstoken: "pk.eyJ1I" });
    expect(wrapper).toBeDefined();
  });

  it("renders accesstoken dropdown only when mapbox studio option is selected", function () {
    var wrapper = render({ style: "basic", accesstoken: "pk.eyJ1I" });
    expect(wrapper.find(_MapboxTokenDropdown2.default).length).toBe(0);
    wrapper = render({
      style: "mapbox://styles/veraz/cirm2",
      accesstoken: "pk.eyJ1I"
    });
    expect(wrapper.find(_MapboxTokenDropdown2.default).length).toBe(1);
  });
});
//# sourceMappingURL=MapboxStyleUrl-test.js.map