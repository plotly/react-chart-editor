import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import Field from './Field';
import Numeric from './Numeric';
import Dropdown from './Dropdown';

class UnconnectedAspectRatio extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mode: props.container.scene.aspectmode,
    };

    this.setMode = this.setMode.bind(this);
  }

  setMode(mode) {
    this.setState({mode: mode});
    this.props.updatePlot(mode);
  }

  render() {
    const {localize: _} = this.context;
    const {mode} = this.state;

    return (
      <Fragment>
        <Dropdown
          attr="scene.aspectmode"
          options={[
            {label: _('Auto'), value: 'mode'},
            {label: _('Cube'), value: 'cube'},
            {label: _('Data'), value: 'data'},
            {label: _('Manual'), value: 'manual'},
          ]}
          fullValue={mode}
          updatePlot={this.setMode}
          clearable={false}
        />
        {mode !== 'manual' ? (
          ''
        ) : (
          <Fragment>
            <Numeric label={_('X')} attr="scene.aspectratio.x" step={0.1} />
            <Numeric label={_('Y')} attr="scene.aspectratio.y" step={0.1} />
            <Numeric label={_('Z')} attr="scene.aspectratio.z" step={0.1} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

UnconnectedAspectRatio.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedAspectRatio.contextTypes = {
  localize: PropTypes.func,
};

export default connectToContainer(UnconnectedAspectRatio);
