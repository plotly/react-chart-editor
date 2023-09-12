import React from 'react';
import {TestEditor, setupGraphDiv, fixtures} from 'lib/test-utils';
import plotly from 'plotly.js/dist/plotly';

import {PanelMenuWrapper} from '../components';
import {customConfigTest} from '../../dev/customConfigTest';

import * as mocks from '../../dev/percy';
import * as panels from '../default_panels/';

import '../../dev/styles.css';
import '../styles/main.scss';
import './stories.css';

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

// eslint-disable-next-line react/prop-types
const PanelFixture = ({panel, group, name, figure, customConfig}) => {
  const gd = setupGraphDiv(figure, plotly);
  gd._context = plotly.setPlotConfig();
  gd._context.setBackground = () => null;

  const Panel = panel;

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

const meta = {component: PanelFixture, title: 'Panels'};
export default meta;

const stories = {};

const panelGroups = {};
const panelNames = {};

Object.keys(mocks).forEach((mock) => {
  const selectedPanels = panelsToTest[mock] ? panelsToTest[mock] : Object.keys(panels);

  selectedPanels.forEach((panel) => {
    const words = panel.split(/(?=[A-Z])/);
    const panelGroup = words[0];
    const panelName = words.slice(1, -1).join(' ');

    stories[`${mock}_${panel}`] = {
      render: () => (
        <PanelFixture
          panel={panels[panel]}
          group={panelGroup}
          name={panelName}
          figure={mocks[mock]}
        />
      ),
    };
    stories[`${mock}_${panel}_withCustomConfig`] = {
      render: () => (
        <PanelFixture
          panel={panels[panel]}
          group={panelGroup}
          name={panelName}
          figure={mocks[mock]}
          customConfig={customConfigTest}
        />
      ),
    };

    // This generates the code below (to copy/paste from browser console)
    // console.log(`export const ${mock}_${panel} = {
    //   name: '${mock}_${panel}',
    //   render: () => (<PanelFixture
    //   panel={panels['${panel}']}
    //   group={panelGroups['${mock}_${panel}']}
    //   name={panelNames['${mock}_${panel}']}
    //   figure={mocks['${mock}']}
    //   />)};`);

    // console.log(`export const ${mock}_${panel}_withCustomConfig = {
    //   name: '${mock}_${panel}_withCustomConfig',
    //   render: () => (<PanelFixture
    //   panel={panels['${panel}']}
    //   group={panelGroups['${mock}_${panel}']}
    //   name={panelNames['${mock}_${panel}']}
    //   figure={mocks['${mock}']}
    //   customConfig={customConfigTest}
    //   />)};`);

    panelGroups[`${mock}_${panel}`] = panelGroup;
    panelNames[`${mock}_${panel}`] = panelName;
  });
});

/*
 * https://github.com/storybookjs/storybook/issues/9828
 * Problem: storybook introduced the new format for stories where they now have to be statically analyzeable.
 * So generating the stories as before doesn't work anymore. storiesOf API is still available but deprecated,
 * and somehow I couldn't get it to work after upgrade to V7. The solution of generating all the stories and
 * copy/pasting them from the browser console is ugly.
 * Currently there's an RFC for an API to generate stories dynamically. Once that's implemented sometime after
 * V8, we should switch to that and remove the code below.
 */
/* eslint-disable dot-notation */

export const bar_GraphCreatePanel = {
  name: 'bar_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['bar_GraphCreatePanel']}
      name={panelNames['bar_GraphCreatePanel']}
      figure={mocks['bar']}
    />
  ),
};
export const bar_GraphCreatePanel_withCustomConfig = {
  name: 'bar_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['bar_GraphCreatePanel']}
      name={panelNames['bar_GraphCreatePanel']}
      figure={mocks['bar']}
      customConfig={customConfigTest}
    />
  ),
};
export const bar_StyleTracesPanel = {
  name: 'bar_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['bar_StyleTracesPanel']}
      name={panelNames['bar_StyleTracesPanel']}
      figure={mocks['bar']}
    />
  ),
};
export const bar_StyleTracesPanel_withCustomConfig = {
  name: 'bar_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['bar_StyleTracesPanel']}
      name={panelNames['bar_StyleTracesPanel']}
      figure={mocks['bar']}
      customConfig={customConfigTest}
    />
  ),
};
export const box_GraphCreatePanel = {
  name: 'box_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['box_GraphCreatePanel']}
      name={panelNames['box_GraphCreatePanel']}
      figure={mocks['box']}
    />
  ),
};
export const box_GraphCreatePanel_withCustomConfig = {
  name: 'box_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['box_GraphCreatePanel']}
      name={panelNames['box_GraphCreatePanel']}
      figure={mocks['box']}
      customConfig={customConfigTest}
    />
  ),
};
export const box_StyleTracesPanel = {
  name: 'box_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['box_StyleTracesPanel']}
      name={panelNames['box_StyleTracesPanel']}
      figure={mocks['box']}
    />
  ),
};
export const box_StyleTracesPanel_withCustomConfig = {
  name: 'box_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['box_StyleTracesPanel']}
      name={panelNames['box_StyleTracesPanel']}
      figure={mocks['box']}
      customConfig={customConfigTest}
    />
  ),
};
export const funnel_GraphCreatePanel = {
  name: 'funnel_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['funnel_GraphCreatePanel']}
      name={panelNames['funnel_GraphCreatePanel']}
      figure={mocks['funnel']}
    />
  ),
};
export const funnel_GraphCreatePanel_withCustomConfig = {
  name: 'funnel_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['funnel_GraphCreatePanel']}
      name={panelNames['funnel_GraphCreatePanel']}
      figure={mocks['funnel']}
      customConfig={customConfigTest}
    />
  ),
};
export const funnel_StyleTracesPanel = {
  name: 'funnel_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['funnel_StyleTracesPanel']}
      name={panelNames['funnel_StyleTracesPanel']}
      figure={mocks['funnel']}
    />
  ),
};
export const funnel_StyleTracesPanel_withCustomConfig = {
  name: 'funnel_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['funnel_StyleTracesPanel']}
      name={panelNames['funnel_StyleTracesPanel']}
      figure={mocks['funnel']}
      customConfig={customConfigTest}
    />
  ),
};
export const funnelarea_GraphCreatePanel = {
  name: 'funnelarea_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['funnelarea_GraphCreatePanel']}
      name={panelNames['funnelarea_GraphCreatePanel']}
      figure={mocks['funnelarea']}
    />
  ),
};
export const funnelarea_GraphCreatePanel_withCustomConfig = {
  name: 'funnelarea_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['funnelarea_GraphCreatePanel']}
      name={panelNames['funnelarea_GraphCreatePanel']}
      figure={mocks['funnelarea']}
      customConfig={customConfigTest}
    />
  ),
};
export const funnelarea_StyleTracesPanel = {
  name: 'funnelarea_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['funnelarea_StyleTracesPanel']}
      name={panelNames['funnelarea_StyleTracesPanel']}
      figure={mocks['funnelarea']}
    />
  ),
};
export const funnelarea_StyleTracesPanel_withCustomConfig = {
  name: 'funnelarea_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['funnelarea_StyleTracesPanel']}
      name={panelNames['funnelarea_StyleTracesPanel']}
      figure={mocks['funnelarea']}
      customConfig={customConfigTest}
    />
  ),
};
export const geoTest_GraphCreatePanel = {
  name: 'geoTest_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['geoTest_GraphCreatePanel']}
      name={panelNames['geoTest_GraphCreatePanel']}
      figure={mocks['geoTest']}
    />
  ),
};
export const geoTest_GraphCreatePanel_withCustomConfig = {
  name: 'geoTest_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['geoTest_GraphCreatePanel']}
      name={panelNames['geoTest_GraphCreatePanel']}
      figure={mocks['geoTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const geoTest_StyleMapsPanel = {
  name: 'geoTest_StyleMapsPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleMapsPanel']}
      group={panelGroups['geoTest_StyleMapsPanel']}
      name={panelNames['geoTest_StyleMapsPanel']}
      figure={mocks['geoTest']}
    />
  ),
};
export const geoTest_StyleMapsPanel_withCustomConfig = {
  name: 'geoTest_StyleMapsPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleMapsPanel']}
      group={panelGroups['geoTest_StyleMapsPanel']}
      name={panelNames['geoTest_StyleMapsPanel']}
      figure={mocks['geoTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const geoTest_StyleTracesPanel = {
  name: 'geoTest_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['geoTest_StyleTracesPanel']}
      name={panelNames['geoTest_StyleTracesPanel']}
      figure={mocks['geoTest']}
    />
  ),
};
export const geoTest_StyleTracesPanel_withCustomConfig = {
  name: 'geoTest_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['geoTest_StyleTracesPanel']}
      name={panelNames['geoTest_StyleTracesPanel']}
      figure={mocks['geoTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const histogram_GraphCreatePanel = {
  name: 'histogram_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['histogram_GraphCreatePanel']}
      name={panelNames['histogram_GraphCreatePanel']}
      figure={mocks['histogram']}
    />
  ),
};
export const histogram_GraphCreatePanel_withCustomConfig = {
  name: 'histogram_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['histogram_GraphCreatePanel']}
      name={panelNames['histogram_GraphCreatePanel']}
      figure={mocks['histogram']}
      customConfig={customConfigTest}
    />
  ),
};
export const histogram_StyleTracesPanel = {
  name: 'histogram_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['histogram_StyleTracesPanel']}
      name={panelNames['histogram_StyleTracesPanel']}
      figure={mocks['histogram']}
    />
  ),
};
export const histogram_StyleTracesPanel_withCustomConfig = {
  name: 'histogram_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['histogram_StyleTracesPanel']}
      name={panelNames['histogram_StyleTracesPanel']}
      figure={mocks['histogram']}
      customConfig={customConfigTest}
    />
  ),
};
export const histogram2d_GraphCreatePanel = {
  name: 'histogram2d_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['histogram2d_GraphCreatePanel']}
      name={panelNames['histogram2d_GraphCreatePanel']}
      figure={mocks['histogram2d']}
    />
  ),
};
export const histogram2d_GraphCreatePanel_withCustomConfig = {
  name: 'histogram2d_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['histogram2d_GraphCreatePanel']}
      name={panelNames['histogram2d_GraphCreatePanel']}
      figure={mocks['histogram2d']}
      customConfig={customConfigTest}
    />
  ),
};
export const histogram2d_StyleTracesPanel = {
  name: 'histogram2d_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['histogram2d_StyleTracesPanel']}
      name={panelNames['histogram2d_StyleTracesPanel']}
      figure={mocks['histogram2d']}
    />
  ),
};
export const histogram2d_StyleTracesPanel_withCustomConfig = {
  name: 'histogram2d_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['histogram2d_StyleTracesPanel']}
      name={panelNames['histogram2d_StyleTracesPanel']}
      figure={mocks['histogram2d']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_GraphCreatePanel = {
  name: 'panelTest_GraphCreatePanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['panelTest_GraphCreatePanel']}
      name={panelNames['panelTest_GraphCreatePanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_GraphCreatePanel_withCustomConfig = {
  name: 'panelTest_GraphCreatePanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphCreatePanel']}
      group={panelGroups['panelTest_GraphCreatePanel']}
      name={panelNames['panelTest_GraphCreatePanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_GraphSubplotsPanel = {
  name: 'panelTest_GraphSubplotsPanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphSubplotsPanel']}
      group={panelGroups['panelTest_GraphSubplotsPanel']}
      name={panelNames['panelTest_GraphSubplotsPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_GraphSubplotsPanel_withCustomConfig = {
  name: 'panelTest_GraphSubplotsPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphSubplotsPanel']}
      group={panelGroups['panelTest_GraphSubplotsPanel']}
      name={panelNames['panelTest_GraphSubplotsPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_GraphTransformsPanel = {
  name: 'panelTest_GraphTransformsPanel',
  render: () => (
    <PanelFixture
      panel={panels['GraphTransformsPanel']}
      group={panelGroups['panelTest_GraphTransformsPanel']}
      name={panelNames['panelTest_GraphTransformsPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_GraphTransformsPanel_withCustomConfig = {
  name: 'panelTest_GraphTransformsPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['GraphTransformsPanel']}
      group={panelGroups['panelTest_GraphTransformsPanel']}
      name={panelNames['panelTest_GraphTransformsPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleAxesPanel = {
  name: 'panelTest_StyleAxesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleAxesPanel']}
      group={panelGroups['panelTest_StyleAxesPanel']}
      name={panelNames['panelTest_StyleAxesPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleAxesPanel_withCustomConfig = {
  name: 'panelTest_StyleAxesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleAxesPanel']}
      group={panelGroups['panelTest_StyleAxesPanel']}
      name={panelNames['panelTest_StyleAxesPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleColorbarsPanel = {
  name: 'panelTest_StyleColorbarsPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleColorbarsPanel']}
      group={panelGroups['panelTest_StyleColorbarsPanel']}
      name={panelNames['panelTest_StyleColorbarsPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleColorbarsPanel_withCustomConfig = {
  name: 'panelTest_StyleColorbarsPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleColorbarsPanel']}
      group={panelGroups['panelTest_StyleColorbarsPanel']}
      name={panelNames['panelTest_StyleColorbarsPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleImagesPanel = {
  name: 'panelTest_StyleImagesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleImagesPanel']}
      group={panelGroups['panelTest_StyleImagesPanel']}
      name={panelNames['panelTest_StyleImagesPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleImagesPanel_withCustomConfig = {
  name: 'panelTest_StyleImagesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleImagesPanel']}
      group={panelGroups['panelTest_StyleImagesPanel']}
      name={panelNames['panelTest_StyleImagesPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleLayoutPanel = {
  name: 'panelTest_StyleLayoutPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleLayoutPanel']}
      group={panelGroups['panelTest_StyleLayoutPanel']}
      name={panelNames['panelTest_StyleLayoutPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleLayoutPanel_withCustomConfig = {
  name: 'panelTest_StyleLayoutPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleLayoutPanel']}
      group={panelGroups['panelTest_StyleLayoutPanel']}
      name={panelNames['panelTest_StyleLayoutPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleLegendPanel = {
  name: 'panelTest_StyleLegendPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleLegendPanel']}
      group={panelGroups['panelTest_StyleLegendPanel']}
      name={panelNames['panelTest_StyleLegendPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleLegendPanel_withCustomConfig = {
  name: 'panelTest_StyleLegendPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleLegendPanel']}
      group={panelGroups['panelTest_StyleLegendPanel']}
      name={panelNames['panelTest_StyleLegendPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleMapsPanel = {
  name: 'panelTest_StyleMapsPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleMapsPanel']}
      group={panelGroups['panelTest_StyleMapsPanel']}
      name={panelNames['panelTest_StyleMapsPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleMapsPanel_withCustomConfig = {
  name: 'panelTest_StyleMapsPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleMapsPanel']}
      group={panelGroups['panelTest_StyleMapsPanel']}
      name={panelNames['panelTest_StyleMapsPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleNotesPanel = {
  name: 'panelTest_StyleNotesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleNotesPanel']}
      group={panelGroups['panelTest_StyleNotesPanel']}
      name={panelNames['panelTest_StyleNotesPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleNotesPanel_withCustomConfig = {
  name: 'panelTest_StyleNotesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleNotesPanel']}
      group={panelGroups['panelTest_StyleNotesPanel']}
      name={panelNames['panelTest_StyleNotesPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleShapesPanel = {
  name: 'panelTest_StyleShapesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleShapesPanel']}
      group={panelGroups['panelTest_StyleShapesPanel']}
      name={panelNames['panelTest_StyleShapesPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleShapesPanel_withCustomConfig = {
  name: 'panelTest_StyleShapesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleShapesPanel']}
      group={panelGroups['panelTest_StyleShapesPanel']}
      name={panelNames['panelTest_StyleShapesPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleSlidersPanel = {
  name: 'panelTest_StyleSlidersPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleSlidersPanel']}
      group={panelGroups['panelTest_StyleSlidersPanel']}
      name={panelNames['panelTest_StyleSlidersPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleSlidersPanel_withCustomConfig = {
  name: 'panelTest_StyleSlidersPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleSlidersPanel']}
      group={panelGroups['panelTest_StyleSlidersPanel']}
      name={panelNames['panelTest_StyleSlidersPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleTracesPanel = {
  name: 'panelTest_StyleTracesPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['panelTest_StyleTracesPanel']}
      name={panelNames['panelTest_StyleTracesPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleTracesPanel_withCustomConfig = {
  name: 'panelTest_StyleTracesPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleTracesPanel']}
      group={panelGroups['panelTest_StyleTracesPanel']}
      name={panelNames['panelTest_StyleTracesPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
export const panelTest_StyleUpdateMenusPanel = {
  name: 'panelTest_StyleUpdateMenusPanel',
  render: () => (
    <PanelFixture
      panel={panels['StyleUpdateMenusPanel']}
      group={panelGroups['panelTest_StyleUpdateMenusPanel']}
      name={panelNames['panelTest_StyleUpdateMenusPanel']}
      figure={mocks['panelTest']}
    />
  ),
};
export const panelTest_StyleUpdateMenusPanel_withCustomConfig = {
  name: 'panelTest_StyleUpdateMenusPanel_withCustomConfig',
  render: () => (
    <PanelFixture
      panel={panels['StyleUpdateMenusPanel']}
      group={panelGroups['panelTest_StyleUpdateMenusPanel']}
      name={panelNames['panelTest_StyleUpdateMenusPanel']}
      figure={mocks['panelTest']}
      customConfig={customConfigTest}
    />
  ),
};
/* eslint-enable dot-notation */
