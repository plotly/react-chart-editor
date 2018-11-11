'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CheckboxGroup = require('./CheckboxGroup');

var _CheckboxGroup2 = _interopRequireDefault(_CheckboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component handles activeOption with shape "x+y+z"
// and ties it to the CheckboxGroup Component
var FlaglistCheckboxGroup = function (_Component) {
  _inherits(FlaglistCheckboxGroup, _Component);

  function FlaglistCheckboxGroup(props) {
    _classCallCheck(this, FlaglistCheckboxGroup);

    var _this = _possibleConstructorReturn(this, (FlaglistCheckboxGroup.__proto__ || Object.getPrototypeOf(FlaglistCheckboxGroup)).call(this, props));

    var currentActiveOption = void 0;
    if (props.activeOption !== null) {
      currentActiveOption = props.activeOption;
    } else {
      currentActiveOption = '';
    }

    _this.state = {
      activeOption: _this.parseFlags(currentActiveOption)
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  // convert plotly.js's "all" or "none" option in its `flaglist` type
  // to a series of options separated by `+` that our component can handle


  _createClass(FlaglistCheckboxGroup, [{
    key: 'parseFlags',
    value: function parseFlags(option) {
      var activeOption = void 0;
      if (option === 'all') {
        activeOption = this.props.options.map(function (o) {
          return o.value;
        }).join('+');
      } else if (option === 'none') {
        activeOption = '';
      } else {
        activeOption = option;
      }
      return activeOption;
    }

    // Sync local state to parent props.

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ activeOption: this.parseFlags(nextProps.activeOption) });
    }

    // Called whenever a checkbox is changed, this updates the local
    // state to reflect the new activeOptions and then called props.onChange with
    // the new options.

  }, {
    key: 'handleChange',
    value: function handleChange(newOptions) {
      var newActiveOptions = '';

      newOptions.map(function (option) {
        if (option.checked === true) {
          newActiveOptions += option.value + '+';
        }
      });

      newActiveOptions = newActiveOptions.slice(0, -1);

      if (newActiveOptions.length === 0) {
        newActiveOptions = 'none';
      }

      this.setState({ activeOption: newActiveOptions });
      this.props.onChange(newActiveOptions);
    }

    // Turns the activeOptions "e.g "x+y+z" into an array that
    // the CheckboxGroup component can handle

  }, {
    key: 'renderCheckedOption',
    value: function renderCheckedOption() {
      var activeOptions = typeof this.state.activeOption === 'string' ? this.state.activeOption.split('+') : [this.state.activeOption];
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
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_CheckboxGroup2.default, {
        options: this.renderCheckedOption(),
        onChange: this.handleChange,
        className: this.props.className,
        orientation: this.props.orientation
      });
    }
  }]);

  return FlaglistCheckboxGroup;
}(_react.Component);

FlaglistCheckboxGroup.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.any.isRequired,
    label: _propTypes2.default.string.isRequired
  })).isRequired,
  activeOption: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  orientation: _propTypes2.default.string
};

exports.default = FlaglistCheckboxGroup;
//# sourceMappingURL=FlaglistCheckboxGroup.js.map