import PlotlySection from './PlotlySection';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TraceMarkerSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextContext);
  }

  setLocals(context) {
    const _ = this.context.localize;
    const traceType = context.fullContainer.type;
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

TraceMarkerSection.contextTypes = {
  fullContainer: PropTypes.object,
  localize: PropTypes.func,
};

export default TraceMarkerSection;
