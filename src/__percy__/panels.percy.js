import {TestEditor, setupGraphDiv, fixtures, plotly} from 'lib/test-utils';

import {PanelMenuWrapper} from '../components';

import * as mocks from '../../dev/percy';
import * as panels from '../default_panels/';

import '../../dev/styles.css';
import '../styles/main.scss';
import './percy.css';

/**
 * To add more Percy tests - add a mock file to /dev/percy, add it to /dev/percy/index.js
 * To specify which panels to test with the mock, add entry to panelsToTest, else all panels will be tested
 */
const panelsToTest = {
  histogram: ['GraphCreatePanel'],
  histogram2d: ['GraphCreatePanel', 'StyleTracesPanel'],
  violin: ['GraphCreatePanel', 'StyleTracesPanel'],
};

window.URL.createObjectURL = function() {
  return null;
};

const panelFixture = (Panel, group, name, figure) => {
  const gd = setupGraphDiv(figure);
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
      >
        <PanelMenuWrapper>
          <Panel group={group} name={name} />
        </PanelMenuWrapper>
      </TestEditor>
    </div>
  );
};

const snapshotWidth = 500;

Object.keys(mocks).forEach(m => {
  const selectedPanels = panelsToTest[m]
    ? panelsToTest[m]
    : Object.keys(panels);

  selectedPanels.forEach(p => {
    const words = p.split(/(?=[A-Z])/);
    const panelGroup = words[0];
    const panelName = words.slice(1, -1).join(' ');

    percySnapshot(`${m}_${p}`, {widths: [snapshotWidth]}, () =>
      panelFixture(panels[p], panelGroup, panelName, mocks[m])
    );
  });
});
