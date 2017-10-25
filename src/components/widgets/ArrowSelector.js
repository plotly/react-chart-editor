import Dropdown from "./Dropdown";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { MIXED_VALUES } from "@workspace/constants/workspace";

class ArrowSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.activeOption || 0,
    };
    this.onSelect = this.onSelect.bind(this);
    this.arrowGenerator = this.arrowGenerator.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeOption === MIXED_VALUES) {
      // set the active option empty if it is MIXED_VALUES
      this.setState({
        activeOption: "",
      });
      return;
    }

    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption) {
      this.setState({
        activeOption: nextProps.activeOption,
      });
    }
  }

  arrowGenerator() {
    const { Plotly } = this.props;
    const arrowArray = Plotly.Annotations.ARROWPATHS;
    const allArrows = arrowArray.map(each => {
      return (
        <svg
          width="40"
          height="20"
          data-arrowhead="1"
          style={{ position: "relative", top: "5px" }}
        >
          <line
            stroke="rgb(68, 68, 68)"
            style={{ fill: "none" }}
            x1="5"
            y1="10"
            x2="23.8"
            y2="10"
            strokeWidth="2"
          />
          <path
            d={each.path}
            transform="translate(23.8,10)rotate(360)scale(2)"
            style={{ fill: "rgb(68, 68, 68)", opacity: 1, strokeWidth: 0 }}
          />
        </svg>
      );
    });

    return allArrows.map((each, index) => {
      return {
        label: each,
        value: index,
        key: "arrow" + index,
      };
    });
  }

  onSelect(chosenArrow) {
    this.setState({
      activeOption: chosenArrow,
    });

    this.props.onChange(chosenArrow);
  }

  renderOption(option) {
    return (
      <li className="+ls-none">
        <div className="+push-quarter-left">{option.label}</div>
      </li>
    );
  }

  renderValue(option) {
    return <div>{option.label}</div>;
  }

  render() {
    return (
      <span className="widget-dropdown">
        <Dropdown
          value={this.state.activeOption}
          options={this.arrowGenerator()}
          onChange={this.onSelect}
          clearable={false}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          valueKey={"value"}
          minWidth={"100%"}
        />
      </span>
    );
  }
}

ArrowSelector.propTypes = {
  activeOption: PropTypes.number,
  onChange: PropTypes.func,
  Plotly: PropTypes.object.isRequired,
};

export default ArrowSelector;
