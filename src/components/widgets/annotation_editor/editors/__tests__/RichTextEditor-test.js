// We do want to mock `DraftCommands` and `debounce` for our unit tests
jest.mock("../DraftCommands");
jest.mock("../debounce");

import React from "react";
import { mount } from "enzyme";

import RichTextEditor from "../RichTextEditor";
import * as MockDraftCommands from "../__mocks__/DraftCommands";
import StyleButton from "@workspace/components/widgets/annotation_editor/editors/StyleButton";

describe("RichTextEditor", () => {
  it("has bold, italic, sub, sup, and link buttons", () => {
    const component = mount(<RichTextEditor onChange={() => {}} />);

    const styleButtons = component.find(StyleButton);

    expect(
      styleButtons.filterWhere(b => b.node.props.value === "BOLD").length
    ).toBe(1);
    expect(
      styleButtons.filterWhere(b => b.node.props.value === "ITALIC").length
    ).toBe(1);
    expect(
      styleButtons.filterWhere(b => b.node.props.value === "SUBSCRIPT").length
    ).toBe(1);
    expect(
      styleButtons.filterWhere(b => b.node.props.value === "SUPERSCRIPT").length
    ).toBe(1);
    expect(
      styleButtons.filterWhere(b => b.node.props.value === "LINK").length
    ).toBe(1);
  });

  describe("#componentWillReceiveProps", () => {
    it("does not call setState when editor is in focus", () => {
      const mockSetState = jest.genMockFn();
      const context = {
        state: {
          editorFocus: true,
          linkEditorFocus: false,
        },
        setState: mockSetState,
      };

      RichTextEditor.prototype.componentWillReceiveProps.call(context);
      expect(mockSetState.mock.calls.length).toBe(0);
    });

    it("does not call setState when link editor is in focus", () => {
      const mockSetState = jest.genMockFn();
      const context = {
        state: {
          editorFocus: false,
          linkEditorFocus: true,
        },
        setState: mockSetState,
      };

      RichTextEditor.prototype.componentWillReceiveProps.call(context);
      expect(mockSetState.mock.calls.length).toBe(0);
    });

    it("calls setState based on incoming `value` prop", () => {
      const mockSetState = jest.genMockFn();
      const context = {
        state: {
          editorFocus: false,
          linkEditorFocus: false,
          editorState: "old value",
        },
        // Identity (pass-through) functions
        getEditorStateAsHTML: value => value,
        createEditorStateFromHTML: value => value,
        setState: mockSetState,
      };
      const expectedValue = "new value";
      const nextProps = {
        value: expectedValue,
      };

      RichTextEditor.prototype.componentWillReceiveProps.call(
        context,
        nextProps
      );

      expect(mockSetState).toBeCalledWith({ editorState: expectedValue });
    });
  });

  describe("#shouldComponentUpdate", () => {
    let testFn;

    beforeEach(() => {
      testFn = RichTextEditor.prototype.shouldComponentUpdate;
    });

    it("returns true when link editor is in focus", () => {
      const context = {
        props: {},
        state: {
          linkEditorFocus: true,
          editorFocus: true,
        },
      };
      const nextProps = {};
      const nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when placeholder prop is different", () => {
      const context = {
        props: {
          placeholder: "hold thy place",
        },
        state: {
          linkEditorFocus: false,
          editorFocus: true,
        },
      };
      const nextProps = {
        // This is the incoming value
        placeholder: "Enter text..",
      };
      const nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when value prop is different", () => {
      const context = {
        props: {
          value: "",
        },
        state: {
          linkEditorFocus: false,
          editorFocus: true,
        },
      };
      const nextProps = {
        // This is the incoming value
        value: "My note",
      };
      const nextState = {};

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when editorState is different", () => {
      const oldEditorState = {};
      const newEditorState = {};
      const context = {
        props: {},
        state: {
          linkEditorFocus: false,
          editorFocus: true,
          editorState: oldEditorState,
        },
      };
      const nextProps = {};
      const nextState = {
        // This is the incoming value
        editorState: newEditorState,
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns true when incoming value is different", () => {
      const sameString = "samesame";
      const oldEditorState = {
        value: "old value",
      };
      const context = {
        props: {
          placeholder: sameString,
          value: sameString,
        },
        state: {
          linkEditorFocus: false,
          editorFocus: false,
          editorState: oldEditorState,
        },
        // This will return different incoming value
        getEditorStateAsHTML: () => "something different",
      };
      const nextProps = {
        placeholder: sameString,
        value: sameString,
      };
      const nextState = {
        editorState: oldEditorState,
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(true);
    });

    it("returns false when incoming value is same", () => {
      const sameString = "samesame";
      const oldEditorState = {
        value: "old value",
      };
      const context = {
        props: {
          placeholder: sameString,
          value: sameString,
        },
        state: {
          linkEditorFocus: false,
          editorFocus: false,
          editorState: oldEditorState,
        },
        // This will return incoming value equivalent to current value
        getEditorStateAsHTML: () => sameString,
      };
      const nextProps = {
        placeholder: sameString,
        value: sameString,
      };
      const nextState = {
        editorState: oldEditorState,
      };

      expect(testFn.call(context, nextProps, nextState)).toBe(false);
    });
  });

  describe("#onChange", () => {
    const testFn = RichTextEditor.prototype.onChange;
    const mockEntityKey = MockDraftCommands["_entityKey"];

    it("sets new state with passed editorState", () => {
      const mockValue = "samesame";
      const mockSetState = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: () => true,
        // Prevent dispatching to plotly by using existing value
        value: mockValue,
      };
      const context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey,
        },
        props: {
          value: mockValue,
          onChange: () => {},
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(mockSetState).toBeCalledWith({ editorState });
    });

    it("does not dispatch changes to plotly when value is same", () => {
      const mockValue = "samesame";
      const mockSetState = jest.genMockFn();
      const mockPlotlyOnChange = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: () => true,
        // Prevent dispatching to plotly by using existing value
        value: mockValue,
      };
      const context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey,
        },
        props: {
          value: mockValue,
          onChange: mockPlotlyOnChange,
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(mockPlotlyOnChange.mock.calls.length).toBe(0);
    });

    it("dispatches changes to plotly when value differs", () => {
      const oldValue = "old";
      const newValue = "new";
      const mockSetState = jest.genMockFn();
      const mockDebounce = require("../debounce").default;
      const mockPlotlyOnChange = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: () => true,
        // A new value in editorState should be dispatched to plotly
        value: newValue,
      };
      const context = {
        state: {
          // Prevent assinging selectedLinkID by using existing value.
          selectedLinkID: mockEntityKey,
        },
        props: {
          value: oldValue,
          onChange: mockPlotlyOnChange,
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(mockDebounce).toBeCalledWith(mockPlotlyOnChange, [newValue]);
    });

    it("sets selected link in state", () => {
      const oldLinkID = null;
      const mockValue = "samesame";
      const mockSetState = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: () => true,
        // Prevent dispatching to plotly by using existing value
        value: mockValue,
      };
      const context = {
        state: {
          // Set a different linkID than the mock to trigger update
          selectedLinkID: oldLinkID,
        },
        props: {
          value: mockValue,
          onChange: () => {},
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(oldLinkID).not.toBe(mockEntityKey);
      expect(mockSetState).toBeCalledWith({
        editorState,
        selectedLinkID: mockEntityKey,
      });
    });

    it("updates selected link in state", () => {
      const oldLinkID = "oldLinkID";
      const mockValue = "samesame";
      const mockSetState = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Prevent assigning `selectedLinkID` to null.
                 */
        getSelection: () => true,
        // Prevent dispatching to plotly by using existing value
        value: mockValue,
      };
      const context = {
        state: {
          // Set a different linkID than the mock to trigger update
          selectedLinkID: oldLinkID,
        },
        props: {
          value: mockValue,
          onChange: () => {},
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(oldLinkID).not.toBe(mockEntityKey);
      expect(mockSetState).toBeCalledWith({
        editorState,
        selectedLinkID: mockEntityKey,
      });
    });

    it("removes unselected link from state", () => {
      const mockValue = "samesame";
      const mockSetState = jest.genMockFn();
      const editorState = {
        /*
                 * Our `cursorHasLink` mock returns the selection object.
                 * Set to `false` to trigger clearing of `selectedLinkID`.
                 */
        getSelection: () => false,
        // Prevent dispatching to plotly by using existing value
        value: mockValue,
      };
      const context = {
        state: {},
        props: {
          value: mockValue,
          onChange: () => {},
        },
        setState: mockSetState,
        // Return the value prop of passed editorState (fake behavior)
        getEditorStateAsHTML: _editorState => _editorState.value,
      };

      testFn.call(context, editorState);

      expect(mockSetState).toBeCalledWith({
        editorState,
        selectedLinkID: null,
      });
    });
  });

  describe("#onLinkEditorClose", () => {
    let mockSetState;
    let context;
    let testFn;

    beforeEach(() => {
      mockSetState = jest.genMockFn();
      context = {
        focus: () => {},
        state: {
          editorState: {},
        },
        setState: mockSetState,
      };
      testFn = RichTextEditor.prototype.onLinkEditorClose;
    });

    it("sets linkEditorFocus state to false", () => {
      testFn.call(context);

      expect(mockSetState.mock.calls.length).toBe(1);
      expect(mockSetState.mock.calls[0][0].linkEditorFocus).toBe(false);
    });

    it("sets selectedLinkID state to null", () => {
      testFn.call(context);

      expect(mockSetState.mock.calls.length).toBe(1);
      expect(mockSetState.mock.calls[0][0].selectedLinkID).toBe(null);
    });
  });
});
