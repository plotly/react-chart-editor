'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoverColor = exports.HovermodeDropdown = exports.HoveronDropdown = exports.FillDropdown = exports.HoverInfo = exports.TextInfo = exports.TextPosition = exports.PositioningNumeric = exports.PositioningRef = exports.AnnotationRef = exports.AnnotationArrowRef = exports.NumericReciprocal = exports.NumericFractionInverse = exports.NumericFractionDomain = exports.NumericFraction = exports.DTicks = exports.NTicks = exports.AxesRange = exports.Histogram2d = exports.HistogramInfoHorizontal = exports.HistogramInfoVertical = exports.ShowInLegend = exports.TickFormat = exports.BinningDropdown = exports.ContourNumeric = exports.AxisSide = exports.RangesliderVisible = exports.AxisOverlayDropdown = exports.AxisAnchorDropdown = undefined;

var _fastIsnumeric = require('fast-isnumeric');

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _Dropdown = require('./Dropdown');

var _DropdownCustom = require('./DropdownCustom');

var _Flaglist = require('./Flaglist');

var _Numeric = require('./Numeric');

var _AxisRangeValue = require('./AxisRangeValue');

var _Radio = require('./Radio');

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _ColorPicker = require('./ColorPicker');

var _VisibilitySelect = require('./VisibilitySelect');

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxisAnchorDropdown = exports.AxisAnchorDropdown = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    var options = [];

    if (props.attr.startsWith('xaxis')) {
      options = context.fullLayout._subplots.yaxis.map(function (axis) {
        return {
          label: (0, _lib.getAxisTitle)(context.fullLayout[(0, _lib.axisIdToAxisName)(axis)]),
          value: axis
        };
      });
    } else if (props.attr.startsWith('yaxis')) {
      options = context.fullLayout._subplots.xaxis.map(function (axis) {
        return {
          label: (0, _lib.getAxisTitle)(context.fullLayout[(0, _lib.axisIdToAxisName)(axis)]),
          value: axis
        };
      });
    }
    options.push({ label: _('Free'), value: 'free' });
    plotProps.options = options;
  }
});

var AxisOverlayDropdown = exports.AxisOverlayDropdown = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    var options = [];

    if (props.attr.startsWith('xaxis')) {
      options = context.fullLayout._subplots.xaxis.map(function (axis) {
        return {
          label: (0, _lib.getAxisTitle)(context.fullLayout[(0, _lib.axisIdToAxisName)(axis)]),
          value: axis
        };
      });
    } else if (props.attr.startsWith('yaxis')) {
      options = context.fullLayout._subplots.yaxis.map(function (axis) {
        return {
          label: (0, _lib.getAxisTitle)(context.fullLayout[(0, _lib.axisIdToAxisName)(axis)]),
          value: axis
        };
      });
    }

    options.unshift({ label: _('None'), value: false });

    // filter out the current axisID, can't overlay over itself
    plotProps.options = options.filter(function (option) {
      return context.fullContainer && context.fullContainer.xaxis && context.fullContainer.yaxis && context.fullContainer.xaxis._id !== option.value && context.fullContainer.yaxis._id !== option.value;
    });

    plotProps.clearable = false;
  }
});

var RangesliderVisible = exports.RangesliderVisible = (0, _lib.connectToContainer)(_Radio.UnconnectedRadio, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (!plotProps.fullValue) {
      plotProps.fullValue = false;
      plotProps.visible = false;
      plotProps.isVisible = true;
      return;
    }
  }
});

var AxisSide = exports.AxisSide = (0, _lib.connectToContainer)(_Radio.UnconnectedRadio, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    if (plotProps.fullValue === 'left' || plotProps.fullValue === 'right') {
      plotProps.options = [{ label: _('Left'), value: 'left' }, { label: _('Right'), value: 'right' }];
      return;
    }

    if (plotProps.fullValue === 'top' || plotProps.fullValue === 'bottom') {
      plotProps.options = [{ label: _('Top'), value: 'top' }, { label: _('Bottom'), value: 'bottom' }];
      return;
    }

    if (plotProps.fullValue === 'clockwise' || plotProps.fullValue === 'counterclockwise') {
      plotProps.options = [{ label: _('Clockwise'), value: 'clockwise' }, { label: _('Counterclockwise'), value: 'counterclockwise' }];
      return;
    }

    plotProps.isVisible = false;
  }
});

var ContourNumeric = exports.ContourNumeric = (0, _lib.connectToContainer)(_Numeric.UnconnectedNumeric, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullContainer = plotProps.fullContainer;

    if (plotProps.isVisible && fullContainer && fullContainer.autocontour) {
      plotProps.isVisible = false;
    }
  }
});

