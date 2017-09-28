"use strict";

jest.dontMock("../LoadingBars");

describe("LoadingBars", function () {
  var React;
  var LoadingBars;
  var TestUtils;

  function render(loadingText) {
    return TestUtils.renderIntoDocument(React.createElement(LoadingBars, { loadingText: loadingText }));
  }

  beforeEach(function () {
    React = require("react");
    TestUtils = require("react-dom/test-utils");
    LoadingBars = require("../LoadingBars");
  });

  it("should render with loadingText", function () {
    var loadingText = "Loading...";
    var component = render(loadingText);
    expect(component.refs.loadingText.textContent).toEqual(loadingText);
  });

  it("should render without loadingText", function () {
    var component = render();
    expect(component.refs.loadingText).not.toBeDefined();
  });
});
//# sourceMappingURL=LoadingBars-test.js.map