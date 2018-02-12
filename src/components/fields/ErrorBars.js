import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {DataSelector, Radio, Numeric} from '../index';
import {UnconnectedRadio} from './Radio';
import {connectToContainer} from 'lib';

class ErrorBars extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
  }

  updatePlot(value) {
    if (value === 'symmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: true,
      });
    }

    if (value === 'asymmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: false,
      });
    }

    if (value === 'hidden') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: false,
      });
    }
  }

  getMode() {
    let mode;

    if (!this.props.fullValue.visible) {
      mode = 'hidden';
    }

    if (this.props.fullValue.visible && this.props.fullValue.symmetric) {
      mode = 'symmetric';
    }

    if (this.props.fullValue.visible && !this.props.fullValue.symmetric) {
      mode = 'asymmetric';
    }

    return mode;
  }

  renderModeSelector() {
    const {localize: _} = this.props;

    return (
      <UnconnectedRadio
        label={_('Type')}
        updatePlot={this.updatePlot}
        activeOption={this.getMode()}
        options={[
          {label: _('Symmetric'), value: 'symmetric'},
          {label: _('Asymmetric'), value: 'asymmetric'},
          {label: _('Hidden'), value: 'hidden'},
        ]}
      />
    );
  }

  renderErrorBarControls() {
    const {localize: _} = this.props;
    const mode = this.getMode();

    if (mode === 'symmetric') {
      return (
        <Fragment>
          <Radio
            label={_('Symmetric Error Type')}
            attr={`${this.props.attr}.type`}
            options={[
              {label: _('%'), value: 'percent'},
              {label: _('Constant'), value: 'constant'},
              {label: _('√'), value: 'sqrt'},
            ]}
          />
          <Numeric label={_('Value')} attr={`${this.props.attr}.value`} />
        </Fragment>
      );
    }

    if (mode === 'asymmetric') {
      return (
        <Fragment>
          <DataSelector
            label={_(`Error (+)`)}
            attr={`${this.props.attr}.array`}
          />
          <DataSelector
            label={_(`Error (-)`)}
            attr={`${this.props.attr}.arrayminus`}
          />
        </Fragment>
      );
    }

    return null;
  }

  render() {
    return (
      <Fragment>
        {this.renderModeSelector()}
        {this.renderErrorBarControls()}
      </Fragment>
    );
  }
}

ErrorBars.propTypes = {
  attr: PropTypes.string,
  localize: PropTypes.func,
  fullValue: PropTypes.object,
  updatePlot: PropTypes.func,
};

export default connectToContainer(ErrorBars);
