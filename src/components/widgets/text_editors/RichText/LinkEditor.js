/*
 * The LinkEditor is a simple UI component that floats below a selected link
 * in the RichTextEditor, and lets the user enter a URL.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RETURN_KEY, ESCAPE_KEY} from 'lib/constants';
import {findDOMNode} from 'react-dom';

class LinkEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Use cached position to maintain position during times of focus.
      position: this.getUpdatedPosition(props),
      originalLinkURL: props.linkURL,
    };
  }

  componentDidMount() {
    // Focus the input field if the URL value is empty
    if (this.props.linkURL.trim() === '') {
      findDOMNode(this.input).focus();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {props} = this;

    // Update position if we are editing a new link
    if (nextProps.linkID !== props.linkID) {
      this.setState({
        position: this.getUpdatedPosition(props),
      });
    }
  }

  componentDidUpdate() {
    // Cursor dissappears when component rerenders, to make sure it's present
    // we're using setSelection range to make it appear at the end of text:
    // https://github.com/plotly/streambed/issues/9964
    findDOMNode(this.input).setSelectionRange(this.props.linkURL.length, this.props.linkURL.length);
  }

  getUpdatedPosition(props) {
    const {x, y} = props.coordinates;

    return {x, y};
  }

  onInputChange(urlValue) {
    const {linkID, onURLChange} = this.props;

    // Call back to parent
    onURLChange(linkID, urlValue);
  }

  onInputKeyDown(ev) {
    /*
     * `KeyboardEvent.key` enjoys excellent cross-browser support.
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
     */
    const {key} = ev;

    if (key === RETURN_KEY) {
      // Save changes
      ev.preventDefault();

      this.props.onClose(this.props.linkID);
    }

    if (key === ESCAPE_KEY) {
      // Cancel changes
      ev.preventDefault();

      // Restore original URL
      this.onInputChange(this.state.originalLinkURL);

      this.props.onClose(this.props.linkID);
    }
  }

  render() {
    const {localize: _} = this.context;
    const {position} = this.state;
    const {onBlur, onFocus, linkURL} = this.props;
    const placeholderText = _('Enter Link URL');
    const urlText = _('URL');
    // TODO: add close button
    return (
      <div className="rich-text-editor__link-editor" style={{left: position.x, top: position.y}}>
        <span className="rich-text-editor__link-editor__label">{urlText}</span>
        <input
          className="rich-text-editor__link-editor__input"
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={(ev) => this.onInputChange(ev.target.value)}
          onKeyDown={(ev) => this.onInputKeyDown(ev)}
          ref={(input) => (this.input = input)}
          value={linkURL}
          placeholder={placeholderText}
        />
      </div>
    );
  }
}

LinkEditor.propTypes = {
  linkID: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onURLChange: PropTypes.func.isRequired,

  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

LinkEditor.defaultProps = {
  coordinates: {
    x: 0,
    y: 0,
  },
};

LinkEditor.contextTypes = {
  localize: PropTypes.func.isRequired,
};

export default LinkEditor;
