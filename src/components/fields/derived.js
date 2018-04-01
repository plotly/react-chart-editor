import isNumeric from 'fast-isnumeric';
import {UnconnectedDropdown} from './Dropdown';
import {UnconnectedFlaglist} from './Flaglist';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedAxisRangeValue} from './AxisRangeValue';
import {UnconnectedRadio} from './Radio';
import {
  connectToContainer,
  getAllAxes,
  getAxisTitle,
  axisIdToAxisName,
} from 'lib';

export const AxisAnchorDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;
    let options = [];

    if (
      plotProps.fullContainer &&
      plotProps.fullContainer._subplot &&
      plotProps.fullContainer._subplot.includes('xaxis')
    ) {
      options = context.fullLayout._subplots.yaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    } else if (
      plotProps.fullContainer &&
      plotProps.fullContainer._subplot &&
      plotProps.fullContainer._subplot.includes('yaxis')
    ) {
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
    let options = [];
    if (
      plotProps.fullContainer &&
      plotProps.fullContainer._subplot &&
      plotProps.fullContainer._subplot.includes('xaxis')
    ) {
      options = context.fullLayout._subplots.xaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    } else if (
      plotProps.fullContainer &&
      plotProps.fullContainer._subplot &&
      plotProps.fullContainer._subplot.includes('yaxis')
    ) {
      options = context.fullLayout._subplots.yaxis.map(axis => {
        return {
          label: getAxisTitle(context.fullLayout[axisIdToAxisName(axis)]),
          value: axis,
        };
      });
    }

    // filter out the current axisID, can't overlay over itself
    plotProps.options = options.filter(
      option =>
        context.fullContainer && context.fullContainer._id !== option.value
    );

    plotProps.clearable = true;
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
    const _ = props.localize;
    if (
      context.fullContainer &&
      context.fullContainer._id &&
      context.fullContainer._id.startsWith('y')
    ) {
      plotProps.options = [
        {label: _('Left'), value: 'left'},
        {label: _('Right'), value: 'right'},
      ];
      return;
    }

    if (
      context.fullContainer &&
      context.fullContainer._id &&
      context.fullContainer._id.startsWith('x')
    ) {
      plotProps.options = [
        {label: _('Bottom'), value: 'bottom'},
        {label: _('Top'), value: 'top'},
      ];
      return;
    }

    plotProps.isVisible = false;
  },
});

export const CanvasSize = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer, updateContainer, container} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.autosize) {
      plotProps.isVisible = false;
      if (container[props.attr]) {
        updateContainer({[props.attr]: {}});
      }
    }
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

