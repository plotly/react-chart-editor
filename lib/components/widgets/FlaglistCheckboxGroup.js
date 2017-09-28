"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CheckboxGroup = require("./CheckboxGroup");

var _CheckboxGroup2 = _interopRequireDefault(_CheckboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component handles activeOption with shape "x+y+z"
// and ties it to the CheckboxGroup Component
var FlaglistCheckboxGroup = _react2.default.createClass({
  displayName: "FlaglistCheckboxGroup",

  propTypes: {
    options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      value: _react2.default.PropTypes.string.isRequired,
      label: _react2.default.PropTypes.string.isRequired
    })).isRequired,
    activeOption: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    className: _react2.default.PropTypes.string,
    orientation: _react2.default.PropTypes.string
  },

  // convert plotly.js's "all" or "none" option in its `flaglist` type
  // to a series of options separated by `+` that our component can handle
  _parseFlags: function _parseFlags(option) {
    var activeOption = void 0;
    if (option === "all") {
      activeOption = this.props.options.map(function (o) {
        return o.value;
      }).join("+");
    } else if (option === "none") {
      activeOption = "";
    } else {
      activeOption = option;
    }
    return activeOption;
  },
  getInitialState: function getInitialState() {
    var currentActiveOption = void 0;
    if (this.props.activeOption !== null) {
      currentActiveOption = this.props.activeOption;
    } else {
      currentActiveOption = "";
    }

    return {
      activeOption: this._parseFlags(currentActiveOption)
    };
  },


  // Sync local state to parent props.
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ activeOption: this._parseFlags(nextProps.activeOption) });
  },


  // Called whenever a checkbox is changed, this updates the local
  // state to reflect the new activeOptions and then called props.onChange with
  // the new options.
  handleChange: function handleChange(newOptions) {
    var newActiveOptions = "";

    newOptions.map(function (option) {
      if (option.checked === true) {
        newActiveOptions += option.value + "+";
      }
    });

    newActiveOptions = newActiveOptions.slice(0, -1);

    if (newActiveOptions.length === 0) {
      newActiveOptions = "none";
    }

    this.setState({ activeOption: newActiveOptions });
    this.props.onChange(newActiveOptions);
  },


  // Turns the activeOptions "e.g "x+y+z" into an array that
  // the CheckboxGroup component can handle
  renderCheckedOption: function renderCheckedOption() {
    var activeOptions = this.state.activeOption.split("+");
    var allOptions = this.props.options;
    var newOptions = [];

    allOptions.map(function (option) {
      var currentChecked = void 0;

      if (activeOptions.indexOf(option.value) > -1) {
        currentChecked = true;
      } else {
        currentChecked = false;
      }

      newOptions.push({
        label: option.label,
        value: option.value,
        checked: currentChecked
      });
    });

    return newOptions;
  },
  render: function render() {
    return _react2.default.createElement(_CheckboxGroup2.default, {
      options: this.renderCheckedOption(),
      onChange: this.handleChange,
      className: this.props.className,
      orientation: this.props.orientation
    });
  }
});

module.exports = FlaglistCheckboxGroup;
//# sourceMappingURL=FlaglistCheckboxGroup.js.map