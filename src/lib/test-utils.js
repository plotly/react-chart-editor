import plotly from 'plotly.js/dist/plotly';
import {extendDeep} from 'plotly.js/src/lib/extend';
import EditorControls from '../EditorControls';
import {configure, mount, shallow} from 'enzyme';
import {dereference} from '../lib';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

/* eslint-disable no-magic-numbers */

const fixtures = {
  scatter(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
        y2: [20, 30, 40],
      },
      dataSourceOptions: [
        {label: 'xCol', value: 'x1'},
        {label: 'yCol', value: 'y1'},
        {label: 'yCol2', value: 'y2'},
      ],
      graphDiv: {
        data: [
          {
            xsrc: 'x1',
            ysrc: 'y1',
            name: 'yaxis data',
            type: 'scatter',
          },
          {
            xsrc: 'x1',
            ysrc: 'y2',
            name: 'yaxis2 data',
            yaxis: 'y2',
            type: 'scatter',
          },
        ],
        layout: {
          title: 'Double Y Axis Example',
          yaxis: {},
          yaxis2: {
            title: 'yaxis2 title',
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right',
          },
        },
      },
    });
  },

  area(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      dataSourceOptions: [{label: 'xCol', value: 'x1'}, {label: 'yCol', value: 'y1'}],
      graphDiv: {
        data: [
          {
            type: 'scatter',
            mode: 'markers+lines',
            stackgroup: 1,
            xsrc: 'x1',
            ysrc: 'y1',
          },
        ],
        layout: {},
      },
    });
  },

  pie(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      dataSourceOptions: [{label: 'xCol', value: 'x1'}, {label: 'yCol', value: 'y1'}],
      graphDiv: {
        data: [{type: 'pie', mode: 'markers', labelssrc: 'x1', valuessrc: 'y1'}],
        layout: {},
      },
    });
  },
};

function applyConfig(config = {}, {graphDiv: {data, layout}, dataSourceOptions, dataSources}) {
  if (config.layout) {
    extendDeep(layout, config.layout);
  }
  if (config.data) {
    extendDeep(data, config.data);
  }
  if (config.deref !== false) {
    dereference(data, dataSources);
  }

  // replace simple graphDiv with properly mocked GD including fullData/fullLayout
  const graphDiv = setupGraphDiv({data, layout});

  return {dataSources, dataSourceOptions, graphDiv};
}

/*
 * JSDOM does not implement full SVG spec. Mock out necessary methods here.
 * https://github.com/tmpvar/jsdom/issues/1330
 * Hardcoded return values have been "good enough" for now but feel free to
 * extend the API if necessary.
 */
function mockMissingSvgApis() {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const proto = Object.getPrototypeOf(p);
  if (typeof proto.getTotalLength !== 'function') {
    proto.getTotalLength = () => 100;
  }
  if (typeof proto.getPointAtLength !== 'function') {
    proto.getPointAtLength = () => ({x: 0, y: 0});
  }
}

function newGraphDiv() {
  const graphDiv = window.document.createElement('div');
  graphDiv.id = 'graphDiv';

  return graphDiv;
}

function setupGraphDiv(figure) {
  const gd = newGraphDiv();

  mockMissingSvgApis();

  plotly.newPlot(gd, figure);
  return gd;
}

export {fixtures, plotly, EditorControls as TestEditor, mount, shallow, setupGraphDiv};
