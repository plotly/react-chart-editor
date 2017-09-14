import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";

const CheckboxGroup = React.createClass({
  propTypes: {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    orientation: PropTypes.string,
  },

  getDefaultProps() {
    return {
      className: "",
    };
  },

  getInitialState() {
    return {
      options: this.props.options,
    };
  },

  /*
     * We've gotten new props from a parent. Sync local state so its
     * up to date with parent props.
     */
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
    });
  },

  /*
     * Called whenever a checkbox is changed, this updates the local
     * state to reflect the change and then called props.onChange with
     * the new options.
     */
  handleChange(evt) {
    // Which one was changed?
    const targetCheckbox = evt.target.getAttribute("data-value");

    // Grab all the checkboxes
    const checkboxes = this.getCheckboxes();
    const newOptions = [];

    // Loop through and update state to reflect changed UI
    for (let i = 0; i < checkboxes.length; i++) {
      const value = checkboxes[i].getAttribute("data-value");
      let checked = checkboxes[i].getAttribute("data-checked") === "true";
      let label = checkboxes[i].getAttribute("data-label");

      // Is it the one that was changed? Toggle its 'checked' property.
      if (targetCheckbox === value) checked = !checked;

      newOptions.push({ label, value, checked });
    }

    // Optimistically set local state to newOptions
    this.setState({
      options: newOptions,
    });

    // Pipe off the newOptions to props.onChange so actions can hook in
    this.props.onChange(newOptions);
  },

  /**
     * @returns {nodeList} Array-list list of DOM nodes of type "checkbox"
     */
  getCheckboxes() {
    return ReactDOM.findDOMNode(this).querySelectorAll("div.checkbox__box");
  },

  renderOptions() {
    const { orientation } = this.props;

    /*
         * Loop through the options assigned to state
         * and create a checkbox element for each
         */
    return this.state.options.map((option, i) => {
      const checkClass = classnames(["checkbox__check", "icon"], {
        "icon-check-mark": option.checked,
      });

      const itemClass = classnames("checkbox__item", {
        "checkbox__item--vertical": orientation === "vertical",
        "checkbox__item--horizontal": orientation === "horizontal",
      });

      return (
        <div key={i} className={itemClass}>
          <div
            className="checkbox__box"
            ref={option.value}
            onClick={this.handleChange}
            data-value={option.value}
            data-checked={option.checked}
            data-label={option.label}
          >
            {option.checked ? (
              <i
                className={checkClass}
                data-value={option.value}
                data-checked={option.checked}
                data-label={option.label}
              />
            ) : null}
          </div>

          <div className="checkbox__label">{option.label}</div>
        </div>
      );
    });
  },

  render() {
    const { orientation, className } = this.props;

    const boxClass = classnames("checkbox__group", className, {
      checkbox__group_horizontal: orientation === "horizontal",
    });
    return <div className={boxClass}>{this.renderOptions()}</div>;
  },
});

module.exports = CheckboxGroup;
