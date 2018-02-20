import DropdownWidget from '../widgets/Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Field from './Field';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer, localize} from 'lib';
import {EDITOR_ACTIONS} from 'lib/constants';

export class UnconnectedSubplotTracePicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
  }

  updatePlot(value) {
    this.props.updateSubplotTraces(value, this.props.subplotIndex);
    this.context.onUpdate({
      type: EDITOR_ACTIONS.LINK_TRACE_TO_SUBPLOT,
      payload: {
        ...this.props.subplotInfo,
        linkedTraceIndices: [...this.props.linkedTraceIndices],
      },
    });
  }

  getTraceOptions() {
    return this.context.data.map((trace, i) => {
      return {label: trace.name || `Trace ${i}`, value: i};
    });
  }

  render() {
    const {localize: _} = this.props;
    return (
      <Field {...this.props} label={_('Link Traces')}>
        <DropdownWidget
          options={this.getTraceOptions()}
          value={this.props.linkedTraceIndices}
          onChange={this.updatePlot}
          multi
          clearable={true}
        />
      </Field>
    );
  }
}

UnconnectedSubplotTracePicker.propTypes = {
  localize: PropTypes.func,
  linkedTraceIndices: PropTypes.array,
  subplotInfo: PropTypes.object,
  subplotIndex: PropTypes.number,
  container: PropTypes.object,
  updateSubplotTraces: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedSubplotTracePicker.contextTypes = {
  data: PropTypes.array,
  layout: PropTypes.object,
  fullLayout: PropTypes.object,
  onUpdate: PropTypes.func,
};

function modifyPlotProps(props, context, plotProps) {
  context.container = context.layout;
  context.fullContainer = context.fullLayout;
}

export default localize(
  connectToContainer(UnconnectedSubplotTracePicker, {
    modifyPlotProps,
  })
);
