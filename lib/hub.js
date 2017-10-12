"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //import { findAttrs } from "./lib";


exports.default = PlotlyHub;

var _nested_property = require("plotly.js/src/lib/nested_property");

var _nested_property2 = _interopRequireDefault(_nested_property);

var _extend = require("plotly.js/src/lib/extend");

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SRC_ATTR_PATTERN = /src$/;

function findAttrs(obj, pattern) {
  var newAttrs = void 0;
  var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
  var attrs = [];
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (!Array.isArray(obj[i]) && _typeof(obj[i]) !== "object") {
        return null;
      }
      if (!!(newAttrs = findAttrs(obj[i]))) {
        for (var j = 0; j < newAttrs.length; j++) {
          if (!pattern || pattern.test(newAttrs[j])) {
            attrs.push("[" + i + "]." + newAttrs[j]);
          }
        }
      }
    }
  } else if (type === "object" || type === "function") {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!!(newAttrs = findAttrs(obj[key]))) {
          for (var _j = 0; _j < newAttrs.length; _j++) {
            if (!pattern || pattern.test(newAttrs[_j])) {
              attrs.push(key + (Array.isArray(obj[key]) ? "" : ".") + newAttrs[_j]);
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

function PlotlyHub(config) {
  var _this = this;

  config = config || {};
  this.dataSources = config.dataSources || {};
  this.setState = config.setState;
  this.revision = config.revision || 0;
  var editorRevision = 0;

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
  this.setDataSources = function (data) {
    if (config.debug) console.log("set data sources");
    // Explicitly clear out and transfer object properties in order to sanitize
    // the input, at least up to its type, which plotly.js will handle sanitizing.
    _this.dataSources = {};
    var refs = Object.keys(data || {});
    for (var i = 0; i < refs.length; i++) {
      if (!data.hasOwnProperty(refs[i])) continue;
      _this.dataSources[refs[i]] = data[refs[i]];
    }

    _this.refresh();

    return _this.dataSources;
  };

  //
  // @method refresh
  //
  this.refresh = function () {
    _this.setState({
      revision: ++_this.revision
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
  this.dereference = function (data) {
    if (config.debug) console.log("dereferencing", data);
    if (!data) return;
    for (var j = 0; j < data.length; j++) {
      //data[j] = extend.extendDeepNoArrays({}, data[j]);
      var srcAttrs = findAttrs(data[j], SRC_ATTR_PATTERN) || [];
      for (var i = 0; i < srcAttrs.length; i++) {
        var srcAttr = srcAttrs[i];
        var unsrcd = srcAttr.replace(SRC_ATTR_PATTERN, "");
        var srcStr = (0, _nested_property2.default)(data[j], srcAttr);
        var dst = (0, _nested_property2.default)(data[j], unsrcd);

        var src = _this.dataSources[srcStr.get()];

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
  this.handlePlotUpdate = function (gd) {
    if (config.debug) console.log("handle plot update");
    _this.graphDiv = gd;

    _this.setState({ __editorRevision: ++editorRevision });
  };

  //
  // @method handlePlotUpdate
  //
  // Triggers editor UI update when the plot has been modified, whether by a restyle, a
  // redraw, or by some other interaction.
  //
  // @param {object} gd - graph div
  //
  this.handlePlotInitialized = function (gd) {
    if (config.debug) console.log("plot was initialized");
    _this.graphDiv = gd;

    _this.setState({
      gd: gd
    });
  };

  //
  // @method handleEditorUpdate
  //
  this.handleEditorUpdate = function (gd, update, traces) {
    console.log('gd, update, traces:', gd, update, traces);
    if (config.debug) console.log("editor triggered an update");

    Plotly.restyle(gd, update, traces);

    //this.refresh();
  };
}
module.exports = exports["default"];
//# sourceMappingURL=hub.js.map