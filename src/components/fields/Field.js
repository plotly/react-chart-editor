import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MenuPanel from '../containers/MenuPanel';
import classnames from 'classnames';
import {bem, localize} from 'lib';
import {getMultiValueText} from 'lib/constants';
import {CloseIcon} from 'plotly-icons';
import Button from '../widgets/Button';

export class FieldDelete extends Component {
  render() {
    const {onClick} = this.props;
    return (
      <div className="field__delete" onClick={onClick}>
        <CloseIcon />
      </div>
    );
  }
}

class Field extends Component {
  render() {
    const {
      action,
      onAction,
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
        {action ? (
          <Button
            label={onAction.label}
            variant={onAction.variant}
            icon={onAction.icon}
            onClick={onAction.onClick}
          />
        ) : null}
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
  action: PropTypes.bool,
  onAction: PropTypes.object,
};

Field.defaultProps = {
  center: false,
  multiValued: false,
};

FieldDelete.propTypes = {
  onClick: PropTypes.func,
};
export default localize(Field);
