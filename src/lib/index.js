import bem from './bem';
import connectAnnotationToLayout from './connectAnnotationToLayout';
import connectAxesToLayout from './connectAxesToLayout';
import connectLayoutToPlot, {getLayoutContext} from './connectLayoutToPlot';
import connectToContainer, {
  containerConnectedContextTypes,
} from './connectToContainer';
import connectTraceToPlot from './connectTraceToPlot';
import dereference from './dereference';
import findFullTraceIndex from './findFullTraceIndex';
import localize, {localizeString} from './localize';
import tinyColor from 'tinycolor2';
import unpackPlotProps from './unpackPlotProps';
import walkObject, {isPlainObject} from './walkObject';
import {
  customTraceToPlotlyTrace,
  plotlyTraceToCustomTrace,
} from './customTraceType';
import * as PlotlyIcons from 'plotly-icons';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

const TOO_LIGHT_FACTOR = 0.8;
export function tooLight(color) {
  const hslColor = tinyColor(color).toHsl();
  return hslColor.l > TOO_LIGHT_FACTOR;
}

function getPlotIcons(plotly) {
  const icons = Object.keys(plotly.PlotSchema.get().traces).reduce(
    (allTraces, trace) => {
      const componentName = `Plot${capitalize(trace)}Icon`;
      const iconComponent = PlotlyIcons[componentName];
      if (componentName) {
        allTraces[trace] = iconComponent;
      } else {
        allTraces[trace] = PlotlyIcons.PlotLineIcon;
      }
      return allTraces;
    },
    {}
  );

  // We have to add some of the editor specific trace types as they're not
  // in plotly.PlotSchema.get()
  icons.line = PlotlyIcons.PlotLineIcon;
  return icons;
}

export {
  bem,
  capitalize,
  clamp,
  connectAnnotationToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  containerConnectedContextTypes,
  customTraceToPlotlyTrace,
  dereference,
  findFullTraceIndex,
  getDisplayName,
  getPlotIcons,
  getLayoutContext,
  isPlainObject,
  localize,
  localizeString,
  plotlyTraceToCustomTrace,
  unpackPlotProps,
  walkObject,
};
