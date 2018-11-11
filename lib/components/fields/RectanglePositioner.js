'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _reactResizableRotatableDraggable = require('react-resizable-rotatable-draggable');

var _reactResizableRotatableDraggable2 = _interopRequireDefault(_reactResizableRotatableDraggable);

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _DualNumeric = require('./DualNumeric');

var _DualNumeric2 = _interopRequireDefault(_DualNumeric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maxWidth = 276;
var gridRes = 8;

var UnconnectedRectanglePositioner = function (_Component) {
  _inherits(UnconnectedRectanglePositioner, _Component);

  function UnconnectedRectanglePositioner(props, context) {
    _classCallCheck(this, UnconnectedRectanglePositioner);

    var _this = _possibleConstructorReturn(this, (UnconnectedRectanglePositioner.__proto__ || Object.getPrototypeOf(UnconnectedRectanglePositioner)).call(this, props, context));

    _this.sendUpdate = _this.sendUpdate.bind(_this);
    _this.attr = _this.props.cartesian ? {
      x: ['xaxis.domain[0]', 'xaxis.domain[1]'],
      y: ['yaxis.domain[0]', 'yaxis.domain[1]']
    } : { x: ['domain.x[0]', 'domain.x[1]'], y: ['domain.y[0]', 'domain.y[1]'] };
    _this.state = { snap: true };
    return _this;
  }

  _createClass(UnconnectedRectanglePositioner, [{
    key: 'sendUpdate',
    value: function sendUpdate(_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          fieldWidthPx = _ref.fieldWidthPx,
          fieldHeightPx = _ref.fieldHeightPx;

      var x0 = x / fieldWidthPx;
      var x1 = (width + x) / fieldWidthPx;
      var y0 = (fieldHeightPx - (height + y)) / fieldHeightPx;
      var y1 = (fieldHeightPx - y) / fieldHeightPx;

      var snap = this.state.snap ? function (v) {
        return Math.round(v * gridRes) / gridRes;
      } : function (v) {
        return v;
      };

      var payload = {};

      if (x0 >= 0 && x1 <= 1) {
        payload[this.attr.x[0]] = snap(x0);
        payload[this.attr.x[1]] = snap(x1);
      }

      if (y0 >= 0 && y1 <= 1) {
        payload[this.attr.y[0]] = snap(y0);
        payload[this.attr.y[1]] = snap(y1);
      }

      this.context.updateContainer(payload);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          attr = _props.attr,
          cartesian = _props.cartesian;
      var _context = this.context,
          _ = _context.localize,
          fullContainer = _context.fullContainer,
          _context$fullLayout = _context.fullLayout,
          plotWidthPx = _context$fullLayout.width,
          plotHeightPx = _context$fullLayout.height;

      var x = cartesian ? fullContainer.xaxis.domain : fullContainer.domain.x;
      var y = cartesian ? fullContainer.yaxis.domain : fullContainer.domain.y;
      var aspectRatio = plotHeightPx / plotWidthPx;
      var fieldWidthPx = Math.min(maxWidth, maxWidth / aspectRatio);
      var fieldHeightPx = Math.min(maxWidth, maxWidth * aspectRatio);

      var width = fieldWidthPx * (x[1] - x[0]);
      var height = fieldHeightPx * (y[1] - y[0]);
      var left = fieldWidthPx * x[0];
      var top = fieldHeightPx * (1 - y[1]);

      var zoomable = '';
      if (!fullContainer.xaxis || !fullContainer.yaxis || !fullContainer.xaxis.overlaying && !fullContainer.yaxis.overlaying) {
        zoomable = 'n, w, s, e, nw, ne, se, sw';
      } else if (!fullContainer.xaxis.overlaying) {
        zoomable = 'e, w';
      } else if (!fullContainer.yaxis.overlaying) {
        zoomable = 'n, s';
      }

      return _react2.default.createElement(
        'div',
        { style: { marginRight: 25 } },
        _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { attr: attr }),
          _react2.default.createElement(
            _Field2.default,
            { label: _('Snap to Grid') },
            _react2.default.createElement(_RadioBlocks2.default, {
              alignment: 'center',
              onOptionChange: function onOptionChange(snap) {
                return _this2.setState({ snap: snap });
              },
              activeOption: this.state.snap,
              options: [{ label: _('On'), value: true }, { label: _('Off'), value: false }]
            })
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'rect-container',
              style: {
                width: fieldWidthPx + 1,
                height: fieldHeightPx + 1
              }
            },
            Array(gridRes * gridRes).fill(0).map(function (v, i) {
              return _react2.default.createElement('div', {
                key: i,
                className: 'rect-grid',
                style: {
                  width: fieldWidthPx / gridRes - 1,
                  height: fieldHeightPx / gridRes - 1,
                  borderBottom: i < gridRes * (gridRes - 1) ? '0' : '1px solid ',
                  borderRight: (i + 1) % gridRes ? '0' : '1px solid'
                }
              });
            }),
            _react2.default.createElement(_reactResizableRotatableDraggable2.default, {
              bounds: 'parent',
              width: width,
              height: height,
              left: left,
              top: top,
              rotatable: false,
              draggable: !this.state.snap,
              zoomable: zoomable,
              onResize: function onResize(style) {
                _this2.sendUpdate({
                  fieldWidthPx: fieldWidthPx,
                  fieldHeightPx: fieldHeightPx,
                  width: style.width,
                  height: style.height,
                  x: style.left,
                  y: style.top
                });
              },
              onDrag: function onDrag(deltaX, deltaY) {
                _this2.sendUpdate({
                  fieldWidthPx: fieldWidthPx,
                  fieldHeightPx: fieldHeightPx,
                  width: width,
                  height: height,
                  x: left + deltaX,
                  y: top + deltaY
                });
              }
            })
          ),
          fullContainer.xaxis && fullContainer.xaxis.overlaying ? '' : _react2.default.createElement(_DualNumeric2.default, {
            label: _('X'),
            attr: this.attr.x[0],
            attr2: this.attr.x[1],
            percentage: true,
            step: 1,
            min: 0,
            max: 100
          }),
          fullContainer.yaxis && fullContainer.yaxis.overlaying ? '' : _react2.default.createElement(_DualNumeric2.default, {
            label: _('Y'),
            attr: this.attr.y[0],
            attr2: this.attr.y[1],
            percentage: true,
            step: 1,
            min: 0,
            max: 100
          })
        )
      );
    }
  }]);

  return UnconnectedRectanglePositioner;
}(_react.Component);

UnconnectedRectanglePositioner.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func,
  cartesian: _propTypes2.default.bool
}, _Field2.default.propTypes);

UnconnectedRectanglePositioner.contextTypes = {
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func,
  fullContainer: _propTypes2.default.object,
  fullLayout: _propTypes2.default.object
};

exports.default = (0, _lib.connectToContainer)(UnconnectedRectanglePositioner);
//# sourceMappingURL=RectanglePositioner.js.map