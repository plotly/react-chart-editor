import {createContext} from 'react';
const EditorControlsContext = createContext({});
const PanelMenuWrapperContext = createContext({});
const ModalProviderContext = createContext({});
const PlotlyFoldContext = createContext({});
const PlotlyPanelContext = createContext({});
// const ConnectAggregationToTransformContext = createContext({});
// const ConnectAnnotationToLayoutContext = createContext({});
// const ConnectAxesToLayoutContext = createContext({});
// const ConnectCartesianSubplotToLayoutContext = createContext({});
// const ConnectImageToLayoutContext = createContext({});
// const ConnectLayoutToPlotContext = createContext({});
// const ConnectNonCartesianSubplotToLayoutContext = createContext({});
// const ConnectRangeSelectorToAxisContext = createContext({});
// const ConnectShapeToLayoutContext = createContext({});
// const ConnectSliderToLayoutContext = createContext({});
// const ConnectToContainerContext = createContext({});
const ConnectTraceToPlotContext = createContext({});
// const ConnectTransformToTraceContext = createContext({});
// const ConnectUpdateMenuToLayoutContext = createContext({});

export {
  EditorControlsContext,
  PanelMenuWrapperContext,
  ModalProviderContext,
  PlotlyFoldContext,
  PlotlyPanelContext,
  // ConnectAggregationToTransformContext,
  // ConnectAnnotationToLayoutContext,
  // ConnectAxesToLayoutContext,
  // ConnectCartesianSubplotToLayoutContext,
  // ConnectImageToLayoutContext,
  // ConnectLayoutToPlotContext,
  // ConnectNonCartesianSubplotToLayoutContext,
  // ConnectRangeSelectorToAxisContext,
  // ConnectShapeToLayoutContext,
  // ConnectSliderToLayoutContext,
  // ConnectToContainerContext,
  ConnectTraceToPlotContext,
  // ConnectTransformToTraceContext,
  // ConnectUpdateMenuToLayoutContext,
};
