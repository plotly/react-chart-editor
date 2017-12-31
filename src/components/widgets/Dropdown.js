import PropTypes from 'prop-types';
import React, {Component} from 'react';
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
    } else if (multi) {
      throw new Error('TODO: de-ramda');
      // return onChange(map(prop(valueKey), selection));
    }

    return onChange(selection[valueKey]);
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

    const dropdownStyle = {minWidth};
    if (width) {
      dropdownStyle.width = width;
    }

    const opts = options.slice();
    for (let i = 0; i < opts.length; i++) {
      if (typeof opts[i] === 'string') {
        opts[i] = {label: opts[i], [valueKey]: opts[i]};
      }
    }

    const dropdownContainerClass = classnames('dropdown-container', {
      'dropdown--dark': this.props.backgroundDark,
    });

    return (
      <div className={dropdownContainerClass} style={dropdownStyle}>
        <Select
          backspaceToRemoveMessage={backspaceToRemoveMessage}
          placeholder={placeholder}
          clearable={clearable}
          value={value}
          options={opts}
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
  noResultsText: 'no results...',
  placeholder: 'select an option...',
  searchable: false,
  minWidth: '150px',
  valueKey: 'value',
  disabled: false,
};

Dropdown.propTypes = {
  backspaceToRemoveMessage: PropTypes.string,
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
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  noResultsText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Dropdown;
