'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _derived = require('./derived');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _PanelEmpty = require('./PanelEmpty');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeFold = (0, _lib.connectShapeToLayout)(_PlotlyFold2.default);

var ShapeAccordion = function (_Component) {
  _inherits(ShapeAccordion, _Component);

  function ShapeAccordion() {
    _classCallCheck(this, ShapeAccordion);

    return _possibleConstructorReturn(this, (ShapeAccordion.__proto__ || Object.getPrototypeOf(ShapeAccordion)).apply(this, arguments));
  }

  _createClass(ShapeAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$layout$shape = _context.layout.shapes,
          shapes = _context$layout$shape === undefined ? [] : _context$layout$shape,
          _ = _context.localize;
      var _props = this.props,
          canAdd = _props.canAdd,
          children = _props.children;


      var content = shapes.length && shapes.map(function (shp, i) {
        return _react2.default.createElement(
          ShapeFold,
          { key: i, shapeIndex: i, name: _('Shape') + ' ' + (i + 1), canDelete: canAdd },
          children
        );
      });

      var addAction = {
        label: _('Shape'),
        handler: function handler(_ref) {
          var layout = _ref.layout,
              updateContainer = _ref.updateContainer;

          var shapeIndex = void 0;
          if (Array.isArray(layout.shapes)) {
            shapeIndex = layout.shapes.length;
          } else {
            shapeIndex = 0;
          }

          var key = 'shapes[' + shapeIndex + ']';
          var value = {
            line: { color: _constants.COLORS.charcoal },
            fillcolor: _constants.COLORS.middleGray,
            opacity: 0.3
          };

          if (updateContainer) {
            updateContainer(_defineProperty({}, key, value));
          }
        }
      };

      return _react2.default.createElement(
        _derived.LayoutPanel,
        { addAction: canAdd ? addAction : null },
        content ? content : _react2.default.createElement(
          _PanelEmpty.PanelMessage,
          { heading: _('Lines, Rectangles and Ellipses.') },
          _react2.default.createElement(
            'p',
            null,
            _('Add shapes to a figure to highlight points or periods in time, thresholds, or areas of interest.')
          ),
          _react2.default.createElement(
            'p',
            null,
            _('Click on the + button above to add a shape.')
          )
        )
      );
    }
  }]);

  return ShapeAccordion;
}(_react.Component);

ShapeAccordion.contextType = _context2.EditorControlsContext;

ShapeAccordion.propTypes = {
  children: _propTypes2.default.node,
  canAdd: _propTypes2.default.bool
};

exports.default = ShapeAccordion;
//# sourceMappingURL=ShapeAccordion.js.map