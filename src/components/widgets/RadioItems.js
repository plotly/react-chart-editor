import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import hat from "hat";

/**
 *
 * Basic html radio group - returns onOptionChange
 * (value of the radio input that is clicked)
 *
 * Options labels and values must be unique to the component
 * ActiveOption identifies the default checked option and
 * must be equal to the corresponding value
 *
 * Icons when present will replace the labels and circular radio buttons
 *
 * Can be displayed vertically (orientation: 'vertical') or
 * horizontally (orientation: 'horizontal')
 */

class RadioItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: this.props.activeOption,
      uid: hat(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption) {
      this.setState({
        activeOption: nextProps.activeOption,
      });
    }
  }

  handleChange(e) {
    let newActiveOption = e.target.value;

    // prevent action when clicking on the active item twice
    if (newActiveOption === this.state.activeOption) {
      return;
    }

    // Preserve Type
    if (newActiveOption === "true") {
      newActiveOption = true;
    } else if (newActiveOption === "false") {
      newActiveOption = false;
    } else if (typeof newActiveOption === "number") {
      newActiveOption = newActiveOption.toString();
    }

    this.setState({ activeOption: newActiveOption });
    this.props.onOptionChange(newActiveOption);
  }

  renderOption(optionName) {
    const { label, value, icon, disabled } = optionName;
    const defaultActive = this.state.activeOption === value;

    const labelWrapperClass = classnames({
      "radio-item": true,
      "js-radio-item": true,
      icon: Boolean(icon),
    });

    const contentClass = classnames(
      {
        "radio-item__content__icon": Boolean(icon),
        "radio-item__content": Boolean(!icon),
      },
      icon
    );

    // noop the onChange handler if the option is disabled
    const onChange = disabled ? () => {} : this.handleChange;

    const optionClass = classnames({
      [this.props.radioClassName]: true,
      "+is-disabled": disabled,
      "+text-center": this.props.orientation === "horizontal",
      "+inline-block": this.props.orientation === "horizontal",
      "+text-left": this.props.orientation === "vertical",
    });

    return (
      <div className={optionClass} key={value}>
        <label
          className={labelWrapperClass}
          ref={icon ? "iconOption" : "textOption"}
        >
          <input
            type="radio"
            className="radio-item__input"
            checked={defaultActive}
            onChange={onChange}
            ref={label}
            name={this.state.uid}
            value={value}
          />

          <div className={contentClass} />
        </label>

        {label ? <span className="radio-item__title">{label}</span> : null}
      </div>
    );
  }

  render() {
    const optionList = this.props.options.map(this.renderOption);

    return <div className={this.props.stylingClass}>{optionList}</div>;
  }
}

RadioItems.defaultProps = {
  radioClassName: "+soft-quarter",
  orientation: "horizontal",
};

RadioItems.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string,
      icon: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  onOptionChange: PropTypes.func.isRequired,
  activeOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  stylingClass: PropTypes.string,
  radioClassName: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

module.exports = RadioItems;
