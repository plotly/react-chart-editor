import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MenuPanel from '../containers/MenuPanel';
import classnames from 'classnames';
import {bem, localize} from 'lib';
import {getMultiValueText} from 'lib/constants';

class Field extends Component {
  renderPostfix() {
    const {units} = this.props;
    if (!units) {
      return null;
    }
    return (
      <div className={bem('field', 'units')}>
        <div className={bem('field', 'units-text')}>{units}</div>
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
      units,
    } = this.props;

    let fieldClass;
    if (!label) {
      fieldClass = classnames('field__no-title', {
        'field__no-title--center': center,
      });
    } else {
      fieldClass = classnames('field__widget', {
        'field__widget--units': Boolean(units),
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
            <MenuPanel label={getMultiValueText('title', _)} ownline question>
              <div className="info__title">{getMultiValueText('title', _)}</div>
              <div className="info__text">{getMultiValueText('text', _)}</div>
              <div className="info__sub-text">
                {getMultiValueText('subText', _)}
              </div>
            </MenuPanel>
          ) : null}
        </div>
        {units ? (
          <div className={bem('field', 'units')}>
            <div className={bem('field', 'units-text')}>{units}</div>
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
  units: PropTypes.string,
  multiValued: PropTypes.bool,
  children: PropTypes.node,
};

Field.defaultProps = {
  center: false,
  multiValued: false,
};

export default localize(Field);
