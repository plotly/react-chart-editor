jest.dontMock("../AccordionMenuItem");

describe("AccordionMenuItem", () => {
  let AccordionMenuItem;
  let React;
  let ReactDOM;
  let Enzyme;

  beforeEach(() => {
    AccordionMenuItem = require("../AccordionMenuItem");
    React = require("react");
    ReactDOM = require("react-dom");
    Enzyme = require("enzyme");
  });

  function render(props = {}) {
    const defaultProps = {
      children: <div />,
      id: "0",
    };
    const newProps = Object.assign({}, defaultProps, props);
    return Enzyme.shallow(<AccordionMenuItem {...newProps} />);
  }

  it("renders the correct title.", () => {
    const component = render({
      title: "FirstAccordion",
      iconClass: "icon-plotlylogo",
      isOpen: false,
      content: "Some content",
    });

    expect(component.find(".js-test-title").text()).toEqual("FirstAccordion");
  });

  it("renders with the right css classes.", () => {
    const component = render({
      title: "FirstAccordion",
      iconClass: "icon-plotlylogo",
      isOpen: false,
      content: "Some content",
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
