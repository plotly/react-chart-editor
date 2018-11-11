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
var StyleNotesPanel = function StyleNotesPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.AnnotationAccordion,
        { canAdd: true },
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Note Text'), attr: 'text' },
          _react2.default.createElement(_components.TextEditor, { attr: 'text' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'font.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'font.size', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'font.color' }),
          _react2.default.createElement(_components.Numeric, { label: _('Angle'), attr: 'textangle', units: '\xB0' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Arrow') },
          _react2.default.createElement(_components.Radio, {
            attr: 'showarrow',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Line Width'), attr: 'arrowwidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'arrowcolor' }),
          _react2.default.createElement(_components.ArrowSelector, { label: _('Arrowhead'), attr: 'arrowhead' }),
          _react2.default.createElement(_components.Numeric, { label: _('Scale'), step: 0.1, attr: 'arrowsize', units: 'px' }),
          _react2.default.createElement(_components.AnnotationArrowRef, { label: _('X Offset'), attr: 'axref' }),
          _react2.default.createElement(_components.AnnotationArrowRef, { label: _('Y Offset'), attr: 'ayref' }),
          _react2.default.createElement(_components.Numeric, { label: _('X Vector'), attr: 'ax' }),
          _react2.default.createElement(_components.Numeric, { label: _('Y Vector'), attr: 'ay' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Horizontal Positioning') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Anchor Point'),
            clearable: false,
            attr: 'xanchor',
            options: [{ label: _('Auto'), value: 'auto' }, { label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }]
          }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Position'), attr: 'x' }),
          _react2.default.createElement(_components.AnnotationRef, { label: _('Relative To'), attr: 'xref' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Vertical Positioning') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Anchor Point'),
            clearable: false,
            attr: 'yanchor',
            options: [{ label: _('Auto'), value: 'auto' }, { label: _('Top'), value: 'top' }, { label: _('Middle'), value: 'middle' }, { label: _('Bottom'), value: 'bottom' }]
          }),
          _react2.default.createElement(_components.PositioningNumeric, { label: _('Position'), attr: 'y' }),
          _react2.default.createElement(_components.AnnotationRef, { label: _('Relative To'), attr: 'yref' })
        )
      );
    }
  );
};

// StyleNotesPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = StyleNotesPanel;
//# sourceMappingURL=StyleNotesPanel.js.map