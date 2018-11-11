'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectSliderToLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectSliderToLayout(WrappedComponent) {
  var SliderConnectedComponent = function (_Component) {
    _inherits(SliderConnectedComponent, _Component);

    function SliderConnectedComponent(props, context) {
      _classCallCheck(this, SliderConnectedComponent);

      var _this = _possibleConstructorReturn(this, (SliderConnectedComponent.__proto__ || Object.getPrototypeOf(SliderConnectedComponent)).call(this, props, context));

      _this.updateSlider = _this.updateSlider.bind(_this);
      _this.setLocals(props, context);
      return _this;
    }

    _createClass(SliderConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        var sliderIndex = props.sliderIndex;
        var container = context.container,
            fullContainer = context.fullContainer;


        var sliders = container.sliders || [];
        var fullSliders = fullContainer.sliders || [];
        this.container = sliders[sliderIndex];
        this.fullContainer = fullSliders[sliderIndex];
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this2.context.getValObject ? null : _this2.context.getValObject('sliders[].' + attr);
          },
          updateContainer: this.updateSlider,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        var _this3 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this3.context.getValObject ? null : _this3.context.getValObject('sliders[].' + attr);
          },
          updateContainer: this.updateSlider,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'updateSlider',
      value: function updateSlider(update) {
        var newUpdate = {};
        var sliderIndex = this.props.sliderIndex;

        for (var key in update) {
          var newkey = 'sliders[' + sliderIndex + '].' + key;
          newUpdate[newkey] = update[key];
        }
        this.context.updateContainer(newUpdate);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return SliderConnectedComponent;
  }(_react.Component);

  SliderConnectedComponent.displayName = 'SliderConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  SliderConnectedComponent.propTypes = {
    sliderIndex: _propTypes2.default.number.isRequired
  };

  SliderConnectedComponent.contextTypes = {
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    onUpdate: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    getValObject: _propTypes2.default.func
  };

  SliderConnectedComponent.childContextTypes = {
    updateContainer: _propTypes2.default.func,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    getValObject: _propTypes2.default.func
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  SliderConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SliderConnectedComponent;
}
//# sourceMappingURL=connectSliderToLayout.js.map