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

var StyleTracesPanel = function StyleTracesPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _components.TraceAccordion,
        { canGroup: true },
        _react2.default.createElement(_components.TextEditor, { label: _('Name'), attr: 'name', richTextOnly: true }),
        _react2.default.createElement(_components.NumericFraction, { label: _('Trace Opacity'), attr: 'opacity' }),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Legend') },
          _react2.default.createElement(
            _derived.ShowInLegend,
            {
              label: _('Show in Legend'),
              attr: 'showlegend',
              options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
              showOn: true
            },
            _react2.default.createElement(_components.GroupCreator, { label: _('Legend Group'), prefix: _('Group'), attr: 'legendgroup' })
          )
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Cones & Streamtubes') },
          _react2.default.createElement(_components.Numeric, { label: _('Size'), attr: 'sizeref', stepmode: 'relative' }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Size Mode'),
            options: [{ label: _('scaled'), value: 'scaled' }, { label: _('absolute'), value: 'absolute' }],
            attr: 'sizemode'
          }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Cone Anchor'),
            options: [{ label: _('Tip'), value: 'tip' }, { label: _('Tail'), value: 'tail' }, { label: _('Center'), value: 'center' }, { label: _('Center of Mass'), value: 'cm' }],
            attr: 'anchor'
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Max Tube segments'), attr: 'maxdisplayed' })
        ),
        _react2.default.createElement(_components.MultiColorPicker, { label: _('Color'), attr: 'color' }),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Pie Colors'), traceTypes: ['pie'], mode: 'trace' },
          _react2.default.createElement(
            _components.LayoutSection,
            { attr: 'name' },
            _react2.default.createElement(_components.ColorwayPicker, { label: _('Colors'), attr: 'piecolorway' }),
            _react2.default.createElement(_components.Radio, {
              label: _('Extended Colors'),
              attr: 'extendpiecolors',
              options: [{ label: _('On'), value: true }, { label: _('Off'), value: false }]
            })
          )
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Pie Title'), attr: 'title' },
          _react2.default.createElement(_components.TextEditor, { label: _('Name'), attr: 'title' }),
          _react2.default.createElement(_components.Dropdown, {
            label: 'Title Position',
            attr: 'titleposition',
            options: [{ label: _('Top Left'), value: 'top left' }, { label: _('Top Center'), value: 'top center' }, { label: _('Top Right'), value: 'top right' }, { label: _('Middle Center'), value: 'middle center' }, { label: _('Bottom Left'), value: 'bottom left' }, { label: _('Bottom Center'), value: 'bottom center' }, { label: _('Bottom Right'), value: 'bottom right' }]
          }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'titlefont.family', clearable: false }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'titlefont.size', units: 'px' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Values') },
          _react2.default.createElement(_derived.BinningDropdown, { label: _('Histogram Function'), attr: 'histfunc' }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Histogram Normalization'),
            options: [{ label: _('Number of Occurences'), value: '' }, { label: _('Percent'), value: 'percent' }, { label: _('Probability'), value: 'probability' }, { label: _('Density'), value: 'density' }, { label: _('Probability Density'), value: 'probability density' }],
            attr: 'histnorm'
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Cumulative') },
          _react2.default.createElement(_components.Radio, {
            label: _('Cumulative'),
            attr: 'cumulative.enabled',
            options: [{ label: _('Enabled'), value: true }, { label: _('Disabled'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Direction'),
            attr: 'cumulative.direction',
            options: [{ label: _('Increasing'), value: 'increasing' }, { label: _('Decreasing'), value: 'decreasing' }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Current Bin'),
            attr: 'cumulative.currentbin',
            options: [{ label: _('Include'), value: 'include' }, { label: _('Exclude'), value: 'exclude' }, { label: _('Half'), value: 'half' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Header') },
          _react2.default.createElement(_components.Numeric, { label: _('Height'), attr: 'header.height' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Fill Color'), attr: 'header.fill.color' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'header.font.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'header.font.size' }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Text Alignment'),
            options: [{ label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }],
            attr: 'header.align'
          }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Font Color'), attr: 'header.font.color' }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'header.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Border Color'), attr: 'header.line.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Cells') },
          _react2.default.createElement(_components.Numeric, { label: _('Height'), attr: 'cells.height' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Fill Color'), attr: 'cells.fill.color' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'cells.font.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'cells.font.size' }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Text Alignment'),
            options: [{ label: _('Left'), value: 'left' }, { label: _('Center'), value: 'center' }, { label: _('Right'), value: 'right' }],
            attr: 'cells.align'
          }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Font Color'), attr: 'cells.font.color' }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'cells.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Border Color'), attr: 'cells.line.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Display') },
          _react2.default.createElement(_components.Flaglist, {
            attr: 'mode',
            options: [{ label: _('Points'), value: 'markers' }, { label: _('Lines'), value: 'lines' }, { label: _('Text'), value: 'text' }]
          }),
          _react2.default.createElement(_components.Radio, {
            attr: 'flatshading',
            label: _('Flatshading'),
            options: [{ label: _('Enable'), value: true }, { label: _('Disable'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Binning') },
          _react2.default.createElement(_components.Numeric, { label: _('X Bin Start'), attr: 'xbins.start', axis: 'x' }),
          _react2.default.createElement(_components.Numeric, { label: _('X Bin End'), attr: 'xbins.end', axis: 'x' }),
          _react2.default.createElement(_components.Numeric, { label: _('X Bin Size'), attr: 'xbins.size', axis: 'x' }),
          _react2.default.createElement(_components.Numeric, { label: _('Max X Bins'), attr: 'nbinsx' }),
          _react2.default.createElement(_components.Numeric, { label: _('Y Bin Start'), attr: 'ybins.start', axis: 'y' }),
          _react2.default.createElement(_components.Numeric, { label: _('Y Bin End'), attr: 'ybins.end', axis: 'y' }),
          _react2.default.createElement(_components.Numeric, { label: _('Y Bin Size'), attr: 'ybins.size', axis: 'y' }),
          _react2.default.createElement(_components.Numeric, { label: _('Max Y Bins'), attr: 'nbinsy' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { label: _('Bar Position') },
          _react2.default.createElement(_components.Numeric, { label: _('Base'), attr: 'base' }),
          _react2.default.createElement(_components.Numeric, { label: _('Offset'), attr: 'offset' }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'width' })
        ),
        _react2.default.createElement(
          _components.TraceMarkerSection,
          null,
          _react2.default.createElement(_components.Radio, {
            label: _('Order'),
            attr: 'sort',
            options: [{ label: _('Sorted'), value: true }, { label: _('Unsorted'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Direction'),
            attr: 'direction',
            options: [{ label: _('Clockwise'), value: 'clockwise' }, { label: _('Counterclockwise'), value: 'counterclockwise' }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Rotation'), attr: 'rotation' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Hole Size'), attr: 'hole' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Pull'), attr: 'pull' }),
          _react2.default.createElement(_components.Dropdown, {
            options: [{ label: _('Show All'), value: 'all' }, { label: _('Outliers'), value: 'outliers' }, { label: _('Suspected Outliers'), value: 'suspectedoutliers' }, { label: _('Hide'), value: false }],
            attr: 'boxpoints',
            clearable: false
          }),
          _react2.default.createElement(_components.Dropdown, {
            options: [{ label: _('Show All'), value: 'all' }, { label: _('Outliers'), value: 'outliers' }, { label: _('Suspected Outliers'), value: 'suspectedoutliers' }, { label: _('Hide'), value: false }],
            attr: 'points',
            clearable: false
          }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Jitter'), attr: 'jitter' }),
          _react2.default.createElement(_components.Numeric, { label: _('Position'), attr: 'pointpos', step: 0.1, showSlider: true }),
          _react2.default.createElement(_components.MarkerColor, { suppressMultiValuedMessage: true, label: _('Color'), attr: 'marker.color' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Point Opacity'), attr: 'marker.opacity' }),
          _react2.default.createElement(_components.MarkerSize, { label: _('Size'), attr: 'marker.size' }),
          _react2.default.createElement(_derived.NumericReciprocal, {
            label: _('Size Scale'),
            attr: 'marker.sizeref',
            step: 0.2,
            stepmode: 'relative'
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Size Mode'),
            attr: 'marker.sizemode',
            options: [{ label: _('Area'), value: 'area' }, { label: _('Diameter'), value: 'diameter' }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Minimum Size'), attr: 'marker.sizemin' }),
          _react2.default.createElement(_components.SymbolSelector, { label: _('Symbol'), attr: 'marker.symbol' }),
          _react2.default.createElement(_components.Numeric, { label: _('Border Width'), attr: 'marker.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Border Color'), attr: 'marker.line.color' }),
          _react2.default.createElement(_components.Numeric, { label: _('Max Number of Points'), attr: 'marker.maxdisplayed' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Bar Size and Spacing'),
            traceTypes: ['bar', 'histogram'],
            mode: 'trace'
          },
          _react2.default.createElement(
            _components.LayoutSection,
            { attr: 'name' },
            _react2.default.createElement(_components.Dropdown, {
              label: _('Bar Mode'),
              attr: 'barmode',
              options: [{ label: _('Overlay'), value: 'overlay' }, { label: _('Group'), value: 'group' }, { label: _('Stack'), value: 'stack' }, { label: _('Relative'), value: 'relative' }],
              clearable: false
            }),
            _react2.default.createElement(_components.Dropdown, {
              label: _('Normalization'),
              attr: 'barnorm',
              options: [{ label: _('None'), value: '' }, { label: _('Fraction'), value: 'fraction' }, { label: _('Percent'), value: 'percent' }],
              clearable: false
            }),
            _react2.default.createElement(_components.NumericFractionInverse, { label: _('Bar Width'), attr: 'bargap' }),
            _react2.default.createElement(_components.NumericFraction, { label: _('Bar Padding'), attr: 'bargroupgap' })
          )
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Box Size and Spacing'), traceTypes: ['box'], mode: 'trace' },
          _react2.default.createElement(
            _components.LayoutSection,
            { attr: 'name' },
            _react2.default.createElement(_components.Radio, {
              label: _('Box Mode'),
              attr: 'boxmode',
              options: [{ label: _('Overlay'), value: 'overlay' }, { label: _('Group'), value: 'group' }]
            }),
            _react2.default.createElement(_components.NumericFractionInverse, { label: _('Box Width'), attr: 'boxgap' }),
            _react2.default.createElement(_components.NumericFraction, { label: _('Box Padding'), attr: 'boxgroupgap' })
          )
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Violin Size and Spacing'), traceTypes: ['violin'], mode: 'trace' },
          _react2.default.createElement(
            _components.LayoutSection,
            { attr: 'name' },
            _react2.default.createElement(_components.Radio, {
              label: _('Violin Mode'),
              attr: 'violinmode',
              options: [{ label: _('Overlay'), value: 'overlay' }, { label: _('Group'), value: 'group' }]
            }),
            _react2.default.createElement(_components.NumericFractionInverse, { label: _('Violin Width'), attr: 'violingap' }),
            _react2.default.createElement(_components.NumericFraction, { label: _('Violin Padding'), attr: 'violingroupgap' })
          )
        ),
        _react2.default.createElement(_components.NumericFraction, { label: _('Whisker Width'), attr: 'whiskerwidth' }),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Ticks') },
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'tickwidth' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Contours') },
          _react2.default.createElement(_components.Radio, {
            label: _('Type'),
            attr: 'contours.type',
            options: [{ label: _('Levels'), value: 'levels' }, { label: _('Constraint'), value: 'constraint' }]
          }),
          _react2.default.createElement(_components.Dropdown, {
            label: _('Coloring'),
            attr: 'contours.coloring',
            options: [{ label: _('Fill'), value: 'fill' }, { label: _('Heatmap'), value: 'heatmap' }, { label: _('Lines'), value: 'lines' }, { label: _('None'), value: 'none' }],
            clearable: false
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Contour Lines'),
            attr: 'contours.showlines',
            options: [{ label: _('On'), value: true }, { label: _('Off'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Contour Labels'),
            attr: 'contours.showlabels',
            options: [{ label: _('On'), value: true }, { label: _('Off'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Number of Contours'),
            attr: 'autocontour',
            options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Max Contours'), attr: 'ncontours' }),
          _react2.default.createElement(_components.ContourNumeric, { label: _('Step Size'), attr: 'contours.size' }),
          _react2.default.createElement(_components.ContourNumeric, { label: _('Min Contour'), attr: 'contours.start' }),
          _react2.default.createElement(_components.ContourNumeric, { label: _('Max Contour'), attr: 'contours.end' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Stacking'), traceTypes: ['scatter'], mode: 'trace' },
          _react2.default.createElement(_components.GroupCreator, { label: _('Group'), prefix: _('Stack'), attr: 'stackgroup' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Gaps'),
            attr: 'stackgaps',
            options: [{ label: _('Infer Zero'), value: 'infer zero' }, { label: _('Interpolate'), value: 'interpolate' }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Orientation'),
            attr: 'orientation',
            options: [{ label: _('Horizontal'), value: 'h' }, { label: _('Vertical'), value: 'v' }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Normalization'),
            attr: 'groupnorm',
            options: [{ label: _('None'), value: '' }, { label: _('Fraction'), value: 'fraction' }, { label: _('Percent'), value: 'percent' }]
          })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Lines'),
            traceTypes: ['scatter', 'contour', 'scatterternary', 'scatterpolar', 'scatterpolargl', 'scatter3d', 'scattergl', 'scattergeo', 'scattermapbox', 'box', 'violin'],
            mode: 'trace'
          },
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Color'), attr: 'line.color' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Color Bar'),
            attr: 'line.showscale',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.ColorscalePicker, { label: _('Colorscale'), attr: 'line.colorscale' }),
          _react2.default.createElement(_components.LineDashSelector, { label: _('Type'), attr: 'line.dash' }),
          _react2.default.createElement(_components.LineShapeSelector, { label: _('Shape'), attr: 'line.shape' }),
          _react2.default.createElement(_components.Numeric, { label: _('Smoothing'), attr: 'line.smoothing', showSlider: true, step: 0.1 }),
          _react2.default.createElement(_components.Radio, {
            label: _('Connect Gaps'),
            attr: 'connectgaps',
            options: [{ label: _('Connect'), value: true }, { label: _('Blank'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Filled Area') },
          _react2.default.createElement(_components.FillDropdown, { attr: 'fill', label: _('Fill to') }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Color'), attr: 'fillcolor' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Text Attributes') },
          _react2.default.createElement(_derived.TextInfo, { attr: 'textinfo' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Text'),
            traceTypes: ['scatter', 'scattergl', 'scatterpolar', 'scatterpolargl', 'barpolar', 'pie', 'scatter3d', 'scatterternary', 'bar', 'scattergeo', 'scattermapbox'],
            mode: 'trace'
          },
          _react2.default.createElement(_components.DataSelector, { label: _('Text'), attr: 'text' }),
          _react2.default.createElement(_components.TextPosition, { label: _('Text Position'), attr: 'textposition' }),
          _react2.default.createElement(_components.FontSelector, { label: _('Typeface'), attr: 'textfont.family' }),
          _react2.default.createElement(_components.Numeric, { label: _('Font Size'), attr: 'textfont.size', units: 'px' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Font Color'), attr: 'textfont.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Colorscale') },
          _react2.default.createElement(_components.ColorscalePicker, { label: _('Colorscale'), attr: 'colorscale' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Color Bar'),
            attr: 'showscale',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Orientation'),
            attr: 'reversescale',
            options: [{ label: _('Normal'), value: false }, { label: _('Reversed'), value: true }]
          }),
          _react2.default.createElement(
            _components.VisibilitySelect,
            {
              label: _('Range'),
              attr: 'zauto',
              options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }],
              showOn: false,
              defaultOpt: true
            },
            _react2.default.createElement(_components.Numeric, { label: _('Min'), attr: 'zmin' }),
            _react2.default.createElement(_components.Numeric, { label: _('Max'), attr: 'zmax' })
          ),
          _react2.default.createElement(
            _components.VisibilitySelect,
            {
              label: _('Range'),
              attr: 'cauto',
              options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }],
              showOn: false,
              defaultOpt: true
            },
            _react2.default.createElement(_components.Numeric, { label: _('Min'), attr: 'cmin' }),
            _react2.default.createElement(_components.Numeric, { label: _('Max'), attr: 'cmax' })
          ),
          _react2.default.createElement(_components.Radio, {
            label: _('Smoothing'),
            attr: 'zsmooth',
            options: [{ label: _('On'), value: 'best' }, { label: _('Off'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Gaps Between Cells') },
          _react2.default.createElement(_components.Numeric, { label: _('Horizontal Gap'), attr: 'xgap' }),
          _react2.default.createElement(_components.Numeric, { label: _('Vertical Gap'), attr: 'ygap' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Heatmap') },
          _react2.default.createElement(_components.Numeric, { label: _('Horizontal Gaps'), attr: 'xgap' }),
          _react2.default.createElement(_components.Numeric, { label: _('Vertical Gaps'), attr: 'ygap' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Gaps in Data'),
            traceTypes: ['heatmap', 'contour', 'heatmapgl'],
            mode: 'trace'
          },
          _react2.default.createElement(_components.Radio, {
            label: _('Interpolate Gaps'),
            attr: 'connectgaps',
            options: [{ label: _('On'), value: true }, { label: _('Off'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Lighting') },
          _react2.default.createElement(_components.NumericFraction, { label: _('Ambient'), attr: 'lighting.ambient' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Diffuse'), attr: 'lighting.diffuse' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Specular'), attr: 'lighting.specular' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Roughness'), attr: 'lighting.roughness' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Fresnel'), attr: 'lighting.fresnel' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Vertex Normal'), attr: 'lighting.vertexnormalsepsilon' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Face Normal'), attr: 'lighting.facenormalsepsilon' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Light Position') },
          _react2.default.createElement(_components.NumericFraction, { label: _('X'), attr: 'lightposition.x' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Y'), attr: 'lightposition.y' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Z'), attr: 'lightposition.z' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Increasing Trace Styles') },
          _react2.default.createElement(_components.TextEditor, { label: _('Name'), attr: 'increasing.name', richTextOnly: true }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'increasing.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Line Color'), attr: 'increasing.line.color' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Fill Color'), attr: 'increasing.fillcolor' }),
          _react2.default.createElement(_components.LineDashSelector, { label: _('Type'), attr: 'increasing.line.dash' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Show in Legend'),
            attr: 'increasing.showlegend',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Decreasing Trace Styles') },
          _react2.default.createElement(_components.TextEditor, { label: _('Name'), attr: 'decreasing.name', richTextOnly: true }),
          _react2.default.createElement(_components.Numeric, { label: _('Width'), attr: 'decreasing.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Line Color'), attr: 'decreasing.line.color' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Fill Color'), attr: 'decreasing.fillcolor' }),
          _react2.default.createElement(_components.LineDashSelector, { label: _('Type'), attr: 'decreasing.line.dash' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Show in Legend'),
            attr: 'decreasing.showlegend',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Scaling') },
          _react2.default.createElement(_components.GroupCreator, { label: _('Scale Group'), prefix: _('Group'), attr: 'scalegroup' }),
          _react2.default.createElement(_components.Radio, {
            label: _('Scale Mode'),
            attr: 'scalemode',
            options: [{ label: _('Width'), value: 'width' }, { label: _('Count'), value: 'count' }]
          }),
          _react2.default.createElement(_components.Radio, {
            label: _('Span Mode'),
            attr: 'spanmode',
            options: [{ label: _('Soft'), value: 'soft' }, { label: _('Hard'), value: 'hard' }, { label: _('Manual'), value: 'manual' }]
          }),
          _react2.default.createElement(_components.Numeric, { label: _('Bandwidth'), attr: 'bandwidth' }),
          _react2.default.createElement(_components.Numeric, { label: _('Span'), attr: 'span' }),
          _react2.default.createElement(_components.Radio, {
            attr: 'side',
            label: _('Visible Sides'),
            options: [{ label: _('Both'), value: 'both' }, { label: _('Positive'), value: 'positive' }, { label: _('Negative'), value: 'negative' }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Box Mean') },
          _react2.default.createElement(_components.Radio, {
            attr: 'boxmean',
            options: [{ label: _('Mean'), value: true }, { label: _('Mean & SD'), value: 'sd' }, { label: _('None'), value: false }]
          })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Box') },
          _react2.default.createElement(_components.Radio, {
            attr: 'box.visible',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Box Width'), attr: 'box.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Box Fill Color'), attr: 'box.color' }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Box Line Width'), attr: 'box.line.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Box Line Color'), attr: 'box.line.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Meanline') },
          _react2.default.createElement(_components.Radio, {
            attr: 'meanline.visible',
            options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
          }),
          _react2.default.createElement(_components.NumericFraction, { label: _('Meanline Width'), attr: 'meanline.width' }),
          _react2.default.createElement(_components.MultiColorPicker, { label: _('Meanline Color'), attr: 'meanline.color' })
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('On Hover') },
          _react2.default.createElement(_components.HoverInfo, { attr: 'hoverinfo', label: _('Values Shown On Hover') }),
          _react2.default.createElement(_components.Radio, {
            label: _('Split labels'),
            attr: 'hoverlabel.split',
            options: [{ label: _('Yes'), value: true }, { label: _('No'), value: false }]
          }),
          _react2.default.createElement(
            _components.VisibilitySelect,
            {
              attr: 'contour.show',
              label: _('Show Contour'),
              options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }],
              showOn: true,
              defaultOpt: false
            },
            _react2.default.createElement(_components.MultiColorPicker, { label: _('Contour Color'), attr: 'contour.color' }),
            _react2.default.createElement(_components.Numeric, { label: _('Contour Width'), attr: 'contour.width' })
          )
        ),
        _react2.default.createElement(
          _components.PlotlySection,
          { name: _('Hover Action') },
          _react2.default.createElement(_derived.HoveronDropdown, { attr: 'hoveron', label: _('Hover on') })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Error Bars X'),
            traceTypes: ['scatter', 'scattergl', 'scatter3d', 'bar'],
            mode: 'trace'
          },
          _react2.default.createElement(_components.ErrorBars, { attr: 'error_x' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          {
            name: _('Error Bars Y'),
            traceTypes: ['scatter', 'scattergl', 'scatter3d', 'bar'],
            mode: 'trace'
          },
          _react2.default.createElement(_components.ErrorBars, { attr: 'error_y' })
        ),
        _react2.default.createElement(
          _components.TraceTypeSection,
          { name: _('Error Bars Z'), traceTypes: ['scatter3d'], mode: 'trace' },
          _react2.default.createElement(_components.ErrorBars, { attr: 'error_z' })
        )
      );
    }
  );
};

// StyleTracesPanel.contextTypes = {
//   localize: PropTypes.func,
// };

// import PropTypes from 'prop-types';

exports.default = StyleTracesPanel;
//# sourceMappingURL=StyleTracesPanel.js.map