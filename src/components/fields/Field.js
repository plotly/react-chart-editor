import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MenuPanel from '../containers/MenuPanel';
import classnames from 'classnames';
import {bem} from 'lib';
import {getMultiValueText} from 'lib/constants';
import {CloseIcon} from 'plotly-icons';
import {EditorControlsContext} from '../../context';
import {recursiveMap} from '../../lib/recursiveMap';

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

    let tooltip = this.context.attr;
    if (this.context.description) {
      tooltip += ' – ' + this.context.description.replace(/`/g, '"').replace(/\*/g, '"');
    }

    const containerClassName = classnames(bem('field'), {
      [fieldContainerClassName]: Boolean(fieldContainerClassName),
    });

    return (
      <EditorControlsContext.Consumer>
        {({localize: _}) => (
          <div className={containerClassName}>
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
              {recursiveMap(children, this.props.context)}
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
        )}
      </EditorControlsContext.Consumer>
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
  context: PropTypes.any,
};

Field.requireContext = {
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
  description: PropTypes.string,
  attr: PropTypes.string,
};

Field.defaultProps = {
  center: false,
  multiValued: false,
};

FieldDelete.propTypes = {
  onClick: PropTypes.func,
};
export default Field;
