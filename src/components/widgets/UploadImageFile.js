import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { _ } from "@common/utils/i18n";

import CustomFileReader from "@workspace/utils/CustomFileReader";
import * as ErrorMessages from "@workspace/constants/errorMessages";
import { IMAGE_PLACEHOLDER } from "@workspace/constants/workspace";

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INITIAL: "INITIAL",
};

class UploadImagefile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS.INITIAL,
    };

    this.upload = this.upload.bind(this);
    this.renderBlankState = this.renderBlankState.bind(this);
    this.renderFullState = this.renderFullState.bind(this);
    this.renderErrorState = this.renderErrorState.bind(this);
    this.renderLoadingState = this.renderLoadingState.bind(this);
    this.renderDropzone = this.renderDropzone.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  getRef(c) {
    this._ref = c;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value &&
      nextProps.value !== null &&
      nextProps.value !== IMAGE_PLACEHOLDER
    ) {
      this.setState({ status: STATUS.SUCCESS });
    }
  }

  upload(files) {
    const reader = new CustomFileReader();
    reader.onload = e => {
      const contents = e.target.result;

      // Supported image types on Plotly: https://plot.ly/javascript/static-image-export/#formats-supported
      // 'PNG', 'JPG/JPEG', 'SVG'
      const supportedImageDataTypes = [
        "data:image/jpeg",
        "data:image/jpg",
        "data:image/svg",
        "data:image/png",
        "data:image/gif",
        "data:image/bmp",
        "data:image/webp",
      ];

      const imageTypeIsSupported = supportedImageDataTypes.some(type => {
        return contents.startsWith(type);
      });

      if (imageTypeIsSupported) {
        this.props.onUpload(contents);
      } else {
        this.setState({
          status: STATUS.ERROR,
          message: ErrorMessages.UPLOAD_IMAGE_FILE.PARSING_ERROR,
        });
      }
    };

    if (files.length > 1) {
      this.setState({
        status: STATUS.ERROR,
        message: ErrorMessages.UPLOAD_IMAGE_FILE.ONE_AT_A_TIME,
      });
    } else if (files.length === 1) {
      this.setState({ status: STATUS.LOADING });
      reader.readAsDataURL(files[0]);
    }
  }

  renderDropzone(content) {
    return (
      <Dropzone
        ref={this.getRef}
        onDrop={this.upload}
        className="upload-imagefile js-upload-imagefile upload-imagefile__inactive-dropzone"
        activeClassName="upload-imagefile upload-imagefile__active-dropzone"
        disableClick={true}
      >
        {content}
      </Dropzone>
    );
  }

  renderBlankState() {
    return this.renderDropzone(
      <div className="upload-imagefile__dropzone-content full-height">
        <span className="+vertically-horizontally-centered-content">
          <a onClick={() => this._ref.open()}>upload</a>{" "}
          <span>or drag and drop an image</span>
        </span>
      </div>
    );
  }

  renderLoadingState() {
    return (
      <div className="upload-imagefile +cursor-loading full-height">
        <div className="+vertically-horizontally-centered-content">
          {_("Loading...")}
        </div>
      </div>
    );
  }

  renderErrorState() {
    return this.renderDropzone(
      <div className="full-height">
        <div className="+vertically-horizontally-centered-content full-width">
          <div className="+text-error">{this.state.message}</div>
          <a onClick={() => this._ref.open()}>{_("Upload again")}</a>
        </div>
      </div>
    );
  }

  renderFullState() {
    return (
      <div className="upload-imagefile upload-imagefile-container thin-scroll">
        <img
          src={this.props.value}
          className="uploaded-image js-uploaded-image"
        />
      </div>
    );
  }

  render() {
    let content;
    if (this.state.status === STATUS.LOADING) {
      content = this.renderLoadingState();
    } else if (this.state.status === STATUS.INITIAL) {
      content = this.renderBlankState();
    } else if (this.state.status === STATUS.SUCCESS) {
      content = this.renderFullState();
    } else if (this.state.status === STATUS.ERROR) {
      content = this.renderErrorState();
    }

    return <div>{content}</div>;
  }
}

UploadImagefile.propTypes = {
  onUpload: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default UploadImagefile;
