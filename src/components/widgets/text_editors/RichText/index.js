import {Component} from 'react';
import PropTypes from 'prop-types';
import {CompositeDecorator, Editor, EditorState, Entity, RichUtils} from 'draft-js';
import {stateToHTML} from '@plotly/draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

// Constants
import {
  SUPERSCRIPT,
  SUBSCRIPT,
  LINK,
  STYLES_TO_HTML_TAGS,
  STYLE_MAP,
  INLINE_STYLES,
} from './configuration';

// Components
import LinkDecorator from './LinkDecorator';
import LinkEditor from './LinkEditor';
import StyleButtonGroup from './StyleButtonGroup';

// Libraries
import debounce from './debounce';
import {
  getEntityKeyAt,
  getEntityByKey,
  toggleInlineStyle,
  handleKeyCommand,
  insertSoftNewline,
  cursorHasLink,
} from './DraftCommands';
import {findLinkEntities} from './decoratorStrategies';
import getCoordinates from './getSelectionCoordinates';

class RichText extends Component {
  constructor(props, context) {
    super(props, context);

    /*
     * Initially set state based on the plotly.js annotation content.
     * After this, as long as this component is mounted, it owns the source
     * of truth for the annotation value via `this.state.editorState`.
     * This state may be updated externally via a prop update.
     * See `UNSAFE_componentWillReceiveProps`.
     */
    this.state = {
      editorState: props.value.toString().trim().length
        ? this.createEditorStateFromHTML(props.value)
        : EditorState.createEmpty(this.getDecorator()),
    };

    this.getDecorator = this.getDecorator.bind(this);
    this.createEditorStateFromHTML = this.createEditorStateFromHTML.bind(this);
    this.getEditorStateAsHTML = this.getEditorStateAsHTML.bind(this);
    this.focus = this.focus.bind(this);
    this.getParentContainerVerticalOffset = this.getParentContainerVerticalOffset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onLinkEditorBlur = this.onLinkEditorBlur.bind(this);
    this.onLinkEditorFocus = this.onLinkEditorFocus.bind(this);
    this.onLinkEditorChange = this.onLinkEditorChange.bind(this);
    this.onLinkEditorClose = this.onLinkEditorClose.bind(this);
    this.onKeyCommand = this.onKeyCommand.bind(this);
    this.onReturnPressed = this.onReturnPressed.bind(this);
    this.onStyleButtonToggle = this.onStyleButtonToggle.bind(this);
    this.renderLinkEditor = this.renderLinkEditor.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {linkEditorFocus, editorFocus} = this.state;

    /*
     * Don't worry about what plotly.js thinks the annotation value
     * should be while we're using our editor, for these reasons:
     *
     * 1. The editor should be considered the source of truth, unless the
     *    user is actually editing the annotation inline, in the chart.
     * 2. Sometimes we get updates with stale values.
     */
    if (linkEditorFocus || editorFocus) {
      return;
    }

    // Sync editor state with plotly annotation value.
    const editorState = this.createEditorStateFromHTML(nextProps.value);

    this.setState({editorState});
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {placeholder, value} = this.props;
    const {editorState, linkEditorFocus} = this.state;

    // If relevant props or state changed, return true.
    if (
      // Always update when user is editing link
      linkEditorFocus ||
      placeholder !== nextProps.placeholder ||
      value !== nextProps.value ||
      editorState !== nextState.editorState
    ) {
      return true;
    }

    // Compare incoming value with HTML representation of state.
    return nextProps.value !== this.getEditorStateAsHTML(editorState);
  }

