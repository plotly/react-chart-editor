import COLOR_SCALES from "@workspace/constants/color";
import Environment from "@common/utils/environment";
import PropTypes from "prop-types";
import React, { Component } from "react";

const HEIGHT = 90;
const WIDTH = 18;
const STANDARD_COLORSCALE_LENGTH = COLOR_SCALES[0].length;

export default class ColorPaletteSelector extends Component {
  constructor(props) {
    super(props);

    let colorscales;
    if (this.props.interpolated) {
      colorscales = COLOR_SCALES;
    } else {
      // pull the color out of the colorscales
      colorscales = COLOR_SCALES.map(colorscale =>
        colorscale.map(colorpair => colorpair[1])
      );
    }

    this.state = { colorscales };
  }

  /*
     * if the supplied colorscale isn't in our state, add it to the front
     */
  addColorScale(newColorScale) {
    if (!newColorScale || newColorScale.length === 0) {
      return;
    } else if (!Array.isArray(newColorScale)) {
      const Plotly = Environment.plotly;
      newColorScale = Plotly.Colorscale.scales[newColorScale];
    }

    const colorscales = this.state.colorscales;

    for (let i = 0; i < colorscales.length; i++) {
      const colorscale = colorscales[i];
      if (colorscale.length === newColorScale.length) {
        for (let j = 0; j < colorscale.length; j++) {
          if (
            this.props.interpolated &&
            colorscale[j][0] === newColorScale[j][0] &&
            colorscale[j][1] === newColorScale[j][1]
          ) {
            // newColorScale is in our list of colorscales
            return;
          } else if (
            !this.props.interpolated &&
            colorscale[j] === newColorScale[j]
          ) {
            return;
          }
        }
      } else {
        /*
                 * It could happen that our new colorscale is actually a trimmed down or
                 * expanded version of a current color scale. This is especially true
                 * now that we have grouped styled traces. We don't want to add a new
                 * colorscale in those cases.
                 */
        let firstColorsMatch = colorscale[0][1] === newColorScale[0][1];

        if (!this.props.interpolated) {
          firstColorsMatch = colorscale[0] === newColorScale[0];
        }

        if (firstColorsMatch) {
          return;
        }
      }
    }

    // newColorScale is not in our list of colorscales, so add it
    colorscales.unshift(newColorScale);
    this.setState({ colorscales });
  }

  componentWillMount() {
    this.addColorScale(this.props.colorscale);
  }

  componentWillReceiveProps(nextProps) {
    this.addColorScale(nextProps.colorscale);
  }

  _renderColorScale(newColorscale, key) {
    /*
         * The colorpalette control can also be used to color multiple traces
         * based on one colorscale. Our colorscale has to have at least as many
         * colors as there are user traces.
         */
    const Plotly = Environment.plotly;
    let colorscaleLength = newColorscale.length;

    const {
      isGrouped,
      userDataIndex,
      isPie,
      colorscale: currentColorscale,
      interpolated,
    } = this.props;

    if (isGrouped && userDataIndex.length > STANDARD_COLORSCALE_LENGTH) {
      const scaleWithBreakpoints = newColorscale.map((color, index) => [
        index / newColorscale.length,
        color,
      ]);

      const scaleFunc = Plotly.Colorscale.makeColorScaleFunc(
        // scale boundaries: from 0 to 1
        Plotly.Colorscale.extractScale(scaleWithBreakpoints, 0, 1)
      );

      colorscaleLength = userDataIndex.length;

      newColorscale = userDataIndex.map((_, index) =>
        scaleFunc(index / colorscaleLength)
      );
    }

    // Fix pie chart coloring
    if (isPie && currentColorscale.length > STANDARD_COLORSCALE_LENGTH) {
      const scaleWithBreakpoints = newColorscale.map((color, index) => [
        index / newColorscale.length,
        color,
      ]);
      const scaleFunc = Plotly.Colorscale.makeColorScaleFunc(
        // scale boundaries: from 0 to 1
        Plotly.Colorscale.extractScale(scaleWithBreakpoints, 0, 1)
      );

      colorscaleLength = currentColorscale.length;

      newColorscale = currentColorscale.map((_, index) =>
        scaleFunc(index / colorscaleLength)
      );
    }

    const colorblocks = [];

    for (let i = 0; i < colorscaleLength; i++) {
      const color = interpolated ? newColorscale[i][1] : newColorscale[i];

      const colorBlockStyle = {
        height: HEIGHT / colorscaleLength,
        backgroundColor: color,
      };

      colorblocks[i] = (
        <div key={i} style={colorBlockStyle} className="js-color-block" />
      );
    }

    return (
      <div
        key={key}
        className={"color-palette js-color-palette"}
        style={{ width: WIDTH }}
        onClick={() => this.props.onClick(newColorscale)}
      >
        {colorblocks}
      </div>
    );
  }

  render() {
    const colorscales = this.state.colorscales;

    const colorpanels = [];
    for (let i = 0; i < colorscales.length; i++) {
      colorpanels[i] = this._renderColorScale(colorscales[i], i);
    }

    return (
      <div
        className={"color-palette-selector"}
        style={{
          width: WIDTH * colorscales.length,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {colorpanels}
      </div>
    );
  }
}

ColorPaletteSelector.propTypes = {
  colorscale: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,

        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        ),
      ])
    ),
    PropTypes.string,
  ]),
  onClick: PropTypes.func,

  /*
     * if true, colorscales are in the form [[x1, color1], [x2, color2], ...]
     * if false, colorscales are in the form [color1, color2, ...]
     *
     * true is used for charts with colorscales like heatmaps or
     * scatter's  marker.color
     *
     * false is used for mapping colors across traces and
     * pie chart's marker.colors
     */
  interpolated: PropTypes.bool,

  /*
     * specify which trace this control applies to if we're
     * rendering a trace control
     * Can be an array if we're trying to group style traces:
     * https://github.com/plotly/streambed/issues/7973
     */
  userDataIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
    .isRequired,
  isGrouped: PropTypes.bool,
  isPie: PropTypes.bool.isRequired,
};

ColorPaletteSelector.defaultProps = {
  interpolated: true,
};
