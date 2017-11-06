import plotly from 'plotly.js';
import {extendDeep} from 'plotly.js/src/lib/extend';
import PlotlyEditor from '../PlotlyEditor';
import {configure} from 'enzyme';
import {dereference} from '../lib';
import Adapter from 'enzyme-adapter-react-15';

configure({adapter: new Adapter()});

const fixtures = {
  scatter() {
    return {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      graphDiv: {
        data: [{type: 'scatter', mode: 'markers', xsrc: 'x1', ysrc: 'y1'}],
        layout: {},
      },
    };
  },

  pie() {
    return {
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
    };
  },
};

function applyConfig(config = {}, {graphDiv: {data, layout}, dataSources}) {
  if (config.layout) {
    extendDeep(layout, config.layout);
  }
  if (config.data) {
    extendDeep(data, config.data);
  }
  if (config.deref) {
    dereference(data, dataSources);
  }

  // replace simple graphDiv with properly mocked GD including fullData/fullLayout
  const graphDiv = setupGraphDiv({data, layout});

  return {dataSources, graphDiv};
}

Object.keys(fixtures).forEach(k => {
  const fixtureFunc = fixtures[k];
  fixtures[k] = config => applyConfig(config, fixtureFunc());
});

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

export {fixtures, plotly, PlotlyEditor as TestEditor};
