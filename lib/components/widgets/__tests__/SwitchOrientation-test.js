"use strict";

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _figure = require("@workspace/__mocks__/figure");

var _plotDiv = require("@workspace/__mocks__/plotDiv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var barTrace = function barTrace() {
  return { type: "bar", x: ["A", "B", "C"], y: [3, 1, 6] };
};

var testCases = [{
  name: "simple bar charts",
  input: {
    data: [barTrace()],
    orientation: "h",
    traceIndex: 0
  },
  output: {
    restyleArray: [{ data: { orientation: "h" }, target: 0 }],
    relayoutObject: {
      "yaxis.type": "category",
      "xaxis.type": "linear"
    }
  }
}, {
  name: "multiple bar traces",
  input: {
    data: [barTrace(), barTrace()],
    orientation: "h",
    traceIndex: 0
  },
  output: {
    restyleArray: [{ data: { orientation: "h" }, target: 0 }, { data: { orientation: "h" }, target: 1 }],
    relayoutObject: {
      "yaxis.type": "category",
      "xaxis.type": "linear"
    }
  }
}, {
  name: "multiple bar traces in stacked subplots",
  input: {
    data: [barTrace(), _ramda2.default.merge(barTrace(), { xaxis: "x2", yaxis: "y2" })],
    layout: {
      xaxis2: { anchor: "y2" },
      yaxis2: { domain: [0.5, 1] }
    },
    orientation: "h",
    traceIndex: 1
  },
  output: {
    restyleArray: [{ data: { orientation: "h" }, target: 1 }],
    relayoutObject: {
      "yaxis2.type": "category",
      "xaxis2.type": "linear"
    }
  }
}, {
  name: "multiple bar traces with shared axis",
  input: {
    data: [barTrace(), _ramda2.default.merge(barTrace(), { yaxis: "y2" })],
    layout: {
      xaxis2: { anchor: "y2" },
      yaxis2: { domain: [0.5, 1] }
    },
    orientation: "h",
    traceIndex: 0
  },
  output: {
    restyleArray: [{ data: { orientation: "h" }, target: 0 }, { data: { orientation: "h" }, target: 1 }],
    relayoutObject: {
      "yaxis.type": "category",
      "xaxis.type": "linear",
      "yaxis2.type": "category"
    }
  }
}, {
  name: "mixed scatter and bar",
  input: {
    data: [barTrace(), _ramda2.default.merge(barTrace(), { type: "scatter" })],
    orientation: "h",
    traceIndex: 0
  },
  output: {
    restyleArray: [{ data: { orientation: "h" }, target: 0 }],
    relayoutObject: {
      "xaxis.type": "linear",
      "yaxis.type": "category"
    }
  }
}];

describe("SwitchOrientation", function () {
  var plotDiv = void 0;
  var switchOrientationCommands = void 0;

  beforeEach(function () {
    var module = require("@workspace/components/widgets/SwitchOrientation");
    switchOrientationCommands = module.switchOrientationCommands;

    // Environment will look here because it's mocked.

    // styleUtils look at `_full*` attrs.
    var _fullData = [{ type: "scatter", visible: true, marker: { color: "blue" } }, { type: "scatter", visible: true, marker: { color: "orange" } }];
    var _fullLayout = {
      showlegend: false,
      xaxis: { title: "x axis title" },
      annotations: [{ showarrow: false }]
    };

    // Provide the global WorkspacePlot with enough info for these utils.
    var WorkspacePlot = require("@workspace/utils/Plot").WorkspacePlot;
    plotDiv = (0, _plotDiv.mockPlotDiv)({ _fullData: _fullData, _fullLayout: _fullLayout });
    WorkspacePlot.__plotDiv = plotDiv;
  });

  testCases.forEach(function (testCase) {
    it("Generates the right restyle and relayout commands for " + testCase.name, function () {
      var figure = (0, _figure.mockFullFigure)(testCase.input.data, testCase.input.layout || {});
      plotDiv._fullLayout = figure.get("layout").toJS();
      plotDiv._fullData = figure.get("data").toJS();

      var _switchOrientationCom = switchOrientationCommands(testCase.input.traceIndex, testCase.input.orientation),
          restyleArray = _switchOrientationCom.restyleArray,
          relayoutObject = _switchOrientationCom.relayoutObject;

      expect(restyleArray).toEqual(testCase.output.restyleArray);
      expect(relayoutObject).toEqual(testCase.output.relayoutObject);
    });
  });
});
//# sourceMappingURL=SwitchOrientation-test.js.map