'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _constants = require('../lib/constants');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphSubplotsPanel = function GraphSubplotsPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.SubplotAccordion,
        null,
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Boundaries'), attr: 'xaxis.domain[0]' },
          _react2.default.createElement(_components.AxisOverlayDropdown, { label: _('X Overlay'), attr: 'xaxis.overlaying' }),
          _react2.default.createElement(_components.AxisOverlayDropdown, { label: _('Y Overlay'), attr: 'yaxis.overlaying' })
        ),
        _react2.default.createElement(_components.RectanglePositioner, { attr: 'domain.x[0]' }),
        _react2.default.createElement(_components.RectanglePositioner, { attr: 'xaxis.domain[0]', cartesian: true }),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('X Anchor'), traceTypes: _constants.TRACE_TO_AXIS.cartesian },
          _react2.default.createElement(_components.AxisAnchorDropdown, { label: _('Anchor to'), attr: 'xaxis.anchor', clearable: false }),
          _react2.default.createElement(_components.AxisSide, { label: _('Side'), attr: 'xaxis.side' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Y Anchor'), traceTypes: _constants.TRACE_TO_AXIS.cartesian },
          _react2.default.createElement(_components.AxisAnchorDropdown, { label: _('Anchor to'), attr: 'yaxis.anchor', clearable: false }),
          _react2.default.createElement(_components.AxisSide, { label: _('Side'), attr: 'yaxis.side' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Aspect Ratio') },
          _react2.default.createElement(
            _components.VisibilitySelect,
            {
              attr: 'aspectmode',
              options: [{ label: _('Auto'), value: 'mode' }, { label: _('Cube'), value: 'cube' }, { label: _('Data'), value: 'data' }, { label: _('Manual'), value: 'manual' }],
              dropdown: true,
              clearable: false,
              showOn: 'manual',
              defaultOpt: 'mode'
            },
            _react2.default.createElement(_components.Numeric, { label: _('X'), attr: 'aspectratio.x', step: 0.1 }),
            _react2.default.createElement(_components.Numeric, { label: _('Y'), attr: 'aspectratio.y', step: 0.1 }),
            _react2.default.createElement(_components.Numeric, { label: _('Z'), attr: 'aspectratio.z', step: 0.1 })
          )
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Canvas') },
          _react2.default.createElement(_components.ColorPicker, { label: _('Plot Background'), attr: 'bgcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Bar Options') },
          _react2.default.createElement(_components.Radio, {
            label: _('Bar Mode'),
            attr: 'barmode',
            options: [{ label: _('Stack'), value: 'stack' }, { label: _('Overlay'), value: 'overlay' }]
          }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Bar Padding'), attr: 'bargap', showSlider: true })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Map Style') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Mapbox Style'),
            attr: 'style',
            options: [{ label: _('Basic'), value: 'basic' }, { label: _('Outdoors'), value: 'outdoors' }, { label: _('Light'), value: 'light' }, { label: _('Dark'), value: 'dark' }, { label: _('Satellite'), value: 'satellite' }, { label: _('Satellite with Streets'), value: 'satellite-streets' }],
            clearable: false
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Map Positioning') },
          _react2.default.createElement(_components.Numeric, { label: _('Center Latitude'), attr: 'center.lat' }),
          _react2.default.createElement(_components.Numeric, { label: _('Center Longitude'), attr: 'center.lon' }),
          _react2.default.createElement(_components.Numeric, { label: _('Zoom Level'), attr: 'zoom', min: 0 }),
          _react2.default.createElement(_components.Numeric, { label: _('Bearing'), attr: 'bearing' }),
          _react2.default.createElement(_components.Numeric, { label: _('Pitch'), attr: 'pitch', min: 0 })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Map Projection') },
          _react2.default.createElement(_components.Dropdown, {
            label: _('Region'),
            attr: 'scope',
            options: [{ label: _('World'), value: 'world' }, { label: _('USA'), value: 'usa' }, { label: _('Europe'), value: 'europe' }, { label: _('Asia'), value: 'asia' }, { label: _('Africa'), value: 'africa' }, { label: _('North America'), value: 'north america' }, { label: _('South America'), value: 'south america' }],
            clearable: false
          }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Projection'),
            attr: 'projection.type',
            clearable: false,
            options: [{ label: _('Equirectangular'), value: 'equirectangular' }, { label: _('Mercator'), value: 'mercator' }, { label: _('Orthographic'), value: 'orthographic' }, { label: _('Natural Earth'), value: 'natural earth' }, { label: _('Albers USA'), value: 'albers usa' }, { label: _('Winkel Tripel'), value: 'winkel tripel' }, { label: _('Robinson'), value: 'robinson' }, { label: _('Miller'), value: 'miller' }, { label: _('Kavrayskiy 7'), value: 'kavrayskiy7' }, { label: _('Eckert 4'), value: 'eckert4' }, { label: _('Azimuthal Equal Area'), value: 'azimuthal equal area' }, {
              label: _('Azimuthal Equidistant'),
              value: 'azimuthal equidistant'
            }, { label: _('Conic Equal Area'), value: 'conic equal area' }, { label: _('Conic Conformal'), value: 'conic conformal' }, { label: _('Conic Equidistant'), value: 'conic equidistant' }, { label: _('Gnomonic'), value: 'gnomonic' }, { label: _('Stereographic'), value: 'stereographic' }, { label: _('Mollweide'), value: 'mollweide' }, { label: _('Hammer'), value: 'hammer' }, { label: _('Transverse Mercator'), value: 'transverse mercator' }, { label: _('Aitoff'), value: 'aitoff' }, { label: _('Sinusoidal'), value: 'sinusoidal' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Country Borders'), attr: 'showcountries' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showcountries',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'countrywidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Border Color'), attr: 'countrycolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Sub-Country Unit Borders'), attr: 'showsubunits' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showsubunits',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'subunitwidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Border Color'), attr: 'subunitcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Coastlines'), attr: 'showcoastlines' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showcoastlines',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'coastlinewidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'coastlinecolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Oceans'), attr: 'showocean' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showocean',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'oceancolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Land'), attr: 'showland' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showland',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'landcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Lakes'), attr: 'showlakes' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showlakes',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'lakecolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Rivers'), attr: 'showrivers' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showrivers',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'riverwidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'rivercolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Map Frame'), attr: 'showframe' },
          _react2.default.createElement(_components.Radio, {
            attr: 'showframe',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'framewidth', units: 'px' }),
          _react2.default.createElement(_components.ColorPicker, { label: _('Color'), attr: 'framecolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Map Options') },
          _react2.default.createElement(_components.Radio, {
            label: _('Resolution'),
            attr: 'resolution',
            options: [{ label: _('1:110,000,000'), value: 110 }, { label: _('1:50,000,000'), value: 50 }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Scale'), attr: 'projection.scale', min: 0 }),
          _react2.default.createElement(_components.Numeric, { label: _('Latitude'), attr: 'projection.rotation.lon', min: 0 }),
          _react2.default.createElement(_components.Numeric, { label: _('Longitude'), attr: 'projection.rotation.lat', min: 0 }),
          _react2.default.createElement(_components.Numeric, { label: _('Roll'), attr: 'projection.rotation.roll', min: 0 })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Ternary') },
          _react2.default.createElement(_components.Numeric, { label: _('Sum'), attr: 'sum' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Polar Sector') },
          _react2.default.createElement(_components.Numeric, { label: _('Min'), attr: 'sector[0]', min: -360, max: 360, showSlider: true }),
          _react2.default.createElement(_components.Numeric, { label: _('Max'), attr: 'sector[1]', min: -360, max: 360, showSlider: true }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Hole'), attr: 'hole', min: 0, max: 100, showSlider: true })
        )
      );
    }
  );
};

// GraphSubplotsPanel.contextTypes = {
//   localize: PropTypes.func,
// };

// import PropTypes from 'prop-types';
exports.default = GraphSubplotsPanel;
//# sourceMappingURL=GraphSubplotsPanel.js.map