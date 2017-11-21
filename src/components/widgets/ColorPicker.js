import Fields from 'react-color/lib/components/sketch/SketchFields';
import PresetColors from 'react-color/lib/components/sketch/SketchPresetColors';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import {
  Alpha,
  Hue,
  Saturation,
  Checkboard,
} from 'react-color/lib/components/common';
import {CustomPicker as customPicker} from 'react-color';
import {localize} from '../../lib';

/* eslint-disable no-inline-comments */
const defaultColors = [
  '#444444',
  '#ffffff',
  '#1f77b4', // muted blue
  '#ff7f0e', // safety orange
  '#2ca02c', // cooked asparagus green
  '#d62728', // brick red
  '#9467bd', // muted purple
  '#8c564b', // chestnut brown
  '#e377c2', // raspberry yogurt pink
  '#7f7f7f', // middle gray
  '#bcbd22', // curry yellow-green
  '#17becf', // blue-teal
];
/* eslint-enable no-inline-comments */

// Utility functions for converting ColorPicker color objects or raw strings
// into TinyColor objects.
const extractRGB = c => c.rgb || c;
const getColorSource = c => (c.source === 'hex' ? c.hex : extractRGB(c));
const toTinyColor = c => tinycolor(getColorSource(c));

const CustomColorPicker = localize(
  customPicker(function(props) {
    const {rgb, onChangeComplete} = props;
    const {r, g, b, a} = rgb;

    const activeColor = {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
    };

    const _ = props.localize;

    return (
      <div>
        <div>
          <p className="colorpicker__title">{_('Custom colors')}</p>
          <div className="colorpicker__saturation">
            <Saturation {...props} />
          </div>
          <div className="colorpicker__controls +flex">
            <div className="colorpicker__sliders">
              <div className="colorpicker__slider">
                <Hue {...props} />
              </div>
              <div className="colorpicker__slider">
                <Alpha {...props} />
              </div>
            </div>
            <div className="colorpicker__active">
              <Checkboard />
              <div style={activeColor} className="colorpicker__active-swatch" />
            </div>
          </div>
          <div className="colorpicker__custom-input">
            <Fields {...props} onChange={onChangeComplete} />
          </div>
        </div>
        <div>
          <p className="colorpicker__title">{_('Default colors')}</p>
          <div className="colorpicker__preset-colors">
            <PresetColors colors={defaultColors} onClick={onChangeComplete} />
          </div>
        </div>
      </div>
    );
  })
);

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.onSelectedColorChange = this.onSelectedColorChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  onSelectedColorChange(newColor) {
    // We use our own toTinyColor because this value is a ColorPicker
    // color value which is an object that needs unpacking. We also handle
    // the case where a color string is passed in (just in case).

    const color = toTinyColor(newColor);

    // relayout call only wants a RGB String
    this.props.onColorChange(color.toRgbString());
  }

  toggleVisible() {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    // We use tinycolor here instead of our own toTinyColor as
    // tinycolor handles `null` values and other weirdness we may
    // expect from user data.
    const selectedColor = tinycolor(this.props.selectedColor);
    const colorText = selectedColor.toHexString();
    const rgbString = selectedColor.toRgbString();

    // We need inline style here to assign the background color
    // dynamically.
    const swatchStyle = {backgroundColor: rgbString};

    return (
      <div className="colorpicker__container">
        <div className="colorpicker">
          <div
            className="colorpicker__swatch +cursor-clickable"
            style={swatchStyle}
            onClick={this.toggleVisible}
          />
        </div>

        <div
          className="colorpicker__selected-color +hover-grey"
          onClick={this.toggleVisible}
        >
          {colorText}
        </div>

        {this.state.isVisible && (
          <div className="colorpicker__popover">
            <div className="colorpicker__cover" onClick={this.toggleVisible} />
            <CustomColorPicker
              color={rgbString}
              onChangeComplete={this.onSelectedColorChange}
            />
          </div>
        )}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  onColorChange: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
};

export default ColorPicker;
