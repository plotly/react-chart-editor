describe("Spinny", () => {
  let React;
  let ReactDOM;
  let Spinny;
  let TestUtils;

  function render(props) {
    return TestUtils.renderIntoDocument(<Spinny {...props} />);
  }

  beforeEach(() => {
    React = require("react");
    ReactDOM = require("react-dom");
    Spinny = require("../Spinny");
    TestUtils = require("react-dom/test-utils");
  });

  describe("rendering", () => {
    it("Renders the spinny with the default size", () => {
      const component = render();
      expect(component.refs.loadingIndicator).toBeDefined();
      const spinnyElement = TestUtils.findRenderedDOMComponentWithClass(
        component,
        "spinny"
      );
      expect(spinnyElement.className).toEqual("spinny");
    });

    it("Renders the spinny with the right class", () => {
      const component = render({ size: "tiny" });
      expect(component.refs.loadingIndicator).toBeDefined();
      const spinnyElement = TestUtils.findRenderedDOMComponentWithClass(
        component,
        "spinny tiny"
      );
      expect(spinnyElement.className).toEqual("spinny tiny");
    });

    it("Renders the spinny with the right class", () => {
      const component = render({ size: "large" });
      expect(component.refs.loadingIndicator).toBeDefined();
      const spinnyElement = TestUtils.findRenderedDOMComponentWithClass(
        component,
        "spinny large"
      );
      expect(spinnyElement.className).toEqual("spinny large");
    });

    it("Renders text if it is passed in", () => {
      const component = render({ text: "This is a string of text" });
      expect(component.refs.textIndicator).toBeDefined();
    });

    it("Does not render text if it is not passed in", () => {
      const component = render({ text: null });
      expect(component.refs.textIndicator).not.toBeDefined();
    });
  });
});
