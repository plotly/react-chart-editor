"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../FlaglistCheckboxGroup");

describe("FlaglistCheckboxGroup", function () {
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;
  var FlaglistCheckboxGroup = void 0;
  var renderCheckedOption = void 0;

  beforeEach(function () {
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    FlaglistCheckboxGroup = require("../FlaglistCheckboxGroup");
    renderCheckedOption = require("../FlaglistCheckboxGroup").renderCheckedOption;
  });

  function render(props) {
    var onChange = jest.genMockFn();

    props = (0, _assignDeep2.default)({
      options: [{
        label: "X",
        value: "x"
      }, {
        label: "Y",
        value: "y"
      }, {
        label: "Z",
        value: "z"
      }],
      onChange: onChange,
      activeOption: "x+y"
    }, props || {});

    return TestUtils.renderIntoDocument(React.createElement(FlaglistCheckboxGroup, props));
  }

  it("render checked options correctly", function () {
    var component = render();

    expect(component.renderCheckedOption()).toEqual([{
      label: "X",
      value: "x",
      checked: true
    }, {
      label: "Y",
      value: "y",
      checked: true
    }, {
      label: "Z",
      value: "z",
      checked: false
    }]);
  });

  it("updates the state according to a change", function () {
    var component = render();

    expect(component.state.activeOption).toEqual("x+y");

    component.handleChange([{
      label: "X",
      value: "x",
      checked: false
    }, {
      label: "Y",
      value: "y",
      checked: true
    }, {
      label: "Z",
      value: "z",
      checked: true
    }]);

    expect(component.state.activeOption).toEqual("y+z");
  });
});
//# sourceMappingURL=FlaglistCheckboxGroup-test.js.map