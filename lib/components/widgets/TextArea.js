'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this.state = {
      value: _this.props.value
    };

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(TextArea, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Reset the value to the graph's actual value
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var newValue = e.target.value;
      this.setState({ value: newValue });
      this.props.onChange(newValue);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('textarea', {
          value: this.state.value,
          rows: this.props.visibleRows,
          cols: this.props.areaWidth,
          placeholder: this.props.placeholder,
          onChange: this.onChange,
          className: this.props.textareaClass
        })
      );
    }
  }]);

  return TextArea;
}(_react.Component);

exports.default = TextArea;


TextArea.propTypes = {
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  visibleRows: _propTypes2.default.number,
  areaWidth: _propTypes2.default.number,
  textareaClass: _propTypes2.default.string
};

TextArea.defaultProps = {
  visibleRows: 10,
  areaWidth: 30
};
//# sourceMappingURL=TextArea.js.map