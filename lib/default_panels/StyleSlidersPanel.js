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
var StyleSlidersPanel = function StyleSlidersPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.SliderAccordion,
        null,
        _react2.default.createElement(_components.Radio, {
          attr: 'visible',
          options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
        }),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Background') },
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'bgcolor' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Active Color'), attr: 'activebgcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Border') },
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'borderwidth' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'bordercolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Font') },
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'font.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Size'), attr: 'font.size' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'font.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Length'), attr: 'len' },
          _react2.default.createElement(_components.Numeric, { label: _('Length'), attr: 'len', step: 0.02 }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Length Mode'),
            attr: 'lenmode',
            options: [{ label: _('Fraction of canvas'), value: 'fraction' }, { label: _('Pixels'), value: 'pixels' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Horizontal Positioning'), attr: 'x' },
          _react2.default.createElement(_components.Numeric, { label: _('Position'), attr: 'x', showSlider: true, step: 0.02 }),
          _react2.default.createElement(_components.Radio, {
            label: _('Anchor'),
            attr: 'xanchor',
            options: [{ label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Vertical Positioning'), attr: 'y' },
          _react2.default.createElement(_components.Numeric, { label: _('Position'), attr: 'y', showSlider: true, step: 0.02 }),
          _react2.default.createElement(_components.Radio, {
            label: _('Anchor'),
            attr: 'yanchor',
            options: [{ label: _('Top'), value: 'top' }, { label: _('Middle'), value: 'middle' }, { label: _('Bottom'), value: 'bottom' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Padding') },
          _react2.default.createElement(_components.Numeric, { label: _('Top'), attr: 'pad.t', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Bottom'), attr: 'pad.b', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Left'), attr: 'pad.l', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Right'), attr: 'pad.r', units: 'px' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Ticks') },
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'tickcolor' }),
          _react2.default.createElement(_components.Numeric, { label: _('Length'), attr: 'ticklen' }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'tickwidth' })
        )
      );
    }
  );
};

// StyleSlidersPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleSlidersPanel;
//# sourceMappingURL=StyleSlidersPanel.js.map