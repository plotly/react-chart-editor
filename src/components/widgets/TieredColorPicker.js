import React from "react";
import PropTypes from "prop-types";
import Fields from "react-color/lib/components/sketch/SketchFields";
import PresetColors from "react-color/lib/components/sketch/SketchPresetColors";
import {
  Alpha,
  Hue,
  Saturation,
  Checkboard,
} from "react-color/lib/components/common";
import { CustomPicker } from "react-color";
import { _ } from "../../common";

// Plotly JS default colors.
export const defaultColors = [
  "#444444",
  "#ffffff",
  "#1f77b4", // muted blue
  "#ff7f0e", // safety orange
  "#2ca02c", // cooked asparagus green
  "#d62728", // brick red
  "#9467bd", // muted purple
  "#8c564b", // chestnut brown
  "#e377c2", // raspberry yogurt pink
  "#7f7f7f", // middle gray
  "#bcbd22", // curry yellow-green
  "#17becf", // blue-teal
];

function TieredColorPicker(props) {
  const { rgb, onChangeComplete } = props;
  const { r, g, b, a } = rgb;

  const activeColor = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
  };

  return (
    <div>
      <div>
        <p className="color-picker-title">{_("Custom colors")}</p>
        <div className="color-picker-saturation">
          <Saturation {...props} />
        </div>
        <div className="color-picker-controls +flex">
          <div className="color-picker-sliders">
            <div className="color-picker-slider">
              <Hue {...props} />
            </div>
            <div className="color-picker-slider">
              <Alpha {...props} />
            </div>
          </div>
          <div className="color-picker-active">
            <Checkboard />
            <div style={activeColor} className="color-picker-active-swatch" />
          </div>
        </div>
        <div className="color-picker-custom-input">
          <Fields {...props} onChange={onChangeComplete} />
        </div>
      </div>
      <div>
        <p className="color-picker-title">{_("Default colors")}</p>
        <div className="color-picker-preset-colors js-color-picker-preset-colors">
          <PresetColors colors={defaultColors} onClick={onChangeComplete} />
        </div>
      </div>
    </div>
  );
}

TieredColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  onChangeComplete: PropTypes.func.isRequired,
};

export default CustomPicker(TieredColorPicker);
