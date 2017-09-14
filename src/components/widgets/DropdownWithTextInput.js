import EditableText from "./EditableText";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import classnames from "classnames";

export default class DropdownWithTextInput extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.addOptionIfNotAvailable = this.addOptionIfNotAvailable.bind(this);
    this.newOptionList = this.newOptionList.bind(this);

    const { options, value } = this.props;

    this.state = {
      value,
      list: this.newOptionList(options, value),
      intermediateTextValue: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.addOptionIfNotAvailable(nextProps.value);
  }

  onSelect(item) {
    const { onUpdate, customValue } = this.props;
    this.setState({
      value: item,
    });

    /*
         * Don't propagate the change when custom is selected.
         * The text input will update propagate the change onBlur
         */
    if (item !== customValue) {
      onUpdate(item);
    } else {
      /*
             * Otherwise, we're in like a "edit" mode - user is
             * prompted to fill in a custom value into a text box
             */
      this.setState({ intermediateTextValue: item });
    }
  }

  onUpdate(newValue) {
    this.setState({
      value: newValue,
    });
    this.addOptionIfNotAvailable(newValue);

    this.props.onUpdate(newValue);
  }

  // if the input doesn't exist already then add it to our list of options.
  newOptionList(originalList, value) {
    const list = originalList.slice();

    if (!list.find(o => o.value === value)) {
      list.unshift({
        label: value,
        value,
      });
    }

    return list;
  }

  addOptionIfNotAvailable(value) {
    this.setState({
      list: this.newOptionList(this.state.list, value),
    });
  }

  render() {
    const { clearable, customValue, minWidth, placeholder } = this.props;
    const { intermediateTextValue, value, list } = this.state;

    const editableClass = classnames(
      "numeric-input-number",
      "+editable",
      "+float-left"
    );

    if (value === customValue) {
      return (
        <span className="font-dropdown">
          <EditableText
            className={editableClass}
            text={String(intermediateTextValue)}
            type="text"
            onChange={textValue =>
              this.setState({ intermediateTextValue: textValue })}
            onUpdate={this.onUpdate}
            placeholder={placeholder}
          />
        </span>
      );
    }

    return (
      <span className="font-dropdown">
        <Dropdown
          ref="dropdown"
          clearable={clearable}
          value={value}
          options={list}
          onChange={this.onSelect}
          minWidth={minWidth}
        />
      </span>
    );
  }
}

DropdownWithTextInput.defaultProps = {
  customValue: "custom",
  placeholder: "",
};

DropdownWithTextInput.propTypes = {
  options: React.PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: React.PropTypes.any,
  minWidth: React.PropTypes.string,
  clearable: React.PropTypes.bool,
  customValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
};
