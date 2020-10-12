import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import Field from './Field';
import RadioBlocks from '../widgets/RadioBlocks';
import NumericInput from '../widgets/NumericInput';

export class UnconnectedHoverLabelNameLength extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: this.getCurrentOption(props),
    };
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  getCurrentOption(props) {
    return props.fullValue > 0 ? 'clip' : props.fullValue === 0 ? 'hide' : 'no-clip';
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.fullValue !== this.props.fullValue) {
      this.setState({
        currentOption: this.getCurrentOption(nextProps),
      });
    }
  }

  onOptionChange(option) {
    if (this.state.currentOption !== 'clip' && option === 'clip') {
      // this allows us to go back to plotly.js default if we've
      // clicked away from the 'clip' option.
      this.props.updatePlot(15); //eslint-disable-line
      return;
    }
    if (option === 'no-clip') {
      this.props.updatePlot(-1);
      return;
    }
    if (option === 'hide') {
      this.props.updatePlot(0);
      return;
    }
  }

  render() {
    const _ = this.context.localize;

    return (
      <Field {...this.props}>
        <RadioBlocks
          activeOption={this.state.currentOption}
          options={[
            {label: _('Clip To'), value: 'clip'},
            {label: _('No Clip'), value: 'no-clip'},
            {label: _('Hide'), value: 'hide'},
          ]}
          onOptionChange={this.onOptionChange}
        />
        <div style={{height: '10px', width: '100%'}} />
        {this.state.currentOption === 'clip' ? (
          <NumericInput
            value={this.props.fullValue}
            onChange={this.props.updatePlot}
            onUpdate={this.props.updatePlot}
            units="px"
          />
        ) : null}
      </Field>
    );
  }
}

UnconnectedHoverLabelNameLength.propTypes = {
  fullValue: PropTypes.number,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedHoverLabelNameLength.contextTypes = {
  localize: PropTypes.func,
};

UnconnectedHoverLabelNameLength.displayName = 'UnconnectedHoverLabelNameLength';

export default connectToContainer(UnconnectedHoverLabelNameLength, {
  modifyPlotProps: (props, context, plotProps) => {
    const {container} = plotProps;
    plotProps.isVisible =
      (container.hoverinfo && container.hoverinfo.includes('name')) ||
      container.hovertemplate ||
      container.hovertemplate === ' ';
  },
});
