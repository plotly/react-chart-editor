import React, { Component } from "react";
import Select from "react-select";
import { map, prop } from "ramda";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
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
  backspaceToRemoveMessage: PropTypes.string,
  clearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  searchable: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueKey: PropTypes.string,
  value: PropTypes.any,
  multi: PropTypes.bool,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  noResultsText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

module.exports = Dropdown;
