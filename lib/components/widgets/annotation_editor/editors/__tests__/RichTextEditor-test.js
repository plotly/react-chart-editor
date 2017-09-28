"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _RichTextEditor = require("../RichTextEditor");

var _RichTextEditor2 = _interopRequireDefault(_RichTextEditor);

var _DraftCommands = require("../__mocks__/DraftCommands");

var MockDraftCommands = _interopRequireWildcard(_DraftCommands);

var _StyleButton = require("@workspace/components/widgets/annotation_editor/editors/StyleButton");

var _StyleButton2 = _interopRequireDefault(_StyleButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We do want to mock `DraftCommands` and `debounce` for our unit tests
jest.mock("../DraftCommands");
jest.mock("../debounce");

describe("RichTextEditor", function () {
  it("has bold, italic, sub, sup, and link buttons", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_RichTextEditor2.default, { onChange: function onChange() {} }));

    var styleButtons = component.find(_StyleButton2.default);

    expect(styleButtons.filterWhere(function (b) {
      return b.node.props.value === "BOLD";
    }).length).toBe(1);
    expect(styleButtons.filterWhere(function (b) {
      return b.node.props.value === "ITALIC";
    }).length).toBe(1);
    expect(styleButtons.filterWhere(function (b) {
      return b.node.props.value === "SUBSCRIPT";
    }).length).toBe(1);
    expect(styleButtons.filterWhere(function (b) {
      return b.node.props.value === "SUPERSCRIPT";
    }).length).toBe(1);
    expect(styleButtons.filterWhere(function (b) {
      return b.node.props.value === "LINK";
    }).length).toBe(1);
  });

  describe("#componentWillReceiveProps", function () {
    it("does not call setState when editor is in focus", function () {
      var mockSetState = jest.genMockFn();
      var context = {
        state: {
          editorFocus: true,
          linkEditorFocus: false
        },
        setState: mockSetState
      };

      _RichTextEditor2.default.prototype.componentWillReceiveProps.call(context);
      expect(mockSetState.mock.calls.length).toBe(0);
    });

    it("does not call setState when link editor is in focus", function () {
      var mockSetState = jest.genMockFn();
      var context = {
        state: {
          editorFocus: false,
          linkEditorFocus: true
        },
        setState: mockSetState
      };

      _RichTextEditor2.default.prototype.componentWillReceiveProps.call(context);
      expect(mockSetState.mock.calls.length).toBe(0);
    });

    it("calls setState based on incoming `value` prop", function () {
      var mockSetState = jest.genMockFn();
      var context = {
        state: {
          editorFocus: false,
          linkEditorFocus: false,
          editorState: "old value"
        },
        // Identity (pass-through) functions
        getEditorStateAsHTML: function getEditorStateAsHTML(value) {
          return value;
        },
        createEditorStateFromHTML: function createEditorStateFromHTML(value) {
          return value;
        },
        setState: mockSetState
      };
      var expectedValue = "new value";
      var nextProps = {
        value: expectedValue
      };

      _RichTextEditor2.default.prototype.componentWillReceiveProps.call(context, nextProps);

      expect(mockSetState).toBeCalledWith({ editorState: expectedValue });
    });
  });

  describe("#shouldComponentUpdate", function () {
    var testFn = void 0;

    beforeEach(function () {
      testFn = _RichTextEditor2.default.prototype.shouldComponentUpdate;
    });

    it("returns true when link editor is in focus", function () {
      var context = {
        props: {},
        state: {
          linkEditorFocus: true,
          editorFocus: true
        }
      };
      var nextProps = {};
      var nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when placeholder prop is different", function () {
      var context = {
        props: {
          placeholder: "hold thy place"
        },
        state: {
          linkEditorFocus: false,
          editorFocus: true
        }
      };
      var nextProps = {
        // This is the incoming value
        placeholder: "Enter text.."
      };
      var nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when value prop is different", function () {
      var context = {
        props: {
          value: ""
        },
        state: {
          linkEditorFocus: false,
          editorFocus: true
        }
      };
      var nextProps = {
        // This is the incoming value
        value: "My note"
      };
      var nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when editorState is different", function () {
      var oldEditorState = {};
      var newEditorState = {};
      var context = {
        props: {},
        state: {
          linkEditorFocus: false,
          editorFocus: true,
          editorState: oldEditorState
        }
      };
      var nextProps = {};
      var nextState = {
        // This is the incoming value
        editorState: newEditorState
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when incoming value is different", function () {
      var sameString = "samesame";
      var oldEditorState = {
        value: "old value"
      };
      var context = {
        props: {
          placeholder: sameString,
          value: sameString
        },
        state: {
          linkEditorFocus: false,
          editorFocus: false,
          editorState: oldEditorState
        },
        // This will return different incoming value
        getEditorStateAsHTML: function getEditorStateAsHTML() {
          return "something different";
        }
      };
      var nextProps = {
        placeholder: sameString,
        value: sameString
      };
      var nextState = {
        editorState: oldEditorState
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns false when incoming value is same", function () {
      var sameString = "samesame";
      var oldEditorState = {
        value: "old value"
      };
      var context = {
        props: {
          placeholder: sameString,
          value: sameString
        },
        state: {
          linkEditorFocus: false,
          editorFocus: false,
          editorState: oldEditorState
        },
        // This will return incoming value equivalent to current value
        getEditorStateAsHTML: function getEditorStateAsHTML() {
          return sameString;
        }
      };
      var nextProps = {
        placeholder: sameString,
        value: sameString
      };
      var nextState = {
        editorState: oldEditorState
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(false);
    });
  });

  describe("#onChange", function () {
    var testFn = _RichTextEditor2.default.prototype.onChange;
    var mockEntityKey = MockDraftCommands["_entityKey"];

    it("sets new state with passed editorState", function () {
      var mockValue = "samesame";
      var mockSetState = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: function getSelection() {
          return true;
        },
        // Prevent dispatching to plotly by using existing value
        value: mockValue
      };
      var context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey
        },
        props: {
          value: mockValue,
          onChange: function onChange() {}
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(mockSetState).toBeCalledWith({ editorState: editorState });
    });

    it("does not dispatch changes to plotly when value is same", function () {
      var mockValue = "samesame";
      var mockSetState = jest.genMockFn();
      var mockPlotlyOnChange = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: function getSelection() {
          return true;
        },
        // Prevent dispatching to plotly by using existing value
        value: mockValue
      };
      var context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey
        },
        props: {
          value: mockValue,
          onChange: mockPlotlyOnChange
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(mockPlotlyOnChange.mock.calls.length).toBe(0);
    });

    it("dispatches changes to plotly when value differs", function () {
      var oldValue = "old";
      var newValue = "new";
      var mockSetState = jest.genMockFn();
      var mockDebounce = require("../debounce").default;
      var mockPlotlyOnChange = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: function getSelection() {
          return true;
        },
        // A new value in editorState should be dispatched to plotly
        value: newValue
      };
      var context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey
        },
        props: {
          value: oldValue,
          onChange: mockPlotlyOnChange
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(mockDebounce).toBeCalledWith(mockPlotlyOnChange, [newValue]);
    });

    it("sets selected link in state", function () {
      var oldLinkID = null;
      var mockValue = "samesame";
      var mockSetState = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: function getSelection() {
          return true;
        },
        // Prevent dispatching to plotly by using existing value
        value: mockValue
      };
      var context = {
        state: {
          // Set a different linkID than the mock to trigger update
          selectedLinkID: oldLinkID
        },
        props: {
          value: mockValue,
          onChange: function onChange() {}
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(oldLinkID).not.toBe(mockEntityKey);
      expect(mockSetState).toBeCalledWith({
        editorState: editorState,
        selectedLinkID: mockEntityKey
      });
    });

    it("updates selected link in state", function () {
      var oldLinkID = "oldLinkID";
      var mockValue = "samesame";
      var mockSetState = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: function getSelection() {
          return true;
        },
        // Prevent dispatching to plotly by using existing value
        value: mockValue
      };
      var context = {
        state: {
          // Set a different linkID than the mock to trigger update
          selectedLinkID: oldLinkID
        },
        props: {
          value: mockValue,
          onChange: function onChange() {}
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(oldLinkID).not.toBe(mockEntityKey);
      expect(mockSetState).toBeCalledWith({
        editorState: editorState,
        selectedLinkID: mockEntityKey
      });
    });

    it("removes unselected link from state", function () {
      var mockValue = "samesame";
      var mockSetState = jest.genMockFn();
      var editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Set to `false` to trigger clearing of `selectedLinkID`.
                 */
        getSelection: function getSelection() {
          return false;
        },
        // Prevent dispatching to plotly by using existing value
        value: mockValue
      };
      var context = {
        state: {},
        props: {
          value: mockValue,
          onChange: function onChange() {}
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: function getEditorStateAsHTML(_editorState) {
          return _editorState.value;
        }
      };

      testFn.call(context, editorState);

      expect(mockSetState).toBeCalledWith({
        editorState: editorState,
        selectedLinkID: null
      });
    });
  });

  describe("#onLinkEditorClose", function () {
    var mockSetState = void 0;
    var context = void 0;
    var testFn = void 0;

    beforeEach(function () {
      mockSetState = jest.genMockFn();
      context = {
        focus: function focus() {},
        state: {
          editorState: {}
        },
        setState: mockSetState
      };
      testFn = _RichTextEditor2.default.prototype.onLinkEditorClose;
    });

    it("sets linkEditorFocus state to false", function () {
      testFn.call(context);

      expect(mockSetState.mock.calls.length).toBe(1);
      expect(mockSetState.mock.calls[0][0].linkEditorFocus).toBe(false);
    });

    it("sets selectedLinkID state to null", function () {
      testFn.call(context);

      expect(mockSetState.mock.calls.length).toBe(1);
      expect(mockSetState.mock.calls[0][0].selectedLinkID).toBe(null);
    });
  });
});
//# sourceMappingURL=RichTextEditor-test.js.map