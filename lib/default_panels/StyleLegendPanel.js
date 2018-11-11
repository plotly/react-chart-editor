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
var StyleLegendPanel = function StyleLegendPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.TraceRequiredPanel,
        null,
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Legend') },
          _react2.default.createElement(_components.Radio, {
            attr: 'showlegend',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Text') },
            _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'legend.font.family' }),
            _react2.default.createElement(_components.Numeric, { label: _('Size'), attr: 'legend.font.size', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'legend.font.color' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Legend Box') },
            _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'legend.borderwidth', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Border Color'), attr: 'legend.bordercolor' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Background Color'), attr: 'legend.bgcolor' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Horizontal Positioning') },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Anchor Point'),
              clearable: false,
              attr: 'legend.xanchor',
              options: [{ label: _('Auto'), value: 'auto' }, { label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Position'), showSlider: true, step: 0.02, attr: 'legend.x' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Vertical Positioning') },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Anchor Point'),
              clearable: false,
              attr: 'legend.yanchor',
              options: [{ label: _('Auto'), value: 'auto' }, { label: _('Top'), value: 'top' }, { label: _('Middle'), value: 'middle' }, { label: _('Bottom'), value: 'bottom' }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Position'), showSlider: true, step: 0.02, attr: 'legend.y' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Orientation') },
            _react2.default.createElement(_components.Radio, {
              attr: 'legend.orientation',
              options: [{ label: _('Vertical'), value: 'v' }, { label: _('Horizontal'), value: 'h' }]
            })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Trace Order') },
            _react2.default.createElement(_components.Dropdown, {
              attr: 'legend.traceorder',
              options: [{ label: _('Normal'), value: 'normal' }, { label: _('Reversed'), value: 'reversed' }, { label: _('Grouped'), value: 'grouped' }, { label: _('Reversed and Grouped'), value: 'reversed+grouped' }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Gap Between Groups'), attr: 'legend.tracegroupgap', units: 'px' })
          )
        )
      );
    }
  );
};

// StyleLegendPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleLegendPanel;
//# sourceMappingURL=StyleLegendPanel.js.map