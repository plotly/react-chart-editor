import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { _ } from "@common/utils/i18n";

import shp from "shpjs";
import CustomFileReader from "@workspace/utils/CustomFileReader";
import * as ErrorMessages from "@workspace/constants/errorMessages";

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INITIAL: "INITIAL",
};

class UploadShapefile extends Component {
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
    if (nextProps.value && nextProps.value !== null) {
      this.setState({ status: STATUS.SUCCESS });
    }
  }

  upload(files) {
    const reader = new CustomFileReader();
    const fileExtension = files[0].name.slice(-4).toLowerCase();

    reader.onload = e => {
      const contents = e.target.result;
      const showErrorState = error => {
        console.error(error);

        this.setState({
          status: STATUS.ERROR,
          message: ErrorMessages.UPLOAD_SHAPE_FILE.PARSING_ERROR,
        });
      };

      if (fileExtension === "json") {
        try {
          this.props.onUpload(JSON.parse(contents));
        } catch (error) {
          showErrorState(error);
        }
      } else {
        /* shp accepts shapefiles and GeoJSON zipped files:
                 * https://github.com/calvinmetcalf/shapefile-js/blob/gh-pages/lib/index.js#L59
                */

        shp(contents)
          .then(geojson => {
            this.props.onUpload(geojson);
            /*
                     * remain in the "loading" state until the value comes
                     * back to the component in componentWillReceiveProps
                     */
          })
          .catch(showErrorState);
      }
    };

    if (files.length > 1) {
      this.setState({
        status: STATUS.ERROR,
        // TODO: move to constants
        message: ErrorMessages.UPLOAD_SHAPE_FILE.ONE_AT_A_TIME,
      });
    } else if (files.length === 1) {
      this.setState({ status: STATUS.LOADING });

      if (fileExtension === "json") {
        reader.readAsText(files[0]);
      } else {
        reader.readAsArrayBuffer(files[0]);
      }
    }
  }

  renderDropzone(content) {
    return (
      <Dropzone
        ref={this.getRef}
        onDrop={this.upload}
        className="upload-shapefile upload-shapefile__inactive-dropzone"
        activeClassName="upload-shapefile upload-shapefile__active-dropzone"
        disableClick={true}
      >
        {content}
      </Dropzone>
    );
  }

  renderBlankState() {
    // The clicking behaviour of 'react-dropzone' by default is already to open the browser's file picker
    // We don't need an onClick handler because that duplicates the event:
    // http://okonet.ru/react-dropzone/ Under the features section:
    // disableClick - Clicking the <Dropzone> brings up the browser file picker. To disable, set to true.

    return this.renderDropzone(
      <span className="+vertically-horizontally-centered-content upload-shapefile__dropzone-content">
        <a onClick={() => this_ref.open()}>upload </a>
        {_(
          "a GeoJSON file (.json or .geojson) or a .zip file containing a .shp, .shx, and .dbf file"
        )}
      </span>
    );
  }

  renderLoadingState() {
    return (
      <div className="upload-shapefile +cursor-loading">
        <div className="+vertically-horizontally-centered-content">
          {_("Loading...")}
        </div>
      </div>
    );
  }

  renderErrorState() {
    return this.renderDropzone(
      <div className="upload-shapefile__dropzone-content +vertically-horizontally-centered-content">
        <div className="+text-error">{this.state.message}</div>
        <a onClick={() => this._ref.open()}>{_("Upload again")}</a>
      </div>
    );
  }

  renderFullState() {
    // TODO: this will be hella slow for big JSON files..
    return (
      <div className="upload-shapefile upload-shapefile__geojson-container thin-scroll">
        GeoJSON:
        <pre className="upload-shapefile__geojson">
          {JSON.stringify(this.props.value, null, 2)
            .split("\n")
            .slice(0, 100)
            .join("\n")}
          ...
        </pre>
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

UploadShapefile.propTypes = {
  onUpload: PropTypes.func.isRequired,

  // geojson
  value: PropTypes.object.isRequired,
};

module.exports = UploadShapefile;
