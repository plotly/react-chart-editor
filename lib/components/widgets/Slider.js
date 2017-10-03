"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _number = require("@workspace/utils/number");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic slider
 * Accepts min, max, step and orientation parameters
 * Integer values
 */

var orientation = {
  vertical: {
    dimension: "clientHeight",
    clientAxis: "clientY",
    zeroPoint: "bottom"
  },
  horizontal: {
    dimension: "clientWidth",
    clientAxis: "clientX",
    zeroPoint: "left"
  }
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = { value: props.value };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.positionToValue = _this.positionToValue.bind(_this);
    _this.getPosition = _this.getPosition.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    _this.moveSlider = _this.moveSlider.bind(_this);
    _this.startSlider = _this.startSlider.bind(_this);
    _this.stopSlider = _this.stopSlider.bind(_this);
    _this.renderFill = _this.renderFill.bind(_this);
    _this.getRef = _this.getRef.bind(_this);
    return _this;
  }

  _createClass(Slider, [{
    key: "getRef",
    value: function getRef(c) {
      this._ref = c;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // Updates the value to the graph's actual value
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: "positionToValue",
    value: function positionToValue(position) {
      var dimension = orientation[this.props.orientation].dimension;
      var sliderSize = (0, _reactDom.findDOMNode)(this._ref)[dimension];
      var positionModifier = 100 / sliderSize;

      return Math.round(position * positionModifier);
    }
  }, {
    key: "getPosition",
    value: function getPosition(event) {
      var sliderBox = (0, _reactDom.findDOMNode)(this._ref);
      var zeroPoint = orientation[this.props.orientation].zeroPoint;
      var mouseCoordinate = event[orientation[this.props.orientation].clientAxis];
      var sliderMin = sliderBox.getBoundingClientRect()[zeroPoint];

      var position = void 0;
      if (this.props.orientation === "vertical") {
        position = sliderMin - mouseCoordinate;
      } else {
        position = mouseCoordinate - sliderMin;
      }

      return position;
    }
  }, {
    key: "getValue",
    value: function getValue(position) {
      var _props = this.props,
          step = _props.step,
          min = _props.min,
          max = _props.max;

      var newValue = this.positionToValue(position);
      newValue = (0, _number.getStep)(newValue, step);
      newValue = (0, _number.keepWithinMaxMin)(newValue, min, max);

      return newValue;
    }
  }, {
    key: "moveSlider",
    value: function moveSlider(event) {
      var newPosition = this.getPosition(event);
      var newValue = this.getValue(newPosition);
      this.handleChange(newValue);
    }
  }, {
    key: "stopSlider",
    value: function stopSlider() {
      document.removeEventListener("mousemove", this.moveSlider);
      document.removeEventListener("mouseup", this.stopSlider);
    }
  }, {
    key: "startSlider",
    value: function startSlider() {
      document.addEventListener("mousemove", this.moveSlider);
      document.addEventListener("mouseup", this.stopSlider);
    }
  }, {
    key: "renderFill",
    value: function renderFill() {
      var currentValue = this.state.value;
      if (this.props.fill === true) {
        var orientationVertical = this.props.orientation === "vertical";

        var fillStyles = void 0;
        if (orientationVertical) {
          fillStyles = {
            height: currentValue + "%",
            top: 100 - currentValue + "%"
          };
        } else {
          fillStyles = {
            width: currentValue + "%"
          };
        }

        var fillClassName = (0, _classnames2.default)("slider__fill", {
          "slider__fill--horizontal": !orientationVertical,
          "slider__fill--vertical": orientationVertical
        });

        return _react2.default.createElement("div", { style: fillStyles, className: fillClassName });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var orientationVertical = this.props.orientation === "vertical";
      var currentValue = this.state.value;

      var currentPosition = void 0;

      if (orientationVertical) {
        currentPosition = {
          top: 100 - currentValue + "%"
        };
      } else {
        currentPosition = {
          left: currentValue + "%"
        };
      }

      var sliderBox = (0, _classnames2.default)("slider__track", {
        slider__track_horizontal: !orientationVertical,
        slider__track_vertical: orientationVertical
      });

      var sliderHandle = (0, _classnames2.default)("slider__handle", {
        "slider__handle--horizontal": !orientationVertical,
        "slider__handle--vertical": orientationVertical
      });

      return _react2.default.createElement(
        "div",
        {
          className: sliderBox,
          ref: this.getRef,
          onMouseDown: this.moveSlider
        },
        this.renderFill(),
        _react2.default.createElement("div", {
          className: sliderHandle,
          style: currentPosition,
          onMouseDown: this.startSlider,
          onMouseUp: this.stopSlider
        })
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onChange: _propTypes2.default.func.isRequired,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  fill: _propTypes2.default.bool,
  orientation: _propTypes2.default.oneOf(["horizontal", "vertical"])
};

Slider.defaultProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  fill: true
};

module.exports = Slider;
//# sourceMappingURL=Slider.js.map