import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import Field from './Field';
import Numeric from './Numeric';
import Radio from './Radio';

class UnconnectedCanvasSize extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      auto: props.container.autosize,
      width: props.container.width || props.fullContainer.width || '',
      height: props.container.height || props.fullContainer.height || '',
    };

    this.setAuto = this.setAuto.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }

  setAuto(auto) {
    this.setState({auto: auto});
    this.props.updatePlot(auto);
    this.context.updateContainer(
      auto
        ? {width: '', height: ''}
        : {width: this.state.width, height: this.state.height}
    );
  }

  setWidth(inputValue) {
    this.setState({width: inputValue});
    this.props.updateContainer({width: inputValue});
  }

  setHeight(inputValue) {
    this.setState({height: inputValue});
    this.props.updateContainer({height: inputValue});
  }

  render() {
    const {attr} = this.props;
    const {localize: _} = this.context;
    const {auto, width, height} = this.state;

    return (
      <div>
        <Radio
          attr={attr}
          label={_('Size')}
          options={[
            {label: _('Auto'), value: true},
            {label: _('Custom'), value: false},
          ]}
          fullValue={auto}
          updatePlot={this.setAuto}
        />
        {auto ? (
          ''
        ) : (
          <div>
            <Numeric
              label={_('Fixed Width')}
              suppressMultiValuedMessage
              attr="width"
              updatePlot={this.setWidth}
              fullValue={width}
              units="px"
            />
            <Numeric
              label={_('Fixed height')}
              suppressMultiValuedMessage
              attr="height"
              updatePlot={this.setHeight}
              fullValue={height}
              units="px"
            />
          </div>
        )}
      </div>
    );
  }
}

UnconnectedCanvasSize.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedCanvasSize.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default connectToContainer(UnconnectedCanvasSize);