export const TraceOrientation = connectToContainer(UnconnectedRadio, {
  modifyPlotProps: (props, context, plotProps) => {
    if (
      context.container.type === 'box' &&
      plotProps.fullValue === 'h' &&
      context.container.y &&
      context.container.y.length !== 0
    ) {
      context.updateContainer({
        y: null,
        ysrc: null,
        x: context.container.y,
        xsrc: context.container.ysrc,
      });
    }

    if (
      context.container.type === 'box' &&
      plotProps.fullValue === 'v' &&
      context.container.x &&
      context.container.x.length !== 0
    ) {
      context.updateContainer({
        x: null,
        xsrc: null,
        y: context.container.x,
        ysrc: context.container.xsrc,
      });
    }

    if (
      context.container.type === 'histogram' &&
      plotProps.fullValue === 'v' &&
      context.container.y &&
      context.container.y.length !== 0
    ) {
      context.updateContainer({
        y: null,
        ysrc: null,
        ybins: null,
        x: context.container.y,
        xsrc: context.container.ysrc,
        xbins: context.container.ybins,
      });
    }

    if (
      context.container.type === 'histogram' &&
      plotProps.fullValue === 'h' &&
      context.container.x &&
      context.container.x.length !== 0
    ) {
      context.updateContainer({
        x: null,
        xsrc: null,
        xbins: null,
        y: context.container.x,
        ysrc: context.container.xsrc,
        ybins: context.container.xbins,
      });
    }
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
    if (
      plotProps.isVisible &&
      fullContainer &&
      fullContainer.tickmode !== 'auto'
    ) {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

export const DTicks = connectToContainer(UnconnectedAxisRangeValue, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (
      plotProps.isVisible &&
      fullContainer &&
      fullContainer.tickmode !== 'linear'
    ) {
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
  const min = attrMeta.min || 0;
  const max = attrMeta.max || 1;
  if (isNumeric(fullValue)) {
    plotProps.fullValue = Math.round(100 * (fullValue - min) / (max - min));
  }

  plotProps.updatePlot = v => {
    if (isNumeric(v)) {
      updatePlot(v / 100 * (max - min) + min);
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

export const NumericFractionDomain = connectToContainer(
  UnconnectedNumericFraction,
  {
    modifyPlotProps: (props, context, plotProps) => {
      numericFractionModifyPlotProps(props, context, plotProps);
      if (context.container && context.container.overlaying) {
        plotProps.isVisible = null;
      }
    },
  }
);

export const NumericFractionInverse = connectToContainer(
  UnconnectedNumericFraction,
  {
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
  }
);

export const AnnotationArrowRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    if (!context.fullContainer) {
      return;
    }
    const {fullContainer: {xref, yref}} = context;

    let currentAxisRef;
    if (props.attr === 'axref') {
      currentAxisRef = xref;
    } else if (props.attr === 'ayref') {
      currentAxisRef = yref;
    } else {
      throw new Error(
        'AnnotationArrowRef must be given either "axref" or "ayref" as attrs. ' +
          `Instead was given "${props.attr}".`
      );
    }

    if (currentAxisRef === 'paper') {
      // If currentAxesRef is paper provide all axes options to user.

      plotProps.options = [
        {label: 'in pixels', value: 'pixel'},
        ...computeAxesRefOptions(getAllAxes(context.fullLayout), props.attr),
      ];
    } else {
      // If currentAxesRef is an actual axes then offer that value as the only
      // axes option.
      plotProps.options = [
        {label: 'in pixels', value: 'pixel'},
        {label: 'according to axis', value: currentAxisRef},
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
    const {fullContainer: {axref, ayref}} = context;

    let currentOffsetRef;
    if (props.attr === 'xref') {
      currentOffsetRef = axref;
    } else if (props.attr === 'yref') {
      currentOffsetRef = ayref;
    } else {
      throw new Error(
        'AnnotationRef must be given either "xref" or "yref" as attrs. ' +
          `Instead was given "${props.attr}".`
      );
    }

    plotProps.options = [
      {label: 'Canvas', value: 'paper'},
      ...computeAxesRefOptions(getAllAxes(context.fullLayout), props.attr),
    ];

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
    plotProps.options = [
      {label: 'Canvas', value: 'paper'},
      ...computeAxesRefOptions(getAllAxes(context.fullLayout), props.attr),
    ];

    plotProps.clearable = false;
  },
});

export const PositioningNumeric = connectToContainer(UnconnectedNumeric, {
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
    if (
      ax._id.charAt(0) === propsAttr.charAt(0) ||
      ax._id.charAt(0) === propsAttr.charAt(1)
    ) {
      const label = getAxisTitle(ax);
      options.push({label, value: ax._id});
    }
  }

  return options;
}

export const TextPosition = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;
    let options = [
      {label: _('Top Left'), value: 'top left'},
      {label: _('Top Center'), value: 'top center'},
      {label: _('Top Right'), value: 'top right'},
      {label: _('Middle Left'), value: 'middle left'},
      {label: _('Middle Center'), value: 'middle center'},
      {label: _('Middle Right'), value: 'middle right'},
      {label: _('Bottom Left'), value: 'bottom left'},
      {label: _('Bottom Center'), value: 'bottom center'},
      {label: _('Bottom Right'), value: 'bottom right'},
    ];
    if (context.container.type === 'pie') {
      options = [
        {label: _('Inside'), value: 'inside'},
        {label: _('Outside'), value: 'outside'},
        {label: _('Auto'), value: 'auto'},
        {label: _('None'), value: 'none'},
      ];
    }
    plotProps.options = options;
    plotProps.clearable = false;
  },
});

export const HoverInfo = connectToContainer(UnconnectedFlaglist, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;
    let options = [
      {label: _('X'), value: 'x'},
      {label: _('Y'), value: 'y'},
      {label: _('Name'), value: 'name'},
    ];

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
      ].includes(context.container.type)
    ) {
      options = [
        {label: _('X'), value: 'x'},
        {label: _('Y'), value: 'y'},
        {label: _('Z'), value: 'z'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'choropleth') {
      options = [
        {label: _('Location'), value: 'location'},
        {label: _('Values'), value: 'z'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'scattergeo') {
      options = [
        {label: _('Longitude'), value: 'loc'},
        {label: _('Latitude'), value: 'lat'},
        {label: _('Location'), value: 'location'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'scattermapbox') {
      options = [
        {label: _('Longitude'), value: 'loc'},
        {label: _('Latitude'), value: 'lat'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'scatterternary') {
      options = [
        {label: _('A'), value: 'a'},
        {label: _('B'), value: 'b'},
        {label: _('C'), value: 'c'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'table') {
      plotProps.isVisible = false;
    }

    if (['scatterpolar', 'scatterpolargl'].includes(context.container.type)) {
      options = [
        {label: _('R'), value: 'r'},
        {label: _('Theta'), value: 'theta'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    if (context.container.type === 'pie') {
      options = [
        {label: _('Label'), value: 'label'},
        {label: _('Value'), value: 'value'},
        {label: _('Percent'), value: 'percent'},
        {label: _('Text'), value: 'text'},
        {label: _('Name'), value: 'name'},
      ];
    }

    plotProps.options = options;
  },
});

export const FillDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;

    let options = [
      {label: _('None'), value: 'none'},
      {label: _('Y = 0'), value: 'tozeroy'},
      {label: _('X = 0'), value: 'tozerox'},
      {label: _('Previous Y'), value: 'tonexty'},
      {label: _('Previous X'), value: 'tonextx'},
    ];

    if (context.container.type === 'scatterternary') {
      options = [
        {label: _('None'), value: 'none'},
        {label: _('To Self'), value: 'toself'},
        {label: _('To Next'), value: 'tonext'},
      ];
    }

    plotProps.options = options;
    plotProps.clearable = false;
  },
});
