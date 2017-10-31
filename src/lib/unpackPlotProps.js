import nestedProperty from 'plotly.js/src/lib/nested_property';

// A regex to match *src attribute names:
var SRC_ATTR_REGEX = /(.+)src$/;

export default function unpackPlotProps (props, context) {
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

  plotProps.srcAttr = plotProps.attr + 'src';
  plotProps.fullSrcProperty = nestedProperty(plotProps.fullTrace, plotProps.srcAttr);

  plotProps.fullSrcValue = plotProps.fullSrcProperty.get();
  plotProps.hasSrcValue = !!plotProps.fullSrcValue;

  const traceAttr = `${plotProps.fullTrace.type}.attributes.${plotProps.attr}`;
  const attrDef = nestedProperty(context.plotSchema.traces, traceAttr).get();

  plotProps.onUpdate = context.onUpdate;

  // Create a fullValue getter:
  plotProps.fullValue = function fullValue () {
    if (plotProps.srcAttr) {
      return plotProps.fullSrcProperty.get();
    } else {
      return plotProps.fullProperty.get();
    }
  };

  // The value getter:
  plotProps.value = plotProps.property.get.bind(plotProps.property);

  // An update callback:
  plotProps.updatePlot = function updatePlot (value) {
    let update = {};

    if (!plotProps.isSrcAttr) {
      update[plotProps.srcAttr] = [value];
    } else {
      update[plotProps.attr] = [value];
    }

    plotProps.onUpdate && plotProps.onUpdate(update, [plotProps.index]);
  };

  return plotProps;
}
