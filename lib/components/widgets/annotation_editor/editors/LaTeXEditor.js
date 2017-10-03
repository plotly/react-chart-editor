"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _convertFormats = require("@workspace/components/widgets/annotation_editor/convertFormats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LaTeXEditor = function (_Component) {
  _inherits(LaTeXEditor, _Component);

  function LaTeXEditor(props) {
    _classCallCheck(this, LaTeXEditor);

    // Internally, represesent the LaTeX document without the
    // wrapping `$...$` characters.
    var _this = _possibleConstructorReturn(this, (LaTeXEditor.__proto__ || Object.getPrototypeOf(LaTeXEditor)).call(this, props));

    var unwrappedValue = _this.unwrap(props.value);

    _this.state = {
      value: unwrappedValue
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(LaTeXEditor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var unwrappedNextValue = this.unwrap(nextProps.value);

      if (unwrappedNextValue !== this.state.value) {
        this.setState({
          value: unwrappedNextValue
        });
      }
    }

    // Return a new value with wrapping `$...$` removed.

  }, {
    key: "unwrap",
    value: function unwrap(value) {
      if ((0, _convertFormats.isLaTeXExpr)(value)) {
        return value.substr(1, value.length - 2);
      }

      return value;
    }

    // Wrap value in `$...$`.

  }, {
    key: "wrap",
    value: function wrap(value) {
      if (!(0, _convertFormats.isLaTeXExpr)(value)) {
        return "$" + value + "$";
      }

      return value;
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var value = this.wrap(e.target.value);
      this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "latex-editor" },
        _react2.default.createElement("textarea", {
          value: this.state.value,
          placeholder: this.props.placeholder,
          onChange: this.onChange,
          onBlur: this.onBlur,
          className: "latex-editor__textarea"
        })
      );
    }
  }]);

  return LaTeXEditor;
}(_react.Component);

LaTeXEditor.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string
};

LaTeXEditor.defaultProps = {
  value: "",
  placeholder: ""
};

exports.default = LaTeXEditor;
module.exports = exports["default"];
//# sourceMappingURL=LaTeXEditor.js.map