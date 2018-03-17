import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drop from 'react-dropzone';
import {localize} from 'lib';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    const _ = props.localize;

    this.state = {
      content: '',
    };

    this.validFiletypes = {
      image: _('jpeg/jpg, svg, png, gif, bmp, webp'),
    };

    this.onDrop = this.onDrop.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
  }

  renderSuccess(value) {
    const _ = this.props.localize;

    if (this.props.fileType === 'image') {
      return (
        <div
          className="dropzone-container__image"
          style={{backgroundImage: `url(${value})`}}
        />
      );
    }

    return (
      <div className="dropzone-container__message">{_('File loaded!')}</div>
    );
  }

  componentWillMount() {
    const _ = this.props.localize;

    if (this.props.fileType && this.props.value && this.props.value !== '') {
      this.setState({content: this.renderSuccess(this.props.value)});
      return;
    }

    this.setState({
      content: (
        <div className="dropzone-container__message">
          <p>
            {_('Drop the ') +
              (this.props.fileType ? this.props.fileType : _('file')) +
              _(
                ' to upload here or click to choose a file from your computer.'
              )}
          </p>

          {this.props.fileType === 'image' ? (
            <p>
              {_('Supported formats are: ') +
                this.validFiletypes[this.props.fileType] +
                '.'}
            </p>
          ) : null}
        </div>
      ),
    });
  }

  onLoad(e) {
    const _ = this.props.localize;
    const parsingError = (
      <div className="dropzone-container__message">
        <p>{_('Yikes! An error occurred while parsing this file.')}</p>
        <p>
          {this.props.fileType
            ? _('Try again with a supported file format: ') +
              this.validFiletypes[this.props.fileType] +
              '.'
            : _('Try again.')}
        </p>
      </div>
    );

    if (this.props.fileType === 'image') {
      try {
        this.props.onUpdate(e.target.result);
        this.setState({
          content: this.renderSuccess(e.target.result),
        });
      } catch (error) {
        console.warn(error); // eslint-disable-line
        this.setState({
          content: parsingError,
        });
      }
    }
  }

  onDrop(file) {
    const _ = this.props.localize;
    const reader = new FileReader();

    const invalidFileTypeMessage = this.props.fileType ? (
      <div className="dropzone-container__message">
        <p>
          {_("Yikes! This doesn't look like a valid ") +
            this.props.fileType +
            _('to us. ')}
        </p>
        <p>
          {_('Try again with a ') +
            this.validFiletypes[this.props.fileType] +
            '.'}
        </p>
      </div>
    ) : (
      _('Unsupported file format!')
    );

    if (file.length > 1) {
      this.setState({
        content: (
          <div className="dropzone-container__message">
            <p>{_('Yikes! You can only upload one file at a time.')}</p>
            <p>
              {_(
                'To upload multiple files, create multiple files and upload them individually.'
              )}
            </p>
          </div>
        ),
      });
      return;
    }

    this.setState({content: _('Loading...')});

    reader.onload = e => this.onLoad(e);

    if (this.props.fileType === 'image') {
      if (
        ['.jpeg', '.jpg', '.svg', '.png', '.gif', '.bmp', '.webp'].some(ext =>
          file[0].name.endsWith(ext)
        )
      ) {
        reader.readAsDataURL(file[0]);
      } else {
        this.setState({
          content: invalidFileTypeMessage,
        });
      }
    }
  }

  render() {
    return (
      <Drop
        ref="dzone"
        onDrop={this.onDrop}
        className="dropzone-container"
        activeClassName="dropzone-container--active"
      >
        <div className="dropzone-container__content">{this.state.content}</div>
      </Drop>
    );
  }
}

Dropzone.propTypes = {
  localize: PropTypes.func,
  fileType: PropTypes.string,
  onUpdate: PropTypes.func,
  value: PropTypes.any,
};

export default localize(Dropzone);
