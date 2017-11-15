import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SubPanel from '../containers/SubPanel';
import classnames from 'classnames';
import {bem, localize} from '../../lib';
import {multiValueText} from '../../lib/constants';

class Field extends Component {
  renderPostfix() {
    if (!this.props.postfix) {
      return null;
    }
    return (
      <div className={bem('field', 'postfix')}>
        <div className={bem('field', 'postfix-text')}>{this.props.postfix}</div>
      </div>
    );
  }

  render() {
    const {
      center,
      children,
      label,
      localize: _,
      multiValued,
      postfix,
    } = this.props;

    let fieldClass;
    if (!label) {
      fieldClass = classnames('field__no-title', {
        'field__no-title--center': center,
      });
    } else {
      fieldClass = classnames('field__widget', {
        'field__widget--postfix': Boolean(postfix),
      });
    }

    return (
      <div className={bem('field')}>
        {label ? (
          <div className={bem('field', 'title')}>
            <div className={bem('field', 'title-text')}>{label}</div>
          </div>
        ) : null}
        <div className={fieldClass}>
          {children}
          {multiValued ? (
            <SubPanel label={_(multiValueText.title)} ownline question>
              <div className="info__title">{_(multiValueText.title)}</div>
              <div className="info__text">{_(multiValueText.text)}</div>
              <div className="info__sub-text">{_(multiValueText.subText)}</div>
            </SubPanel>
          ) : null}
        </div>
        {postfix ? (
          <div className={bem('field', 'postfix')}>
            <div className={bem('field', 'postfix-text')}>{postfix}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

Field.propTypes = {
  center: PropTypes.bool,
  label: PropTypes.string,
  localize: PropTypes.func,
  postfix: PropTypes.string,
  multiValued: PropTypes.bool,
  children: PropTypes.node,
};

Field.defaultProps = {
  center: false,
  multiValued: false,
};

export default localize(Field);
