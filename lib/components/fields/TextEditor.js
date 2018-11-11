'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../../lib');

var _LaTeX = require('../widgets/text_editors/LaTeX');

var _LaTeX2 = _interopRequireDefault(_LaTeX);

var _RichText = require('../widgets/text_editors/RichText');

var _RichText2 = _interopRequireDefault(_RichText);

var _MultiFormat = require('../widgets/text_editors/MultiFormat');

var _MultiFormat2 = _interopRequireDefault(_MultiFormat);

var _HTML = require('../widgets/text_editors/HTML');

var _HTML2 = _interopRequireDefault(_HTML);

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedTextEditor = function (_Component) {
  _inherits(UnconnectedTextEditor, _Component);

  function UnconnectedTextEditor() {
    _classCallCheck(this, UnconnectedTextEditor);

    return _possibleConstructorReturn(this, (UnconnectedTextEditor.__proto__ || Object.getPrototypeOf(UnconnectedTextEditor)).apply(this, arguments));
  }

  _createClass(UnconnectedTextEditor, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          attr = _props.attr,
          container = _props.container,
          htmlOnly = _props.htmlOnly,
          latexOnly = _props.latexOnly,
          multiValued = _props.multiValued,
          richTextOnly = _props.richTextOnly,
          updatePlot = _props.updatePlot;
      var _ = this.context.localize;


      var fullValue = this.props.fullValue;

      var placeholder = void 0;
      if (multiValued || fullValue && (!container || !container[attr])) {
        placeholder = fullValue;
        fullValue = '';
      }

      var editor = void 0;

      if (latexOnly) {
        placeholder = _('Enter LaTeX formatted text');
        editor = _react2.default.createElement(_LaTeX2.default, { value: fullValue, placeholder: placeholder, onChange: updatePlot });
      } else if (richTextOnly) {
        editor = _react2.default.createElement(_RichText2.default, { value: fullValue, placeholder: placeholder, onChange: updatePlot });
      } else if (htmlOnly) {
        placeholder = _('Enter html formatted text');
        editor = _react2.default.createElement(_HTML2.default, { value: fullValue, placeholder: placeholder, onChange: updatePlot });
      } else {
        editor = _react2.default.createElement(_MultiFormat2.default, { value: fullValue, placeholder: placeholder, onChange: updatePlot });
      }

      return _react2.default.createElement(
        _Field2.default,
        this.props,
        _react2.default.createElement(
          'div',
          { className: 'text-editor' },
          editor
        )
      );
    }
  }]);

  return UnconnectedTextEditor;
}(_react.Component);

UnconnectedTextEditor.propTypes = _extends({}, _Field2.default.propTypes, {
  fullValue: _propTypes2.default.any,
  htmlOnly: _propTypes2.default.bool,
  latexOnly: _propTypes2.default.bool,
  richTextOnly: _propTypes2.default.bool,
  updatePlot: _propTypes2.default.func
});

UnconnectedTextEditor.contextType = _context.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(UnconnectedTextEditor, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (plotProps.isVisible && plotProps.multiValued) {
      plotProps.isVisible = false;
    }
  }
});
//# sourceMappingURL=TextEditor.js.map