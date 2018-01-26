import nestedProperty from 'plotly.js/src/lib/nested_property';
import isNumeric from 'fast-isnumeric';
import {MULTI_VALUED, MULTI_VALUED_PLACEHOLDER} from './constants';

export default function unpackPlotProps(props, context) {
  const {container, getValObject, defaultContainer, updateContainer} = context;

  if (!props.attr) {
    throw new Error('connectedToContainer components require an `attr` prop');
  }

  let attrMeta;
  if (getValObject) {
    attrMeta = context.getValObject(props.attr) || {};
  }

  /*
   * This needed to be adjusted as financial charts
   * do not contain their 'true' attributes, but rather attributes of the trace
   * types that are used to compose them. Financial chart attributes are found in
   * fullContainer._fullInput
   */
  let fullContainer = context.fullContainer;
  if (
    fullContainer &&
    fullContainer._fullInput &&
    (fullContainer._fullInput.type === 'ohlc' ||
      fullContainer._fullInput.type === 'candlestick')
  ) {
    fullContainer = fullContainer._fullInput;
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

  const updatePlot = v => {
    if (updateContainer) {
      updateContainer({[props.attr]: v});
    }
  };

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
