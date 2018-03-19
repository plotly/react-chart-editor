import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drop from 'react-dropzone';
import {localize} from 'lib';
import shp from 'shpjs';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    const _ = props.localize;

    this.state = {
      content: '',
    };

    this.validFiletypes = {
      image: _('jpeg/jpg, svg, png, gif, bmp, webp'),
      shapefile: _('json/geojson or a zip containing shp, shx, and dbf files'),
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

    if (this.props.fileType === 'shapefile') {
      return _('GeoJSON loaded!');
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

          {['image', 'shapefile'].includes(this.props.fileType) ? (
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

  onLoad(e, isJson) {
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

    if (this.props.fileType === 'shapefile') {
      if (isJson) {
        try {
          this.props.onUpdate(JSON.parse(e.target.result));
          this.setState({
            content: this.renderSuccess(e.target.result),
          });
        } catch (error) {
          this.setState({
            content: parsingError,
          });
        }
        return;
      }

      shp(e.target.result)
        .then(geojson => {
          this.props.onUpdate(geojson);
          this.setState({
            content: this.renderSuccess(e.target.result),
          });
        })
        .catch(e => {
          console.warn(e); // eslint-disable-line
          this.setState({
            content: parsingError,
          });
        });
    }
  }

  onDrop(file) {
    const _ = this.props.localize;
    const isJson = /json$/i.test(file[0].name);

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

    const reader = new FileReader();
    reader.onload = e => this.onLoad(e, isJson);

    this.setState({content: _('Loading...')});

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

    if (this.props.fileType === 'shapefile') {
      if (!['.json', '.geojson', '.zip'].some(t => file[0].name.endsWith(t))) {
        this.setState({
          content: invalidFileTypeMessage,
        });
      } else {
        if (isJson) {
          reader.readAsText(file[0]);
        } else {
          reader.readAsArrayBuffer(file[0]);
        }
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
