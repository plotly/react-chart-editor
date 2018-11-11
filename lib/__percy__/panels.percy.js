'use strict';

var _testUtils = require('../lib/test-utils');

var _components = require('../components');

var _percy = require('../../dev/percy');

var mocks = _interopRequireWildcard(_percy);

var _default_panels = require('../default_panels/');

var panels = _interopRequireWildcard(_default_panels);

require('../../dev/styles.css');

require('../styles/main.scss');

require('./percy.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * To add more Percy tests - add a mock file to /dev/percy, add it to /dev/percy/index.js
 * To specify which panels to test with the mock, add entry to panelsToTest, else all panels will be tested
 */
var panelsToTest = {
  bar: ['GraphCreatePanel', 'StyleTracesPanel'],
  box: ['GraphCreatePanel', 'StyleTracesPanel'],
  pie: ['GraphCreatePanel', 'StyleTracesPanel'],
  histogram: ['GraphCreatePanel', 'StyleTracesPanel'],
  histogram2d: ['GraphCreatePanel', 'StyleTracesPanel'],
  violin: ['GraphCreatePanel', 'StyleTracesPanel']
};

window.URL.createObjectURL = function () {
  return null;
};

var panelFixture = function panelFixture(Panel, group, name, figure) {
  var gd = (0, _testUtils.setupGraphDiv)(figure);
  gd._context = _testUtils.plotly.setPlotConfig();
  gd._context.setBackground = function () {
    return null;
  };

  return React.createElement(
    'div',
    { className: 'plotly_editor' },
    React.createElement(
      _testUtils.TestEditor,
      {
        plotly: _testUtils.plotly,
        graphDiv: gd,
        dataSources: _testUtils.fixtures.scatter().dataSources,
        dataSourceOptions: _testUtils.fixtures.scatter().dataSourceOptions
      },
      React.createElement(
        _components.PanelMenuWrapper,
        null,
        React.createElement(Panel, { group: group, name: name })
      )
    )
  );
};

var snapshotWidth = 500;

Object.keys(mocks).forEach(function (m) {
  var selectedPanels = panelsToTest[m] ? panelsToTest[m] : Object.keys(panels);

  selectedPanels.forEach(function (p) {
    var words = p.split(/(?=[A-Z])/);
    var panelGroup = words[0];
    var panelName = words.slice(1, -1).join(' ');

    percySnapshot(m + '_' + p, { widths: [snapshotWidth] }, function () {
      return panelFixture(panels[p], panelGroup, panelName, mocks[m]);
    });
  });
});
//# sourceMappingURL=panels.percy.js.map