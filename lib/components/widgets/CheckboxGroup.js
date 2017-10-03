"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.state = { options: _this.props.options };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(CheckboxGroup, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ options: nextProps.options });
    }
  }, {
    key: "handleChange",
    value: function handleChange(i) {
      var newOptions = this.props.options.slice();
      newOptions[i] = Object.assign(newOptions[i], {
        checked: !newOptions[i].checked
      });
      this.props.onChange(newOptions);
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this2 = this;

      return this.state.options.map(function (option, i) {
        var checkClass = (0, _classnames2.default)(["checkbox__check", "icon"], {
          "icon-check-mark": option.checked
        });

        var itemClass = (0, _classnames2.default)("checkbox__item", {
          "checkbox__item--vertical": _this2.props.orientation === "vertical",
          "checkbox__item--horizontal": _this2.props.orientation === "horizontal"
        });

        return _react2.default.createElement(
          "div",
          { key: i, className: itemClass },
          _react2.default.createElement(
            "div",
            { className: "checkbox__box", onClick: function onClick() {
                return _this2.handleChange(i);
              } },
            option.checked && _react2.default.createElement("i", { className: checkClass })
          ),
          _react2.default.createElement(
            "div",
            { className: "checkbox__label" },
            option.label
          )
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var boxClass = (0, _classnames2.default)("checkbox__group", this.props.className, {
        checkbox__group_horizontal: this.props.orientation === "horizontal"
      });

      return _react2.default.createElement(
        "div",
        { className: boxClass },
        this.renderOptions()
      );
    }
  }]);

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string.isRequired,
    checked: _propTypes2.default.bool.isRequired
  })).isRequired,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  orientation: _propTypes2.default.string
};

CheckboxGroup.defaultProps = {
  className: ""
};

module.exports = CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.js.map