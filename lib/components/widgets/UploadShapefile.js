"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _i18n = require("@common/utils/i18n");

var _shpjs = require("shpjs");

var _shpjs2 = _interopRequireDefault(_shpjs);

var _CustomFileReader = require("@workspace/utils/CustomFileReader");

var _CustomFileReader2 = _interopRequireDefault(_CustomFileReader);

var _errorMessages = require("@workspace/constants/errorMessages");

var ErrorMessages = _interopRequireWildcard(_errorMessages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INITIAL: "INITIAL"
};

var UploadShapefile = function (_Component) {
  _inherits(UploadShapefile, _Component);

  function UploadShapefile(props) {
    _classCallCheck(this, UploadShapefile);

    var _this = _possibleConstructorReturn(this, (UploadShapefile.__proto__ || Object.getPrototypeOf(UploadShapefile)).call(this, props));

    _this.state = {
      status: STATUS.INITIAL
    };

    _this.upload = _this.upload.bind(_this);
    _this.renderBlankState = _this.renderBlankState.bind(_this);
    _this.renderFullState = _this.renderFullState.bind(_this);
    _this.renderErrorState = _this.renderErrorState.bind(_this);
    _this.renderLoadingState = _this.renderLoadingState.bind(_this);
    _this.renderDropzone = _this.renderDropzone.bind(_this);
    _this.getRef = _this.getRef.bind(_this);
    return _this;
  }

  _createClass(UploadShapefile, [{
    key: "getRef",
    value: function getRef(c) {
      this._ref = c;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== null) {
        this.setState({ status: STATUS.SUCCESS });
      }
    }
  }, {
    key: "upload",
    value: function upload(files) {
      var _this2 = this;

      var reader = new _CustomFileReader2.default();
      var fileExtension = files[0].name.slice(-4).toLowerCase();

      reader.onload = function (e) {
        var contents = e.target.result;
        var showErrorState = function showErrorState(error) {
          console.error(error);

          _this2.setState({
            status: STATUS.ERROR,
            message: ErrorMessages.UPLOAD_SHAPE_FILE.PARSING_ERROR
          });
        };

        if (fileExtension === "json") {
          try {
            _this2.props.onUpload(JSON.parse(contents));
          } catch (error) {
            showErrorState(error);
          }
        } else {
          /* shp accepts shapefiles and GeoJSON zipped files:
                   * https://github.com/calvinmetcalf/shapefile-js/blob/gh-pages/lib/index.js#L59
                  */

          (0, _shpjs2.default)(contents).then(function (geojson) {
            _this2.props.onUpload(geojson);
            /*
                     * remain in the "loading" state until the value comes
                     * back to the component in componentWillReceiveProps
                     */
          }).catch(showErrorState);
        }
      };

      if (files.length > 1) {
        this.setState({
          status: STATUS.ERROR,
          // TODO: move to constants
          message: ErrorMessages.UPLOAD_SHAPE_FILE.ONE_AT_A_TIME
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
  }, {
    key: "renderDropzone",
    value: function renderDropzone(content) {
      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          ref: this.getRef,
          onDrop: this.upload,
          className: "upload-shapefile upload-shapefile__inactive-dropzone",
          activeClassName: "upload-shapefile upload-shapefile__active-dropzone",
          disableClick: true
        },
        content
      );
    }
  }, {
    key: "renderBlankState",
    value: function renderBlankState() {
      // The clicking behaviour of 'react-dropzone' by default is already to open the browser's file picker
      // We don't need an onClick handler because that duplicates the event:
      // http://okonet.ru/react-dropzone/ Under the features section:
      // disableClick - Clicking the <Dropzone> brings up the browser file picker. To disable, set to true.

      return this.renderDropzone(_react2.default.createElement(
        "span",
        { className: "+vertically-horizontally-centered-content upload-shapefile__dropzone-content" },
        _react2.default.createElement(
          "a",
          { onClick: function onClick() {
              return this_ref.open();
            } },
          "upload "
        ),
        (0, _i18n._)("a GeoJSON file (.json or .geojson) or a .zip file containing a .shp, .shx, and .dbf file")
      ));
    }
  }, {
    key: "renderLoadingState",
    value: function renderLoadingState() {
      return _react2.default.createElement(
        "div",
        { className: "upload-shapefile +cursor-loading" },
        _react2.default.createElement(
          "div",
          { className: "+vertically-horizontally-centered-content" },
          (0, _i18n._)("Loading...")
        )
      );
    }
  }, {
    key: "renderErrorState",
    value: function renderErrorState() {
      var _this3 = this;

      return this.renderDropzone(_react2.default.createElement(
        "div",
        { className: "upload-shapefile__dropzone-content +vertically-horizontally-centered-content" },
        _react2.default.createElement(
          "div",
          { className: "+text-error" },
          this.state.message
        ),
        _react2.default.createElement(
          "a",
          { onClick: function onClick() {
              return _this3._ref.open();
            } },
          (0, _i18n._)("Upload again")
        )
      ));
    }
  }, {
    key: "renderFullState",
    value: function renderFullState() {
      // TODO: this will be hella slow for big JSON files..
      return _react2.default.createElement(
        "div",
        { className: "upload-shapefile upload-shapefile__geojson-container thin-scroll" },
        "GeoJSON:",
        _react2.default.createElement(
          "pre",
          { className: "upload-shapefile__geojson" },
          JSON.stringify(this.props.value, null, 2).split("\n").slice(0, 100).join("\n"),
          "..."
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var content = void 0;
      if (this.state.status === STATUS.LOADING) {
        content = this.renderLoadingState();
      } else if (this.state.status === STATUS.INITIAL) {
        content = this.renderBlankState();
      } else if (this.state.status === STATUS.SUCCESS) {
        content = this.renderFullState();
      } else if (this.state.status === STATUS.ERROR) {
        content = this.renderErrorState();
      }

      return _react2.default.createElement(
        "div",
        null,
        content
      );
    }
  }]);

  return UploadShapefile;
}(_react.Component);

UploadShapefile.propTypes = {
  onUpload: _propTypes2.default.func.isRequired,

  // geojson
  value: _propTypes2.default.object.isRequired
};

module.exports = UploadShapefile;
//# sourceMappingURL=UploadShapefile.js.map