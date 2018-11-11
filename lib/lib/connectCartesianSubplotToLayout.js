'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectCartesianSubplotToLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectCartesianSubplotToLayout(WrappedComponent) {
  var SubplotConnectedComponent = function (_Component) {
    _inherits(SubplotConnectedComponent, _Component);

    function SubplotConnectedComponent(props, context) {
      _classCallCheck(this, SubplotConnectedComponent);

      var _this = _possibleConstructorReturn(this, (SubplotConnectedComponent.__proto__ || Object.getPrototypeOf(SubplotConnectedComponent)).call(this, props, context));

      _this.updateSubplot = _this.updateSubplot.bind(_this);
      _this.setLocals(props, context);
      return _this;
    }

    _createClass(SubplotConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        var xaxis = props.xaxis,
            yaxis = props.yaxis,
            traceIndexes = props.traceIndexes;
        var container = context.container,
            fullContainer = context.fullContainer,
            data = context.data;


        this.container = {
          xaxis: container[xaxis],
          yaxis: container[yaxis]
        };
        this.fullContainer = {
          xaxis: fullContainer[xaxis],
          yaxis: fullContainer[yaxis]
        };

        var trace = traceIndexes.length > 0 ? data[traceIndexes[0]] : {};
        var fullTrace = (0, _lib.getFullTrace)(props, context);

        if (trace && fullTrace) {
          this.icon = (0, _lib.renderTraceIcon)((0, _lib.plotlyTraceToCustomTrace)(trace));
          this.name = fullTrace.name;
        }
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;

        return {
          getValObject: function getValObject(attr) {
            return !_this2.context.getValObject ? null : _this2.context.getValObject(attr.replace('xaxis', _this2.props.xaxis).replace('yaxis', _this2.props.yaxis));
          },
          updateContainer: this.updateSubplot,
          deleteContainer: this.deleteSubplot,
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
            return !_this3.context.getValObject ? null : _this3.context.getValObject(attr.replace('xaxis', _this3.props.xaxis).replace('yaxis', _this3.props.yaxis));
          },
          updateContainer: this.updateSubplot,
          deleteContainer: this.deleteSubplot,
          container: this.container,
          fullContainer: this.fullContainer
        };
      }
    }, {
      key: 'updateSubplot',
      value: function updateSubplot(update) {
        var newUpdate = {};
        for (var key in update) {
          var newKey = key.replace('xaxis', this.props.xaxis).replace('yaxis', this.props.yaxis);
          newUpdate[newKey] = update[key];
        }
        this.context.updateContainer(newUpdate);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({ name: this.name, icon: this.icon }, this.props));
      }
    }]);

    return SubplotConnectedComponent;
  }(_react.Component);

  SubplotConnectedComponent.displayName = 'SubplotConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  SubplotConnectedComponent.propTypes = {
    xaxis: _propTypes2.default.string.isRequired,
    yaxis: _propTypes2.default.string.isRequired
  };

  SubplotConnectedComponent.contextTypes = {
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    data: _propTypes2.default.array,
    fullData: _propTypes2.default.array,
    onUpdate: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    getValObject: _propTypes2.default.func
  };

  SubplotConnectedComponent.childContextTypes = {
    updateContainer: _propTypes2.default.func,
    deleteContainer: _propTypes2.default.func,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    getValObject: _propTypes2.default.func
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  SubplotConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return SubplotConnectedComponent;
}
//# sourceMappingURL=connectCartesianSubplotToLayout.js.map