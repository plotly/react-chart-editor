import isNumeric from 'fast-isnumeric';
import {UnconnectedDropdown} from './Dropdown';
import {UnconnectedDropdownCustom} from './DropdownCustom';
import {UnconnectedFlaglist} from './Flaglist';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedNumericOrDate} from './NumericOrDate';
import {UnconnectedAxisRangeValue} from './AxisRangeValue';
import {UnconnectedRadio} from './Radio';
import {UnconnectedAxisInterval} from './AxisInterval';
import Info from './Info';
import {UnconnectedColorPicker} from './ColorPicker';
import {UnconnectedTextEditor} from './TextEditor';
import {UnconnectedVisibilitySelect} from './VisibilitySelect';
import {connectToContainer, getAllAxes, getAxisTitle, axisIdToAxisName} from 'lib';
import PropTypes from 'prop-types';
import Text from './Text';

export const AxisAnchorDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;
    let options = [];

    if (props.attr.startsWith('xaxis')) {
      options = context.fullLayout._subplots.yaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    } else if (props.attr.startsWith('yaxis')) {
      options = context.fullLayout._subplots.xaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    }
    options.push({label: _('Free'), value: 'free'});
    plotProps.options = options;
  },
});

export const AxisOverlayDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;
    let options = [];

    if (props.attr.startsWith('xaxis')) {
      options = context.fullLayout._subplots.xaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    } else if (props.attr.startsWith('yaxis')) {
      options = context.fullLayout._subplots.yaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    }

    options.unshift({label: _('None'), value: false});

    // filter out the current axisID, can't overlay over itself
    plotProps.options = options.filter(
      option =>
        context.fullContainer &&
        context.fullContainer.xaxis &&
        context.fullContainer.yaxis &&
        context.fullContainer.xaxis._id !== option.value &&
        context.fullContainer.yaxis._id !== option.value
    );

    plotProps.clearable = false;
  },
});

export const RangesliderVisible = connectToContainer(UnconnectedRadio, {
  modifyPlotProps: (props, context, plotProps) => {
    if (!plotProps.fullValue) {
      plotProps.fullValue = false;
      plotProps.visible = false;
      plotProps.isVisible = true;
      return;
    }
  },
});

export const AxisSide = connectToContainer(UnconnectedRadio, {
  modifyPlotProps: (props, context, plotProps) => {
    const _ = context.localize;

    if (plotProps.fullValue === 'left' || plotProps.fullValue === 'right') {
      plotProps.options = [{label: _('Left'), value: 'left'}, {label: _('Right'), value: 'right'}];
      return;
    }

    if (plotProps.fullValue === 'top' || plotProps.fullValue === 'bottom') {
      plotProps.options = [{label: _('Top'), value: 'top'}, {label: _('Bottom'), value: 'bottom'}];
      return;
    }

    if (plotProps.fullValue === 'clockwise' || plotProps.fullValue === 'counterclockwise') {
      plotProps.options = [
        {label: _('Clockwise'), value: 'clockwise'},
        {label: _('Counterclockwise'), value: 'counterclockwise'},
      ];
      return;
    }

    plotProps.isVisible = false;
  },
});

export const ContourNumeric = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.autocontour) {
      plotProps.isVisible = false;
    }
  },
});

export const BinningDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;
    const axis =
      plotProps.fullContainer.type === 'histogram2d'
        ? 'Z'
        : plotProps.fullContainer.orientation === 'v'
        ? 'Y'
        : 'X';
    plotProps.options = [
      {label: _('Count ') + axis, value: 'count'},
      {label: _('Sum ') + axis, value: 'sum'},
      {label: _('Average ') + axis, value: 'avg'},
      {label: _('Minimum ') + axis, value: 'min'},
      {label: _('Maximum ') + axis, value: 'max'},
    ];
  },
});

export const TickFormat = connectToContainer(UnconnectedDropdownCustom, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;
    if (plotProps.fullContainer.type === 'date') {
      plotProps.options = [
        {label: _('Default'), value: ''},
        {label: _('Advanced (d3-time-format)'), value: '%x'},
      ];
      plotProps.customOpt = '%x';
    } else {
      plotProps.options = [
        {label: _('Simple'), value: ''},
        {label: _('Advanced (d3-format)'), value: 's'},
      ];
      plotProps.customOpt = 's';
    }
  },
});