var BinningDropdown = exports.BinningDropdown = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    var axis = plotProps.fullContainer.type === 'histogram2d' ? 'Z' : plotProps.fullContainer.orientation === 'v' ? 'Y' : 'X';
    plotProps.options = [{ label: _('Count ') + axis, value: 'count' }, { label: _('Sum ') + axis, value: 'sum' }, { label: _('Average ') + axis, value: 'avg' }, { label: _('Minimum ') + axis, value: 'min' }, { label: _('Maximum ') + axis, value: 'max' }];
  }
});

var TickFormat = exports.TickFormat = (0, _lib.connectToContainer)(_DropdownCustom.UnconnectedDropdownCustom, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    if (plotProps.fullContainer.type === 'date') {
      plotProps.options = [{ label: _('Default'), value: '' }, { label: _('Advanced (d3-time-format)'), value: '%x' }];
      plotProps.customOpt = '%x';
    } else {
      plotProps.options = [{ label: _('Simple'), value: '' }, { label: _('Advanced (d3-format)'), value: 's' }];
      plotProps.customOpt = 's';
    }
  }
});

var ShowInLegend = exports.ShowInLegend = (0, _lib.connectToContainer)(_VisibilitySelect.UnconnectedVisibilitySelect, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    plotProps.isVisible = context.fullLayout.showlegend;
    return plotProps;
  }
});

var HistogramInfoVertical = exports.HistogramInfoVertical = (0, _lib.connectToContainer)(_Info2.default, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    plotProps.isVisible = context.fullContainer.type === 'histogram' && context.fullContainer.orientation === 'v';
    return plotProps;
  }
});

var HistogramInfoHorizontal = exports.HistogramInfoHorizontal = (0, _lib.connectToContainer)(_Info2.default, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    plotProps.isVisible = context.fullContainer.type === 'histogram' && context.fullContainer.orientation === 'h';
    return plotProps;
  }
});

var Histogram2d = exports.Histogram2d = (0, _lib.connectToContainer)(_Info2.default, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    plotProps.isVisible = context.fullContainer.type === 'histogram2d';
    return plotProps;
  }
});

var AxesRange = exports.AxesRange = (0, _lib.connectToContainer)(_AxisRangeValue.UnconnectedAxisRangeValue, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullContainer = plotProps.fullContainer;

    if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
      plotProps.isVisible = false;
    }
    return plotProps;
  }
});

var NTicks = exports.NTicks = (0, _lib.connectToContainer)(_Numeric.UnconnectedNumeric, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullContainer = plotProps.fullContainer;

    if (plotProps.isVisible && fullContainer && fullContainer.tickmode !== 'auto') {
      plotProps.isVisible = false;
    }
    return plotProps;
  }
});

var DTicks = exports.DTicks = (0, _lib.connectToContainer)(_AxisRangeValue.UnconnectedAxisRangeValue, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullContainer = plotProps.fullContainer;

    if (fullContainer && fullContainer._name && (fullContainer._name.startsWith('lat') || fullContainer._name.startsWith('lon'))) {
      // don't mess with visibility on geo axes
      return plotProps;
    }
    if (plotProps.isVisible && fullContainer && fullContainer.tickmode !== 'linear') {
      plotProps.isVisible = false;
    }
    return plotProps;
  }
});

var UnconnectedNumericFraction = function (_UnconnectedNumeric) {
  _inherits(UnconnectedNumericFraction, _UnconnectedNumeric);

  function UnconnectedNumericFraction() {
    _classCallCheck(this, UnconnectedNumericFraction);

    return _possibleConstructorReturn(this, (UnconnectedNumericFraction.__proto__ || Object.getPrototypeOf(UnconnectedNumericFraction)).apply(this, arguments));
  }

  return UnconnectedNumericFraction;
}(_Numeric.UnconnectedNumeric);

UnconnectedNumericFraction.propTypes = _Numeric.UnconnectedNumeric.propTypes;
UnconnectedNumericFraction.defaultProps = {
  units: '%',
  showSlider: true
};

var numericFractionModifyPlotProps = function numericFractionModifyPlotProps(props, context, plotProps) {
  var attrMeta = plotProps.attrMeta,
      fullValue = plotProps.fullValue,
      updatePlot = plotProps.updatePlot;

  var min = attrMeta && attrMeta.min || 0;
  var max = attrMeta && attrMeta.max || 1;
  if ((0, _fastIsnumeric2.default)(fullValue)) {
    plotProps.fullValue = Math.round(100 * (fullValue - min) / (max - min));
  }

  plotProps.updatePlot = function (v) {
    if ((0, _fastIsnumeric2.default)(v)) {
      updatePlot(v / 100 * (max - min) + min);
    } else {
      updatePlot(v);
    }
  };
  plotProps.max = 100;
  plotProps.min = 0;
};

