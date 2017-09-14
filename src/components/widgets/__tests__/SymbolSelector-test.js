jest.dontMock("../SymbolSelector");

import deepAssign from "assign-deep";

describe("SymbolSelector", () => {
  let SymbolSelector;
  let React;
  let ReactDOM;
  let TestUtils;

  beforeEach(() => {
    SymbolSelector = require("../SymbolSelector");
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
  });

  function render(
    props = {
      activeOption: "square",
      symbolColor: "rgb(31, 119, 180)",
      toggleMenu: jest.genMockFn(),
      changeSymbol: jest.genMockFn(),
      is3D: false,
    }
  ) {
    return TestUtils.renderIntoDocument(<SymbolSelector {...props} />);
  }

  it("passes on the new value on change", () => {
    const component = render();

    expect(component).toBeDefined();
    expect(component.props.changeSymbol).not.toBeCalled();
    TestUtils.Simulate.click(component.refs["star-square-open"]);
    expect(component.props.changeSymbol).toBeCalledWith("star-square-open");
  });
});
