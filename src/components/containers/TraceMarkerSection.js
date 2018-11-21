import PlotlySection from './PlotlySection';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EditorControlsContext} from '../../context';

class TraceMarkerSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    const _ = context.localize;
    const traceType = props.context.fullContainer.type;
    if (['bar', 'histogram'].includes(traceType)) {
      this.name = _('Bars');
    } else if (traceType === 'pie') {
      this.name = _('Pie Segments');
    } else {
      this.name = _('Points');
    }
  }

  render() {
    return <PlotlySection name={this.name}>{this.props.children}</PlotlySection>;
  }
}

TraceMarkerSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

TraceMarkerSection.contextType = EditorControlsContext;
TraceMarkerSection.requireContext = {
  fullContainer: PropTypes.object,
};

export default TraceMarkerSection;
