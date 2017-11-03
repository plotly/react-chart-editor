import plotly from 'plotly.js';
import PlotlyEditor from '../PlotlyEditor';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({adapter: new Adapter()});

const fixtures = {
  scatter() {
    return {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      graphDiv: setupGraphDiv({
        data: [{type: 'scatter', mode: 'markers', xsrc: 'x1', ysrc: 'y1'}],
        layout: {},
      }),
    };
  },
  pie() {
    return {
      dataSources: {
        x1: [1, 2, 3],
        y1: [2, 3, 4],
      },
      graphDiv: setupGraphDiv({
        data: [
          {type: 'pie', mode: 'markers', labelssrc: 'x1', valuessrc: 'y1'},
        ],
        layout: {},
      }),
    };
  },
};

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
