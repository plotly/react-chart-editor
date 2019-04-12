import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MenuPanel from '../containers/MenuPanel';
import classnames from 'classnames';
import {bem} from 'lib';
import {getMultiValueText} from 'lib/constants';
import {CloseIcon} from 'plotly-icons';
import nestedProperty from 'plotly.js/src/lib/nested_property';

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
      center,
      children,
      label,
      multiValued,
      suppressMultiValuedMessage,
      units,
      extraComponent,
      fieldContainerClassName,
      labelWidth,
      noDefaultIndicator,
    } = this.props;

    const {localize: _, container, attr} = this.context;

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

    let tooltip = this.context.attr;
    if (this.context.description) {
      tooltip += ' – ' + this.context.description.replace(/`/g, '"').replace(/\*/g, '"');
    }

    const containerClassName = classnames(bem('field'), {
      [fieldContainerClassName]: Boolean(fieldContainerClassName),
    });

    const isDefaultValue = attr && nestedProperty(container, attr).get() !== undefined; // eslint-disable-line no-undefined
    const defaultIndicatorClassName = classnames('field__default-indicator', {
      'field__default-indicator__is-default': Boolean(isDefaultValue),
    });

    return (
      <div className={containerClassName}>
        {!noDefaultIndicator && <div className={defaultIndicatorClassName} />}
        {label ? (
          <div
            className={bem('field', 'title')}
            style={labelWidth ? {minWidth: labelWidth + 'px'} : {}}
          >
            {this.context.showFieldTooltips ? (
              <div
                className={bem('field', 'title-text')}
                aria-label={tooltip}
                data-microtip-position="bottom-right"
                data-microtip-size="large"
                role="tooltip"
              >
                {label}
              </div>
            ) : (
              <div className={bem('field', 'title-text')}>{label}</div>
            )}
          </div>
        ) : null}
        <div className={fieldClass}>
          {children}
          {extraComponent ? extraComponent : null}
          {multiValued && !suppressMultiValuedMessage ? (
            <MenuPanel label={getMultiValueText('title', _)} ownline question>
              <div className="info__title">{getMultiValueText('title', _)}</div>
              <div className="info__text">{getMultiValueText('text', _)}</div>
              <div className="info__sub-text">{getMultiValueText('subText', _)}</div>
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
  labelWidth: PropTypes.number,
  center: PropTypes.bool,
  label: PropTypes.any,
  units: PropTypes.string,
  multiValued: PropTypes.bool,
  suppressMultiValuedMessage: PropTypes.bool,
  children: PropTypes.node,
  extraComponent: PropTypes.any,
  fieldContainerClassName: PropTypes.string,
  noDefaultIndicator: PropTypes.bool,
};

Field.contextTypes = {
  localize: PropTypes.func,
  description: PropTypes.string,
  attr: PropTypes.string,
  showFieldTooltips: PropTypes.bool,
  container: PropTypes.object,
};

Field.defaultProps = {
  center: false,
  multiValued: false,
};

FieldDelete.propTypes = {
  onClick: PropTypes.func,
};
export default Field;
