import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {
  bem,
  localizeString,
  plotlyTraceToCustomTrace,
  traceTypeToPlotlyInitFigure,
  hasValidCustomConfigVisibilityRules,
} from './lib';
import {
  shamefullyClearAxisTypes,
  shamefullyAdjustAxisRef,
  shamefullyAdjustGeo,
  shamefullyAddTableColumns,
  shamefullyCreateSplitStyleProps,
  shamefullyAdjustSplitStyleTargetContainers,
  shamefullyDeleteRelatedAnalysisTransforms,
  shamefullyAdjustSizeref,
  shamefullyAdjustAxisDirection,
  shamefullyAdjustMapbox,
} from './shame';
import {EDITOR_ACTIONS} from './lib/constants';
import isNumeric from 'fast-isnumeric';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {categoryLayout, traceTypes} from 'lib/traceTypes';
import {ModalProvider} from 'components/containers';
import {DEFAULT_FONTS} from 'lib/constants';

class EditorControls extends Component {
  constructor(props, context) {
    super(props, context);

    this.localize = (key) => localizeString(this.props.dictionaries || {}, this.props.locale, key);

    // we only need to compute this once.
    if (this.props.plotly) {
      this.plotSchema = this.props.plotly.PlotSchema.get();
    }
  }

  getChildContext() {
    const gd = this.props.graphDiv || {};
    return {
      advancedTraceTypeSelector: this.props.advancedTraceTypeSelector,
      config: gd._context,
      srcConverters: this.props.srcConverters,
      data: gd.data,
      dataSourceComponents: this.props.dataSourceComponents,
      dataSourceOptions: this.props.dataSourceOptions,
      dataSources: this.props.dataSources,
      dictionaries: this.props.dictionaries || {},
      localize: this.localize,
      frames: gd._transitionData ? gd._transitionData._frames : [],
      fullData: gd._fullData,
      fullLayout: gd._fullLayout,
      graphDiv: gd,
      layout: gd.layout,
      locale: this.props.locale,
      onUpdate: this.handleUpdate.bind(this),
      plotSchema: this.plotSchema,
      plotly: this.props.plotly,
      traceTypesConfig: this.props.traceTypesConfig,
      showFieldTooltips: this.props.showFieldTooltips,
      glByDefault: this.props.glByDefault,
      mapBoxAccess: this.props.mapBoxAccess,
      fontOptions: this.props.fontOptions,
      chartHelp: this.props.chartHelp,
      customConfig: this.props.customConfig,
      hasValidCustomConfigVisibilityRules: hasValidCustomConfigVisibilityRules(
        this.props.customConfig
      ),
    };
  }

