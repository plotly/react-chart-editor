import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./widgets/Dropdown";
import connectWorkspacePlot from "@workspace/utils/connectWorkspacePlot";

/*
 * The Anchor component is a control for specifing the `anchor` axis property
 * in plotly.js: https://plot.ly/javascript/reference/#layout-xaxis-anchor
 */

const Anchor = ({ options, onChange, value }) => (
  <Dropdown
    options={options}
    value={value}
    onChange={onChange}
    minWidth={"110px"}
  />
);

Anchor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  axisLetter: PropTypes.oneOf(["x", "y"]),
};

function mapPlotToProps(plot, props) {
  const { axisLetter } = props;
  const options = plot
    .keysAtPath(["_fullLayout"])
    .filter(key => key.startsWith(`${axisLetter}axis`))
    .map(axisName => ({
      label: axisName,
      value: axisName.replace("axis", ""),
    }));
  options.unshift({ label: "Unanchored", value: "free" });
  return { options };
}

export default connectWorkspacePlot(mapPlotToProps)(Anchor);
