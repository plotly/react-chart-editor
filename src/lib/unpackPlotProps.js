import nestedProperty from 'plotly.js/src/lib/nested_property';

export default function unpackPlotProps(props, context) {
  const plotProps = {};

  plotProps.attr = props.attr;
  plotProps.index = context.traceIndex;

  // gd, data, fullData:
  plotProps.gd = context.graphDiv;
  plotProps.trace = context.data[context.traceIndex] || {};
  plotProps.fullTrace = context.fullData[context.fullTraceIndex] || {};

  // Property accessors:
  plotProps.fullProperty = nestedProperty(plotProps.fullTrace, plotProps.attr);
  plotProps.property = nestedProperty(plotProps.trace, plotProps.attr);

  let dataSrcExists = false;
  if (props.isDataSrc) {
    const traceAttr = `${plotProps.fullTrace.type}.attributes.${props.attr}`;
    const attr = nestedProperty(context.plotSchema.traces, traceAttr).get();
    if (attr && (attr.valType === 'data_array' || attr.arrayOk)) {
      dataSrcExists = true;
      plotProps.srcAttr = plotProps.attr + 'src';
      plotProps.srcProperty = nestedProperty(
        plotProps.trace,
        plotProps.srcAttr
      );
    }
  }

  plotProps.onUpdate = context.onUpdate;

  // Create a fullValue getter:
  plotProps.fullValue = function fullValue() {
    if (dataSrcExists) {
      // we use the non-full version for src information as Plotly.js does
      // not pass src information into fullData or fullLayout. It is a
      // "user land" only attribute.
      return plotProps.srcProperty.get();
    } else {
      return plotProps.fullProperty.get();
    }
  };

  // The value getter:
  plotProps.value = plotProps.property.get.bind(plotProps.property);

  // An update callback:
  plotProps.updatePlot = function updatePlot(value) {
    const attr = dataSrcExists ? plotProps.srcAttr : plotProps.attr;
    const update = {[attr]: [value]};
    plotProps.onUpdate && plotProps.onUpdate(update, [plotProps.index]);
  };

  const fv = plotProps.fullValue();
  if (props.show || dataSrcExists || (fv !== undefined && fv !== null)) {
    plotProps.isVisible = true;
  } else {
    plotProps.isVisible = false;
  }

  return plotProps;
}
