import React, { Component } from "react";
import PropTypes from "prop-types";
import EditableText from "./EditableText";
import Slider from "./Slider";
import {
  keepWithinMaxMin,
  getStep,
  stringToInt,
  numberToString,
} from "@workspace/utils/number";

/**
 * Input slider
 */

class InputSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onTextChange = this.onTextChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Updates the value to the graph's actual value
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onTextChange(newValue) {
    const value = stringToInt(newValue);
    this.setState({ value });
  }

  onUpdate(newValue) {
    const { step, min, max, onChange } = this.props;

    let value = stringToInt(newValue);
    value = getStep(value, step);
    value = keepWithinMaxMin(value, min, max);

    this.setState({ value });
    onChange(value);
  }

  render() {
    const textValue = numberToString(this.state.value);
    const { onChange, min, max, step, value } = this.props;

    return (
      <div>
        <EditableText
          className="slider__input"
          text={textValue}
          type="text"
          onChange={this.onTextChange}
          onUpdate={this.onUpdate}
        />
        <div className="slider__widget">
          <Slider
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            fill={true}
            orientation={"horizontal"}
          />
        </div>
      </div>
    );
  }
}

InputSlider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

InputSlider.defaultProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
};

export default InputSlider;
