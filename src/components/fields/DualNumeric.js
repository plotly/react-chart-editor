import Field from './Field';
import NumericInput from '../widgets/NumericInput';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';
import nestedProperty from 'plotly.js/src/lib/nested_property';

export class UnconnectedDualNumericFraction extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
    this.updatePlot2 = this.updatePlot2.bind(this);
  }

  updatePlot(value) {
    this.props.updatePlot(this.props.percentage ? value / 100 : value);
  }

  updatePlot2(value) {
    this.props.updateContainer({
      [this.props.attr2]: this.props.percentage ? value / 100 : value,
    });
  }

  render() {
    const {percentage, multiValued, attr2, step, min, max} = this.props;
    let fullValue = percentage ? Math.round(100 * this.props.fullValue) : this.props.fullValue;
    let fullValue2 = nestedProperty(this.context.fullContainer, attr2).get();
    if (percentage) {
      fullValue2 = Math.round(100 * fullValue2);
    }
    let placeholder;
    let placeholder2;
    if (multiValued) {
      placeholder = fullValue;
      placeholder2 = fullValue2;
      fullValue = '';
      fullValue2 = '';
    }

    return (
      <Field {...this.props}>
        <div className="numeric-input__wrapper">
          <NumericInput
            value={fullValue}
            defaultValue={this.props.defaultValue}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            onChange={this.updatePlot}
            onUpdate={this.updatePlot}
            showArrows={!this.props.hideArrows}
            showSlider={false}
          />
          <NumericInput
            value={fullValue2}
            defaultValue={this.props.defaultValue}
            placeholder={placeholder2}
            step={step}
            min={min}
            max={max}
            onChange={this.updatePlot2}
            onUpdate={this.updatePlot2}
            showArrows={!this.props.hideArrows}
            showSlider={false}
          />
        </div>
      </Field>
    );
  }
}

UnconnectedDualNumericFraction.propTypes = {
  defaultValue: PropTypes.any,
  fullValue: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  multiValued: PropTypes.bool,
  hideArrows: PropTypes.bool,
  showSlider: PropTypes.bool,
  step: PropTypes.number,
  updatePlot: PropTypes.func,
  attr2: PropTypes.any,
  percentage: PropTypes.bool,
  ...Field.propTypes,
};

UnconnectedDualNumericFraction.contextTypes = {
  fullContainer: PropTypes.object,
};

UnconnectedDualNumericFraction.displayName = 'UnconnectedDualNumericFraction';

export default connectToContainer(UnconnectedDualNumericFraction);