export const ShowInLegend = connectToContainer(UnconnectedVisibilitySelect, {
  modifyPlotProps: (props, context, plotProps) => {
    if (context.container.type && context.container.type !== 'sunburst') {
      plotProps.isVisible = context.fullLayout.showlegend;
    }

    return plotProps;
  },
});

export const HistogramInfoVertical = connectToContainer(Info, {
  modifyPlotProps: (props, context, plotProps) => {
    plotProps.isVisible =
      context.fullContainer.type === 'histogram' && context.fullContainer.orientation === 'v';
    return plotProps;
  },
});

export const HistogramInfoHorizontal = connectToContainer(Info, {
  modifyPlotProps: (props, context, plotProps) => {
    plotProps.isVisible =
      context.fullContainer.type === 'histogram' && context.fullContainer.orientation === 'h';
    return plotProps;
  },
});

export const Histogram2d = connectToContainer(Info, {
  modifyPlotProps: (props, context, plotProps) => {
    plotProps.isVisible = context.fullContainer.type === 'histogram2d';
    return plotProps;
  },
});

export const AxesRange = connectToContainer(UnconnectedAxisRangeValue, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

export const NTicks = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.tickmode !== 'auto') {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

export const DTicks = connectToContainer(UnconnectedAxisRangeValue, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (
      fullContainer &&
      fullContainer._name &&
      (fullContainer._name.startsWith('lat') || fullContainer._name.startsWith('lon'))
    ) {
      // don't mess with visibility on geo axes
      return plotProps;
    }
    if (plotProps.isVisible && fullContainer && fullContainer.tickmode !== 'linear') {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

export const DTicksInterval = connectToContainer(UnconnectedAxisInterval, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (
      fullContainer &&
      fullContainer._name &&
      (fullContainer._name.startsWith('lat') || fullContainer._name.startsWith('lon'))
    ) {
      // don't mess with visibility on geo axes
      return plotProps;
    }
    if (plotProps.isVisible && fullContainer && fullContainer.tickmode !== 'linear') {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

class UnconnectedNumericFraction extends UnconnectedNumeric {}
UnconnectedNumericFraction.propTypes = UnconnectedNumeric.propTypes;
UnconnectedNumericFraction.defaultProps = {
  units: '%',
  showSlider: true,
};

const numericFractionModifyPlotProps = (props, context, plotProps) => {
  const {attrMeta, fullValue, updatePlot} = plotProps;
  const min = (attrMeta && attrMeta.min) || 0;
  const max = (attrMeta && attrMeta.max) || 1;
  if (isNumeric(fullValue)) {
    plotProps.fullValue = Math.round((100 * (fullValue - min)) / (max - min));
  }

  plotProps.updatePlot = v => {
    if (isNumeric(v)) {
      updatePlot((v / 100) * (max - min) + min);
    } else {
      updatePlot(v);
    }
  };
  plotProps.max = 100;
  plotProps.min = 0;
};

export const NumericFraction = connectToContainer(UnconnectedNumericFraction, {
  modifyPlotProps: numericFractionModifyPlotProps,
});

export const NumericFractionDomain = connectToContainer(UnconnectedNumericFraction, {
  modifyPlotProps: (props, context, plotProps) => {
    numericFractionModifyPlotProps(props, context, plotProps);
    if (context.container && context.container.overlaying) {
      plotProps.isVisible = null;
    }
  },
});

export const NumericFractionInverse = connectToContainer(UnconnectedNumericFraction, {
  modifyPlotProps: (props, context, plotProps) => {
    const {attrMeta, fullValue, updatePlot} = plotProps;
    if (isNumeric(fullValue)) {
      plotProps.fullValue = Math.round((1 - fullValue) * 100);
    }

    plotProps.updatePlot = v => {
      if (isNumeric(v)) {
        updatePlot(1 - v / 100);
      } else {
        updatePlot(v);
      }
    };

    // Also take the inverse of max and min.
    if (attrMeta) {
      if (isNumeric(attrMeta.min)) {
        plotProps.max = (1 - attrMeta.min) * 100;
      }

      if (isNumeric(attrMeta.max)) {
        plotProps.min = (1 - attrMeta.max) * 100;
      }
    }
  },
});

export const NumericReciprocal = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullValue, updatePlot} = plotProps;

    if (isNumeric(fullValue)) {
      plotProps.fullValue = 1 / fullValue;
    }

    plotProps.updatePlot = v => {
      if (isNumeric(v)) {
        updatePlot(1 / v);
      } else {
        updatePlot(v);
      }
    };

    plotProps.min = 0;
  },
});

export const AnnotationArrowRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;
    if (!context.fullContainer) {
      return;
    }
    const {
      fullContainer: {xref, yref},
    } = context;

    let currentAxisRef;
    if (props.attr === 'axref') {
      currentAxisRef = xref;
    } else if (props.attr === 'ayref') {
      currentAxisRef = yref;
    } else {
      throw new Error(
        _(
          'AnnotationArrowRef must be given either "axref" or "ayref" as attrs. Instead was given'
        ) + props.attr
      );
    }

    if (currentAxisRef === 'paper') {
      // If currentAxesRef is paper provide all axes options to user.

      const axes = getAllAxes(context.fullLayout).filter(a => a._id);
      if (axes.length > 0) {
        plotProps.options = [
          {label: _('in pixels'), value: 'pixel'},
          ...computeAxesRefOptions(axes, props.attr),
        ];
      } else {
        plotProps.isVisible = false;
      }
    } else {
      // If currentAxesRef is an actual axes then offer that value as the only
      // axes option.
      plotProps.options = [
        {label: _('in pixels'), value: 'pixel'},
        {label: _('according to axis'), value: currentAxisRef},
      ];
    }

    plotProps.clearable = false;
  },
});

