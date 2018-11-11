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
var StyleUpdateMenusPanel = function StyleUpdateMenusPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.UpdateMenuAccordion,
        null,
        _react2.default.createElement(
          _components.VisibilitySelect,
          {
            attr: 'visible',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
            showOn: true
          },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Button Labels') },
            _react2.default.createElement(_components.UpdateMenuButtons, { attr: 'buttons' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Background') },
            _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'bgcolor' })
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
            { name: _('Border') },
            _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'borderwidth' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'bordercolor' })
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
          )
        )
      );
    }
  );
};

// StyleUpdateMenusPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleUpdateMenusPanel;
//# sourceMappingURL=StyleUpdateMenusPanel.js.map