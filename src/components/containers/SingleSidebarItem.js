import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import Button from '../widgets/Button';

export default class SingleSidebarItem extends Component {
  render() {
    let {children} = this.props;
    children = React.Children.map(children, child => {
      if (child.type === Button) {
        return cloneElement(child, {className: 'button--menu'});
      }
      return child;
    });
    return children ? (
      <div className="sidebar__item--single">{children}</div>
    ) : null;
  }
}

SingleSidebarItem.propTypes = {
  children: PropTypes.any,
};
