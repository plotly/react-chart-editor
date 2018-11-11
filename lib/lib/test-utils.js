'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGraphDiv = exports.shallow = exports.mount = exports.TestEditor = exports.plotly = exports.fixtures = undefined;

var _plotlyCartesian = require('plotly.js/dist/plotly-cartesian');

var _plotlyCartesian2 = _interopRequireDefault(_plotlyCartesian);

var _extend = require('plotly.js/src/lib/extend');

var _EditorControls = require('../EditorControls');

var _EditorControls2 = _interopRequireDefault(_EditorControls);

var _enzyme = require('enzyme');

var _lib = require('../lib');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

/* eslint-disable no-magic-numbers */

var fixtures = {
  scatter: function scatter(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
        y2: [20, 30, 40]
      },
      dataSourceOptions: [{ label: 'xCol', value: 'x1' }, { label: 'yCol', value: 'y1' }, { label: 'yCol2', value: 'y2' }],
      graphDiv: {
        data: [{
          xsrc: 'x1',
          ysrc: 'y1',
          name: 'yaxis data',
          type: 'scatter'
        }, {
          xsrc: 'x1',
          ysrc: 'y2',
          name: 'yaxis2 data',
          yaxis: 'y2',
          type: 'scatter'
        }],
        layout: {
          title: 'Double Y Axis Example',
          yaxis: {},
          yaxis2: {
            title: 'yaxis2 title',
            titlefont: { color: 'rgb(148, 103, 189)' },
            tickfont: { color: 'rgb(148, 103, 189)' },
            overlaying: 'y',
            side: 'right'
          }
        }
      }
    });
  },
  area: function area(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4]
      },
      dataSourceOptions: [{ label: 'xCol', value: 'x1' }, { label: 'yCol', value: 'y1' }],
      graphDiv: {
        data: [{
          type: 'scatter',
          mode: 'markers+lines',
          stackgroup: 1,
          xsrc: 'x1',
          ysrc: 'y1'
        }],
        layout: {}
      }
    });
  },
  pie: function pie(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4]
      },
      dataSourceOptions: [{ label: 'xCol', value: 'x1' }, { label: 'yCol', value: 'y1' }],
      graphDiv: {
        data: [{ type: 'pie', mode: 'markers', labelssrc: 'x1', valuessrc: 'y1' }],
        layout: {}
      }
    });
  }
};

function applyConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var _ref$graphDiv = _ref.graphDiv,
      data = _ref$graphDiv.data,
      layout = _ref$graphDiv.layout,
      dataSourceOptions = _ref.dataSourceOptions,
      dataSources = _ref.dataSources;

  if (config.layout) {
    (0, _extend.extendDeep)(layout, config.layout);
  }
  if (config.data) {
    (0, _extend.extendDeep)(data, config.data);
  }
  if (config.deref !== false) {
    (0, _lib.dereference)(data, dataSources);
  }

  // replace simple graphDiv with properly mocked GD including fullData/fullLayout
  var graphDiv = setupGraphDiv({ data: data, layout: layout });

  return { dataSources: dataSources, dataSourceOptions: dataSourceOptions, graphDiv: graphDiv };
}

/*
 * JSDOM does not implement full SVG spec. Mock out necessary methods here.
 * https://github.com/tmpvar/jsdom/issues/1330
 * Hardcoded return values have been "good enough" for now but feel free to
 * extend the API if necessary.
 */
function mockMissingSvgApis() {
  var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var proto = Object.getPrototypeOf(p);
  if (typeof proto.getTotalLength !== 'function') {
    proto.getTotalLength = function () {
      return 100;
    };
  }
  if (typeof proto.getPointAtLength !== 'function') {
    proto.getPointAtLength = function () {
      return { x: 0, y: 0 };
    };
  }
}

function newGraphDiv() {
  var graphDiv = window.document.createElement('div');
  graphDiv.id = 'graphDiv';

  return graphDiv;
}

function setupGraphDiv(figure) {
  var gd = newGraphDiv();

  mockMissingSvgApis();

  _plotlyCartesian2.default.newPlot(gd, figure);
  return gd;
}

exports.fixtures = fixtures;
exports.plotly = _plotlyCartesian2.default;
exports.TestEditor = _EditorControls2.default;
exports.mount = _enzyme.mount;
exports.shallow = _enzyme.shallow;
exports.setupGraphDiv = setupGraphDiv;
//# sourceMappingURL=test-utils.js.map