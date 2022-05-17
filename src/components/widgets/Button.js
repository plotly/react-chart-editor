import PropTypes from 'prop-types';
import {Component} from 'react';
import {bem} from 'lib';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, className, icon, label, variant, ...rest} = this.props;

    let classes = `button`;

    if (variant) {
      classes += ` button--${variant}`;
    } else {
      classes += ` button--default`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    const Icon = icon ? <div className={bem('button', 'icon')}>{icon}</div> : null;

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
  children: PropTypes.node,
  className: PropTypes.any,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  label: PropTypes.any,
  variant: PropTypes.string,
};

export default Button;
