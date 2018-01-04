import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectToContainer,
  customTraceToPlotlyTrace,
  plotlyTraceToCustomTrace,
} from 'lib';

function computeTraceOptionsFromSchema(schema) {
  const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);

  // Filter out Polar "area" type as it is fairly broken and we want to present
  // scatter with fill as an "area" chart type for convenience.
  const traceTypes = Object.keys(schema.traces).filter(t => t !== 'area');

  const labels = traceTypes.map(capitalize);
  const traceOptions = traceTypes.map((t, i) => ({
    label: labels[i],
    value: t,
  }));

  const i = traceOptions.findIndex(opt => opt.value === 'scatter');
  traceOptions.splice(
    i + 1,
    0,
    {label: 'Line', value: 'line'},
    {label: 'Area', value: 'area'}
  );

  return traceOptions;
}

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
    if (props.traceOptions) {
      this.traceOptions = props.traceOptions;
    } else if (context.plotSchema) {
      this.traceOptions = computeTraceOptionsFromSchema(context.plotSchema);
    } else {
      this.traceOptions = [{label: 'Scatter', value: 'scatter'}];
    }
    this.fullValue = plotlyTraceToCustomTrace(props.container);
  }

  setTraceDefaults(container, fullContainer, updateContainer) {
    if (!container.mode && fullContainer.type === 'scatter') {
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
    const update = customTraceToPlotlyTrace(value);
    if (this.props.updateContainer) {
      this.props.updateContainer(update);
    }
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
      options: this.traceOptions,
    });

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.contextTypes = {
  plotSchema: PropTypes.object,
};

TraceSelector.propTypes = {
  getValObject: PropTypes.func,
  container: PropTypes.object.isRequired,
  fullContainer: PropTypes.object.isRequired,
  fullValue: PropTypes.any.isRequired,
  updateContainer: PropTypes.func,
};

export default connectToContainer(TraceSelector);
