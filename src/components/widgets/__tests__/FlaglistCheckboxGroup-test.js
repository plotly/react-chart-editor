jest.dontMock("../FlaglistCheckboxGroup");

import deepAssign from "assign-deep";

describe("FlaglistCheckboxGroup", () => {
  let React;
  let ReactDOM;
  let TestUtils;
  let FlaglistCheckboxGroup;
  let renderCheckedOption;

  beforeEach(() => {
    React = require("react");
    ReactDOM = require("react-dom");
    TestUtils = require("react-dom/test-utils");
    FlaglistCheckboxGroup = require("../FlaglistCheckboxGroup");
    renderCheckedOption = require("../FlaglistCheckboxGroup")
      .renderCheckedOption;
  });

  function render(props) {
    const onChange = jest.genMockFn();

    props = deepAssign(
      {
        options: [
          {
            label: "X",
            value: "x",
          },
          {
            label: "Y",
            value: "y",
          },
          {
            label: "Z",
            value: "z",
          },
        ],
        onChange,
        activeOption: "x+y",
      },
      props || {}
    );

    return TestUtils.renderIntoDocument(<FlaglistCheckboxGroup {...props} />);
  }

  it("render checked options correctly", () => {
    const component = render();

    expect(component.renderCheckedOption()).toEqual([
      {
        label: "X",
        value: "x",
        checked: true,
      },
      {
        label: "Y",
        value: "y",
        checked: true,
      },
      {
        label: "Z",
        value: "z",
        checked: false,
      },
    ]);
  });

  it("updates the state according to a change", () => {
    const component = render();

    expect(component.state.activeOption).toEqual("x+y");

    component.handleChange([
      {
        label: "X",
        value: "x",
        checked: false,
      },
      {
        label: "Y",
        value: "y",
        checked: true,
      },
      {
        label: "Z",
        value: "z",
        checked: true,
      },
    ]);

    expect(component.state.activeOption).toEqual("y+z");
  });
});
