let React;
let shallow;
let LinkEditor;
let RETURN_KEY;
let ESCAPE_KEY;

const defaultProps = props =>
  Object.assign(
    {
      onBlur: () => {},
      onClose: () => {},
      onFocus: () => {},
      onURLChange: () => {},
      linkID: "",
      linkURL: "",
      coordinates: { x: 0, y: 0 },
    },
    props
  );

const render = _props => {
  const props = defaultProps(_props);

  return shallow(
    <LinkEditor
      onBlur={props.onBlur}
      onClose={props.onClose}
      onFocus={props.onFocus}
      onURLChange={props.onURLChange}
      linkID={props.linkID}
      linkURL={props.linkURL}
      coordinates={props.coordinates}
    />
  );
};

describe("LinkEditor", () => {
  beforeEach(() => {
    React = require("react");
    shallow = require("enzyme").shallow;
    LinkEditor = require("../LinkEditor").default;

    const WC = require("@workspace/constants/workspace");
    RETURN_KEY = WC.RETURN_KEY;
    ESCAPE_KEY = WC.ESCAPE_KEY;
  });

  it("renders", () => {
    const component = render();

    expect(component).toBeDefined();
  });

  it("renders an input tag with a placeholder", () => {
    const expectedPlaceholder = "Enter link URL";
    const component = render();
    const inputPlaceholder = component.find("input").prop("placeholder");

    expect(inputPlaceholder).toBe(expectedPlaceholder);
  });

  it("renders an input tag with passed in linkURL", () => {
    const expectedURL = "http://url/com";
    const component = render({ linkURL: expectedURL });
    const inputValue = component.find("input").prop("value");

    expect(inputValue).toBe(expectedURL);
  });

  it("calls onFocus when input is focused", () => {
    const mockOnFocus = jest.genMockFn();
    const component = render({ onFocus: mockOnFocus });

    component.find("input").simulate("focus");

    expect(mockOnFocus).toBeCalled();
  });

  it("calls onBlur when input is blurred", () => {
    const mockOnBlur = jest.genMockFn();
    const component = render({ onBlur: mockOnBlur });

    component.find("input").simulate("focus");
    component.find("input").simulate("blur");

    expect(mockOnBlur).toBeCalled();
  });

  it("calls onURLChange when input value changes", () => {
    const mockOnURLChange = jest.genMockFn();
    const expectedChange = "http://new.url";
    const linkID = "someID";
    const component = render({
      linkID: linkID,
      onURLChange: mockOnURLChange,
    });

    component.find("input").simulate("change", {
      target: { value: expectedChange },
    });

    expect(mockOnURLChange).toBeCalledWith(linkID, expectedChange);
  });

  it("calls onClose when RETURN is pressed", () => {
    const mockOnClose = jest.genMockFn();
    const linkID = "someID";
    const component = render({
      linkID: linkID,
      onClose: mockOnClose,
    });

    component.find("input").simulate("keyDown", {
      key: RETURN_KEY,
      preventDefault: () => {},
    });

    expect(mockOnClose).toBeCalledWith(linkID);
  });

  it("calls onClose and restores original URL when ESC is pressed", () => {
    const mockOnClose = jest.genMockFn();
    const mockOnURLChange = jest.genMockFn();
    const originalURL = "http://some.url";
    const newURL = "http://new.url";
    const linkID = "someID";
    const component = render({
      linkID: linkID,
      linkURL: originalURL,
      onURLChange: mockOnURLChange,
      onClose: mockOnClose,
    });

    component.find("input").simulate("change", {
      target: { value: newURL },
    });

    component.find("input").simulate("keyDown", {
      key: ESCAPE_KEY,
      preventDefault: () => {},
    });

    expect(mockOnClose).toBeCalledWith(linkID);

    expect(mockOnURLChange).lastCalledWith(linkID, originalURL);
  });
});
