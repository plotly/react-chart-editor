"use strict";

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock("../SymbolSelector");

describe("SymbolSelector", function () {
  var SymbolSelector = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var TestUtils = void 0;

  beforeEach(function () {
    SymbolSelector = require("../SymbolSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      activeOption: "square",
      symbolColor: "rgb(31, 119, 180)",
      toggleMenu: jest.genMockFn(),
      changeSymbol: jest.genMockFn(),
      is3D: false
    };

    return TestUtils.renderIntoDocument(React.createElement(SymbolSelector, props));
  }

  it("passes on the new value on change", function () {
    var component = render();

    expect(component).toBeDefined();
    expect(component.props.changeSymbol).not.toBeCalled();
    TestUtils.Simulate.click(component.refs["star-square-open"]);
    expect(component.props.changeSymbol).toBeCalledWith("star-square-open");
  });
});
//# sourceMappingURL=SymbolSelector-test.js.map