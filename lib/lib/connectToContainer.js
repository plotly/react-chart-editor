'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerConnectedContextTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectToContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _unpackPlotProps = require('./unpackPlotProps');

var _unpackPlotProps2 = _interopRequireDefault(_unpackPlotProps);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerConnectedContextTypes = exports.containerConnectedContextTypes = {
  localize: _propTypes2.default.func,
  container: _propTypes2.default.object,
  data: _propTypes2.default.array,
  defaultContainer: _propTypes2.default.object,
  fullContainer: _propTypes2.default.object,
  fullData: _propTypes2.default.array,
  fullLayout: _propTypes2.default.object,
  getValObject: _propTypes2.default.func,
  graphDiv: _propTypes2.default.object,
  layout: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func,
  plotly: _propTypes2.default.object,
  updateContainer: _propTypes2.default.func,
  traceIndexes: _propTypes2.default.array
};

function connectToContainer(WrappedComponent) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ContainerConnectedComponent = function (_Component) {
    _inherits(ContainerConnectedComponent, _Component);

    _createClass(ContainerConnectedComponent, null, [{
      key: 'modifyPlotProps',

      // Run the inner modifications first and allow more recent modifyPlotProp
      // config function to modify last.
      value: function modifyPlotProps(props, context, plotProps) {
        if (WrappedComponent.modifyPlotProps) {
          WrappedComponent.modifyPlotProps(props, context, plotProps);
        }
        if (config.modifyPlotProps) {
          config.modifyPlotProps(props, context, plotProps);
        }
      }
    }]);

    function ContainerConnectedComponent(props, context) {
      _classCallCheck(this, ContainerConnectedComponent);

      var _this = _possibleConstructorReturn(this, (ContainerConnectedComponent.__proto__ || Object.getPrototypeOf(ContainerConnectedComponent)).call(this, props, context));

      _this.setLocals(props, context);
      return _this;
    }

    _createClass(ContainerConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        this.plotProps = (0, _unpackPlotProps2.default)(props, context);
        this.attr = props.attr;
        ContainerConnectedComponent.modifyPlotProps(props, context, this.plotProps);
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          description: this.plotProps.description,
          attr: this.attr
        };
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        return {
          description: this.plotProps.description,
          attr: this.attr
        };
      }
    }, {
      key: 'render',
      value: function render() {
        // Merge plotprops onto props so leaf components only need worry about
        // props. However pass plotProps as a specific prop in case inner component
        // is also wrapped by a component that `unpackPlotProps`. That way inner
        // component can skip computation as it can see plotProps is already defined.
        var _Object$assign = Object.assign({}, this.plotProps, this.props),
            _Object$assign$plotPr = _Object$assign.plotProps,
            plotProps = _Object$assign$plotPr === undefined ? this.plotProps : _Object$assign$plotPr,
            props = _objectWithoutProperties(_Object$assign, ['plotProps']);

        if (props.isVisible) {
          return _react2.default.createElement(WrappedComponent, _extends({}, props, { plotProps: plotProps }));
        }

        return null;
      }
    }]);

    return ContainerConnectedComponent;
  }(_react.Component);

  ContainerConnectedComponent.displayName = 'ContainerConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  ContainerConnectedComponent.contextTypes = containerConnectedContextTypes;
  ContainerConnectedComponent.childContextTypes = {
    description: _propTypes2.default.string,
    attr: _propTypes2.default.string
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  ContainerConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ContainerConnectedComponent;
}
//# sourceMappingURL=connectToContainer.js.map