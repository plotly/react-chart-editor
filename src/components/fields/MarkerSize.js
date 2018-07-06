import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';
import RadioBlocks from '../widgets/RadioBlocks';
import Numeric from './Numeric';
import DataSelector from './DataSelector';

const getType = value => (Array.isArray(value) ? 'variable' : 'constant');

class UnconnectedMarkerSize extends Component {
  constructor(props, context) {
    super(props, context);

    const type = getType(props.fullValue);
    this.state = {
      type,
      value: {
        constant: type === 'constant' ? props.fullValue : '6',
        variable: type === 'variable' ? props.fullValue : null,
      },
    };

    this.setType = this.setType.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  setType(type) {
    this.setState({type: type});
    this.props.updatePlot(this.state.value[type]);
    if (type === 'constant') {
      this.context.updateContainer({['marker.sizesrc']: null});
    }
  }

  setValue(inputValue) {
    const {type} = this.state;

    this.setState(
      type === 'constant'
        ? {value: {constant: inputValue}}
        : {value: {variable: inputValue}}
    );
    this.props.updatePlot(inputValue);
  }

  render() {
    const {attr} = this.props;
    const {localize: _} = this.context;
    const options = [
      {label: _('Constant'), value: 'constant'},
      {label: _('Variable'), value: 'variable'},
    ];

    return (
      <div>
        <Field {...this.props} attr={attr}>
          <RadioBlocks
            options={options}
            activeOption={this.state.type}
            onOptionChange={this.setType}
          />
          {this.state.type === 'constant' ? (
            <Numeric
              attr="marker.size"
              updatePlot={this.setValue}
              fullValue={this.state.value.constant}
            />
          ) : (
            <DataSelector
              attr="marker.size"
              updatePlot={this.setValue}
              fullValue={this.state.value.variable}
            />
          )}
        </Field>
      </div>
    );
  }
}

UnconnectedMarkerSize.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedMarkerSize.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default connectToContainer(UnconnectedMarkerSize);
