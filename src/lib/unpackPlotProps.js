import nestedProperty from 'plotly.js/src/lib/nested_property';
import isNumeric from 'fast-isnumeric';
import findFullTraceIndex from './findFullTraceIndex';

export default function unpackPlotProps(props, context, ComponentClass) {
  const {updateContainer, container, fullContainer} = context;

  if (!container || !fullContainer) {
    throw new Error(
      `${ComponentClass.name} must be nested within a <Trace>, <TraceAccordion> ` +
        'or <Layout> container'
    );
  }

  // Property accessors and meta information:
  const fullProperty = nestedProperty(fullContainer, props.attr);
  const property = nestedProperty(container, props.attr);
  const fullValue = () => fullProperty.get();

  // Property descriptions and meta:
  const attrMeta = context.getValObject(props.attr) || {};

  // Update data functions:
  const updatePlot = v => updateContainer && updateContainer({[props.attr]: v});

  // Visibility:
  let isVisible = false;
  const fv = fullValue();
  if (props.show || (fv !== undefined && fv !== null)) {
    isVisible = true;
  }

  const plotProps = {
    attrMeta,
    container,
    fullContainer,
    fullValue,
    isVisible,
    updateContainer,
    updatePlot,
  };

  // Allow Component Classes to further augment plotProps:
  ComponentClass.unpackPlotProps &&
    ComponentClass.unpackPlotProps(props, context, plotProps);

  return plotProps;
}
