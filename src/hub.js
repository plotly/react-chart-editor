//import { findAttrs } from "./lib";
import nestedProperty from "plotly.js/src/lib/nested_property";
import extend from "plotly.js/src/lib/extend";

const SRC_ATTR_PATTERN = /src$/;

function findAttrs(obj, pattern) {
  let newAttrs;
  let type = typeof obj;
  let attrs = [];
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (!Array.isArray(obj[i]) && typeof obj[i] !== "object") {
        return null;
      }
      if (!!(newAttrs = findAttrs(obj[i]))) {
        for (let j = 0; j < newAttrs.length; j++) {
          if (!pattern || pattern.test(newAttrs[j])) {
            attrs.push("[" + i + "]." + newAttrs[j]);
          }
        }
      }
    }
  } else if (type === "object" || type === "function") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!!(newAttrs = findAttrs(obj[key]))) {
          for (let j = 0; j < newAttrs.length; j++) {
            if (!pattern || pattern.test(newAttrs[j])) {
              attrs.push(
                key + (Array.isArray(obj[key]) ? "" : ".") + newAttrs[j]
              );
            }
          }
        } else {
          if (!pattern || pattern.test(key)) {
            attrs.push(key);
          }
        }
      }
    }
  }

  return attrs.length ? attrs : null;
}

export default function PlotlyHub(config) {
  config = config || {};
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
    if (config.debug) console.log("set data sources");
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
    if (config.debug) console.log("dereferencing", data);
    if (!data) return;
    for (let j = 0; j < data.length; j++) {
      //data[j] = extend.extendDeepNoArrays({}, data[j]);
      let srcAttrs = findAttrs(data[j], SRC_ATTR_PATTERN) || [];
      for (let i = 0; i < srcAttrs.length; i++) {
        let srcAttr = srcAttrs[i];
        let unsrcd = srcAttr.replace(SRC_ATTR_PATTERN, "");
        let srcStr = nestedProperty(data[j], srcAttr);
        let dst = nestedProperty(data[j], unsrcd);

        let src = this.dataSources[srcStr.get()];

        dst.set(src);
      }
    }
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
    if (config.debug) console.log("handle plot update");
    this.graphDiv = gd;

    this.setState({ __editorRevision: ++editorRevision });
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
    if (config.debug) console.log("plot was initialized");
    this.graphDiv = gd;

    this.setState({
      gd: gd,
    });
  };

  //
  // @method handleEditorUpdate
  //
  this.handleEditorUpdate = (gd, update, traces) => {
    if (config.debug) console.log("editor triggered an update");

    Plotly.restyle(gd, update, traces);

    //this.refresh();
  };
}
