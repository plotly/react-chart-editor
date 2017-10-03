"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAreaInput = _react2.default.createClass({
  displayName: "TextAreaInput",

  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    visibleRows: PropTypes.number,
    areaWidth: PropTypes.number,
    textareaClass: PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      visibleRows: 10,
      areaWidth: 30
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  },
  onChange: function onChange(e) {
    var newValue = e.target.value;
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },
  render: function render() {
    return _react2.default.createElement(
      "span",
      null,
      _react2.default.createElement("textarea", {
        value: this.state.value,
        rows: this.props.visibleRows,
        cols: this.props.areaWidth,
        placeholder: this.props.placeholder,
        onChange: this.onChange,
        className: this.props.textareaClass
      })
    );
  }
});

module.exports = TextAreaInput;
//# sourceMappingURL=TextAreaInput.js.map