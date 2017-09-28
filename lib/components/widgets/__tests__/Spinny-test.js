"use strict";

describe("Spinny", function () {
  var React = void 0;
  var ReactDOM = void 0;
  var Spinny = void 0;
  var TestUtils = void 0;

  function render(props) {
    return TestUtils.renderIntoDocument(React.createElement(Spinny, props));
  }

  beforeEach(function () {
    React = require("react");
    ReactDOM = require("react-dom");
    Spinny = require("../Spinny");
    TestUtils = require("react-dom/test-utils");
  });

  describe("rendering", function () {
    it("Renders the spinny with the default size", function () {
      var component = render();
      expect(component.refs.loadingIndicator).toBeDefined();
      var spinnyElement = TestUtils.findRenderedDOMComponentWithClass(component, "spinny");
      expect(spinnyElement.className).toEqual("spinny");
    });

    it("Renders the spinny with the right class", function () {
      var component = render({ size: "tiny" });
      expect(component.refs.loadingIndicator).toBeDefined();
      var spinnyElement = TestUtils.findRenderedDOMComponentWithClass(component, "spinny tiny");
      expect(spinnyElement.className).toEqual("spinny tiny");
    });

    it("Renders the spinny with the right class", function () {
      var component = render({ size: "large" });
      expect(component.refs.loadingIndicator).toBeDefined();
      var spinnyElement = TestUtils.findRenderedDOMComponentWithClass(component, "spinny large");
      expect(spinnyElement.className).toEqual("spinny large");
    });

    it("Renders text if it is passed in", function () {
      var component = render({ text: "This is a string of text" });
      expect(component.refs.textIndicator).toBeDefined();
    });

    it("Does not render text if it is not passed in", function () {
      var component = render({ text: null });
      expect(component.refs.textIndicator).not.toBeDefined();
    });
  });
});
//# sourceMappingURL=Spinny-test.js.map