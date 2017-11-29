/*
 * The LinkEditor is a simple UI component that floats below a selected link
 * in the RichTextEditor, and lets the user enter a URL.
 */

import React, {Component, PropTypes} from 'react';
import {RETURN_KEY, ESCAPE_KEY} from '../../../../lib/constants';
import localize from '../../../../lib/localize';
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
      findDOMNode(this.refs.input).focus();
    }
  }

  componentWillReceiveProps(nextProps) {
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
    findDOMNode(this.refs.input).setSelectionRange(
      this.props.linkURL.length,
      this.props.linkURL.length
    );
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
    const {position} = this.state;
    const {onBlur, onFocus, linkURL, localize: _} = this.props;
    const placeholderText = _('Enter link URL');
    const urlText = _('URL');

    return (
      <div className="link-editor" style={{left: position.x, top: position.y}}>
        <span className="link-editor__label">{urlText}</span>

        <input
          className="link-editor__input"
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={ev => this.onInputChange(ev.target.value)}
          onKeyDown={ev => this.onInputKeyDown(ev)}
          ref="input"
          value={linkURL}
          placeholder={placeholderText}
        />
      </div>
    );
  }
}

LinkEditor.propTypes = {
  localize: PropTypes.func.isRequired,
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

export default localize(LinkEditor);
