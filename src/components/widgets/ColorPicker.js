import Fields from 'react-color/lib/components/sketch/SketchFields';
import PresetColors from 'react-color/lib/components/sketch/SketchPresetColors';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import {
  Alpha,
  Hue,
  Saturation,
  Checkboard
} from 'react-color/lib/components/common';
import {CustomPicker as customPicker} from 'react-color';
import {_} from '../../lib';

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
  '#17becf' // blue-teal
];

// Utility functions for converting ColorPicker color objects or raw strings
// into TinyColor objects.
const extractRGB = c => c.rgb || c;
const getColorSource = c => (c.source === 'hex' ? c.hex : extractRGB(c));
const toTinyColor = c => tinycolor(getColorSource(c));

const CustomColorPicker = customPicker(function(props) {
  const {rgb, onChangeComplete} = props;
  const {r, g, b, a} = rgb;

  const activeColor = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`
  };

  return (
    <div>
      <div>
        <p className="color-picker-title">{_('Custom colors')}</p>
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
        <p className="color-picker-title">{_('Default colors')}</p>
        <div className="color-picker-preset-colors js-color-picker-preset-colors">
          <PresetColors colors={defaultColors} onClick={onChangeComplete} />
        </div>
      </div>
    </div>
  );
});

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
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
      <div className="colorpicker-container js-colorpicker-container">
        <div className="colorpicker">
          <div
            className="colorpicker-swatch +cursor-clickable js-colorpicker-swatch"
            style={swatchStyle}
            onClick={this.toggleVisible}
          />
        </div>

        <div
          className="colorpicker-selected-color +hover-grey"
          onClick={this.toggleVisible}
        >
          {colorText}
        </div>

        {this.state.isVisible && (
          <div className="color-picker__popover js-color-picker-popover">
            <div className="color-picker__cover" onClick={this.toggleVisible} />
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
  selectedColor: PropTypes.string
};

module.exports = ColorPicker;
