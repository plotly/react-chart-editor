import {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class StyleButton extends Component {
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(ev) {
    // Prevent focus moving from editor to button
    ev.preventDefault();
    this.props.onToggle(this.props.value);
  }

  render() {
    const {active, label, value} = this.props;

    const className = classnames(
      'rich-text-editor__styleButton',
      `rich-text-editor__styleButton__${value}`,
      {
        'rich-text-editor__styleButton--active': active,
      }
    );

    return (
      <span className="rich-text-editor__styleButton__wrapper">
        <span
          className={className}
          onMouseDown={this.onToggle}
          data-role="button"
          data-pressed={active}
        >
          {label}
        </span>
      </span>
    );
  }
}

StyleButton.propTypes = {
  active: PropTypes.bool,

  // A (styled) React element to display as label
  label: PropTypes.element.isRequired,

  // Callback for clicks
  onToggle: PropTypes.func.isRequired,

  // The value passed to `onToggle` when clicked
  value: PropTypes.string.isRequired,
};

export default StyleButton;
