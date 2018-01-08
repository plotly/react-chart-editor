import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from 'lib';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {variant, className, icon, label, children, ...rest} = this.props;

    let classes = `button`;

    if (variant) {
      classes += ` button--${variant}`;
    } else {
      classes += ` button--default`;
    }

    classes += ` ${className}`;

    const Icon = icon ? (
      <div className={bem('button', 'icon')}>{icon}</div>
    ) : null;

    return (
      <button className={classes} {...rest}>
        <div className={bem('button', 'wrapper')}>
          {Icon}
          <div className="button__label">{label ? label : children}</div>
        </div>
      </button>
    );
  }
}

Button.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.any,
  className: PropTypes.any,
  children: PropTypes.node,
  icon: PropTypes.any,
};

export default Button;
