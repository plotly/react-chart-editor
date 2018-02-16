import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectToContainer,
  traceTypeToPlotlyInitFigure,
  localize,
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

    let fillMeta;
    if (props.getValObject) {
      fillMeta = props.getValObject('fill');
    }
    if (fillMeta) {
      this.fillTypes = fillMeta.values.filter(v => v !== 'none');
    } else {
      this.fillTypes = [
        'tozeroy',
        'tozerox',
        'tonexty',
        'tonextx',
        'toself',
        'tonext',
      ];
    }
    this.setTraceDefaults(
      props.container,
      props.fullContainer,
      props.updateContainer
    );
    this.setLocals(props, context);
  }

  setLocals(props, context) {
    const _ = props.localize;
    if (props.traceOptions) {
      this.traceOptions = props.traceOptions;
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
      fullContainer._fullInput.type === 'scatter'
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
    // Check and see if the advanced slector prop is true
    const {advancedTraceTypeSelector} = this.context;
    if (advancedTraceTypeSelector) {
      return (
        <Field {...props}>
          <TraceTypeSelectorButton
            {...props}
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
  plotSchema: PropTypes.object,
  config: PropTypes.object,
};

TraceSelector.propTypes = {
  getValObject: PropTypes.func,
  container: PropTypes.object.isRequired,
  fullContainer: PropTypes.object.isRequired,
  fullValue: PropTypes.any.isRequired,
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default connectToContainer(localize(TraceSelector));
