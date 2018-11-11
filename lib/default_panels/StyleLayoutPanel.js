'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _derived = require('../components/fields/derived');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleLayoutPanel = function StyleLayoutPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.LayoutPanel,
        null,
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Defaults') },
          _react2.default.createElement(_components.ColorPicker, { label: _('Plot Background'), attr: 'plot_bgcolor' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Margin Color'), attr: 'paper_bgcolor' }),
          _react2.default.createElement(_components.ColorwayPicker, { label: _('Base Colors'), attr: 'colorway' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'font.family', clearable: false }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'font.size', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'font.color' }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Number format'),
            attr: 'separators',
            options: [{ label: _('1,234.56'), value: '.,' }, { label: _('1 234.56'), value: ', ' }, { label: _('1 234,56'), value: ', ' }, { label: _('1.234,56'), value: ',.' }],
            clearable: false
          })
        ),
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Title') },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Title'), attr: 'title' },
            _react2.default.createElement(_components.TextEditor, { attr: 'title' }),
            _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'titlefont.family', clearable: false }),
            _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'titlefont.size', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'titlefont.color' })
          )
        ),
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Modebar') },
          _react2.default.createElement(_components.Radio, {
            label: _('Orientation'),
            attr: 'modebar.orientation',
            options: [{ label: _('Horizontal'), value: 'h' }, { label: _('Vertical'), value: 'v' }]
          }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Icon Color'), attr: 'modebar.color' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Active Icon Color'), attr: 'modebar.activecolor' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Background Color'), attr: 'modebar.bgcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Layout') },
          _react2.default.createElement(
            _components.VisibilitySelect,
            {
              attr: 'autosize',
              label: _('Size'),
              options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }],
              showOn: false,
              defaultOpt: true
            },
            _react2.default.createElement(_components.Numeric, { label: _('Fixed Width'), attr: 'width', units: 'px' }),
            _react2.default.createElement(_components.Numeric, { label: _('Fixed height'), attr: 'height', units: 'px' })
          ),
          _react2.default.createElement(_components.Numeric, { label: _('Top'), attr: 'margin.t', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Bottom'), attr: 'margin.b', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Left'), attr: 'margin.l', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Right'), attr: 'margin.r', units: 'px' }),
          _react2.default.createElement(_components.Numeric, { label: _('Padding'), attr: 'margin.pad', units: 'px' })
        ),
        _react2.default.createElement(
          _components.PlotlyFold,
          { name: _('Interactions') },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Drag'), attr: 'dragmode' },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Mode'),
              attr: 'dragmode',
              options: [{ label: _('Zoom'), value: 'zoom' }, { label: _('Select'), value: 'select' }, { label: _('Pan'), value: 'pan' }, { label: _('Lasso'), value: 'lasso' }, { label: _('Orbit'), value: 'orbit' }, { label: _('Turntable'), value: 'turntable' }],
              clearable: false
            }),
            _react2.default.createElement(_components.Dropdown, {
              label: _('Select Direction'),
              attr: 'selectdirection',
              options: [{ label: _('Any'), value: 'any' }, { label: _('Horizontal'), value: 'h' }, { label: _('Vertical'), value: 'v' }, { label: _('Diagonal'), value: 'd' }],
              clearable: false
            })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Click'), attr: 'clickmode' },
            _react2.default.createElement(_components.Flaglist, {
              label: _('Mode'),
              attr: 'clickmode',
              options: [{ label: _('Click Event'), value: 'event' }, { label: _('Select Data Point'), value: 'select' }]
            })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Hover') },
            _react2.default.createElement(
              _components.HovermodeDropdown,
              { label: _('Mode'), attr: 'hovermode' },
              _react2.default.createElement(_derived.HoverColor, {
                label: _('Background Color'),
                attr: 'hoverlabel.bgcolor',
                defaultColor: '#FFF',
                handleEmpty: true
              }),
              _react2.default.createElement(_derived.HoverColor, {
                label: _('Border Color'),
                attr: 'hoverlabel.bordercolor',
                defaultColor: '#000',
                handleEmpty: true
              }),
              _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'hoverlabel.font.family', clearable: true }),
              _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'hoverlabel.font.size' }),
              _react2.default.createElement(_derived.HoverColor, {
                label: _('Font Color'),
                attr: 'hoverlabel.font.color',
                defaultColor: '#000',
                handleEmpty: true
              })
            )
          )
        )
      );
    }
  );
};

// StyleLayoutPanel.contextTypes = {
//   localize: PropTypes.func,
// };

// import PropTypes from 'prop-types';
exports.default = StyleLayoutPanel;
//# sourceMappingURL=StyleLayoutPanel.js.map