import {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {CheckIcon} from 'plotly-icons';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {options: this.props.options};
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({options: nextProps.options});
  }

  handleChange(i) {
    var newOptions = this.props.options.slice();
    newOptions[i] = Object.assign(newOptions[i], {
      checked: !newOptions[i].checked,
    });
    this.props.onChange(newOptions);
  }

  renderOptions() {
    return this.state.options.map((option, i) => {
      const checkClass = classnames(['checkbox__check', 'icon'], {
        'checkbox__check--checked': option.checked,
      });

      const itemClass = classnames('checkbox__item', {
        'checkbox__item--vertical': this.props.orientation === 'vertical',
        'checkbox__item--horizontal': this.props.orientation === 'horizontal',
      });

      return (
        <div key={i} className={itemClass}>
          <div
            className={`checkbox__box${option.checked ? ' checkbox__box--checked' : ''}`}
            onClick={() => this.handleChange(i)}
          >
            {option.checked && (
              <div className={checkClass}>
                <CheckIcon />
              </div>
            )}
          </div>
          <div className="checkbox__label" onClick={() => this.handleChange(i)}>
            {option.label}
          </div>
        </div>
      );
    });
  }

  render() {
    const boxClass = classnames('checkbox__group', this.props.className, {
      checkbox__group_horizontal: this.props.orientation === 'horizontal',
    });

    return <div className={boxClass}>{this.renderOptions()}</div>;
  }
}

CheckboxGroup.propTypes = {
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
};

CheckboxGroup.defaultProps = {
  className: '',
};

export default CheckboxGroup;
