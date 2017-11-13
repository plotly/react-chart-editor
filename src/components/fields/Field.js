import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../../lib';

export default class Field extends Component {
  render() {
    let postfix = null;
    if (this.props.postfix) {
      postfix = (
        <div className={bem('field', 'postfix')}>
          <div className={bem('field', 'postfix-text')}>
            {this.props.postfix}
          </div>
        </div>
      );
    }

    if (!this.props.label) {
      const noTitleModifier = this.props.center ? ['center'] : null;
      return (
        <div className={bem('field')}>
          <div className={bem('field', 'no-title', noTitleModifier)}>
            {this.props.children}
          </div>
          {postfix}
        </div>
      );
    }

    const widgetModifier = this.props.postfix ? ['postfix'] : null;
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget', widgetModifier)}>
          {this.props.children}
        </div>
        {postfix}
      </div>
    );
  }
}

Field.propTypes = {
  center: PropTypes.bool,
  label: PropTypes.string,
  postfix: PropTypes.string,
};

Field.defaultProps = {
  center: false,
};
