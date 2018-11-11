'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectLayoutToPlot;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _lib = require('../lib');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectLayoutToPlot(WrappedComponent) {
  var LayoutConnectedComponent = function (_Component) {
    _inherits(LayoutConnectedComponent, _Component);

    function LayoutConnectedComponent() {
      _classCallCheck(this, LayoutConnectedComponent);

      return _possibleConstructorReturn(this, (LayoutConnectedComponent.__proto__ || Object.getPrototypeOf(LayoutConnectedComponent)).apply(this, arguments));
    }

    _createClass(LayoutConnectedComponent, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _context = this.context,
            layout = _context.layout,
            fullLayout = _context.fullLayout,
            plotly = _context.plotly,
            onUpdate = _context.onUpdate;


        var updateContainer = function updateContainer(update) {
          if (!onUpdate) {
            return;
          }
          onUpdate({
            type: _constants.EDITOR_ACTIONS.UPDATE_LAYOUT,
            payload: {
              update: update
            }
          });
        };

        return {
          getValObject: function getValObject(attr) {
            return !plotly ? null : plotly.PlotSchema.getLayoutValObject(fullLayout, (0, _nested_property2.default)({}, attr).parts);
          },
          updateContainer: updateContainer,
          container: layout,
          fullContainer: fullLayout
        };
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        var _context2 = this.context,
            layout = _context2.layout,
            fullLayout = _context2.fullLayout,
            plotly = _context2.plotly,
            onUpdate = _context2.onUpdate;


        var updateContainer = function updateContainer(update) {
          if (!onUpdate) {
            return;
          }
          onUpdate({
            type: _constants.EDITOR_ACTIONS.UPDATE_LAYOUT,
            payload: {
              update: update
            }
          });
        };

        return {
          getValObject: function getValObject(attr) {
            return !plotly ? null : plotly.PlotSchema.getLayoutValObject(fullLayout, (0, _nested_property2.default)({}, attr).parts);
          },
          updateContainer: updateContainer,
          container: layout,
          fullContainer: fullLayout
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return LayoutConnectedComponent;
  }(_react.Component);

  LayoutConnectedComponent.displayName = 'LayoutConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  LayoutConnectedComponent.contextTypes = {
    layout: _propTypes2.default.object,
    fullLayout: _propTypes2.default.object,
    plotly: _propTypes2.default.object,
    onUpdate: _propTypes2.default.func
  };

  LayoutConnectedComponent.childContextTypes = {
    getValObject: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  LayoutConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return LayoutConnectedComponent;
}
//# sourceMappingURL=connectLayoutToPlot.js.map