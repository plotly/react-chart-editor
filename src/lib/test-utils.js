import plotly from 'plotly.js';
import {extendDeep} from 'plotly.js/src/lib/extend';
import PlotlyEditor from '../PlotlyEditor';
import {configure, mount, shallow} from 'enzyme';
import {dereference} from '../lib';
import Adapter from 'enzyme-adapter-react-15';

configure({adapter: new Adapter()});

/* eslint-disable no-magic-numbers */
const fixtures = {
  scatter(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      graphDiv: {
        data: [{type: 'scatter', mode: 'markers', xsrc: 'x1', ysrc: 'y1'}],
        layout: {},
      },
    });
  },

  area(config) {
    return applyConfig(config, {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      graphDiv: {
        data: [
          {
            type: 'scatter',
            mode: 'markers+lines',
            fill: 'tozeroy',
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
      graphDiv: {
        data: [
          {type: 'pie', mode: 'markers', labelssrc: 'x1', valuessrc: 'y1'},
        ],
        layout: {},
      },
    });
  },
};

function applyConfig(config = {}, {graphDiv: {data, layout}, dataSources}) {
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

  return {dataSources, graphDiv};
}

function newGraphDiv() {
  const graphDiv = window.document.createElement('div');
  graphDiv.id = 'graphDiv';
  return graphDiv;
}

function setupGraphDiv(figure) {
  const gd = newGraphDiv();
  plotly.plot(gd, figure);
  return gd;
}

export {fixtures, plotly, PlotlyEditor as TestEditor, mount, shallow};
