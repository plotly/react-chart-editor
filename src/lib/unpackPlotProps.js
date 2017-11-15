import nestedProperty from 'plotly.js/src/lib/nested_property';
import isNumeric from 'fast-isnumeric';
import {MULTI_VALUED, MULTI_VALUED_PLACEHOLDER} from './constants';

export default function unpackPlotProps(props, context, ComponentClass) {
  const {
    container,
    getValObject,
    defaultContainer,
    fullContainer,
    updateContainer,
  } = context;

  if (!container || !fullContainer) {
    throw new Error(
      `${ComponentClass.name} must be nested within a component connected ` +
        'to a plotly.js container.'
    );
  }

  // Property accessors and meta information:
  const fullProperty = nestedProperty(fullContainer, props.attr);
  const fullValue = () => {
    const fv = fullProperty.get();
    if (fv === MULTI_VALUED) {
      return MULTI_VALUED_PLACEHOLDER;
    }
    return fv;
  };

  let defaultValue = props.defaultValue;
  if (defaultValue === void 0 && defaultContainer) {
    defaultValue = nestedProperty(defaultContainer, props.attr).get();
  }

  // Property descriptions and meta:
  const attrMeta = context.getValObject(props.attr) || {};

  // Update data functions:
  const updatePlot = v => updateContainer && updateContainer({[props.attr]: v});

  // Visibility and multiValues:
  const fv = fullProperty.get();
  const multiValued = fv === MULTI_VALUED;

  let isVisible = false;
  if (props.show || (fv !== void 0 && fv !== null)) {
    isVisible = true;
  }

  const plotProps = {
    attrMeta,
    container,
    defaultValue,
    getValObject,
    fullContainer,
    fullValue,
    isVisible,
    updateContainer,
    updatePlot,
    multiValued,
  };

  if (isNumeric(attrMeta.max)) {
    plotProps.max = attrMeta.max;
  }
  if (isNumeric(attrMeta.min)) {
    plotProps.min = attrMeta.min;
  }

  // Give Component Classes the space to modify plotProps:
  if (ComponentClass.modifyPlotProps) {
    ComponentClass.modifyPlotProps(props, context, plotProps);
  }

  return plotProps;
}