export const AnnotationRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    if (!context.fullContainer) {
      return;
    }
    const {
      fullContainer: {axref, ayref},
      localize: _,
    } = context;

    let currentOffsetRef;
    if (props.attr === 'xref') {
      currentOffsetRef = axref;
    } else if (props.attr === 'yref') {
      currentOffsetRef = ayref;
    } else {
      throw new Error(
        _('AnnotationRef must be given either "xref" or "yref" as attrs. Instead was given') +
          props.attr +
          '.'
      );
    }

    const axes = getAllAxes(context.fullLayout).filter(a => a._id);
    if (axes.length > 0) {
      plotProps.options = [
        {label: _('Canvas'), value: 'paper'},
        ...computeAxesRefOptions(axes, props.attr),
      ];
    } else {
      plotProps.isVisible = false;
    }

    if (currentOffsetRef !== 'pixel') {
      plotProps.updatePlot = v => {
        if (!plotProps.updateContainer) {
          return;
        }

        /*
         * If user is changing axis also change their a[x|y]ref arrow axis
         * reference to match if the value is an axis value.
         * Behaviour copied from plot.ly/create
         */
        const update = {[props.attr]: v};
        if (v !== 'paper') {
          update[`a${props.attr}`] = v;
        }

        plotProps.updateContainer(update);
      };
    }

    plotProps.clearable = false;
  },
});

export const PositioningRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const axes = getAllAxes(context.fullLayout).filter(a => a._id);
    if (axes.length > 0) {
      plotProps.options = [
        {label: 'Canvas', value: 'paper'},
        ...computeAxesRefOptions(axes, props.attr),
      ];

      plotProps.clearable = false;
    } else {
      plotProps.isVisible = false;
    }
  },
});

export const PositioningNumeric = connectToContainer(UnconnectedNumericOrDate, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer, fullValue, updatePlot} = plotProps;
    if (
      fullContainer &&
      (fullContainer[props.attr[0] + 'ref'] === 'paper' ||
        fullContainer[props.attr[props.attr.length - 1] + 'ref'] === 'paper')
    ) {
      plotProps.units = '%';
      plotProps.showSlider = true;
      plotProps.max = 100;
      plotProps.min = 0;
      plotProps.step = 1;
      if (isNumeric(fullValue)) {
        plotProps.fullValue = Math.round(100 * fullValue);
      }

      plotProps.updatePlot = v => {
        if (isNumeric(v)) {
          updatePlot(v / 100);
        } else {
          updatePlot(v);
        }
      };
    }
  },
});

function computeAxesRefOptions(axes, propsAttr) {
  const options = [];
  for (let i = 0; i < axes.length; i++) {
    const ax = axes[i];
    if (ax._id.charAt(0) === propsAttr.charAt(0) || ax._id.charAt(0) === propsAttr.charAt(1)) {
      const label = getAxisTitle(ax);
      options.push({label, value: ax._id});
    }
  }

  return options;
}

