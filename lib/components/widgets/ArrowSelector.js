"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dropdown = require("./Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _workspace = require("@workspace/constants/workspace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowSelector = function (_Component) {
  _inherits(ArrowSelector, _Component);

  function ArrowSelector(props) {
    _classCallCheck(this, ArrowSelector);

    var _this = _possibleConstructorReturn(this, (ArrowSelector.__proto__ || Object.getPrototypeOf(ArrowSelector)).call(this, props));

    _this.state = {
      activeOption: _this.props.activeOption || 0
    };
    _this.onSelect = _this.onSelect.bind(_this);
    _this.arrowGenerator = _this.arrowGenerator.bind(_this);
    _this.renderOption = _this.renderOption.bind(_this);
    _this.renderValue = _this.renderValue.bind(_this);
    return _this;
  }

  _createClass(ArrowSelector, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeOption === _workspace.MIXED_VALUES) {
        // set the active option empty if it is MIXED_VALUES
        this.setState({
          activeOption: ""
        });
        return;
      }

      // Reset the value to the graph's actual value
      if (nextProps.activeOption !== this.state.activeOption) {
        this.setState({
          activeOption: nextProps.activeOption
        });
      }
    }
  }, {
    key: "arrowGenerator",
    value: function arrowGenerator() {
      var Plotly = this.props.Plotly;

      var arrowArray = Plotly.Annotations.ARROWPATHS;
      var allArrows = arrowArray.map(function (each) {
        return _react2.default.createElement(
          "svg",
          {
            width: "40",
            height: "20",
            "data-arrowhead": "1",
            style: { position: "relative", top: "5px" }
          },
          _react2.default.createElement("line", {
            stroke: "rgb(68, 68, 68)",
            style: { fill: "none" },
            x1: "5",
            y1: "10",
            x2: "23.8",
            y2: "10",
            strokeWidth: "2"
          }),
          _react2.default.createElement("path", {
            d: each.path,
            transform: "translate(23.8,10)rotate(360)scale(2)",
            style: { fill: "rgb(68, 68, 68)", opacity: 1, strokeWidth: 0 }
          })
        );
      });

      return allArrows.map(function (each, index) {
        return {
          label: each,
          value: index,
          key: "arrow" + index
        };
      });
    }
  }, {
    key: "onSelect",
    value: function onSelect(chosenArrow) {
      this.setState({
        activeOption: chosenArrow
      });

      this.props.onChange(chosenArrow);
    }
  }, {
    key: "renderOption",
    value: function renderOption(option) {
      return _react2.default.createElement(
        "li",
        { className: "+ls-none" },
        _react2.default.createElement(
          "div",
          { className: "+push-quarter-left" },
          option.label
        )
      );
    }
  }, {
    key: "renderValue",
    value: function renderValue(option) {
      return _react2.default.createElement(
        "div",
        null,
        option.label
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "span",
        { className: "widget-dropdown" },
        _react2.default.createElement(_Dropdown2.default, {
          ref: "dropdown",
          value: this.state.activeOption,
          options: this.arrowGenerator(),
          onChange: this.onSelect,
          clearable: false,
          optionRenderer: this.renderOption,
          valueRenderer: this.renderValue,
          valueKey: "value",
          minWidth: "100%"
        })
      );
    }
  }]);

  return ArrowSelector;
}(_react.Component);

ArrowSelector.propTypes = {
  activeOption: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  Plotly: _propTypes2.default.object.isRequired
};

module.exports = ArrowSelector;
//# sourceMappingURL=ArrowSelector.js.map