var NumericFraction = exports.NumericFraction = (0, _lib.connectToContainer)(UnconnectedNumericFraction, {
  modifyPlotProps: numericFractionModifyPlotProps
});

var NumericFractionDomain = exports.NumericFractionDomain = (0, _lib.connectToContainer)(UnconnectedNumericFraction, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    numericFractionModifyPlotProps(props, context, plotProps);
    if (context.container && context.container.overlaying) {
      plotProps.isVisible = null;
    }
  }
});

var NumericFractionInverse = exports.NumericFractionInverse = (0, _lib.connectToContainer)(UnconnectedNumericFraction, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var attrMeta = plotProps.attrMeta,
        fullValue = plotProps.fullValue,
        updatePlot = plotProps.updatePlot;

    if ((0, _fastIsnumeric2.default)(fullValue)) {
      plotProps.fullValue = Math.round((1 - fullValue) * 100);
    }

    plotProps.updatePlot = function (v) {
      if ((0, _fastIsnumeric2.default)(v)) {
        updatePlot(1 - v / 100);
      } else {
        updatePlot(v);
      }
    };

    // Also take the inverse of max and min.
    if (attrMeta) {
      if ((0, _fastIsnumeric2.default)(attrMeta.min)) {
        plotProps.max = (1 - attrMeta.min) * 100;
      }

      if ((0, _fastIsnumeric2.default)(attrMeta.max)) {
        plotProps.min = (1 - attrMeta.max) * 100;
      }
    }
  }
});

var NumericReciprocal = exports.NumericReciprocal = (0, _lib.connectToContainer)(_Numeric.UnconnectedNumeric, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullValue = plotProps.fullValue,
        updatePlot = plotProps.updatePlot;


    if ((0, _fastIsnumeric2.default)(fullValue)) {
      plotProps.fullValue = 1 / fullValue;
    }

    plotProps.updatePlot = function (v) {
      if ((0, _fastIsnumeric2.default)(v)) {
        updatePlot(1 / v);
      } else {
        updatePlot(v);
      }
    };

    plotProps.min = 0;
  }
});

var AnnotationArrowRef = exports.AnnotationArrowRef = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    if (!context.fullContainer) {
      return;
    }
    var _context$fullContaine = context.fullContainer,
        xref = _context$fullContaine.xref,
        yref = _context$fullContaine.yref;


    var currentAxisRef = void 0;
    if (props.attr === 'axref') {
      currentAxisRef = xref;
    } else if (props.attr === 'ayref') {
      currentAxisRef = yref;
    } else {
      throw new Error(_('AnnotationArrowRef must be given either "axref" or "ayref" as attrs. Instead was given') + props.attr);
    }

    if (currentAxisRef === 'paper') {
      // If currentAxesRef is paper provide all axes options to user.

      var axes = (0, _lib.getAllAxes)(context.fullLayout).filter(function (a) {
        return a._id;
      });
      if (axes.length > 0) {
        plotProps.options = [{ label: _('in pixels'), value: 'pixel' }].concat(_toConsumableArray(computeAxesRefOptions(axes, props.attr)));
      } else {
        plotProps.isVisible = false;
      }
    } else {
      // If currentAxesRef is an actual axes then offer that value as the only
      // axes option.
      plotProps.options = [{ label: _('in pixels'), value: 'pixel' }, { label: _('according to axis'), value: currentAxisRef }];
    }

    plotProps.clearable = false;
  }
});

var AnnotationRef = exports.AnnotationRef = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (!context.fullContainer) {
      return;
    }
    var _context$fullContaine2 = context.fullContainer,
        axref = _context$fullContaine2.axref,
        ayref = _context$fullContaine2.ayref,
        _ = context.localize;


    var currentOffsetRef = void 0;
    if (props.attr === 'xref') {
      currentOffsetRef = axref;
    } else if (props.attr === 'yref') {
      currentOffsetRef = ayref;
    } else {
      throw new Error(_('AnnotationRef must be given either "xref" or "yref" as attrs. Instead was given') + props.attr + '.');
    }

    var axes = (0, _lib.getAllAxes)(context.fullLayout).filter(function (a) {
      return a._id;
    });
    if (axes.length > 0) {
      plotProps.options = [{ label: _('Canvas'), value: 'paper' }].concat(_toConsumableArray(computeAxesRefOptions(axes, props.attr)));
    } else {
      plotProps.isVisible = false;
    }

    if (currentOffsetRef !== 'pixel') {
      plotProps.updatePlot = function (v) {
        if (!plotProps.updateContainer) {
          return;
        }

        /*
         * If user is changing axis also change their a[x|y]ref arrow axis
         * reference to match if the value is an axis value.
         * Behaviour copied from plot.ly/create
         */
        var update = _defineProperty({}, props.attr, v);
        if (v !== 'paper') {
          update['a' + props.attr] = v;
        }

        plotProps.updateContainer(update);
      };
    }

    plotProps.clearable = false;
  }
});

