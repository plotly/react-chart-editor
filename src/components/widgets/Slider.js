import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import classnames from "classnames";
import { keepWithinMaxMin, getStep } from "@workspace/utils/number";

/**
 * Basic slider
 * Accepts min, max, step and orientation parameters
 * Integer values
 */

const orientation = {
  vertical: {
    dimension: "clientHeight",
    clientAxis: "clientY",
    zeroPoint: "bottom",
  },
  horizontal: {
    dimension: "clientWidth",
    clientAxis: "clientX",
    zeroPoint: "left",
  },
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
    this.positionToValue = this.positionToValue.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getValue = this.getValue.bind(this);
    this.moveSlider = this.moveSlider.bind(this);
    this.startSlider = this.startSlider.bind(this);
    this.stopSlider = this.stopSlider.bind(this);
    this.renderFill = this.renderFill.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  getRef(c) {
    this._ref = c;
  }

  componentWillReceiveProps(nextProps) {
    // Updates the value to the graph's actual value
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  positionToValue(position) {
    const dimension = orientation[this.props.orientation].dimension;
    const sliderSize = findDOMNode(this._ref)[dimension];
    const positionModifier = 100 / sliderSize;

    return Math.round(position * positionModifier);
  }

  getPosition(event) {
    const sliderBox = findDOMNode(this._ref);
    const zeroPoint = orientation[this.props.orientation].zeroPoint;
    const mouseCoordinate =
      event[orientation[this.props.orientation].clientAxis];
    const sliderMin = sliderBox.getBoundingClientRect()[zeroPoint];

    let position;
    if (this.props.orientation === "vertical") {
      position = sliderMin - mouseCoordinate;
    } else {
      position = mouseCoordinate - sliderMin;
    }

    return position;
  }

  getValue(position) {
    const { step, min, max } = this.props;
    let newValue = this.positionToValue(position);
    newValue = getStep(newValue, step);
    newValue = keepWithinMaxMin(newValue, min, max);

    return newValue;
  }

  moveSlider(event) {
    const newPosition = this.getPosition(event);
    const newValue = this.getValue(newPosition);
    this.handleChange(newValue);
  }

  stopSlider() {
    document.removeEventListener("mousemove", this.moveSlider);
    document.removeEventListener("mouseup", this.stopSlider);
  }

  startSlider() {
    document.addEventListener("mousemove", this.moveSlider);
    document.addEventListener("mouseup", this.stopSlider);
  }

  renderFill() {
    const currentValue = this.state.value;
    if (this.props.fill === true) {
      const orientationVertical = this.props.orientation === "vertical";

      let fillStyles;
      if (orientationVertical) {
        fillStyles = {
          height: currentValue + "%",
          top: 100 - currentValue + "%",
        };
      } else {
        fillStyles = {
          width: currentValue + "%",
        };
      }

      const fillClassName = classnames("slider__fill", {
        "slider__fill--horizontal": !orientationVertical,
        "slider__fill--vertical": orientationVertical,
      });

      return <div style={fillStyles} className={fillClassName} />;
    }

    return null;
  }

  render() {
    const orientationVertical = this.props.orientation === "vertical";
    const currentValue = this.state.value;

    let currentPosition;

    if (orientationVertical) {
      currentPosition = {
        top: 100 - currentValue + "%",
      };
    } else {
      currentPosition = {
        left: currentValue + "%",
      };
    }

    const sliderBox = classnames("slider__track", {
      slider__track_horizontal: !orientationVertical,
      slider__track_vertical: orientationVertical,
    });

    const sliderHandle = classnames("slider__handle", {
      "slider__handle--horizontal": !orientationVertical,
      "slider__handle--vertical": orientationVertical,
    });

    return (
      <div
        className={sliderBox}
        ref={this.getRef}
        onMouseDown={this.moveSlider}
      >
        {this.renderFill()}
        <div
          className={sliderHandle}
          style={currentPosition}
          onMouseDown={this.startSlider}
          onMouseUp={this.stopSlider}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  fill: PropTypes.bool,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

Slider.defaultProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  fill: true,
};

export default Slider;
