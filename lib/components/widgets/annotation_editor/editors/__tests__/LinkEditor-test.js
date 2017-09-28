"use strict";

var React = void 0;
var shallow = void 0;
var LinkEditor = void 0;
var RETURN_KEY = void 0;
var ESCAPE_KEY = void 0;

var defaultProps = function defaultProps(props) {
  return Object.assign({
    onBlur: function onBlur() {},
    onClose: function onClose() {},
    onFocus: function onFocus() {},
    onURLChange: function onURLChange() {},
    linkID: "",
    linkURL: "",
    coordinates: { x: 0, y: 0 }
  }, props);
};

var render = function render(_props) {
  var props = defaultProps(_props);

  return shallow(React.createElement(LinkEditor, {
    onBlur: props.onBlur,
    onClose: props.onClose,
    onFocus: props.onFocus,
    onURLChange: props.onURLChange,
    linkID: props.linkID,
    linkURL: props.linkURL,
    coordinates: props.coordinates
  }));
};

describe("LinkEditor", function () {
  beforeEach(function () {
    React = require("react");
    shallow = require("enzyme").shallow;
    LinkEditor = require("../LinkEditor").default;

    var WC = require("@workspace/constants/workspace");
    RETURN_KEY = WC.RETURN_KEY;
    ESCAPE_KEY = WC.ESCAPE_KEY;
  });

  it("renders", function () {
    var component = render();

    expect(component).toBeDefined();
  });

  it("renders an input tag with a placeholder", function () {
    var expectedPlaceholder = "Enter link URL";
    var component = render();
    var inputPlaceholder = component.find("input").prop("placeholder");

    expect(inputPlaceholder).toBe(expectedPlaceholder);
  });

  it("renders an input tag with passed in linkURL", function () {
    var expectedURL = "http://url/com";
    var component = render({ linkURL: expectedURL });
    var inputValue = component.find("input").prop("value");

    expect(inputValue).toBe(expectedURL);
  });

  it("calls onFocus when input is focused", function () {
    var mockOnFocus = jest.genMockFn();
    var component = render({ onFocus: mockOnFocus });

    component.find("input").simulate("focus");

    expect(mockOnFocus).toBeCalled();
  });

  it("calls onBlur when input is blurred", function () {
    var mockOnBlur = jest.genMockFn();
    var component = render({ onBlur: mockOnBlur });

    component.find("input").simulate("focus");
    component.find("input").simulate("blur");

    expect(mockOnBlur).toBeCalled();
  });

  it("calls onURLChange when input value changes", function () {
    var mockOnURLChange = jest.genMockFn();
    var expectedChange = "http://new.url";
    var linkID = "someID";
    var component = render({
      linkID: linkID,
      onURLChange: mockOnURLChange
    });

    component.find("input").simulate("change", {
      target: { value: expectedChange }
    });

    expect(mockOnURLChange).toBeCalledWith(linkID, expectedChange);
  });

  it("calls onClose when RETURN is pressed", function () {
    var mockOnClose = jest.genMockFn();
    var linkID = "someID";
    var component = render({
      linkID: linkID,
      onClose: mockOnClose
    });

    component.find("input").simulate("keyDown", {
      key: RETURN_KEY,
      preventDefault: function preventDefault() {}
    });

    expect(mockOnClose).toBeCalledWith(linkID);
  });

  it("calls onClose and restores original URL when ESC is pressed", function () {
    var mockOnClose = jest.genMockFn();
    var mockOnURLChange = jest.genMockFn();
    var originalURL = "http://some.url";
    var newURL = "http://new.url";
    var linkID = "someID";
    var component = render({
      linkID: linkID,
      linkURL: originalURL,
      onURLChange: mockOnURLChange,
      onClose: mockOnClose
    });

    component.find("input").simulate("change", {
      target: { value: newURL }
    });

    component.find("input").simulate("keyDown", {
      key: ESCAPE_KEY,
      preventDefault: function preventDefault() {}
    });

    expect(mockOnClose).toBeCalledWith(linkID);

    expect(mockOnURLChange).lastCalledWith(linkID, originalURL);
  });
});
//# sourceMappingURL=LinkEditor-test.js.map