import {Component} from 'react';
import PropTypes from 'prop-types';
import Drop from 'react-dropzone';

class Dropzone extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      content: '',
    };

    this.validFiletypes = {
      image: 'image/jpeg, image/jpg, image/svg, image/png, image/gif, image/bmp, image/webp',
      geojson: 'application/json',
    };

    this.onDrop = this.onDrop.bind(this);
    this.parsingError = this.parsingError.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
  }

  renderSuccess(value) {
    const _ = this.context.localize;

    if (this.props.fileType === 'image') {
      return (
        <div className="dropzone-container__image" style={{backgroundImage: `url(${value})`}} />
      );
    }
    if (this.props.fileType === 'geojson') {
      return (
        <div className="dropzone-container__message">
          <p>{_('GeoJSON loaded!')}</p>
          <p>{value.features.length + _(' features detected.')}</p>
        </div>
      );
    }

    return <div className="dropzone-container__message">{_('File loaded!')}</div>;
  }

  UNSAFE_componentWillMount() {
    const _ = this.context.localize;

    if (this.props.value && this.props.value !== '') {
      this.setState({content: this.renderSuccess(this.props.value)});
      return;
    }

    this.setState({
      content: (
        <div className="dropzone-container__message">
          <p>
            {_('Drop the ') +
              this.props.fileType +
              _(' to upload here or click to choose a file from your computer.')}
          </p>

          {this.validFiletypes[this.props.fileType] ? (
            <p>
              {_('Supported formats are: ') +
                this.validFiletypes[this.props.fileType].split('image/').join('') +
                '.'}
            </p>
          ) : null}
        </div>
      ),
    });
  }

  parsingError() {
    const _ = this.context.localize;
    const supportedFileTypes =
      this.props.fileType === 'image'
        ? this.validFiletypes[this.props.fileType].split('image/').join('')
        : this.validFiletypes[this.props.fileType];

    return (
      <div className="dropzone-container__message">
        {_("Yikes! This doesn't look like a valid ") + this.props.fileType}
        <p>{_('Try again with a supported file format: ') + supportedFileTypes + '.'}</p>
      </div>
    );
  }

  onLoad(e) {
    try {
      const payload = e.target.result;
      const parsedValue = this.props.fileType === 'image' ? payload : JSON.parse(payload);
      this.props.onUpdate(parsedValue);
      this.setState({
        content: this.renderSuccess(parsedValue),
      });
    } catch (error) {
      console.warn(error); // eslint-disable-line
      this.setState({
        content: this.parsingError(),
      });
    }
  }

  onDrop(accepted, rejected) {
    const _ = this.context.localize;
    const reader = new FileReader();

    if (accepted.length) {
      if (accepted.length > 1) {
        this.setState({
          content: (
            <div className="dropzone-container__message">
              <p>{_('Yikes! You can only upload one file at a time.')}</p>
            </div>
          ),
        });
        return;
      }
      this.setState({content: _('Loading...')});
      reader.onload = (e) => this.onLoad(e);
      if (this.props.fileType === 'image') {
        reader.readAsDataURL(accepted[0]);
      } else if (this.props.fileType === 'geojson') {
        reader.readAsText(accepted[0]);
      }
    }

    if (rejected.length) {
      this.setState({
        content: this.parsingError(),
      });
    }
  }

  render() {
    return (
      <Drop
        accept={this.validFiletypes[this.props.fileType]}
        onDrop={this.onDrop}
        activeClassName="dropzone-container--active"
        rejectClassName="dropzone-container--rejected"
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} className="dropzone-container">
            <input {...getInputProps()} />
            <div className="dropzone-container__content">{this.state.content}</div>
          </div>
        )}
      </Drop>
    );
  }
}

Dropzone.propTypes = {
  fileType: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  value: PropTypes.any,
};

Dropzone.contextTypes = {
  localize: PropTypes.func,
};

export default Dropzone;
