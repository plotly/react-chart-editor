"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _i18n = require("@common/utils/i18n");

var _CustomFileReader = require("@workspace/utils/CustomFileReader");

var _CustomFileReader2 = _interopRequireDefault(_CustomFileReader);

var _errorMessages = require("@workspace/constants/errorMessages");

var ErrorMessages = _interopRequireWildcard(_errorMessages);

var _workspace = require("@workspace/constants/workspace");

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

var UploadImagefile = function (_Component) {
  _inherits(UploadImagefile, _Component);

  function UploadImagefile(props) {
    _classCallCheck(this, UploadImagefile);

    var _this = _possibleConstructorReturn(this, (UploadImagefile.__proto__ || Object.getPrototypeOf(UploadImagefile)).call(this, props));

    _this.state = {
      status: STATUS.INITIAL
    };

    _this.upload = _this.upload.bind(_this);
    _this.renderBlankState = _this.renderBlankState.bind(_this);
    _this.renderFullState = _this.renderFullState.bind(_this);
    _this.renderErrorState = _this.renderErrorState.bind(_this);
    _this.renderLoadingState = _this.renderLoadingState.bind(_this);
    _this.renderDropzone = _this.renderDropzone.bind(_this);
    return _this;
  }

  _createClass(UploadImagefile, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== null && nextProps.value !== _workspace.IMAGE_PLACEHOLDER) {
        this.setState({ status: STATUS.SUCCESS });
      }
    }
  }, {
    key: "upload",
    value: function upload(files) {
      var _this2 = this;

      var reader = new _CustomFileReader2.default();
      reader.onload = function (e) {
        var contents = e.target.result;

        // Supported image types on Plotly: https://plot.ly/javascript/static-image-export/#formats-supported
        // 'PNG', 'JPG/JPEG', 'SVG'
        var supportedImageDataTypes = ["data:image/jpeg", "data:image/jpg", "data:image/svg", "data:image/png", "data:image/gif", "data:image/bmp", "data:image/webp"];

        var imageTypeIsSupported = supportedImageDataTypes.some(function (type) {
          return contents.startsWith(type);
        });

        if (imageTypeIsSupported) {
          _this2.props.onUpload(contents);
        } else {
          _this2.setState({
            status: STATUS.ERROR,
            message: ErrorMessages.UPLOAD_IMAGE_FILE.PARSING_ERROR
          });
        }
      };

      if (files.length > 1) {
        this.setState({
          status: STATUS.ERROR,
          message: ErrorMessages.UPLOAD_IMAGE_FILE.ONE_AT_A_TIME
        });
      } else if (files.length === 1) {
        this.setState({ status: STATUS.LOADING });
        reader.readAsDataURL(files[0]);
      }
    }
  }, {
    key: "renderDropzone",
    value: function renderDropzone(content) {
      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          ref: "dzone",
          onDrop: this.upload,
          className: "upload-imagefile js-upload-imagefile upload-imagefile__inactive-dropzone",
          activeClassName: "upload-imagefile upload-imagefile__active-dropzone",
          disableClick: true
        },
        content
      );
    }
  }, {
    key: "renderBlankState",
    value: function renderBlankState() {
      var _this3 = this;

      return this.renderDropzone(_react2.default.createElement(
        "div",
        { className: "upload-imagefile__dropzone-content full-height" },
        _react2.default.createElement(
          "span",
          { className: "+vertically-horizontally-centered-content" },
          _react2.default.createElement(
            "a",
            { onClick: function onClick() {
                return _this3.refs.dzone.open();
              } },
            "upload"
          ),
          " ",
          _react2.default.createElement(
            "span",
            null,
            "or drag and drop an image"
          )
        )
      ));
    }
  }, {
    key: "renderLoadingState",
    value: function renderLoadingState() {
      return _react2.default.createElement(
        "div",
        { className: "upload-imagefile +cursor-loading full-height" },
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
      var _this4 = this;

      return this.renderDropzone(_react2.default.createElement(
        "div",
        { className: "full-height" },
        _react2.default.createElement(
          "div",
          { className: "+vertically-horizontally-centered-content full-width" },
          _react2.default.createElement(
            "div",
            { className: "+text-error" },
            this.state.message
          ),
          _react2.default.createElement(
            "a",
            { onClick: function onClick() {
                return _this4.refs.dzone.open();
              } },
            (0, _i18n._)("Upload again")
          )
        )
      ));
    }
  }, {
    key: "renderFullState",
    value: function renderFullState() {
      return _react2.default.createElement(
        "div",
        { className: "upload-imagefile upload-imagefile-container thin-scroll" },
        _react2.default.createElement("img", {
          src: this.props.value,
          className: "uploaded-image js-uploaded-image"
        })
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

  return UploadImagefile;
}(_react.Component);

UploadImagefile.propTypes = {
  onUpload: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string.isRequired
};

module.exports = UploadImagefile;
//# sourceMappingURL=UploadImageFile.js.map