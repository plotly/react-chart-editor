"use strict";

jest.dontMock("../AccordionMenuItem");

describe("AccordionMenuItem", function () {
  var AccordionMenuItem = void 0;
  var React = void 0;
  var ReactDOM = void 0;
  var Enzyme = void 0;

  beforeEach(function () {
    AccordionMenuItem = require("../AccordionMenuItem");
    React = require("react");
    ReactDOM = require("react-dom");
    Enzyme = require("enzyme");
  });

  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaultProps = {
      children: React.createElement("div", null),
      id: "0"
    };
    var newProps = Object.assign({}, defaultProps, props);
    return Enzyme.shallow(React.createElement(AccordionMenuItem, newProps));
  }

  it("renders the correct title.", function () {
    var component = render({
      title: "FirstAccordion",
      iconClass: "icon-plotlylogo",
      isOpen: false,
      content: "Some content"
    });

    expect(component.find(".js-test-title").text()).toEqual("FirstAccordion");
  });

  it("renders with the right css classes.", function () {
    var component = render({
      title: "FirstAccordion",
      iconClass: "icon-plotlylogo",
      isOpen: false,
      content: "Some content"
    });

    // Close the subMenu
    component.setProps({ isOpen: false });

    // Check initial css when closed.
    expect(component.find(".accordion-item__top--active").length).toEqual(0);

    expect(component.find(".+rotate-90").length).toEqual(1);

    // Open the subMenu
    component.setProps({ isOpen: true });

    // Check updated css when opened.
    expect(component.find(".accordion-item__top--active").length).toEqual(1);

    expect(component.find(".+rotate-90").length).toEqual(0);
  });
});
//# sourceMappingURL=AccordionMenuItem-test.js.map