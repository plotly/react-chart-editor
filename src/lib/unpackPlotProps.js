import nestedProperty from 'plotly.js/src/lib/nested_property';
import isNumeric from 'fast-isnumeric';
import findFullTraceIndex from './findFullTraceIndex';

export default function unpackPlotProps(props, context, ComponentClass) {
  const plotProps = {};

  // Indexing and referencing:
  if (isNumeric(props.traceIndex)) {
    plotProps.traceIndex = props.traceIndex;
    plotProps.fullTraceIndex = props.fullTraceIndex;
  } else if (isNumeric(context.traceIndex)) {
    plotProps.traceIndex = context.traceIndex;
    plotProps.fullTraceIndex = context.fullTraceIndex;
  } else {
    throw new Error(
      `Data field ${ComponentClass.name} must be supplied a traceIndex ` +
        `via props or context`
    );
  }

  if (!isNumeric(plotProps.fullTraceIndex)) {
    plotProps.fullTraceIndex = findFullTraceIndex(
      context.fullData,
      plotProps.traceIndex
    );
  }

  // gd, data, fullData:
  plotProps.gd = context.graphDiv;
  plotProps.trace = context.data[plotProps.traceIndex] || {};
  plotProps.fullTrace = context.fullData[plotProps.fullTraceIndex] || {};

  // Property accessors:
  plotProps.attr = props.attr;
  plotProps.fullProperty = nestedProperty(plotProps.fullTrace, plotProps.attr);
  plotProps.property = nestedProperty(plotProps.trace, plotProps.attr);
  plotProps.fullValue = () => plotProps.fullProperty.get();

  // Property descriptions and meta:
  plotProps.attrMeta =
    nestedProperty(
      context.plotSchema.traces,
      `${plotProps.fullTrace.type}.attributes.${plotProps.attr}`
    ).get() || {};

  // Update data functions:
  plotProps.onUpdate = context.onUpdate;
  plotProps.updatePlot = function updatePlot(value) {
    const update = {[plotProps.attr]: [value]};
    plotProps.onUpdate && plotProps.onUpdate(update, [plotProps.traceIndex]);
  };

  // Visibility:
  const fv = plotProps.fullValue();
  if (props.show || (fv !== undefined && fv !== null)) {
    plotProps.isVisible = true;
  } else {
    plotProps.isVisible = false;
  }

  // Allow Component Classes to further augment plotProps:
  ComponentClass.unpackPlotProps &&
    ComponentClass.unpackPlotProps(props, context, plotProps);

  return plotProps;
}
