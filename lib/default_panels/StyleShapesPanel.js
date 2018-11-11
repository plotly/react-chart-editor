'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
var StyleShapesPanel = function StyleShapesPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.ShapeAccordion,
        { canAdd: true },
        _react2.default.createElement(_components.Radio, {
          attr: 'visible',
          options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
        }),
        _react2.default.createElement(_components.Radio, {
          attr: 'type',
          options: [{ label: _('Line'), value: 'line' }, { label: _('Rectangle'), value: 'rect' }, { label: _('Ellipse'), value: 'circle' }]
        }),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Horizontal Boundaries') },
          _react2.default.createElement(_components.PositioningRef, { label: _('Relative to'), attr: 'xref' }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Start Point'), attr: 'x0' }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('End Point'), attr: 'x1' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Vertical Boundaries') },
          _react2.default.createElement(_components.PositioningRef, { label: _('Relative to'), attr: 'yref' }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Start Point'), attr: 'y0' }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('End Point'), attr: 'y1' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Lines') },
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'line.width' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'line.color' }),
          _react2.default.createElement(_components.LineDashSelector, { label: _('Type'), attr: 'line.dash' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Fill') },
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'fillcolor' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Opacity'), attr: 'opacity' })
        )
      );
    }
  );
};

// StyleShapesPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleShapesPanel;
//# sourceMappingURL=StyleShapesPanel.js.map