import DefaultEditor from './DefaultEditor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from './lib';
import {noShame, maybeClearAxisTypes} from './shame';
import {EDITOR_ACTIONS} from './lib/constants';
import isNumeric from 'fast-isnumeric';
import nestedProperty from 'plotly.js/src/lib/nested_property';

class PlotlyEditor extends Component {
  constructor(props, context) {
    super(props, context);

    noShame({plotly: this.props.plotly});

    // we only need to compute this once.
    if (this.props.plotly) {
      this.plotSchema = this.props.plotly.PlotSchema.get();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.revision === void 0 ||
      nextProps.revision !== this.props.revision ||
      nextProps.dataSources !== this.props.dataSources ||
      nextProps.dataSourceOptions !== this.props.dataSourceOptions
    ) {
      return true;
    }
    return false;
  }

  getChildContext() {
    const gd = this.props.graphDiv || {};
    return {
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
    };
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
          this.props.onUpdate();
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
          this.props.onUpdate();
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
          this.props.onUpdate();
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
            this.props.onUpdate();
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
            this.props.onUpdate();
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
            this.props.onUpdate();
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
            this.props.onUpdate();
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
          bem('plotly-editor') +
          ' plotly-editor--theme-provider' +
          `${this.props.className ? ` ${this.props.className}` : ''}`
        }
      >
        {this.props.graphDiv &&
          this.props.graphDiv._fullLayout &&
          (this.props.children ? this.props.children : <DefaultEditor />)}
      </div>
    );
  }
}

PlotlyEditor.propTypes = {
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
  dataSourceValueRenderer: PropTypes.func,
  dictionaries: PropTypes.object,
  dataSources: PropTypes.object,
  graphDiv: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  revision: PropTypes.any,
};

PlotlyEditor.defaultProps = {
  locale: 'en',
};

PlotlyEditor.childContextTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  dataSources: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSourceValueRenderer: PropTypes.func,
  dataSourceOptionRenderer: PropTypes.func,
  dictionaries: PropTypes.object,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  locale: PropTypes.string,
  onUpdate: PropTypes.func,
  plotSchema: PropTypes.object,
  plotly: PropTypes.object,
};

export default PlotlyEditor;
