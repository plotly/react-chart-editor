import nestedProperty from 'plotly.js/src/lib/nested_property';

export default function unpackPlotProps(props, context, ComponentClass) {
  const plotProps = {};

  // Indexing and referencing:
  plotProps.attr = props.attr;
  plotProps.index = context.traceIndex;

  // gd, data, fullData:
  plotProps.gd = context.graphDiv;
  plotProps.trace = context.data[context.traceIndex] || {};
  plotProps.fullTrace = context.fullData[context.fullTraceIndex] || {};

  // Property accessors:
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
    plotProps.onUpdate && plotProps.onUpdate(update, [plotProps.index]);
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
