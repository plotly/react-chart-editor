import React, { Component } from "react";
import Select from "react-select";
import { map, prop } from "ramda";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  focus() {
    this.refs.dropdown.focus();
  }

  onChange(selection) {
    const { multi, onChange, valueKey } = this.props;

    if (!selection) {
      return onChange(null);
    } else if (multi) {
      return onChange(map(prop(valueKey), selection));
    }

    return onChange(prop(valueKey, selection));
  }

  render() {
    const {
      backspaceToRemoveMessage,
      minWidth,
      placeholder,
      clearable,
      value,
      options,
      searchable,
      multi,
      optionRenderer,
      valueRenderer,
      noResultsText,
      valueKey,
      disabled,
      className,
      width,
    } = this.props;
    const dropdownStyle = { minWidth };
    if (width) {
      dropdownStyle.width = width;
    }
    return (
      <div className="dropdown-container" style={dropdownStyle}>
        <Select
          ref="dropdown"
          backspaceToRemoveMessage={backspaceToRemoveMessage}
          placeholder={placeholder}
          clearable={clearable}
          value={value}
          options={options}
          searchable={searchable}
          onChange={this.onChange}
          multi={multi}
          optionRenderer={optionRenderer}
          valueRenderer={valueRenderer}
          noResultsText={noResultsText}
          valueKey={valueKey}
          disabled={disabled}
          className={className}
        />
      </div>
    );
  }
}

Dropdown.defaultProps = {
  clearable: true,
  multi: false,
  noResultsText: "no results...",
  placeholder: "select an option...",
  searchable: false,
  minWidth: "150px",
  valueKey: "value",
  disabled: false,
};

Dropdown.propTypes = {
  backspaceToRemoveMessage: React.PropTypes.string,
  clearable: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  searchable: React.PropTypes.bool,
  minWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  valueKey: React.PropTypes.string,
  value: React.PropTypes.any,
  multi: React.PropTypes.bool,
  optionRenderer: React.PropTypes.func,
  valueRenderer: React.PropTypes.func,
  noResultsText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

module.exports = Dropdown;
