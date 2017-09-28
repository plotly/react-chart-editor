"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require("classnames");

var _classnames3 = _interopRequireDefault(_classnames2);

var _hat = require("hat");

var _hat2 = _interopRequireDefault(_hat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * Basic html radio group - returns onOptionChange
 * (value of the radio input that is clicked)
 *
 * Options labels and values must be unique to the component
 * ActiveOption identifies the default checked option and
 * must be equal to the corresponding value
 *
 * Icons when present will replace the labels and circular radio buttons
 *
 * Can be displayed vertically (orientation: 'vertical') or
 * horizontally (orientation: 'horizontal')
 */

var RadioItems = function (_Component) {
  _inherits(RadioItems, _Component);

  function RadioItems(props) {
    _classCallCheck(this, RadioItems);

    var _this = _possibleConstructorReturn(this, (RadioItems.__proto__ || Object.getPrototypeOf(RadioItems)).call(this, props));

    _this.state = {
      activeOption: _this.props.activeOption,
      uid: (0, _hat2.default)()
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.renderOption = _this.renderOption.bind(_this);
    return _this;
  }

  _createClass(RadioItems, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // Reset the value to the graph's actual value
      if (nextProps.activeOption !== this.state.activeOption) {
        this.setState({
          activeOption: nextProps.activeOption
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var newActiveOption = e.target.value;

      // prevent action when clicking on the active item twice
      if (newActiveOption === this.state.activeOption) {
        return;
      }

      // Preserve Type
      if (newActiveOption === "true") {
        newActiveOption = true;
      } else if (newActiveOption === "false") {
        newActiveOption = false;
      } else if (typeof newActiveOption === "number") {
        newActiveOption = newActiveOption.toString();
      }

      this.setState({ activeOption: newActiveOption });
      this.props.onOptionChange(newActiveOption);
    }
  }, {
    key: "renderOption",
    value: function renderOption(optionName) {
      var _classnames;

      var label = optionName.label,
          value = optionName.value,
          icon = optionName.icon,
          disabled = optionName.disabled;

      var defaultActive = this.state.activeOption === value;

      var labelWrapperClass = (0, _classnames3.default)({
        "radio-item": true,
        "js-radio-item": true,
        icon: Boolean(icon)
      });

      var contentClass = (0, _classnames3.default)({
        "radio-item__content__icon": Boolean(icon),
        "radio-item__content": Boolean(!icon)
      }, icon);

      // noop the onChange handler if the option is disabled
      var onChange = disabled ? function () {} : this.handleChange;

      var optionClass = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, this.props.radioClassName, true), _defineProperty(_classnames, "+is-disabled", disabled), _defineProperty(_classnames, "+text-center", this.props.orientation === "horizontal"), _defineProperty(_classnames, "+inline-block", this.props.orientation === "horizontal"), _defineProperty(_classnames, "+text-left", this.props.orientation === "vertical"), _classnames));

      return _react2.default.createElement(
        "div",
        { className: optionClass, key: value },
        _react2.default.createElement(
          "label",
          {
            className: labelWrapperClass,
            ref: icon ? "iconOption" : "textOption"
          },
          _react2.default.createElement("input", {
            type: "radio",
            className: "radio-item__input",
            checked: defaultActive,
            onChange: onChange,
            ref: label,
            name: this.state.uid,
            value: value
          }),
          _react2.default.createElement("div", { className: contentClass })
        ),
        label ? _react2.default.createElement(
          "span",
          { className: "radio-item__title" },
          label
        ) : null
      );
    }
  }, {
    key: "render",
    value: function render() {
      var optionList = this.props.options.map(this.renderOption);

      return _react2.default.createElement(
        "div",
        { className: this.props.stylingClass },
        optionList
      );
    }
  }]);

  return RadioItems;
}(_react.Component);

RadioItems.defaultProps = {
  radioClassName: "+soft-quarter",
  orientation: "horizontal"
};

RadioItems.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.number]).isRequired,
    label: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    disabled: _propTypes2.default.bool
  })),
  onOptionChange: _propTypes2.default.func.isRequired,
  activeOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.number]),
  stylingClass: _propTypes2.default.string,
  radioClassName: _propTypes2.default.string,
  orientation: _propTypes2.default.oneOf(["vertical", "horizontal"])
};

module.exports = RadioItems;
//# sourceMappingURL=RadioItems.js.map