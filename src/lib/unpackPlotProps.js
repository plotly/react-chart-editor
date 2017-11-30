import nestedProperty from 'plotly.js/src/lib/nested_property';
import isNumeric from 'fast-isnumeric';
import {MULTI_VALUED, MULTI_VALUED_PLACEHOLDER} from './constants';

export default function unpackPlotProps(props, context) {
  const {
    container,
    getValObject,
    defaultContainer,
    fullContainer,
    updateContainer,
  } = context;

  if (!props.attr) {
    throw new Error('connectedToContainer components require an `attr` prop');
  }

  const updatePlot = v => {
    if (updateContainer) {
      updateContainer({[props.attr]: v});
    }
  };

  let attrMeta;
  if (getValObject) {
    attrMeta = context.getValObject(props.attr) || {};
  }

  const fullProperty = nestedProperty(fullContainer, props.attr);
  let fullValue = fullProperty.get();
  let multiValued = false;

  // MULTI_VALUED consists of a control sequence that cannot be confused with
  // user data. We must transform it into something that can be displayed as
  // the screen.
  if (fullValue === MULTI_VALUED) {
    fullValue = MULTI_VALUED_PLACEHOLDER;
    multiValued = true;
  }

  let isVisible = false;
  if (props.show || (fullValue !== void 0 && fullValue !== null)) {
    isVisible = true;
  }

  let defaultValue = props.defaultValue;
  if (defaultValue === void 0 && defaultContainer) {
    defaultValue = nestedProperty(defaultContainer, props.attr).get();
  }

  let min, max;
  if (attrMeta) {
    if (isNumeric(attrMeta.max)) {
      max = attrMeta.max;
    }
    if (isNumeric(attrMeta.min)) {
      min = attrMeta.min;
    }
  }

  return {
    attrMeta,
    container,
    defaultValue,
    fullContainer,
    fullValue,
    getValObject,
    isVisible,
    max,
    min,
    multiValued,
    updateContainer,
    updatePlot,
  };
}