export const TextInfo = connectToContainer(UnconnectedFlaglist, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _, container} = context;

    let options = [
      {label: _('Label'), value: 'label'},
      {label: _('Value'), value: 'value'},
      {label: _('%'), value: 'percent'},
    ];

    if (container.type === 'funnel') {
      options = [
        {label: _('Label'), value: 'label'},
        {label: _('Value'), value: 'value'},
        {label: _('% initial'), value: 'percent initial'},
        {label: _('% previous'), value: 'percent previous'},
        {label: _('% total'), value: 'percent total'},
      ];
    }

    if (container.text) {
      options.push({label: _('Text'), value: 'text'});
    }

    plotProps.options = options;
  },
});

export const HoverTemplateSwitch = connectToContainer(UnconnectedRadio, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;

    plotProps.options = [
      {label: _('Values'), value: ''},
      {label: _('Template'), value: plotProps.fullValue || ' '},
    ];
    return plotProps;
  },
});

export const HoverTemplateText = connectToContainer(UnconnectedTextEditor, {
  modifyPlotProps: (props, context, plotProps) => {
    if (plotProps.isVisible && plotProps.fullValue === '') {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

export const HoverInfo = connectToContainer(UnconnectedFlaglist, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _, container} = context;
    let options = [{label: _('X'), value: 'x'}, {label: _('Y'), value: 'y'}];

    if (
      [
        'heatmap',
        'heatmapgl',
        'histogram2d',
        'histogram2dcontour',
        'contour',
        'contourcarpet',
        'scatter3d',
        'surface',
        'mesh3d',
      ].includes(container.type)
    ) {
      options.push({label: _('Z'), value: 'z'});
    } else if (container.type === 'choropleth') {
      options = [{label: _('Location'), value: 'location'}, {label: _('Values'), value: 'z'}];
    } else if (container.type === 'scattergeo') {
      if (container.locations) {
        options = [{label: _('Location'), value: 'location'}];
      } else if (container.lat || container.lon) {
        options = [{label: _('Longitude'), value: 'lon'}, {label: _('Latitude'), value: 'lat'}];
      }
    } else if (container.type === 'scattermapbox' || container.type === 'densitymapbox') {
      options = [{label: _('Longitude'), value: 'lon'}, {label: _('Latitude'), value: 'lat'}];
    } else if (container.type === 'densitymapbox') {
      options = [
        {label: _('Longitude'), value: 'lon'},
        {label: _('Latitude'), value: 'lat'},
        {label: _('Z'), value: 'z'},
      ];
    } else if (container.type === 'scatterternary') {
      options = [
        {label: _('A'), value: 'a'},
        {label: _('B'), value: 'b'},
        {label: _('C'), value: 'c'},
      ];
    } else if (['scatterpolar', 'scatterpolargl', 'barpolar'].includes(container.type)) {
      options = [{label: _('R'), value: 'r'}, {label: _('Theta'), value: 'theta'}];
    } else if (container.type === 'pie') {
      options = [{label: _('Percent'), value: 'percent'}];
    } else if (container.type === 'table') {
      plotProps.isVisible = false;
    } else if (['cone', 'streamtube'].includes(container.type)) {
      options = [
        {label: _('X'), value: 'x'},
        {label: _('Y'), value: 'y'},
        {label: _('Z'), value: 'z'},
        {label: _('U'), value: 'u'},
        {label: _('V'), value: 'v'},
        {label: _('W'), value: 'w'},
        {label: _('Norm'), value: 'norm'},
        {label: _('Divergence'), value: 'divergence'},
      ];
    } else if (container.type === 'sunburst') {
      options = [];
    }

    if (container.labels && ['pie', 'sunburst', 'funnelarea'].includes(container.type)) {
      options.push({label: _('Label'), value: 'label'});
    }

    if (container.values && ['pie', 'sunburst', 'funnelarea'].includes(container.type)) {
      options.push({label: _('Value'), value: 'value'});
    }

    if (container.text) {
      options.push({label: _('Text'), value: 'text'});
    }

    options.push({label: _('Trace name'), value: 'name'});

    plotProps.options = options;
  },
});

export const FillDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;

    let options = [
      {label: _('None'), value: 'none'},
      {label: _('Y = 0'), value: 'tozeroy'},
      {label: _('X = 0'), value: 'tozerox'},
      {label: _('Previous Y'), value: 'tonexty'},
      {label: _('Previous X'), value: 'tonextx'},
    ];

    if (
      context.container.type === 'scatterternary' ||
      context.container.type === 'scattercarpet' ||
      context.container.type === 'scatterpolar'
    ) {
      options = [
        {label: _('None'), value: 'none'},
        {label: _('To Self'), value: 'toself'},
        {label: _('To Next'), value: 'tonext'},
      ];
    } else if (
      context.container.type === 'scattergeo' ||
      context.container.type === 'scattermapbox'
    ) {
      options = [{label: _('None'), value: 'none'}, {label: _('To Self'), value: 'toself'}];
    }

    plotProps.options = options;
    plotProps.clearable = false;
  },
});

