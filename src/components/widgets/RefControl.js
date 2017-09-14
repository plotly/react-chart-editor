import React, { PropTypes } from "react";
import PropTypes from "prop-types";
import { insert } from "ramda";

import Dropdown from "./Dropdown";
import connectWorkspacePlot from "@workspace/utils/connectWorkspacePlot";
import { splitAttrString } from "@workspace/utils/stylePanel";

const RefControl = ({ options, onChange, placeholder }) => (
  <Dropdown
    options={options}
    onChange={onChange}
    minWidth={"125px"}
    placeholder={placeholder}
  />
);

RefControl.propTypes = {
  Plotly: PropTypes.object.isRequired,
  attr: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

function mapPlotToProps(plot, props) {
  /*
     * splitAttrString returns a list like: ['layout', 'shapes', 0, 'xref'],
     * using the first character, determine which axis to build dropdown for
     */
  const { Plotly, attr, value } = props;
  const axis = splitAttrString(attr)
    .slice(-1)[0]
    .charAt(0);
  const axisBase = `${axis}axis`;

  let axes = [];
  const options = [];

  // Extract and sort axes as they are not always ordered in layout
  // Axes will be an ordered array of axes names, i.e. xaxis, xaxis2, etc.
  const layoutKeys = plot.keysAtPath(["_fullLayout"]);
  for (const layoutKey of layoutKeys) {
    if (layoutKey.startsWith(axisBase)) {
      // Check if there are no digits in axisName, E.g., 'xaxis'.
      const axisIndex = /[\d]+/.test(layoutKey)
        ? parseInt(layoutKey.match(/[\d]+/)[0], 10) - 1
        : 0;
      axes = insert(axisIndex, layoutKey, axes);
    }
  }

  axes.forEach(currentAxis => {
    options.push({
      label: plot.getAxisTitle(currentAxis),
      value: Plotly.Axes.name2id(currentAxis),
    });
  });

  const placeholder = plot.getAxisTitle(Plotly.Axes.id2name(value));

  return { options, placeholder };
}

export default connectWorkspacePlot(mapPlotToProps)(RefControl);
