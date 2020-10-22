import {TestEditor, setupGraphDiv, fixtures} from 'lib/test-utils';
import plotly from 'plotly.js/dist/plotly';

import {PanelMenuWrapper} from '../components';

import * as mocks from '../../dev/percy';
import * as panels from '../default_panels/';

import '../../dev/styles.css';
import '../styles/main.scss';
import './stories.css';

import {storiesOf} from '@storybook/react';
export const customConfigTest = {
  visibility_rules: {
    blacklist: [
      {type: 'attrName', regex_match: 'font.family'},
      {type: 'attrName', regex_match: 'font.size'},
      {
        type: 'attrName',
        regex_match: 'color',
        exceptions: [
          {
            type: 'attrName',
            regex_match: 'colorbar',
            exceptions: [
              {type: 'attrName', regex_match: 'colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'colorbar.title.font.color'},
              {type: 'attrName', regex_match: 'colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'colorbar.tickcolor'},
            ],
          },
          {
            type: 'attrName',
            regex_match: 'coloraxis',
            exceptions: [
              {type: 'attrName', regex_match: 'coloraxis.colorscale'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.tickcolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.title.font.color'},
            ],
          },
          {
            type: 'attrName',
            regex_match: 'colorscales',
            exceptions: [
              {
                type: 'attrName',
                regex_match: 'colorscales.items.concentrationscales.colorscale',
              },
            ],
          },
          {type: 'attrName', regex_match: 'autocolorscale'},
          {type: 'attrName', regex_match: 'usecolormap'},
          {type: 'attrName', regex_match: 'bundlecolors'},
          {
            type: 'attrName',
            regex_match: 'marker.color',
            exceptions: [
              {type: 'controlType', regex_match: '^UnconnectedMultiColorPicker$'},
              {type: 'controlType', regex_match: '^UnconnectedColorscalePicker$'},
              {type: 'attrName', regex_match: 'marker.colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.tickcolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'marker.colorbar.title.font.color'},
            ],
          },
        ],
      },
    ],
  },
};

/**
 * To add more Percy tests - add a mock file to /dev/percy, add it to /dev/percy/index.js
 * To specify which panels to test with the mock, add entry to panelsToTest, else all panels will be tested
 */
const panelsToTest = {
  bar: ['GraphCreatePanel', 'StyleTracesPanel'],
  box: ['GraphCreatePanel', 'StyleTracesPanel'],
  pie: ['GraphCreatePanel', 'StyleTracesPanel'],
  histogram: ['GraphCreatePanel', 'StyleTracesPanel'],
  histogram2d: ['GraphCreatePanel', 'StyleTracesPanel'],
  violin: ['GraphCreatePanel', 'StyleTracesPanel'],
  waterfall: ['GraphCreatePanel', 'StyleTracesPanel'],
  sunburst: ['GraphCreatePanel', 'StyleTracesPanel'],
  sankey: ['GraphCreatePanel', 'StyleTracesPanel'],
  geoTest: ['GraphCreatePanel', 'StyleMapsPanel', 'StyleTracesPanel'],
  funnel: ['GraphCreatePanel', 'StyleTracesPanel'],
  funnelarea: ['GraphCreatePanel', 'StyleTracesPanel'],
};

window.URL.createObjectURL = function () {
  return null;
};

const panelFixture = (Panel, group, name, figure, customConfig) => {
  const gd = setupGraphDiv(figure, plotly);
  gd._context = plotly.setPlotConfig();
  gd._context.setBackground = () => {
    return null;
  };

  return (
    <div className="plotly_editor">
      <TestEditor
        plotly={plotly}
        graphDiv={gd}
        dataSources={fixtures.scatter().dataSources}
        dataSourceOptions={fixtures.scatter().dataSourceOptions}
        customConfig={customConfig || {}}
      >
        <PanelMenuWrapper>
          <Panel group={group} name={name} />
        </PanelMenuWrapper>
      </TestEditor>
    </div>
  );
};

let stories = storiesOf('Panels', module);

Object.keys(mocks).forEach((m) => {
  const selectedPanels = panelsToTest[m] ? panelsToTest[m] : Object.keys(panels);

  selectedPanels.forEach((p) => {
    const words = p.split(/(?=[A-Z])/);
    const panelGroup = words[0];
    const panelName = words.slice(1, -1).join(' ');

    stories = stories
      .add(`${m}_${p}`, () => panelFixture(panels[p], panelGroup, panelName, mocks[m]))
      .add(`${m}_${p}_withCustomConfig`, () =>
        panelFixture(panels[p], panelGroup, panelName, mocks[m], customConfigTest)
      );
  });
});
