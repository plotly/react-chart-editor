'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropzone = function (_Component) {
  _inherits(Dropzone, _Component);

  function Dropzone(props, context) {
    _classCallCheck(this, Dropzone);

    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props, context));

    var _ = context.localize;

    _this.state = {
      content: ''
    };

    _this.validFiletypes = {
      image: _('image/jpeg, image/jpg, image/svg, image/png, image/gif, image/bmp, image/webp')
    };

    _this.onDrop = _this.onDrop.bind(_this);
    _this.renderSuccess = _this.renderSuccess.bind(_this);
    return _this;
  }

  _createClass(Dropzone, [{
    key: 'renderSuccess',
    value: function renderSuccess(value) {
      var _ = this.context.localize;

      if (this.props.fileType === 'image') {
        return _react2.default.createElement('div', { className: 'dropzone-container__image', style: { backgroundImage: 'url(' + value + ')' } });
      }

      return _react2.default.createElement(
        'div',
        { className: 'dropzone-container__message' },
        _('File loaded!')
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _ = this.context.localize;

      if (this.props.value && this.props.value !== '') {
        this.setState({ content: this.renderSuccess(this.props.value) });
        return;
      }

      this.setState({
        content: _react2.default.createElement(
          'div',
          { className: 'dropzone-container__message' },
          _react2.default.createElement(
            'p',
            null,
            _('Drop the ') + this.props.fileType + _(' to upload here or click to choose a file from your computer.')
          ),
          this.props.fileType === 'image' ? _react2.default.createElement(
            'p',
            null,
            _('Supported formats are: ') + this.validFiletypes[this.props.fileType].split('image/').join('') + '.'
          ) : null
        )
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      var _ = this.context.localize;
      var supportedFileTypes = this.props.fileType === 'image' ? this.validFiletypes[this.props.fileType].split('image/').join('') : this.validFiletypes[this.props.fileType];

      var parsingError = _react2.default.createElement(
        'div',
        { className: 'dropzone-container__message' },
        _react2.default.createElement(
          'p',
          null,
          _('Yikes! An error occurred while parsing this file.')
        ),
        _react2.default.createElement(
          'p',
          null,
          _('Try again with a supported file format: ') + supportedFileTypes + '.'
        )
      );

      if (this.props.fileType === 'image') {
        try {
          this.props.onUpdate(e.target.result);
          this.setState({
            content: this.renderSuccess(e.target.result)
          });
        } catch (error) {
          console.warn(error); // eslint-disable-line
          this.setState({
            content: parsingError
          });
        }
      }
    }
  }, {
    key: 'onDrop',
    value: function onDrop(accepted, rejected) {
      var _this2 = this;

      var _ = this.context.localize;
      var reader = new FileReader();

      if (accepted.length) {
        if (accepted.length > 1) {
          this.setState({
            content: _react2.default.createElement(
              'div',
              { className: 'dropzone-container__message' },
              _react2.default.createElement(
                'p',
                null,
                _('Yikes! You can only upload one file at a time.')
              ),
              _react2.default.createElement(
                'p',
                null,
                _('To upload multiple files, create multiple files and upload them individually.')
              )
            )
          });
          return;
        }
        this.setState({ content: _('Loading...') });
        reader.onload = function (e) {
          return _this2.onLoad(e);
        };
        if (this.props.fileType === 'image') {
          reader.readAsDataURL(accepted[0]);
        }
      }

      if (rejected.length) {
        var supportedFileTypes = this.props.fileType === 'image' ? this.validFiletypes[this.props.fileType].split('image/').join('') : this.validFiletypes[this.props.fileType];

        this.setState({
          content: _react2.default.createElement(
            'div',
            { className: 'dropzone-container__message' },
            _react2.default.createElement(
              'p',
              null,
              _("Yikes! This doesn't look like a valid ") + this.props.fileType + _(' to us. ')
            ),
            _react2.default.createElement(
              'p',
              null,
              _('Try again with a ') + supportedFileTypes + ' file.'
            )
          )
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          accept: this.validFiletypes[this.props.fileType],
          onDrop: this.onDrop,
          className: 'dropzone-container',
          activeClassName: 'dropzone-container--active',
          rejectClassName: 'dropzone-container--rejected'
        },
        _react2.default.createElement(
          'div',
          { className: 'dropzone-container__content' },
          this.state.content
        )
      );
    }
  }]);

  return Dropzone;
}(_react.Component);

Dropzone.propTypes = {
  fileType: _propTypes2.default.string.isRequired,
  onUpdate: _propTypes2.default.func,
  value: _propTypes2.default.any
};

Dropzone.contextType = _context.EditorControlsContext;

exports.default = Dropzone;
//# sourceMappingURL=Dropzone.js.map