import PropTypes from 'prop-types';
import {Component} from 'react';
import Select from 'react-select';
import classnames from 'classnames';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(selection) {
    const {multi, onChange, valueKey} = this.props;

    if (!selection) {
      return onChange(null);
    }

    return multi ? onChange(selection.map((s) => s[valueKey])) : onChange(selection[valueKey]);
  }

  render() {
    const {
      minWidth,
      placeholder,
      clearable,
      value,
      options,
      searchable,
      multi,
      noResultsText,
      valueKey,
      disabled,
      className,
      width,
    } = this.props;

    const {localize: _} = this.context;

    const dropdownStyle = {minWidth};
    if (width) {
      dropdownStyle.width = width;
    }

    const opts = options.map((opt) =>
      typeof opt === 'string' ? {label: opt, [valueKey]: opt} : opt
    );

    const dropdownContainerClass = classnames('dropdown-container', {
      'dropdown--dark': this.props.backgroundDark,
      [className]: className,
    });

    return (
      <div className={dropdownContainerClass} style={dropdownStyle}>
        <Select
          placeholder={placeholder || _('Select an Option')}
          isClearable={clearable}
          value={opts.filter((o) =>
            Array.isArray(value) ? value.includes(o[valueKey]) : value === o[valueKey]
          )}
          options={opts}
          isSearchable={searchable}
          onChange={this.onChange}
          isMulti={multi}
          noOptionsMessage={() => noResultsText || _('No Results')}
          getOptionValue={(o) => o[valueKey]}
          getOptionLabel={(o) => o.label}
          isDisabled={disabled}
          className={dropdownContainerClass}
          classNamePrefix="Select"
          components={this.props.components}
        />
      </div>
    );
  }
}

Dropdown.defaultProps = {
  clearable: true,
  multi: false,
  searchable: false,
  minWidth: '120px',
  valueKey: 'value',
  disabled: false,
};

Dropdown.propTypes = {
  backgroundDark: PropTypes.bool,
  clearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  searchable: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueKey: PropTypes.string,
  value: PropTypes.any,
  multi: PropTypes.bool,
  components: PropTypes.object,
  noResultsText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Dropdown.contextTypes = {
  localize: PropTypes.func,
};

export default Dropdown;