export const MapboxSourceArray = connectToContainer(Text, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullValue, updatePlot} = plotProps;
    if (plotProps.fullValue && plotProps.fullValue.length > 0) {
      plotProps.fullValue = fullValue[0];
    }

    plotProps.updatePlot = v => {
      if (v.length) {
        updatePlot([v]);
      } else {
        updatePlot([]);
      }
    };
  },
});

export const MapboxStyleDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {mapBoxAccess, localize: _} = context;

    plotProps.options = (!mapBoxAccess
      ? []
      : [
          {label: _('Mapbox Basic'), value: 'basic'},
          {label: _('Mapbox Outdoors'), value: 'outdoors'},
          {label: _('Mapbox Light'), value: 'light'},
          {label: _('Mapbox Dark'), value: 'dark'},
          {label: _('Mapbox Satellite'), value: 'satellite'},
          {label: _('Mapbox Satellite with Streets'), value: 'satellite-streets'},
        ]
    ).concat([
      {label: _('No tiles (white background)'), value: 'white-bg'},
      {label: _('Open Street Map'), value: 'open-street-map'},
      {label: _('Carto Positron'), value: 'carto-positron'},
      {label: _('Carto Dark Matter'), value: 'carto-darkmatter'},
      {label: _('Stamen Terrain'), value: 'stamen-terrain'},
      {label: _('Stamen Toner'), value: 'stamen-toner'},
      {label: _('Stamen Watercolor'), value: 'stamen-watercolor'},
    ]);
    plotProps.clearable = false;
  },
});
MapboxStyleDropdown.contextTypes = {
  mapBoxAccess: PropTypes.bool,
  ...MapboxStyleDropdown.contextTypes,
};

export const HoveronDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;

    let options;
    if (context.container.type === 'box') {
      options = [
        {label: _('Boxes'), value: 'boxes'},
        {label: _('Points'), value: 'points'},
        {label: _('Boxes and Points'), value: 'boxes+points'},
      ];
    } else if (context.container.type === 'violin') {
      options = [
        {label: _('Violins'), value: 'violins'},
        {label: _('Points'), value: 'points'},
        {label: _('KDE'), value: 'kde'},
        {label: _('Violins and Points'), value: 'violins+points'},
        {label: _('Violins, Points and KDE'), value: 'violins+points+kde'},
      ];
    } else {
      options = [
        {label: _('Points'), value: 'points'},
        {label: _('Fills'), value: 'fills'},
        {label: _('Points and Fills'), value: 'points+fills'},
      ];
    }

    plotProps.options = options;
    plotProps.clearable = false;
  },
});

export const HovermodeDropdown = connectToContainer(UnconnectedVisibilitySelect, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = context;

    plotProps.options =
      context.container.xaxis && Object.keys(context.container.xaxis).length > 0
        ? [
            {label: _('Closest'), value: 'closest'},
            {label: _('X Axis'), value: 'x'},
            {label: _('Y Axis'), value: 'y'},
            {label: _('Disable'), value: false},
          ]
        : [{label: _('Closest'), value: 'closest'}, {label: _('Disable'), value: false}];
    plotProps.clearable = false;
    plotProps.dropdown = true;
    plotProps.showOn = ['closest', 'x', 'y'];
  },
});

export const HoverColor = connectToContainer(UnconnectedColorPicker, {
  modifyPlotProps: (props, context, plotProps) => {
    plotProps.isVisible = Boolean(context.fullLayout.hovermode);
    return plotProps;
  },
});

export const LevelRendered = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const _ = context.localize;

    if (context.container.ids && context.container.ids.length) {
      plotProps.isVisible = true;
      plotProps.options = [{label: _('Root'), value: ''}].concat(
        context.container.ids.map(i => ({label: i, value: i}))
      );
    }
  },
});
