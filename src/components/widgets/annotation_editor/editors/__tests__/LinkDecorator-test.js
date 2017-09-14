let React;
let shallow;
let LinkDecorator;

let expectedURL;

const render = (props = {}) =>
  shallow(
    <LinkDecorator entityKey="1" style={props.style || {}}>
      <span>Link text</span>
    </LinkDecorator>
  );

describe("LinkDecorator", () => {
  beforeEach(() => {
    React = require("react");
    shallow = require("enzyme").shallow;
    LinkDecorator = require("../LinkDecorator").default;

    expectedURL = require("draft-js").mockURL;
  });

  it("renders", () => {
    const component = render();

    expect(component).toBeDefined();
  });

  it("renders an anchor tag with expected URL", () => {
    const component = render();
    const hrefAttr = component.find("a").prop("href");

    expect(hrefAttr).toBe(expectedURL);
  });

  it("renders an anchor tag with passed in style", () => {
    const style = { color: "blue" };
    const component = render({ style });
    const styleProp = component.find("a").prop("style");

    expect(styleProp).toBe(style);
  });

  it("renders children", () => {
    const component = render();

    expect(component.text()).toContain("Link text");
  });
});