var PositioningRef = exports.PositioningRef = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var axes = (0, _lib.getAllAxes)(context.fullLayout).filter(function (a) {
      return a._id;
    });
    if (axes.length > 0) {
      plotProps.options = [{ label: 'Canvas', value: 'paper' }].concat(_toConsumableArray(computeAxesRefOptions(axes, props.attr)));

      plotProps.clearable = false;
    } else {
      plotProps.isVisible = false;
    }
  }
});

var PositioningNumeric = exports.PositioningNumeric = (0, _lib.connectToContainer)(_Numeric.UnconnectedNumeric, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var fullContainer = plotProps.fullContainer,
        fullValue = plotProps.fullValue,
        updatePlot = plotProps.updatePlot;

    if (fullContainer && (fullContainer[props.attr[0] + 'ref'] === 'paper' || fullContainer[props.attr[props.attr.length - 1] + 'ref'] === 'paper')) {
      plotProps.units = '%';
      plotProps.showSlider = true;
      plotProps.max = 100;
      plotProps.min = 0;
      plotProps.step = 1;
      if ((0, _fastIsnumeric2.default)(fullValue)) {
        plotProps.fullValue = Math.round(100 * fullValue);
      }

      plotProps.updatePlot = function (v) {
        if ((0, _fastIsnumeric2.default)(v)) {
          updatePlot(v / 100);
        } else {
          updatePlot(v);
        }
      };
    }
  }
});

function computeAxesRefOptions(axes, propsAttr) {
  var options = [];
  for (var i = 0; i < axes.length; i++) {
    var ax = axes[i];
    if (ax._id.charAt(0) === propsAttr.charAt(0) || ax._id.charAt(0) === propsAttr.charAt(1)) {
      var label = (0, _lib.getAxisTitle)(ax);
      options.push({ label: label, value: ax._id });
    }
  }

  return options;
}

var TextPosition = exports.TextPosition = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;

    var options = [{ label: _('Top Left'), value: 'top left' }, { label: _('Top Center'), value: 'top center' }, { label: _('Top Right'), value: 'top right' }, { label: _('Middle Left'), value: 'middle left' }, { label: _('Middle Center'), value: 'middle center' }, { label: _('Middle Right'), value: 'middle right' }, { label: _('Bottom Left'), value: 'bottom left' }, { label: _('Bottom Center'), value: 'bottom center' }, { label: _('Bottom Right'), value: 'bottom right' }];
    if (context.container.type === 'pie' || context.container.type === 'bar') {
      options = [{ label: _('Inside'), value: 'inside' }, { label: _('Outside'), value: 'outside' }, { label: _('Auto'), value: 'auto' }, { label: _('None'), value: 'none' }];
    }
    plotProps.options = options;
    plotProps.clearable = false;
  }
});

var TextInfo = exports.TextInfo = (0, _lib.connectToContainer)(_Flaglist.UnconnectedFlaglist, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize,
        container = context.container;

    var options = [{ label: _('Label'), value: 'label' }, { label: _('Value'), value: 'value' }, { label: _('%'), value: 'percent' }];

    if (container.text) {
      options.push({ label: _('Text'), value: 'text' });
    }

    plotProps.options = options;
  }
});

