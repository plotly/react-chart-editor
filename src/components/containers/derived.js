import React, {Component} from 'react';
import PlotlyPanel from './PlotlyPanel';
import PlotlySection from './PlotlySection';
import PropTypes from 'prop-types';
import {connectLayoutToPlot, containerConnectedContextTypes} from 'lib';
import {EditorControlsContext} from '../../context';

const LayoutPanel = connectLayoutToPlot(PlotlyPanel);
const LayoutSection = connectLayoutToPlot(PlotlySection);

class TraceTypeSection extends Component {
  render() {
    const {
      mode,
      traceTypes,
      context: {fullContainer},
    } = this.props;
    const {fullData} = this.context;

    const ifConnectedToTrace =
      mode === 'trace' && fullContainer && traceTypes.includes(fullContainer.type);

    const ifConnectedToLayout =
      mode === 'layout' && fullData && fullData.some(t => traceTypes.includes(t.type));

    if (ifConnectedToTrace || ifConnectedToLayout) {
      const {context, ...rest} = this.props;
      const newContext = {...context, ...this.context};
      return <PlotlySection {...rest} context={newContext} />;
    }

    return null;
  }
}

TraceTypeSection.requireContext = containerConnectedContextTypes;
TraceTypeSection.contextType = EditorControlsContext;
TraceTypeSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  traceTypes: PropTypes.array,
  mode: PropTypes.string,
  context: PropTypes.any,
};

TraceTypeSection.defaultProps = {
  traceTypes: [],
  mode: 'layout',
};

export {LayoutPanel, LayoutSection, TraceTypeSection};
