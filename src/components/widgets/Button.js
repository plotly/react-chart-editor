import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, className, label, variant, onClick, ...rest} = this.props;

    let classes = `govuk-button`;

    if (variant) {
      classes += ` govuk-button--${variant}`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    const handleClick = e => {
      onClick(e);
      e.currentTarget.blur();
    }

    return (
      <button data-module="govuk-button" className={classes} onClick={handleClick} {...rest}>
        {label ? label : children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  label: PropTypes.any,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
