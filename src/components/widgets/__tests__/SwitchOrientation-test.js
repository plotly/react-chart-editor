import R from "ramda";
import { mockFullFigure } from "@workspace/__mocks__/figure";
import { mockPlotDiv } from "@workspace/__mocks__/plotDiv";

const barTrace = () => ({ type: "bar", x: ["A", "B", "C"], y: [3, 1, 6] });

const testCases = [
  {
    name: "simple bar charts",
    input: {
      data: [barTrace()],
      orientation: "h",
      traceIndex: 0,
    },
    output: {
      restyleArray: [{ data: { orientation: "h" }, target: 0 }],
      relayoutObject: {
        "yaxis.type": "category",
        "xaxis.type": "linear",
      },
    },
  },

  {
    name: "multiple bar traces",
    input: {
      data: [barTrace(), barTrace()],
      orientation: "h",
      traceIndex: 0,
    },
    output: {
      restyleArray: [
        { data: { orientation: "h" }, target: 0 },
        { data: { orientation: "h" }, target: 1 },
      ],
      relayoutObject: {
        "yaxis.type": "category",
        "xaxis.type": "linear",
      },
    },
  },

  {
    name: "multiple bar traces in stacked subplots",
    input: {
      data: [barTrace(), R.merge(barTrace(), { xaxis: "x2", yaxis: "y2" })],
      layout: {
        xaxis2: { anchor: "y2" },
        yaxis2: { domain: [0.5, 1] },
      },
      orientation: "h",
      traceIndex: 1,
    },
    output: {
      restyleArray: [{ data: { orientation: "h" }, target: 1 }],
      relayoutObject: {
        "yaxis2.type": "category",
        "xaxis2.type": "linear",
      },
    },
  },

  {
    name: "multiple bar traces with shared axis",
    input: {
      data: [barTrace(), R.merge(barTrace(), { yaxis: "y2" })],
      layout: {
        xaxis2: { anchor: "y2" },
        yaxis2: { domain: [0.5, 1] },
      },
      orientation: "h",
      traceIndex: 0,
    },
    output: {
      restyleArray: [
        { data: { orientation: "h" }, target: 0 },
        { data: { orientation: "h" }, target: 1 },
      ],
      relayoutObject: {
        "yaxis.type": "category",
        "xaxis.type": "linear",
        "yaxis2.type": "category",
      },
    },
  },

  {
    name: "mixed scatter and bar",
    input: {
      data: [barTrace(), R.merge(barTrace(), { type: "scatter" })],
      orientation: "h",
      traceIndex: 0,
    },
    output: {
      restyleArray: [{ data: { orientation: "h" }, target: 0 }],
      relayoutObject: {
        "xaxis.type": "linear",
        "yaxis.type": "category",
      },
    },
  },
];

describe("SwitchOrientation", () => {
  let plotDiv;
  let switchOrientationCommands;

  beforeEach(() => {
    const module = require("@workspace/components/widgets/SwitchOrientation");
    switchOrientationCommands = module.switchOrientationCommands;

    // Environment will look here because it's mocked.

    // styleUtils look at `_full*` attrs.
    const _fullData = [
      { type: "scatter", visible: true, marker: { color: "blue" } },
      { type: "scatter", visible: true, marker: { color: "orange" } },
    ];
    const _fullLayout = {
      showlegend: false,
      xaxis: { title: "x axis title" },
      annotations: [{ showarrow: false }],
    };

    // Provide the global WorkspacePlot with enough info for these utils.
    const WorkspacePlot = require("@workspace/utils/Plot").WorkspacePlot;
    plotDiv = mockPlotDiv({ _fullData, _fullLayout });
    WorkspacePlot.__plotDiv = plotDiv;
  });

  testCases.forEach(testCase => {
    it(`Generates the right restyle and relayout commands for ${testCase.name}`, () => {
      const figure = mockFullFigure(
        testCase.input.data,
        testCase.input.layout || {}
      );
      plotDiv._fullLayout = figure.get("layout").toJS();
      plotDiv._fullData = figure.get("data").toJS();

      const { restyleArray, relayoutObject } = switchOrientationCommands(
        testCase.input.traceIndex,
        testCase.input.orientation
      );
      expect(restyleArray).toEqual(testCase.output.restyleArray);
      expect(relayoutObject).toEqual(testCase.output.relayoutObject);
    });
  });
});
