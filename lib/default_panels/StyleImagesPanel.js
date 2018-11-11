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
var StyleImagesPanel = function StyleImagesPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.ImageAccordion,
        { canAdd: true },
        _react2.default.createElement(_components.Radio, {
          attr: 'visible',
          options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
        }),
        _react2.default.createElement(_components.Dropzone, { attr: 'source', fileType: _('image'), show: true }),
        _react2.default.createElement(_components.Dropdown, {
          label: _('Aspect Ratio'),
          attr: 'sizing',
          options: [{ label: _('Contain'), value: 'contain' }, { label: _('Fill'), value: 'fill' }, { label: _('Stretch'), value: 'stretch' }],
          clearable: false
        }),
        _react2.default.createElement(_components.Radio, {
          label: _('Relative to Grid'),
          attr: 'layer',
          options: [{ label: _('Below'), value: 'below' }, { label: _('Above'), value: 'above' }]
        }),
        _react2.default.createElement(_components.PositioningNumeric, { attr: 'sizex', label: _('Width') }),
        _react2.default.createElement(_components.PositioningNumeric, { attr: 'sizey', label: _('Height') }),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Horizontal Positioning') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Anchor Point'),
            clearable: false,
            attr: 'xanchor',
            options: [{ label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }]
          }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Position'), attr: 'x' }),
          _react2.default.createElement(_components.PositioningRef, { label: _('Relative To'), attr: 'xref' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Vertical Positioning') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Anchor Point'),
            clearable: false,
            attr: 'yanchor',
            options: [{ label: _('Top'), value: 'top' }, { label: _('Middle'), value: 'middle' }, { label: _('Bottom'), value: 'bottom' }]
          }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Position'), attr: 'y' }),
          _react2.default.createElement(_components.PositioningRef, { label: _('Relative To'), attr: 'yref' })
        )
      );
    }
  );
};

// StyleImagesPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleImagesPanel;
//# sourceMappingURL=StyleImagesPanel.js.map