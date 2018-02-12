import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {DataSelector, Radio, Numeric} from '../index';
import {UnconnectedRadio} from './Radio';
import {connectToContainer} from 'lib';

class ErrorBars extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mode: 'hidden',
    };

    if (props.fullValue.visible) {
      if (props.fullValue.symmetric) {
        this.state.mode = 'symmetric';
      } else {
        this.state.mode = 'custom';
      }
    }
  }

  renderModeSelector() {
    const {localize: _} = this.props;

    return (
      <UnconnectedRadio
        label={_('Type')}
        updatePlot={value => this.setState({mode: value})}
        activeOption={this.state.mode}
        options={[
          {label: _('Symmetric'), value: 'symmetric'},
          {label: _('Custom'), value: 'custom'},
          {label: _('Disable'), value: 'hidden'},
        ]}
      />
    );
  }

  renderErrorBarControls() {
    const {localize: _} = this.props;

    if (this.state.mode === 'symmetric') {
      if (!this.props.fullValue.visible || !this.props.fullValue.symmetric) {
        this.props.updatePlot({
          ...this.props.fullValue,
          visible: true,
          symmetric: true,
        });
      }

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

    if (this.state.mode === 'custom') {
      if (!this.props.fullValue.visible || this.props.fullValue.symmetric) {
        this.props.updatePlot({
          ...this.props.fullValue,
          visible: true,
          symmetric: false,
        });
      }

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
