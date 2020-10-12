import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class RadioBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {activeOption: this.props.activeOption};
    this.handleChange = this.handleChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Reset the value to the graph's actual value
    if (nextProps.activeOption !== this.state.activeOption) {
      this.setState({
        activeOption: nextProps.activeOption,
      });
    }
  }

  handleChange(newValue) {
    this.setState({activeOption: newValue});
    this.props.onOptionChange(newValue);
  }

  renderOption(optionName) {
    const {label, value, icon: Icon} = optionName;
    const defaultActive = this.state.activeOption === value;

    const optionClass = classnames('radio-block__option', {
      'radio-block__option--active': defaultActive,
    });

    return (
      <div
        className={optionClass}
        key={value}
        checked={defaultActive}
        onClick={() => this.handleChange(value)}
      >
        {Icon ? <Icon className="radio-block__icon" /> : null}
        {label ? <span>{label}</span> : null}
      </div>
    );
  }

  render() {
    const optionList = this.props.options.map(this.renderOption);

    const groupClass = classnames('radio-block', 'radio-block__group', {
      'radio-block__group--center': this.props.alignment === 'center',
    });

    return <div className={groupClass}>{optionList}</div>;
  }
}

RadioBlocks.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
      label: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      disabled: PropTypes.bool,
    })
  ),
  onOptionChange: PropTypes.func.isRequired,
  activeOption: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  radioClassName: PropTypes.string,

  // One of right, left, center
  alignment: PropTypes.string,
};

export default RadioBlocks;
