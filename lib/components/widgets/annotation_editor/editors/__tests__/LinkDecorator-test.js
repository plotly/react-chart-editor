"use strict";

var React = void 0;
var shallow = void 0;
var LinkDecorator = void 0;

var expectedURL = void 0;

var render = function render() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(
    LinkDecorator,
    { entityKey: "1", style: props.style || {} },
    React.createElement(
      "span",
      null,
      "Link text"
    )
  ));
};

describe("LinkDecorator", function () {
  beforeEach(function () {
    React = require("react");
    shallow = require("enzyme").shallow;
    LinkDecorator = require("../LinkDecorator").default;

    expectedURL = require("draft-js").mockURL;
  });

  it("renders", function () {
    var component = render();

    expect(component).toBeDefined();
  });

  it("renders an anchor tag with expected URL", function () {
    var component = render();
    var hrefAttr = component.find("a").prop("href");

    expect(hrefAttr).toBe(expectedURL);
  });

  it("renders an anchor tag with passed in style", function () {
    var style = { color: "blue" };
    var component = render({ style: style });
    var styleProp = component.find("a").prop("style");

    expect(styleProp).toBe(style);
  });

  it("renders children", function () {
    var component = render();

    expect(component.text()).toContain("Link text");
  });
});
//# sourceMappingURL=LinkDecorator-test.js.map