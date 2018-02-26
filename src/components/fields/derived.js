import isNumeric from 'fast-isnumeric';
import {UnconnectedDropdown} from './Dropdown';
import {UnconnectedFlaglist} from './Flaglist';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedRadio} from './Radio';
import {
  capitalize,
  connectLayoutToPlot,
  connectToContainer,
  getAllAxes,
  supplyLayoutPlotProps,
  striptags,
} from 'lib';

export const AxisAnchorDropdown = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;
    let options = [];
    plotProps.options = [{label: 'x', value: 'x'}];
    if (plotProps.fullContainer.subplot.includes('xaxis')) {
      options = context.fullLayout._subplots.yaxis.map(axis => {
        return {label: capitalize(axis), value: axis};
      });
    } else if (plotProps.fullContainer.subplot.includes('yaxis')) {
      options = context.fullLayout._subplots.xaxis.map(axis => {
        return {label: capitalize(axis), value: axis};
      });
    }
    options.push({label: _('Free'), value: 'free'});
    plotProps.options = options;
    plotProps.clearable = false;
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

export const AxesRange = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
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

export const LayoutNumericFraction = connectLayoutToPlot(
  connectToContainer(UnconnectedNumericFraction, {
    supplyPlotProps: supplyLayoutPlotProps,
    modifyPlotProps: numericFractionModifyPlotProps,
  })
);

export const LayoutNumericFractionInverse = connectLayoutToPlot(
  connectToContainer(UnconnectedNumericFraction, {
    supplyPlotProps: supplyLayoutPlotProps,
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
  })
);

export const AnnotationArrowRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
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
      if (props.attr === 'axref') {
        plotProps.options = [
          {label: 'in pixels', value: 'pixel'},
          ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'x'),
        ];
      }

      if (props.attr === 'ayref') {
        plotProps.options = [
          {label: 'in pixels', value: 'pixel'},
          ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'y'),
        ];
      }
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

    if (props.attr === 'xref') {
      plotProps.options = [
        {label: 'Canvas', value: 'paper'},
        ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'x'),
      ];
    }

    if (props.attr === 'yref') {
      plotProps.options = [
        {label: 'Canvas', value: 'paper'},
        ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'y'),
      ];
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
    if (props.attr === 'xref') {
      plotProps.options = [
        {label: 'Canvas', value: 'paper'},
        ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'x'),
      ];
    }

    if (props.attr === 'yref') {
      plotProps.options = [
        {label: 'Canvas', value: 'paper'},
        ...computeAxesRefOptions(getAllAxes(context.fullLayout), 'y'),
      ];
    }
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

function computeAxesRefOptions(axes, refAxis) {
  const options = [];
  for (let i = 0; i < axes.length; i++) {
    const ax = axes[i];
    if (ax._id.charAt(0) === refAxis) {
      // checking user data for title avoids default "Click to enter axis title"
      const label = striptags(ax._input.title || ax._id);
      options.push({label, value: ax._id});
    }
  }

  return options;
}

export const GeoScope = connectLayoutToPlot(
  connectToContainer(UnconnectedDropdown, {
    supplyPlotProps: (props, context) => {
      const {localize: _} = props;
      const options = [
        {label: _('World'), value: 'world'},
        {label: _('USA'), value: 'usa'},
        {label: _('Europe'), value: 'europe'},
        {label: _('Asia'), value: 'asia'},
        {label: _('Africa'), value: 'africa'},
        {label: _('North America'), value: 'north america'},
        {label: _('South America'), value: 'south america'},
      ];
      return {...supplyLayoutPlotProps(props, context), options};
    },
  })
);

export const GeoProjections = connectLayoutToPlot(
  connectToContainer(UnconnectedDropdown, {
    supplyPlotProps: (props, context) => {
      const {localize: _} = props;
      let options = [
        {label: _('Equirectangular'), value: 'equirectangular'},
        {label: _('Mercator'), value: 'mercator'},
        {label: _('Orthographic'), value: 'orthographic'},
        {label: _('Natural Earth'), value: 'naturalEarth'},
        {label: _('Kavrayskiy7'), value: 'kavrayskiy7'},
        {label: _('Miller'), value: 'miller'},
        {label: _('Robinson'), value: 'robinson'},
        {label: _('Eckert4'), value: 'eckert4'},
        {label: _('Azimuthal Equal Area'), value: 'azimuthalEqualArea'},
        {label: _('Azimuthal Equidistant'), value: 'azimuthalEquidistant'},
        {label: _('Conic Equal Area'), value: 'conicEqualArea'},
        {label: _('Conic Conformal'), value: 'conicConformal'},
        {label: _('Conic Equidistant'), value: 'conicEquidistant'},
        {label: _('Gnomonic'), value: 'gnomonic'},
        {label: _('Stereographic'), value: 'stereographic'},
        {label: _('Mollweide'), value: 'mollweide'},
        {label: _('Hammer'), value: 'hammer'},
        {label: _('Transverse Mercator'), value: 'transverseMercator'},
        {label: _('Winkel Tripel'), value: 'winkel3'},
        {label: _('Aitoff'), value: 'aitoff'},
        {label: _('Sinusoidal'), value: 'sinusoidal'},
      ];

      if (
        context.fullLayout &&
        context.fullLayout.geo &&
        context.fullLayout.geo.scope === 'usa'
      ) {
        options = [{label: _('Albers USA'), value: 'albers usa'}];
      }

      return {...supplyLayoutPlotProps(props, context), options};
    },
  })
);

export const HoverInfo = connectToContainer(UnconnectedFlaglist, {
  modifyPlotProps: (props, context, plotProps) => {
    const {localize: _} = props;
    let options = [
      {label: _('X'), value: 'x'},
      {label: _('Y'), value: 'y'},
      {label: _('Z'), value: 'z'},
    ];

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
