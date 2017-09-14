jest.dontMock("../LoadingBars");

describe("LoadingBars", () => {
  var React;
  var LoadingBars;
  var TestUtils;

  function render(loadingText) {
    return TestUtils.renderIntoDocument(
      <LoadingBars loadingText={loadingText} />
    );
  }

  beforeEach(() => {
    React = require("react");
    TestUtils = require("react-dom/test-utils");
    LoadingBars = require("../LoadingBars");
  });

  it("should render with loadingText", () => {
    const loadingText = "Loading...";
    const component = render(loadingText);
    expect(component.refs.loadingText.textContent).toEqual(loadingText);
  });

  it("should render without loadingText", () => {
    const component = render();
    expect(component.refs.loadingText).not.toBeDefined();
  });
});