  getDecorator() {
    return new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkDecorator,

        // Props for the LinkDecorator component
        props: {
          style: STYLE_MAP[LINK],
        },
      },
    ]);
  }

  createEditorStateFromHTML(html) {
    const contentState = stateFromHTML(html, {
      inlineStyles: {
        [SUPERSCRIPT]: {element: 'sup'},
        [SUBSCRIPT]: {element: 'sub'},
      },
      defaultBlockTag: null,
    });

    const decorator = this.getDecorator();

    /*
     * Work around issue described here:
     * https://github.com/facebook/draft-js/issues/185
     * #issuecomment-217207612
     */

    // Parse once to generate entity instances
    EditorState.createWithContent(contentState);

    // Now we can add our decorator
    return EditorState.createWithContent(contentState, decorator);
  }

  getEditorStateAsHTML(editorState) {
    const contentState = editorState.getCurrentContent();

    return stateToHTML(contentState, {
      defaultBlockTag: null,
      inlineStyles: STYLES_TO_HTML_TAGS,
    });
  }

  focus() {
    this.editorInput.focus();
  }

  // Used to properly calculate user selection coordinates.
  getParentContainerVerticalOffset() {
    return document.querySelector('.panel').scrollTop;
  }

  onChange(editorState) {
    const {selectedLinkID} = this.state;
    const selection = editorState.getSelection();
    const entityKey = getEntityKeyAt(editorState, selection);

    const newState = {editorState};

    // Update selected link ID
    if (!cursorHasLink(editorState, selection)) {
      // If a link is no longer selected, clear selected link ID state
      Object.assign(newState, {
        selectedLinkID: null,
      });
    } else if (selectedLinkID !== entityKey) {
      // If link selection is new / different link selected, update it
      Object.assign(newState, {
        selectedLinkID: entityKey,
      });
    }

    // Update internal state
    this.setState(newState);

    // Dispatch changes to plotly.js
    // TODO consider moving to render (plotly.js is a render target)
    const htmlContent = this.getEditorStateAsHTML(editorState).replace(/<br>\n*/, '<br>');
    if (this.props.value !== htmlContent) {
      debounce(this.props.onChange, [htmlContent]);
    }
  }

  onBlur() {
    this.setState({
      editorFocus: false,
    });
  }

  onFocus() {
    this.setState({
      editorFocus: true,
    });
  }

  onLinkEditorBlur() {
    this.setState({
      linkEditorFocus: false,
    });
  }

  onLinkEditorFocus() {
    this.setState({
      linkEditorFocus: true,
    });
  }

  onLinkEditorChange(linkID, urlValue) {
    const {editorState} = this.state;
    const selectionState = editorState.getSelection();

    // Update link URL
    Entity.replaceData(linkID, {url: urlValue});

    // Trigger an editor state update
    const updatedEditorState = RichUtils.toggleLink(editorState, selectionState, linkID);

    this.onChange(updatedEditorState);
  }

  /**
   * Will be called by LinkEditor when the user confirms or cancels new URL.
   * Will not be called if LinkEditor is closed by moving the cursor off of
   * the selected LINK entity.
   *
   * @param   {String} linkID The link entity key related to this LinkEditor
   * @returns {undefined}
   */
  onLinkEditorClose() {
    /*
     * Focus on editor immediately to avoid error that occurs when
     * `selection.extend` is called and another element has focus.
     * https://bugzilla.mozilla.org/show_bug.cgi?id=921444
     * https://github.com/facebook/draft-js/blob/342576bf7186d07c82a41d9ca8169130669747d6/src/component/selection/setDraftEditorSelection.js#L128-L134
     */
    this.focus();

    // Hide the editor.
    this.setState({
      linkEditorFocus: false,
      selectedLinkID: null,
    });
  }

  onKeyCommand(command) {
    const newEditorState = handleKeyCommand(this.state.editorState, command);

    if (newEditorState) {
      this.onChange(newEditorState);

      // Let draft-js know that keyboard command is handled.
      return true;
    }

    // Default draft-js implementation
    return false;
  }

  onReturnPressed() {
    const newEditorState = insertSoftNewline(this.state.editorState);

    // Update internal and external state
    this.onChange(newEditorState);

    // Cancel draft-js implementation
    return true;
  }

  onStyleButtonToggle(inlineStyle) {
    const newEditorState = toggleInlineStyle(this.state.editorState, inlineStyle);

    if (newEditorState) {
      this.onChange(newEditorState);
    }
  }

  renderLinkEditor(selectedLinkID) {
    if (!selectedLinkID) {
      return null;
    }

    // All entities are link entities.
    const linkEntity = getEntityByKey(selectedLinkID);
    const linkURL = linkEntity.getData().url;

    const coordinates = getCoordinates();

    return (
      <LinkEditor
        onFocus={this.onLinkEditorFocus}
        onURLChange={this.onLinkEditorChange}
        onBlur={this.onLinkEditorBlur}
        onClose={this.onLinkEditorClose}
        coordinates={coordinates}
        linkID={selectedLinkID}
        linkURL={linkURL}
      />
    );
  }

  render() {
    const {editorState, selectedLinkID} = this.state;
    const linkIsSelected = Boolean(selectedLinkID);

    return (
      <div className="rich-text-editor__root">
        <StyleButtonGroup
          styles={INLINE_STYLES}
          currentStyle={editorState.getCurrentInlineStyle()}
          linkIsSelected={linkIsSelected}
          onToggle={this.onStyleButtonToggle}
        />
        <div className="rich-text-editor__editor" onClick={this.focus}>
          <Editor
            customStyleMap={STYLE_MAP}
            editorState={editorState}
            handleReturn={this.onReturnPressed}
            handleKeyCommand={this.onKeyCommand}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            placeholder={this.props.placeholder}
            spellCheck={false}
            ref={(input) => (this.editorInput = input)}
          />
        </div>
        {this.renderLinkEditor(selectedLinkID)}
      </div>
    );
  }
}

RichText.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

RichText.defaultProps = {
  placeholder: '',
  value: '',
};

export default RichText;
