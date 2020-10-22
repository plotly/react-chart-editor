import PropTypes from 'prop-types';
import {Component} from 'react';
import {bem} from 'lib';

export default class SidebarItem extends Component {
  render() {
    const {onClick, label, active} = this.props;
    return (
      <div onClick={onClick} className={bem('sidebar__item', [active ? 'is-active' : ''])}>
        <div className={bem('sidebar__item', 'wrapper')}>
          <div className={bem('sidebar__item', 'label')}>{label}</div>
        </div>
      </div>
    );
  }
}

SidebarItem.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
