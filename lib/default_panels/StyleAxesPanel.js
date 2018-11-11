'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleAxesPanel = function (_Component) {
  _inherits(StyleAxesPanel, _Component);

  function StyleAxesPanel() {
    _classCallCheck(this, StyleAxesPanel);

    return _possibleConstructorReturn(this, (StyleAxesPanel.__proto__ || Object.getPrototypeOf(StyleAxesPanel)).apply(this, arguments));
  }

  _createClass(StyleAxesPanel, [{
    key: 'render',
    value: function render() {
      var _ = this.context.localize;

      return _react2.default.createElement(
        _components.LayoutPanel,
        null,
        _react2.default.createElement(
          _components.AxesFold,
          {
            name: _('Titles'),
            axisFilter: function axisFilter(axis) {
              return !(axis._name.includes('angular') || axis._subplot.includes('geo'));
            }
          },
          _react2.default.createElement(_components.TextEditor, { attr: 'title' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'titlefont.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'titlefont.size', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'titlefont.color' })
        ),
        _react2.default.createElement(
          _components.AxesFold,
          { name: _('Range') },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Range'), attr: 'autorange' },
            _react2.default.createElement(_components.Dropdown, {
              attr: 'type',
              label: _('Type'),
              clearable: false,
              options: [{ label: _('Linear'), value: 'linear' }, { label: _('Log'), value: 'log' }, { label: _('Date'), value: 'date' }, { label: _('Categorical'), value: 'category' }]
            }),
            _react2.default.createElement(_components.Radio, {
              attr: 'autorange',
              label: _('Range'),
              options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }]
            }),
            _react2.default.createElement(_components.AxesRange, { label: _('Min'), attr: 'range[0]' }),
            _react2.default.createElement(_components.AxesRange, { label: _('Max'), attr: 'range[1]' }),
            _react2.default.createElement(_components.Numeric, { label: _('Min'), attr: 'min' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Zoom Interactivity'), attr: 'fixedrange' },
            _react2.default.createElement(_components.Radio, {
              attr: 'fixedrange',
              options: [{ label: _('Enable'), value: false }, { label: _('Disable'), value: true }]
            })
          ),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Direction'),
            attr: 'direction',
            options: [{ label: _('Clockwise'), value: 'clockwise' }, { label: _('Counter Clockwise'), value: 'counterclockwise' }],
            clearable: false
          })
        ),
        _react2.default.createElement(
          _components.AxesFold,
          { name: _('Lines') },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Axis Line'), attr: 'showline' },
            _react2.default.createElement(
              _components.VisibilitySelect,
              {
                attr: 'showline',
                options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
                showOn: true,
                defaultOpt: true
              },
              _react2.default.createElement(_components.Numeric, { label: _('Thickness'), attr: 'linewidth', units: 'px' }),
              _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'linecolor' }),
              _react2.default.createElement(_components.AxisSide, { label: _('Position'), attr: 'side' }),
              _react2.default.createElement(_components.Radio, {
                label: _('Mirror Axis'),
                attr: 'mirror',
                options: [{ label: _('On'), value: 'ticks' }, { label: _('Off'), value: false }]
              })
            )
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Grid Lines'), attr: 'showgrid' },
            _react2.default.createElement(
              _components.VisibilitySelect,
              {
                attr: 'showgrid',
                options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
                showOn: true,
                defaultOpt: true
              },
              _react2.default.createElement(_components.Numeric, { label: _('Thickness'), attr: 'gridwidth', units: 'px' }),
              _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'gridcolor' }),
              _react2.default.createElement(_components.Radio, {
                label: _('Grid Spacing'),
                attr: 'tickmode',
                options: [{ label: _('Auto'), value: 'auto' }, { label: _('Custom'), value: 'linear' }]
              }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Offset'), attr: 'tick0' }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Size'), attr: 'dtick' }),
              _react2.default.createElement(_components.NTicks, { label: _('Max Number of Lines'), attr: 'nticks' })
            )
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Zero Line'), attr: 'zeroline' },
            _react2.default.createElement(_components.Radio, {
              attr: 'zeroline',
              options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Thickness'), attr: 'zerolinewidth', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'zerolinecolor' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Axis Background'), attr: 'showbackground' },
            _react2.default.createElement(_components.Radio, {
              attr: 'showbackground',
              options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
            }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'backgroundcolor' })
          )
        ),
        _react2.default.createElement(
          _components.AxesFold,
          { name: _('Tick Labels'), axisFilter: function axisFilter(axis) {
              return !axis._subplot.includes('geo');
            } },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Tick Labels'), attr: 'showticklabels' },
            _react2.default.createElement(
              _components.VisibilitySelect,
              {
                attr: 'showticklabels',
                options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
                showOn: true,
                defaultOpt: true
              },
              _react2.default.createElement(_components.AxisSide, { label: _('Position'), attr: 'side' }),
              _react2.default.createElement(_components.Radio, {
                label: _('Auto margins'),
                attr: 'automargin',
                options: [{ label: _('True'), value: true }, { label: _('False'), value: false }]
              }),
              _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'tickfont.family' }),
              _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'tickfont.size', units: 'px' }),
              _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'tickfont.color' }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Angle'),
                attr: 'tickangle',
                clearable: false,
                options: [{ label: _('Auto'), value: 'auto' }, { label: _('45'), value: 45 }, { label: _('90'), value: 90 }, { label: _('135'), value: 135 }, { label: _('180'), value: 180 }]
              }),
              _react2.default.createElement(_components.TickFormat, {
                label: _('Label Format'),
                attr: 'tickformat',
                dafaultOpt: '',
                clearable: false
              }),
              _react2.default.createElement(_components.Radio, {
                label: _('Separate Thousands'),
                attr: 'separatethousands',
                options: [{ label: _('True'), value: true }, { label: _('False'), value: false }]
              }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Exponents'),
                attr: 'exponentformat',
                clearable: false,
                options: [{ label: _('None'), value: '000' }, { label: _('e+6'), value: 'e' }, { label: _('E+6'), value: 'E' }, { label: _('x10^6'), value: 'power' }, { label: _('k/M/G'), value: 'SI' }, { label: _('k/M/B'), value: 'B' }]
              }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Show Exponents'),
                attr: 'showexponent',
                clearable: false,
                options: [{ label: _('All'), value: 'all' }, { label: _('First'), value: 'first' }, { label: _('Last'), value: 'last' }, { label: _('None'), value: 'none' }]
              }),
              _react2.default.createElement(_components.DropdownCustom, {
                label: _('Prefix'),
                attr: 'tickprefix',
                options: [{ label: _('None'), value: '' }, { label: _('x'), value: 'x' }, { label: _('$'), value: '$' }, { label: _('#'), value: '#' }, { label: _('@'), value: '@' }, { label: _('Custom'), value: 'custom' }],
                customOpt: 'custom',
                dafaultOpt: '',
                clearable: false
              }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Show Prefix'),
                attr: 'showtickprefix',
                options: [{ label: _('Every label'), value: 'all' }, { label: _('First label'), value: 'first' }, { label: _('Last label'), value: 'last' }, { label: _('None'), value: 'none' }]
              }),
              _react2.default.createElement(_components.DropdownCustom, {
                label: _('Suffix'),
                attr: 'ticksuffix',
                options: [{ label: _('None'), value: '' }, { label: _('C'), value: 'C' }, { label: _('%'), value: '%' }, { label: _('^'), value: '^' }, { label: _('Custom'), value: 'custom' }],
                customOpt: 'custom',
                dafaultOpt: '',
                clearable: false
              }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Show Suffix'),
                attr: 'showticksuffix',
                options: [{ label: _('Every label'), value: 'all' }, { label: _('First label'), value: 'first' }, { label: _('Last label'), value: 'last' }, { label: _('None'), value: 'none' }]
              }),
              _react2.default.createElement(_components.Radio, {
                label: _('Tick Spacing'),
                attr: 'tickmode',
                options: [{ label: _('Auto'), value: 'auto' }, { label: _('Custom'), value: 'linear' }]
              }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Offset'), attr: 'tick0' }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Size'), attr: 'dtick' }),
              _react2.default.createElement(_components.NTicks, { label: _('Max Number of Labels'), attr: 'nticks' })
            )
          )
        ),
        _react2.default.createElement(
          _components.AxesFold,
          { name: _('Tick Markers'), axisFilter: function axisFilter(axis) {
              return !axis._subplot.includes('geo');
            } },
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Tick Markers'), attr: 'ticks' },
            _react2.default.createElement(
              _components.VisibilitySelect,
              {
                attr: 'ticks',
                options: [{ label: _('Inside'), value: 'inside' }, { label: _('Outside'), value: 'outside' }, { label: _('Hide'), value: '' }],
                showOn: ['inside', 'outside'],
                defaultOpt: 'Outside'
              },
              _react2.default.createElement(_components.AxisSide, { label: _('Position'), attr: 'side' }),
              _react2.default.createElement(_components.Numeric, { label: _('Length'), attr: 'ticklen', units: 'px' }),
              _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'tickwidth', units: 'px' }),
              _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'tickcolor' }),
              _react2.default.createElement(_components.Radio, {
                label: _('Tick Spacing'),
                attr: 'tickmode',
                options: [{ label: _('Auto'), value: 'auto' }, { label: _('Custom'), value: 'linear' }]
              }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Offset'), attr: 'tick0' }),
              _react2.default.createElement(_components.DTicks, { label: _('Step Size'), attr: 'dtick' }),
              _react2.default.createElement(_components.NTicks, { label: _('Max Number of Markers'), attr: 'nticks' })
            )
          )
        ),
        _react2.default.createElement(
          _components.AxesFold,
          { name: _('Range Slider'), axisFilter: function axisFilter(axis) {
              return axis._subplot.includes('xaxis');
            } },
          _react2.default.createElement(_components.RangesliderVisible, {
            attr: 'rangeslider.visible',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Height'), attr: 'rangeslider.thickness' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Background Color'), attr: 'rangeslider.bgcolor' }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'rangeslider.borderwidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Border Color'), attr: 'rangeslider.bordercolor' })
        ),
        _react2.default.createElement(
          _components.AxesFold,
          {
            name: _('Timescale Buttons'),
            axisFilter: function axisFilter(axis) {
              return axis._subplot.includes('xaxis') && axis.type === 'date';
            }
          },
          _react2.default.createElement(_components.Radio, {
            attr: 'rangeselector.visible',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(
            _components.RangeSelectorAccordion,
            null,
            _react2.default.createElement(_components.TextEditor, { attr: 'label', label: _('Label'), show: true }),
            _react2.default.createElement(_components.Numeric, { label: _('Count'), attr: 'count' }),
            _react2.default.createElement(_components.Dropdown, {
              label: _('Step'),
              attr: 'step',
              clearable: false,
              options: [{ label: _('Year'), value: 'year' }, { label: _('Month'), value: 'month' }, { label: _('Day'), value: 'day' }, { label: _('Hour'), value: 'hour' }, { label: _('Minute'), value: 'minute' }, { label: _('Second'), value: 'second' }, { label: _('All'), value: 'all' }]
            }),
            _react2.default.createElement(_components.Dropdown, {
              label: _('Stepmode'),
              attr: 'stepmode',
              clearable: false,
              options: [{ label: _('To Date'), value: 'todate' }, { label: _('Backward'), value: 'backward' }]
            })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Text') },
            _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'rangeselector.font.family' }),
            _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'rangeselector.font.size', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Font Color'), attr: 'rangeselector.font.color' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Style') },
            _react2.default.createElement(_components.ColorPicker, { label: _('Background Color'), attr: 'rangeselector.bgcolor' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Active Color'), attr: 'rangeselector.activecolor' }),
            _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'rangeselector.borderwidth', units: 'px' }),
            _react2.default.createElement(_components.ColorPicker, { label: _('Border Color'), attr: 'rangeselector.bordercolor' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Horizontal Positioning') },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Anchor Point'),
              clearable: false,
              attr: 'rangeselector.xanchor',
              options: [{ label: _('Auto'), value: 'auto' }, { label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Position'), step: 0.02, attr: 'rangeselector.x' })
          ),
          _react2.default.createElement(
            _components.PlotlySection,
            { name: _('Vertical Positioning') },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Anchor Point'),
              clearable: false,
              attr: 'rangeselector.yanchor',
              options: [{ label: _('Auto'), value: 'auto' }, { label: _('Top'), value: 'top' }, { label: _('Middle'), value: 'middle' }, { label: _('Bottom'), value: 'bottom' }]
            }),
            _react2.default.createElement(_components.Numeric, { label: _('Position'), step: 0.02, attr: 'rangeselector.y' })
          )
        ),
        _react2.default.createElement(
          _components.AxesFold,
          {
            name: _('Spike Lines'),
            axisFilter: function axisFilter(axis) {
              return !(axis._subplot.includes('ternary') || axis._subplot.includes('polar') || axis._subplot.includes('geo'));
            }
          },
          _react2.default.createElement(_components.Radio, {
            attr: 'showspikes',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            attr: 'spikesides',
            label: _('Show Sides'),
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Thickness'), attr: 'spikethickness', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'spikecolor' })
        )
      );
    }
  }]);

  return StyleAxesPanel;
}(_react.Component);

StyleAxesPanel.contextTypes = {
  fullLayout: _propTypes2.default.object,
  localize: _propTypes2.default.func
};

exports.default = StyleAxesPanel;
//# sourceMappingURL=StyleAxesPanel.js.map