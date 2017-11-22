import {dereference} from './lib';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {EDITOR_ACTIONS} from './constants';

/* eslint-disable no-console */
const log = console.log;
/* eslint-enable no-console */

// Revisions: An optional system to prevent unnecessary rerenders.
// There are two revision counters. One for the react-plotly.js
// component and one for react-plotly.js-editor. They are uncoupled because
// the plot can update the data internally (for example if a user updates the
// title in the plot directly). This should trigger a plotUpdated counter but
// not a dataUpdated counter since in this case the plot has already updated and
// only the editor needs updating. Similarly there is the case where the data
// may update but the Plotly.react component may determine that nothing needs to
// update. In this case the Editor does not need to update.
// If the revisions are not passed to react-plotly.js or react-plotly.js-editor
// they will always update.
export default function PlotlyHub(config = {}) {
  this.dataSources = config.dataSources || {};
  this.onUpdate = config.onUpdate;

  let editorRevision = config.editorRevision || 0;
  let plotRevision = config.plotRevision || 0;

  //
  // @method dataUpdated
  //
  // The underlying figure data has changed. Calling this function
  // will alert the Plotly.js component that it must redraw.
  this.dataUpdated = () => {
    plotRevision++;
    if (config.debug) {
      log('hub.onUpdate', {plotRevision, editorRevision});
    }
    this.onUpdate({plotRevision, editorRevision, graphDiv: this.graphDiv});
  };

  //
  // @method plotUpdated
  //
  // The plot has updated. Calling this function will alert the Editor
  // that it must redraw.
  this.plotUpdated = () => {
    editorRevision++;
    if (config.debug) {
      log('hub.plotUpdated', {plotRevision, editorRevision});
    }
    this.onUpdate({plotRevision, editorRevision, graphDiv: this.graphDiv});
  };

  //
  // @method dereference
  //
  // Applies available data references. For example,
  // {foo: [1, 2, 3]} will be substituted into `data` wherever the key
  // `*src: 'foo'` (e.g. for `x` when `{xsrc: 'foo'}`) is found.
  //
  // @param {object} data - input data
  // @returns {object} output data with substitutions
  //
  this.dereference = data => {
    if (config.debug) {
      log('hub.dereference', data);
    }
    if (!data) {
      return void 0;
    }

    dereference(data, this.dataSources);

    return data;
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
    this.plotUpdated();
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
    this.plotUpdated();
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
        this.dataUpdated();
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        graphDiv.data.push({x: [], y: []});
        this.dataUpdated();
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          graphDiv.data = graphDiv.data.splice(payload[0], 1);
          this.dataUpdated();
        }
        break;

      case EDITOR_ACTIONS.UPDATE_LAYOUT:
        for (const attr in payload.update) {
          const prop = nestedProperty(graphDiv.layout, attr);
          const value = payload.update[attr];
          if (value !== void 0) {
            prop.set(value);
          }
        }
        this.dataUpdated();
        break;

      default:
        throw new Error('must specify an action type to handleEditorUpdate');
    }
  };
}
