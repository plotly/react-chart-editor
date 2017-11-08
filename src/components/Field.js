import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../lib';

export default class Field extends Component {
  render() {
    let postfix = null;
    let widgetModifier = null;
    if (this.props.postfix) {
      postfix = (
        <div className={bem('field', 'postfix')}>
          <div className={bem('field', 'postfix-text')}>
            {this.props.postfix}
          </div>
        </div>
      );
      widgetModifier = ['prefix'];
    }
    if (this.props.noTitle) {
      return (
        <div className={bem('field')}>
          <div className={bem('field', 'no-title')}>{this.props.children}</div>
          {postfix}
        </div>
      );
    }
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
  label: PropTypes.string,
  noTitle: PropTypes.bool,
  postfix: PropTypes.string,
};
