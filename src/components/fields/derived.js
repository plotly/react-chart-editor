import isNumeric from 'fast-isnumeric';
import {UnconnectedNumeric} from './Numeric';
import {UnconnectedDropdown} from './Dropdown';
import {
  connectLayoutToPlot,
  connectToContainer,
  getLayoutContext,
  unpackPlotProps,
} from 'lib';

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

export const AxesRange = connectToContainer(UnconnectedNumeric, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer} = plotProps;
    if (plotProps.isVisible && fullContainer && fullContainer.autorange) {
      plotProps.isVisible = false;
    }
    return plotProps;
  },
});

class NumericFraction extends UnconnectedNumeric {}
NumericFraction.propTypes = UnconnectedNumeric.propTypes;
NumericFraction.defaultProps = {
  units: '%',
};

// Workaround the issue with nested layouts inside trace component.
// See:
// https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
const supplyLayoutPlotProps = (props, context) => {
  return unpackPlotProps(props, {
    ...context,
    ...getLayoutContext(context),
  });
};

export const LayoutNumericFractionInverse = connectLayoutToPlot(
  connectToContainer(NumericFraction, {
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

export const LayoutNumericFraction = connectLayoutToPlot(
  connectToContainer(NumericFraction, {
    supplyPlotProps: supplyLayoutPlotProps,
    modifyPlotProps: (props, context, plotProps) => {
      const {attrMeta, fullValue, updatePlot} = plotProps;
      if (isNumeric(fullValue)) {
        plotProps.fullValue = fullValue * 100;
      }

      plotProps.updatePlot = v => {
        if (isNumeric(v)) {
          updatePlot(v / 100);
        } else {
          updatePlot(v);
        }
      };

      if (attrMeta) {
        if (isNumeric(attrMeta.max)) {
          plotProps.max = attrMeta.max * 100;
        }

        if (isNumeric(attrMeta.min)) {
          plotProps.min = attrMeta.min * 100;
        }
      }
    },
  })
);

export const AnnotationArrowRef = connectToContainer(UnconnectedDropdown, {
  modifyPlotProps: (props, context, plotProps) => {
    const {fullContainer: {xref, yref}, plotly, graphDiv} = context;

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
        ...computeAxesRefOptions(
          plotly.Axes.list(graphDiv, props.attr.charAt(1))
        ),
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
    const {fullContainer: {axref, ayref}, graphDiv, plotly} = context;

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
      ...computeAxesRefOptions(
        plotly.Axes.list(graphDiv, props.attr.charAt(0))
      ),
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

function computeAxesRefOptions(axes) {
  const options = [];
  for (let i = 0; i < axes.length; i++) {
    const ax = axes[i];

    // checking user data for title avoids default "Click to enter axis title"
    const label = ax._input.title || ax._id;
    options[i] = {label, value: ax._id};
  }

  return options;
}
