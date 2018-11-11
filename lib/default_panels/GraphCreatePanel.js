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

var GraphCreatePanel = function GraphCreatePanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref) {
      var _ = _ref.localize;
      return _react2.default.createElement(
        _context.ModalProviderContext.Consumer,
        null,
        function (_ref2) {
          var setPanel = _ref2.setPanel;
          return _react2.default.createElement(
            _components.TraceAccordion,
            {
              canAdd: true,
              traceFilterCondition: function traceFilterCondition(t) {
                return !(t.transforms && t.transforms.some(function (tr) {
                  return ['fit', 'moving-average'].includes(tr.type);
                }));
              }
            },
            _react2.default.createElement(_components.TraceSelector, { label: _('Type'), attr: 'type', show: true }),
            _react2.default.createElement(_components.LocationSelector, { attr: 'type' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Values'), attr: 'values' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Labels'), attr: 'labels' }),
            _react2.default.createElement(_components.DataSelector, {
              label: {
                histogram2d: _('X Values'),
                histogram: _('X Values'),
                '*': _('X')
              },
              attr: 'x'
            }),
            _react2.default.createElement(_components.DataSelector, {
              label: {
                histogram2d: _('Y Values'),
                histogram: _('Y Values'),
                '*': _('Y')
              },
              attr: 'y'
            }),
            _react2.default.createElement(_components.DataSelector, {
              label: {
                choropleth: _('Values'),
                histogram2d: _('Z Values'),
                '*': _('Z')
              },
              attr: 'z'
            }),
            _react2.default.createElement(_components.Radio, {
              label: _('Orientation'),
              attr: 'orientation',
              options: [{ label: _('Vertical'), value: 'v' }, { label: _('Horizontal'), value: 'h' }]
            }),
            _react2.default.createElement(
              _derived.HistogramInfoVertical,
              null,
              _('Note: in vertical orientation, X values are used for binning. If Y values are provided, they are used as inputs to the histogram function which you can configure in the '),
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return setPanel('Style', 'Traces');
                  } },
                _('Traces')
              ),
              _(' panel under Style. If Y values are omitted, the histogram function defaults to Count.')
            ),
            _react2.default.createElement(
              _derived.HistogramInfoHorizontal,
              null,
              _('Note: in horizontal orientation, Y values are used for binning. If X values are provided, they are used as inputs to the histogram function which you can configure in the '),
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return setPanel('Style', 'Traces');
                  } },
                _('Traces')
              ),
              _(' under Style panel. If X values are omitted, the histogram function defaults to Count.')
            ),
            _react2.default.createElement(
              _derived.Histogram2d,
              null,
              _('Note: X and Y Values are used for binning. If Z values are provided, they are used as inputs to the histogram function which you can configure in the '),
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return setPanel('Style', 'Traces');
                  } },
                _('Traces')
              ),
              _(' under Style panel. If Z values are omitted, the histogram function defaults to Count.')
            ),
            _react2.default.createElement(_components.DataSelector, { label: _('I (Optional)'), attr: 'i' }),
            _react2.default.createElement(_components.DataSelector, { label: _('J (Optional)'), attr: 'j' }),
            _react2.default.createElement(_components.DataSelector, { label: _('K (Optional)'), attr: 'k' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Open'), attr: 'open' }),
            _react2.default.createElement(_components.DataSelector, { label: _('High'), attr: 'high' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Low'), attr: 'low' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Close'), attr: 'close' }),
            _react2.default.createElement(_components.DataSelector, { label: _('A'), attr: 'a' }),
            _react2.default.createElement(_components.DataSelector, { label: _('B'), attr: 'b' }),
            _react2.default.createElement(_components.DataSelector, { label: _('C'), attr: 'c' }),
            _react2.default.createElement(_components.DataSelector, { label: _('U'), attr: 'u' }),
            _react2.default.createElement(_components.DataSelector, { label: _('V'), attr: 'v' }),
            _react2.default.createElement(_components.DataSelector, { label: _('W'), attr: 'w' }),
            _react2.default.createElement(_components.DataSelector, { label: _('X start'), attr: 'starts.x' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Y start'), attr: 'starts.y' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Z start'), attr: 'starts.z' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Headers'), attr: 'header.values' }),
            _react2.default.createElement(_components.DataSelector, { label: _('Columns'), attr: 'cells.values' }),
            _react2.default.createElement(
              _components.TraceTypeSection,
              {
                traceTypes: ['scatterpolar', 'scatterpolargl', 'barpolar'],
                mode: 'trace'
              },
              _react2.default.createElement(_components.DataSelector, { label: _('Radius'), attr: 'r' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Theta'), attr: 'theta' }),
              _react2.default.createElement(_components.Dropdown, {
                label: _('Theta Unit'),
                options: [{ label: _('Radians'), value: 'radians' }, { label: _('Degrees'), value: 'degrees' }, { label: _('Gradians'), value: 'gradians' }],
                attr: 'thetaunit',
                clearable: false
              })
            ),
            _react2.default.createElement(_components.AxesCreator, { attr: 'fake_attr' }),
            _react2.default.createElement(_components.SubplotCreator, { attr: 'fake_attr' }),
            _react2.default.createElement(
              _components.PlotlySection,
              { name: _('Header Options') },
              _react2.default.createElement(_components.DataSelector, { label: _('Fill Color'), attr: 'header.fill.color' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Font Color'), attr: 'header.font.color' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Font Size'), attr: 'header.font.size' })
            ),
            _react2.default.createElement(
              _components.PlotlySection,
              { name: _('Cell Options') },
              _react2.default.createElement(_components.DataSelector, { label: _('Fill Color'), attr: 'cells.fill.color' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Font Color'), attr: 'cells.font.color' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Font Size'), attr: 'cells.font.size' })
            ),
            _react2.default.createElement(
              _components.PlotlySection,
              { name: _('Column Options') },
              _react2.default.createElement(_components.DataSelector, { label: _('Width'), attr: 'columnwidth' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Order'), attr: 'columnorder' })
            ),
            _react2.default.createElement(
              _components.PlotlySection,
              { name: _('Options') },
              _react2.default.createElement(_components.DataSelector, { label: _('Intensity'), attr: 'intensity' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Facecolor'), attr: 'facecolor' }),
              _react2.default.createElement(_components.DataSelector, { label: _('Vertexcolor'), attr: 'vertexcolor' }),
              _react2.default.createElement(_components.Radio, {
                label: _('Transpose'),
                attr: 'transpose',
                options: [{ label: _('No'), value: false }, { label: _('Yes'), value: true }]
              })
            )
          );
        }
      );
    }
  );
};
// import PropTypes from 'prop-types';
exports.default = GraphCreatePanel;
// GraphCreatePanel.contextTypes = {
//   localize: PropTypes.func,
//   setPanel: PropTypes.func,
// };
//# sourceMappingURL=GraphCreatePanel.js.map