var HoverInfo = exports.HoverInfo = (0, _lib.connectToContainer)(_Flaglist.UnconnectedFlaglist, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize,
        container = context.container;

    var options = [{ label: _('X'), value: 'x' }, { label: _('Y'), value: 'y' }];

    if (['heatmap', 'heatmapgl', 'histogram2d', 'histogram2dcontour', 'contour', 'contourcarpet', 'scatter3d', 'surface', 'mesh3d'].includes(container.type)) {
      options.push({ label: _('Z'), value: 'z' });
    } else if (container.type === 'choropleth') {
      options = [{ label: _('Location'), value: 'location' }, { label: _('Values'), value: 'z' }];
    } else if (container.type === 'scattergeo') {
      if (container.locations) {
        options = [{ label: _('Location'), value: 'location' }];
      } else if (container.lat || container.lon) {
        options = [{ label: _('Longitude'), value: 'lon' }, { label: _('Latitude'), value: 'lat' }];
      }
    } else if (container.type === 'scattermapbox') {
      options = [{ label: _('Longitude'), value: 'lon' }, { label: _('Latitude'), value: 'lat' }];
    } else if (container.type === 'scatterternary') {
      options = [{ label: _('A'), value: 'a' }, { label: _('B'), value: 'b' }, { label: _('C'), value: 'c' }];
    } else if (['scatterpolar', 'scatterpolargl', 'barpolar'].includes(container.type)) {
      options = [{ label: _('R'), value: 'r' }, { label: _('Theta'), value: 'theta' }];
    } else if (container.type === 'pie') {
      options = [{ label: _('Label'), value: 'label' }, { label: _('Value'), value: 'value' }, { label: _('Percent'), value: 'percent' }];
    } else if (container.type === 'table') {
      plotProps.isVisible = false;
    } else if (['cone', 'streamtube'].includes(container.type)) {
      options = [{ label: _('X'), value: 'x' }, { label: _('Y'), value: 'y' }, { label: _('Z'), value: 'z' }, { label: _('U'), value: 'u' }, { label: _('V'), value: 'v' }, { label: _('W'), value: 'w' }, { label: _('Norm'), value: 'norm' }, { label: _('Divergence'), value: 'divergence' }];
    }

    if (container.text) {
      options.push({ label: _('Text'), value: 'text' });
    }

    options.push({ label: _('Trace name'), value: 'name' });

    plotProps.options = options;
  }
});

var FillDropdown = exports.FillDropdown = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;


    var options = [{ label: _('None'), value: 'none' }, { label: _('Y = 0'), value: 'tozeroy' }, { label: _('X = 0'), value: 'tozerox' }, { label: _('Previous Y'), value: 'tonexty' }, { label: _('Previous X'), value: 'tonextx' }];

    if (context.container.type === 'scatterternary' || context.container.type === 'scattercarpet' || context.container.type === 'scatterpolar') {
      options = [{ label: _('None'), value: 'none' }, { label: _('To Self'), value: 'toself' }, { label: _('To Next'), value: 'tonext' }];
    } else if (context.container.type === 'scattergeo' || context.container.type === 'scattermapbox') {
      options = [{ label: _('None'), value: 'none' }, { label: _('To Self'), value: 'toself' }];
    }

    plotProps.options = options;
    plotProps.clearable = false;
  }
});

var HoveronDropdown = exports.HoveronDropdown = (0, _lib.connectToContainer)(_Dropdown.UnconnectedDropdown, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;


    var options = void 0;
    if (context.container.type === 'box') {
      options = [{ label: _('Boxes'), value: 'boxes' }, { label: _('Points'), value: 'points' }, { label: _('Boxes and Points'), value: 'boxes+points' }];
    } else if (context.container.type === 'violin') {
      options = [{ label: _('Violins'), value: 'violins' }, { label: _('Points'), value: 'points' }, { label: _('KDE'), value: 'kde' }, { label: _('Violins and Points'), value: 'violins+points' }, { label: _('Violins, Points and KDE'), value: 'violins+points+kde' }];
    } else {
      options = [{ label: _('Points'), value: 'points' }, { label: _('Fills'), value: 'fills' }, { label: _('Points and Fills'), value: 'points+fills' }];
    }

    plotProps.options = options;
    plotProps.clearable = false;
  }
});

var HovermodeDropdown = exports.HovermodeDropdown = (0, _lib.connectToContainer)(_VisibilitySelect.UnconnectedVisibilitySelect, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    var _ = context.localize;


    plotProps.options = context.container.xaxis && Object.keys(context.container.xaxis).length > 0 ? [{ label: _('Closest'), value: 'closest' }, { label: _('X Axis'), value: 'x' }, { label: _('Y Axis'), value: 'y' }, { label: _('Disable'), value: false }] : [{ label: _('Closest'), value: 'closest' }, { label: _('Disable'), value: false }];
    plotProps.clearable = false;
    plotProps.dropdown = true;
    plotProps.showOn = ['closest', 'x', 'y'];
  }
});

var HoverColor = exports.HoverColor = (0, _lib.connectToContainer)(_ColorPicker.UnconnectedColorPicker, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    plotProps.isVisible = Boolean(context.fullLayout.hovermode);
    return plotProps;
  }
});
//# sourceMappingURL=derived.js.map