  handleUpdate({type, payload}) {
    const {graphDiv} = this.props;

    switch (type) {
      case EDITOR_ACTIONS.UPDATE_TRACES:
        if (this.props.beforeUpdateTraces) {
          this.props.beforeUpdateTraces(payload);
        }

        shamefullyAdjustSizeref(graphDiv, payload);
        shamefullyAdjustAxisDirection(graphDiv, payload);
        shamefullyClearAxisTypes(graphDiv, payload);
        shamefullyAdjustAxisRef(graphDiv, payload);
        shamefullyAddTableColumns(graphDiv, payload);
        shamefullyAdjustSplitStyleTargetContainers(graphDiv, payload);
        if (!this.props.mapBoxAccess) {
          shamefullyAdjustMapbox(graphDiv, payload);
        }

        for (let i = 0; i < payload.traceIndexes.length; i++) {
          for (const attr in payload.update) {
            const traceIndex = payload.traceIndexes[i];

            const splitTraceGroup = payload.splitTraceGroup
              ? payload.splitTraceGroup.toString()
              : null;

            let props = [nestedProperty(graphDiv.data[traceIndex], attr)];
            const value = payload.update[attr];

            if (splitTraceGroup) {
              props = shamefullyCreateSplitStyleProps(graphDiv, attr, traceIndex, splitTraceGroup);
            }

            props.forEach((p) => {
              if (value !== void 0) {
                p.set(value);
              }
            });
          }
        }

        if (this.props.afterUpdateTraces) {
          this.props.afterUpdateTraces(payload);
        }
        if (this.props.onUpdate) {
          this.props.onUpdate(
            graphDiv.data.slice(),
            graphDiv.layout,
            graphDiv._transitionData._frames
          );
        }
        break;

      case EDITOR_ACTIONS.UPDATE_LAYOUT:
        shamefullyAdjustGeo(graphDiv, payload);

        if (this.props.beforeUpdateLayout) {
          this.props.beforeUpdateLayout(payload);
        }
        for (const attr in payload.update) {
          const prop = nestedProperty(graphDiv.layout, attr);
          const value = payload.update[attr];
          if (value !== void 0) {
            prop.set(value);
          }
        }
        if (this.props.afterUpdateLayout) {
          this.props.afterUpdateLayout(payload);
        }
        if (this.props.onUpdate) {
          this.props.onUpdate(
            graphDiv.data,
            Object.assign({}, graphDiv.layout),
            graphDiv._transitionData._frames
          );
        }
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        if (this.props.beforeAddTrace) {
          this.props.beforeAddTrace(payload);
        }

        // can't use default prop because plotly.js mutates it:
        // https://github.com/plotly/react-chart-editor/issues/509
        if (graphDiv.data.length === 0) {
          graphDiv.data.push(
            this.props.makeDefaultTrace
              ? this.props.makeDefaultTrace()
              : {
                  type: `scatter${this.props.glByDefault ? 'gl' : ''}`,
                  mode: 'markers',
                }
          );
        } else {
          const prevTrace = graphDiv.data[graphDiv.data.length - 1];
          const prevTraceType = plotlyTraceToCustomTrace(prevTrace);
          graphDiv.data.push(
            traceTypeToPlotlyInitFigure(
              prevTraceType,
              prevTrace.type && prevTrace.type.endsWith('gl') ? 'gl' : ''
            )
          );
        }

        if (this.props.afterAddTrace) {
          this.props.afterAddTrace(payload);
        }
        if (this.props.onUpdate) {
          this.props.onUpdate(
            graphDiv.data.slice(),
            graphDiv.layout,
            graphDiv._transitionData._frames
          );
        }
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          if (this.props.beforeDeleteTrace) {
            this.props.beforeDeleteTrace(payload);
          }

          shamefullyAdjustAxisRef(graphDiv, payload);
          shamefullyDeleteRelatedAnalysisTransforms(graphDiv, payload);

          graphDiv.data.splice(payload.traceIndexes[0], 1);
          if (this.props.afterDeleteTrace) {
            this.props.afterDeleteTrace(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data.slice(),
              graphDiv.layout,
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_ANNOTATION:
        if (isNumeric(payload.annotationIndex)) {
          if (this.props.beforeDeleteAnnotation) {
            this.props.beforeDeleteAnnotation(payload);
          }
          graphDiv.layout.annotations.splice(payload.annotationIndex, 1);
          if (this.props.afterDeleteAnnotation) {
            this.props.afterDeleteAnnotation(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data,
              Object.assign({}, graphDiv.layout),
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_SHAPE:
        if (isNumeric(payload.shapeIndex)) {
          if (this.props.beforeDeleteShape) {
            this.props.beforeDeleteShape(payload);
          }
          graphDiv.layout.shapes.splice(payload.shapeIndex, 1);
          if (this.props.afterDeleteShape) {
            this.props.afterDeleteShape(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data,
              Object.assign({}, graphDiv.layout),
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_IMAGE:
        if (isNumeric(payload.imageIndex)) {
          if (this.props.beforeDeleteImage) {
            this.props.beforeDeleteImage(payload);
          }
          graphDiv.layout.images.splice(payload.imageIndex, 1);
          if (this.props.afterDeleteImage) {
            this.props.afterDeleteImage(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data,
              Object.assign({}, graphDiv.layout),
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_RANGESELECTOR:
        if (isNumeric(payload.rangeselectorIndex)) {
          graphDiv.layout[payload.axisId].rangeselector.buttons.splice(
            payload.rangeselectorIndex,
            1
          );
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data,
              Object.assign({}, graphDiv.layout),
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_MAPBOXLAYER:
        if (isNumeric(payload.mapboxLayerIndex)) {
          graphDiv.layout[payload.mapboxId].layers.splice(payload.mapboxLayerIndex, 1);
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data,
              Object.assign({}, graphDiv.layout),
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.DELETE_TRANSFORM:
        if (isNumeric(payload.transformIndex) && payload.traceIndex < graphDiv.data.length) {
          if (graphDiv.data[payload.traceIndex].transforms.length === 1) {
            delete graphDiv.data[payload.traceIndex].transforms;
          } else {
            graphDiv.data[payload.traceIndex].transforms.splice(payload.transformIndex, 1);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(
              graphDiv.data.slice(),
              graphDiv.layout,
              graphDiv._transitionData._frames
            );
          }
        }
        break;

      case EDITOR_ACTIONS.MOVE_TO:
        // checking if fromIndex and toIndex is a number because
        // gives errors if index is 0 (falsy value)
        if (payload.path && !isNaN(payload.fromIndex) && !isNaN(payload.toIndex)) {
          function move(container) {
            const movedEl = container[payload.fromIndex];
            const replacedEl = container[payload.toIndex];
            container[payload.toIndex] = movedEl;
            container[payload.fromIndex] = replacedEl;
          }

          if (payload.path === 'data') {
            move(graphDiv.data);
          }

          if (payload.path === 'layout.images') {
            move(graphDiv.layout.images);
          }

          if (payload.path === 'layout.shapes') {
            move(graphDiv.layout.shapes);
          }

          if (payload.path === 'layout.annotations') {
            move(graphDiv.layout.annotations);
          }

          if (payload.path === 'layout.mapbox.layers') {
            move(graphDiv.layout[payload.mapboxId].layers);
          }

          const updatedData = payload.path.startsWith('data')
            ? graphDiv.data.slice()
            : graphDiv.data;
          const updatedLayout = payload.path.startsWith('layout')
            ? Object.assign({}, graphDiv.layout)
            : graphDiv.layout;

          if (this.props.onUpdate) {
            this.props.onUpdate(updatedData, updatedLayout, graphDiv._transitionData._frames);
          }
        }
        break;

      default:
        throw new Error(this.localize('must specify an action type to handleEditorUpdate'));
    }
  }

  render() {
    return (
      <div
        className={
          bem('editor_controls') +
          ' plotly-editor--theme-provider' +
          `${this.props.className ? ` ${this.props.className}` : ''}`
        }
      >
        <ModalProvider>
          {this.props.graphDiv &&
            this.props.graphDiv._fullLayout &&
            (this.props.children ? this.props.children : <DefaultEditor />)}
        </ModalProvider>
      </div>
    );
  }
}

EditorControls.propTypes = {
  advancedTraceTypeSelector: PropTypes.bool,
  afterAddTrace: PropTypes.func,
  afterDeleteAnnotation: PropTypes.func,
  afterDeleteShape: PropTypes.func,
  afterDeleteImage: PropTypes.func,
  afterDeleteTrace: PropTypes.func,
  afterUpdateLayout: PropTypes.func,
  afterUpdateTraces: PropTypes.func,
  beforeAddTrace: PropTypes.func,
  beforeDeleteAnnotation: PropTypes.func,
  beforeDeleteShape: PropTypes.func,
  beforeDeleteImage: PropTypes.func,
  beforeDeleteTrace: PropTypes.func,
  beforeUpdateLayout: PropTypes.func,
  beforeUpdateTraces: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  srcConverters: PropTypes.shape({
    toSrc: PropTypes.func.isRequired,
    fromSrc: PropTypes.func.isRequired,
  }),
  dataSourceComponents: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  dictionaries: PropTypes.object,
  graphDiv: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  showFieldTooltips: PropTypes.bool,
  traceTypesConfig: PropTypes.object,
  makeDefaultTrace: PropTypes.func,
  glByDefault: PropTypes.bool,
  mapBoxAccess: PropTypes.bool,
  fontOptions: PropTypes.array,
  chartHelp: PropTypes.object,
  customConfig: PropTypes.object,
};

EditorControls.defaultProps = {
  showFieldTooltips: false,
  locale: 'en',
  traceTypesConfig: {
    categories: (_) => categoryLayout(_),
    traces: (_) => traceTypes(_),
    complex: true,
  },
  fontOptions: DEFAULT_FONTS,
};

EditorControls.childContextTypes = {
  advancedTraceTypeSelector: PropTypes.bool,
  config: PropTypes.object,
  srcConverters: PropTypes.shape({
    toSrc: PropTypes.func.isRequired,
    fromSrc: PropTypes.func.isRequired,
  }),
  data: PropTypes.array,
  dataSourceComponents: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  dictionaries: PropTypes.object,
  frames: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  locale: PropTypes.string,
  localize: PropTypes.func,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  plotSchema: PropTypes.object,
  traceTypesConfig: PropTypes.object,
  showFieldTooltips: PropTypes.bool,
  glByDefault: PropTypes.bool,
  mapBoxAccess: PropTypes.bool,
  fontOptions: PropTypes.array,
  chartHelp: PropTypes.object,
  customConfig: PropTypes.object,
  hasValidCustomConfigVisibilityRules: PropTypes.bool,
};

export default EditorControls;
