import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from './lib';
import {maybeClearAxisTypes} from './shame';
import {EDITOR_ACTIONS} from './lib/constants';
import isNumeric from 'fast-isnumeric';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {categoryLayout, traceTypes} from 'lib/traceTypes';
import {ModalProvider} from 'components/containers';

class EditorControls extends Component {
  constructor(props, context) {
    super(props, context);

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
      data: gd.data,
      dataSources: this.props.dataSources,
      dataSourceOptions: this.props.dataSourceOptions,
      dataSourceValueRenderer: this.props.dataSourceValueRenderer,
      dataSourceOptionRenderer: this.props.dataSourceOptionRenderer,
      dictionaries: this.props.dictionaries || {},
      fullData: gd._fullData,
      fullLayout: gd._fullLayout,
      graphDiv: gd,
      layout: gd.layout,
      locale: this.props.locale,
      onUpdate: this.handleUpdate.bind(this),
      plotSchema: this.plotSchema,
      plotly: this.props.plotly,
      traceTypesConfig: this.props.traceTypesConfig,
    };
  }

  maybeAdjustAxisRef(payload) {
    const {graphDiv} = this.props;
    if (payload.tracesNeedingAxisAdjustment) {
      payload.tracesNeedingAxisAdjustment.forEach(trace => {
        const axis = trace[payload.axisAttrToAdjust].charAt(0);
        const currentAxisIdNumber = Number(
          trace[payload.axisAttrToAdjust].slice(1)
        );
        const adjustedAxisIdNumber = currentAxisIdNumber - 1;

        const currentAxisLayoutProperties = {
          ...graphDiv.layout[payload.axisAttrToAdjust + currentAxisIdNumber],
        };

        // for cases when we're adjusting x2 => x, so that it becomes x not x1
        graphDiv.data[trace.index][payload.axisAttrToAdjust] =
          adjustedAxisIdNumber === 1 ? axis : axis + adjustedAxisIdNumber;

        graphDiv.layout[
          payload.axisAttrToAdjust + adjustedAxisIdNumber
        ] = currentAxisLayoutProperties;
      });
    }
  }

  handleUpdate({type, payload}) {
    const {graphDiv} = this.props;

    switch (type) {
      case EDITOR_ACTIONS.UPDATE_TRACES:
        if (this.props.beforeUpdateTraces) {
          this.props.beforeUpdateTraces(payload);
        }

        // until we start utilizing Plotly.react in `react-plotly.js`
        // force clear axes types when a `src` has changed.
        maybeClearAxisTypes(graphDiv, payload.traceIndexes, payload.update);

        this.maybeAdjustAxisRef(payload);

        for (let i = 0; i < payload.traceIndexes.length; i++) {
          for (const attr in payload.update) {
            const traceIndex = payload.traceIndexes[i];
            const prop = nestedProperty(graphDiv.data[traceIndex], attr);
            const value = payload.update[attr];

            if (value !== void 0) {
              prop.set(value);
            }
          }
        }

        if (this.props.afterUpdateTraces) {
          this.props.afterUpdateTraces(payload);
        }
        if (this.props.onUpdate) {
          this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout);
        }
        break;

      case EDITOR_ACTIONS.UPDATE_LAYOUT:
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
            Object.assign({}, graphDiv.layout)
          );
        }
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        if (this.props.beforeAddTrace) {
          this.props.beforeAddTrace(payload);
        }
        graphDiv.data.push({type: 'scatter', mode: 'markers'});
        if (this.props.afterAddTrace) {
          this.props.afterAddTrace(payload);
        }
        if (this.props.onUpdate) {
          this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout);
        }
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          if (this.props.beforeDeleteTrace) {
            this.props.beforeDeleteTrace(payload);
          }
          graphDiv.data.splice(payload.traceIndexes[0], 1);
          if (this.props.afterDeleteTrace) {
            this.props.afterDeleteTrace(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout);
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
              Object.assign({}, graphDiv.layout)
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
              Object.assign({}, graphDiv.layout)
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
              Object.assign({}, graphDiv.layout)
            );
          }
        }
        break;

      default:
        throw new Error('must specify an action type to handleEditorUpdate');
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
  dataSourceOptionRenderer: PropTypes.func,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  dataSourceValueRenderer: PropTypes.func,
  dictionaries: PropTypes.object,
  graphDiv: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  traceTypesConfig: PropTypes.object,
};

EditorControls.defaultProps = {
  locale: 'en',
  traceTypesConfig: {
    categories: _ => categoryLayout(_),
    traces: _ => traceTypes(_),
    complex: true,
  },
};

EditorControls.childContextTypes = {
  advancedTraceTypeSelector: PropTypes.bool,
  config: PropTypes.object,
  data: PropTypes.array,
  dataSourceOptionRenderer: PropTypes.func,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  dataSourceValueRenderer: PropTypes.func,
  dictionaries: PropTypes.object,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  plotSchema: PropTypes.object,
  traceTypesConfig: PropTypes.object,
};

export default EditorControls;
