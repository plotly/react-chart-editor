import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectToContainer,
  traceTypeToPlotlyInitFigure,
  plotlyTraceToCustomTrace,
  computeTraceOptionsFromSchema,
} from 'lib';
import TraceTypeSelector, {
  TraceTypeSelectorButton,
} from 'components/widgets/TraceTypeSelector';
import Field from './Field';

class TraceSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.updatePlot = this.updatePlot.bind(this);

    this.setTraceDefaults(
      props.container,
      props.fullContainer,
      props.updateContainer
    );
    this.setLocals(props, context);
  }

  setLocals(props, context) {
    const _ = context.localize;
    if (props.traceOptions) {
      this.traceOptions = props.traceOptions;
    } else if (context.traceTypesConfig) {
      this.traceOptions = context.traceTypesConfig.traces(_);
    } else if (context.plotSchema) {
      this.traceOptions = computeTraceOptionsFromSchema(
        context.plotSchema,
        _,
        this.context
      );
    } else {
      this.traceOptions = [{label: _('Scatter'), value: 'scatter'}];
    }
    if (props.container) {
      this.fullValue = plotlyTraceToCustomTrace(props.container);
    }
  }

  setTraceDefaults(container, fullContainer, updateContainer) {
    if (
      container &&
      container.uid &&
      !container.mode &&
      fullContainer.type === 'scatter'
    ) {
      updateContainer({
        type: 'scatter',
        mode: fullContainer.mode || 'markers',
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {container, fullContainer, updateContainer} = nextProps;
    this.setTraceDefaults(container, fullContainer, updateContainer);
    this.setLocals(nextProps, nextContext);
  }

  updatePlot(value) {
    const {updateContainer} = this.props;
    if (updateContainer) {
      updateContainer(traceTypeToPlotlyInitFigure(value));
    }
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
      options: this.traceOptions,
      clearable: false,
    });
    // Check and see if the advanced selector prop is true
    const {advancedTraceTypeSelector} = this.context;
    if (advancedTraceTypeSelector) {
      return (
        <Field {...props}>
          <TraceTypeSelectorButton
            {...props}
            traceTypesConfig={this.context.traceTypesConfig}
            handleClick={() => this.context.openModal(TraceTypeSelector, props)}
          />
        </Field>
      );
    }

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.contextTypes = {
  openModal: PropTypes.func,
  advancedTraceTypeSelector: PropTypes.bool,
  traceTypesConfig: PropTypes.object,
  plotSchema: PropTypes.object,
  config: PropTypes.object,
  localize: PropTypes.func,
};

TraceSelector.propTypes = {
  container: PropTypes.object.isRequired,
  fullContainer: PropTypes.object.isRequired,
  fullValue: PropTypes.any,
  updateContainer: PropTypes.func,
};

export default connectToContainer(TraceSelector);
