import {dereference} from './lib';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {EDITOR_ACTIONS} from './constants';

export default function PlotlyHub(config = {}) {
  this.dataSources = config.dataSources || {};
  this.setState = config.setState;
  this.revision = config.revision || 0;
  let editorRevision = 0;

  //
  // @method setDataSources
  //
  // Sets available data references. For example, {foo: [1, 2, 3]} will be substituted
  // into `data` wherever the key `*src: 'foo'` (e.g. for `x` when `{xsrc: 'foo'}`) is
  // found.
  //
  // @param {object} data - object containing key-value pairs to be substituted
  // @returns {object} dataSorces - the sanitized data references
  //
  this.setDataSources = data => {
    if (config.debug) console.log('set data sources');

    // Explicitly clear out and transfer object properties in order to sanitize
    // the input, at least up to its type, which plotly.js will handle sanitizing.
    this.dataSources = {};
    let refs = Object.keys(data || {});
    for (let i = 0; i < refs.length; i++) {
      if (!data.hasOwnProperty(refs[i])) continue;
      this.dataSources[refs[i]] = data[refs[i]];
    }

    this.refresh();

    return this.dataSources;
  };

  //
  // @method refresh
  //
  this.refresh = () => {
    this.setState({
      revision: ++this.revision,
    });
  };

  //
  // @method dereference
  //
  // Applies available data references. For example, {foo: [1, 2, 3]} will be substituted
  // into `data` wherever the key `*src: 'foo'` (e.g. for `x` when `{xsrc: 'foo'}`) is
  // found.
  //
  // @param {object} data - input data
  // @returns {object} output data with substitutions
  //
  this.dereference = data => {
    if (config.debug) console.log('dereferencing', data);
    if (!data) return;

    dereference(data, this.dataSources);

    return data;
  };

  //
  // @method handlePlotUpdate
  //
  // Triggers editor UI update when the plot has been modified, whether by a restyle, a
  // redraw, or by some other interaction.
  //
  // @param {object} gd - graph div
  //
  this.handlePlotUpdate = gd => {
    if (config.debug) console.log('handle plot update');
    this.graphDiv = gd;

    this.setState({__editorRevision: ++editorRevision});
  };

  //
  // @method handlePlotUpdate
  //
  // Triggers editor UI update when the plot has been modified, whether by a restyle, a
  // redraw, or by some other interaction.
  //
  // @param {object} gd - graph div
  //
  this.handlePlotInitialized = gd => {
    if (config.debug) console.log('plot was initialized');
    this.graphDiv = gd;

    this.setState({
      gd: gd,
    });
  };

  //
  // @method handleEditorUpdate
  //
  this.handleEditorUpdate = ({graphDiv, type, payload}) => {
      if (config.debug) console.log(`Editor triggered an event of type ${type}`);

    switch (type) {
      case EDITOR_ACTIONS.UPDATE_TRACES:
        for (let i = 0; i < payload.traceIndexes.length; i++) {
          for (const attr in payload.update) {
            const traceIndex = payload.traceIndexes[i];
            const prop = nestedProperty(graphDiv.data[traceIndex], attr);
            const value = payload.update[attr];
            if (value !== undefined) {
              prop.set(value);
            }
          }
        }
        this.refresh();
        break;

      case EDITOR_ACTIONS.ADD_TRACE:
        graphDiv.data.push({x: [], y: []});
        this.refresh();
        break;

      case EDITOR_ACTIONS.DELETE_TRACE:
        if (payload.traceIndexes && payload.traceIndexes.length) {
          graphDiv.data = graphDiv.data.splice(payload[0], 1);
          this.refresh();
        }
        break;

      default:
        throw new Error('must specify an action type to handleEditorUpdate');
    }
  };
}
