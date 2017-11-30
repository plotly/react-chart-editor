import nestedProperty from 'plotly.js/src/lib/nested_property';
import {EDITOR_ACTIONS} from './lib/constants';
import isNumeric from 'fast-isnumeric';

/* eslint-disable no-console */
const log = console.log;
/* eslint-enable no-console */

// Revisions: An optional system to prevent unnecessary rerenders.
// There are two revision counters. One for the react-plotly.js
// component and one for react-plotly.js-editor. They are uncoupled because
// the plot can update the data internally (for example if a user updates the
// title in the plot directly). This should trigger a editorSourcesUpdated counter
// but not a figureUpdated counter since in this case the plot has already updated
// and only the editor needs updating. Similarly there is the case where dataSources
// may update but the Plotly.react component may determine that nothing needs to
// be rerendered. In this case the Editor may not need to update.
// If the revisions are not passed to react-plotly.js or react-plotly.js-editor
// they will always update.
export default function PlotlyHub(config = {}) {
  this.onUpdate = config.onUpdate;

  let editorRevision = config.editorRevision || 0;
  let plotRevision = config.plotRevision || 0;

  //
  // @method figureUpdates
  //
  // The underlying figure has changed. Calling this function
  // will alert the Plotly.js component that it must redraw.
  this.figureUpdated = () => {
    plotRevision++;
    if (config.debug) {
      log('hub.figureUpdated', {plotRevision, editorRevision});
    }
    this.onUpdate({plotRevision, editorRevision, graphDiv: this.graphDiv});
  };

  //
  // @method editorSourcesUpdated
  //
  // The plot has rendered or other editor data such as dataSourceOptions
  // has changed. Calling this function will alert the Editor that it must redraw.
  this.editorSourcesUpdated = () => {
    editorRevision++;
    if (config.debug) {
      log('hub.editorSourcesUpdated', {plotRevision, editorRevision});
    }
    this.onUpdate({plotRevision, editorRevision, graphDiv: this.graphDiv});
  };

  //
  // @method handlePlotUpdate
  //
  // Triggers editor UI update when the plot has been modified,
  // whether by a restyle, a redraw, or by some other interaction.
  //
  // @param {object} graphDiv - graph div
  //
  this.handlePlotUpdate = graphDiv => {
    if (config.debug) {
      log('hub.handlePlotUpdate');
    }
    this.graphDiv = graphDiv;
    this.editorSourcesUpdated();
  };

  //
  // @method handlePlotUpdate
  //
  // Triggers editor UI update when the plot has been modified,
  // whether by a restyle, a
  // redraw, or by some other interaction.
  //
  // @param {object} graphDiv - graph div
  //
  this.handlePlotInitialized = graphDiv => {
    if (config.debug) {
      log('hub.handlePlotInitialized');
    }
    this.graphDiv = graphDiv;
    this.editorSourcesUpdated();
  };

  //
  // @method handleEditorUpdate
  //
  this.handleEditorUpdate = ({graphDiv, type, payload}) => {
    if (config.debug) {
      log('hub.handleEditorUpdate', {type, payload});
    }

    this.graphDiv = graphDiv;

    switch (type) {
      case EDITOR_ACTIONS.UPDATE_TRACES:
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
        this.figureUpdated();
        break;

      case EDITOR_ACTIONS.UPDATE_LAYOUT:
        for (const attr in payload.update) {
          const prop = nestedProperty(graphDiv.layout, attr);
          const value = payload.update[attr];
          if (value !== void 0) {
            prop.set(value);
          }
        }
        this.figureUpdated();
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        graphDiv.data.push({x: [], y: []});
        this.figureUpdated();
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          graphDiv.data.splice(payload[0], 1);
          this.figureUpdated();
        }
        break;

      case EDITOR_ACTIONS.DELETE_ANNOTATION:
        if (isNumeric(payload.annotationIndex)) {
          graphDiv.layout.annotations.splice(payload.annotationIndex, 1);
          this.figureUpdated();
        }
        break;

      default:
        throw new Error('must specify an action type to handleEditorUpdate');
    }
  };
}
