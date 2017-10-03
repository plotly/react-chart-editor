import React, { Component } from "react";
import PropTypes from "prop-types";
import NumericInputStatefulWrapper from "./NumericInputStatefulWrapper";
import { keepWithinMaxMin } from "@workspace/utils/number";
import classnames from "classnames";

// Range Input Component

class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueMin: this.props.value[0],
      valueMax: this.props.value[1],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        valueMin: nextProps.value[0],
        valueMax: nextProps.value[1],
      });
    }
  }

  onUpdate(valueType, newValue) {
    const { onChange, min, max, value } = this.props;
    const valueOrder = ["valueMin", "valueMax"];
    const modifiedValue = keepWithinMaxMin(newValue, min, max);

    this.setState({ [valueType]: modifiedValue });

    const newValueArray = valueOrder.map((each, index) => {
      if (each === valueType) {
        return modifiedValue;
      } else {
        return value[index];
      }
    });

    onChange(newValueArray);
  }

  render() {
    const controlBlockClassName = classnames(
      "block-group",
      "+soft-half-top",
      "+soft-half-bottom",
      "+inline-block"
    );

    return (
      <span className={controlBlockClassName}>
        <span className="block grid-50">
          <NumericInputStatefulWrapper
            value={this.state.valueMin}
            type="text"
            onUpdate={this.onUpdate.bind(this, "valueMin")}
            min={this.props.min}
            max={this.props.max}
          />
        </span>
        <span className="block grid-50">
          <NumericInputStatefulWrapper
            value={this.state.valueMax}
            type="text"
            onUpdate={this.onUpdate.bind(this, "valueMax")}
            min={this.props.min}
            max={this.props.max}
          />
        </span>
      </span>
    );
  }
}

RangeInput.propTypes = {
  // value = ['valueMin', 'valueMax']
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

module.exports = RangeInput;
