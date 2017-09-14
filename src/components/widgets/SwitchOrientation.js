import React, { PropTypes } from "react";
import { contains } from "ramda";

import RadioItems from "./RadioItems";
import connectWorkspacePlot from "@workspace/utils/connectWorkspacePlot";
import { WorkspacePlot } from "@workspace/utils/Plot";
import { relayout, restyle } from "@workspace/actions/workspace";

/*
 * Style Control for switching the vertical or horizontal orientation
 * of traces in subplots.
 *
 * The Plotly 2 interpretation of orientation is a lil
 * more involved than just the plotly.js per-trace
 * `orientation` key.
 * - We switch the orientation of *all* of the traces that
 *   are in the same subplot rather than just the single
 *   trace.
 * - We switch the types of the axes that the trace belongs
 *   to.
 *
 * Another confusing case happens when there are multiple sets of
 * shared axes like in this example: https://plot.ly/~chris/17707/
 * This is pretty rare and so for now we'll rely on
 * plotly.js's sensible behaviour (plots the numerical and
 * categorical data together on one axis) and let the user
 * add new axes if they wish to.
 *
 */

const OPTIONS = [
  { label: "Vertical", value: "v" },
  { label: "Horizontal", value: "h" },
];

/*
 * Compute the restyle and relayout commands necessary to switch
 * the orientation of a trace
 */
function switchOrientationCommands(traceIndex, orientation) {
  const targetTracePath = ["_fullData", traceIndex];
  const targetXaxisIdPath = [...targetTracePath, "xaxis"];
  const targetYaxisIdPath = [...targetTracePath, "yaxis"];
  const targetXaxisId = WorkspacePlot.path(targetXaxisIdPath);
  const targetYaxisId = WorkspacePlot.path(targetYaxisIdPath);

  const finder = trace => {
    return (
      (trace.xaxis === targetXaxisId || trace.yaxis === targetYaxisId) &&
      contains(trace.type, ["bar", "histogram", "box"])
    );
  };
  const traceIndicesWithSharedAxes = WorkspacePlot.findIndicesAtPath(finder, [
    "_fullData",
  ]);

  // Swap the orientation of all of the traces in that subplot
  const restyleArray = traceIndicesWithSharedAxes.map(i => ({
    data: { orientation },
    target: i,
  }));

  // Swap axis types
  const relayoutObject = traceIndicesWithSharedAxes.reduce(
    (r, thisTraceIndex) => {
      const tracePath = ["_fullData", thisTraceIndex];

      // e.g. x, x2 AND e.g. y, y2
      const xaxisId = WorkspacePlot.path([...tracePath, "xaxis"]);
      const yaxisId = WorkspacePlot.path([...tracePath, "yaxis"]);

      const xaxisKey = `xaxis${xaxisId.slice(1)}`;
      const yaxisKey = `yaxis${yaxisId.slice(1)}`;
      const xaxisTypePath = ["_fullLayout", xaxisKey, "type"];
      const yaxisTypePath = ["_fullLayout", yaxisKey, "type"];

      // Note that we switch x/y here.
      r[`${xaxisKey}.type`] = WorkspacePlot.path(yaxisTypePath);
      r[`${yaxisKey}.type`] = WorkspacePlot.path(xaxisTypePath);

      return r;
    },
    {}
  );

  return { restyleArray, relayoutObject };
}

const SwitchOrientation = ({
  activeOption,
  className,
  dispatch,
  traceIndex,
}) => {
  const onOptionChange = orientation => {
    const commands = switchOrientationCommands(traceIndex, orientation);
    const { restyleArray, relayoutObject } = commands;
    dispatch(restyle(restyleArray));
    dispatch(relayout(relayoutObject));
  };

  return (
    <RadioItems
      onOptionChange={onOptionChange}
      options={OPTIONS}
      activeOption={activeOption}
      stylingClass={className}
    />
  );
};

SwitchOrientation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeOption: PropTypes.string.isRequired,
  traceIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export { switchOrientationCommands };

export default connectWorkspacePlot(null, true)(SwitchOrientation);
