import PlotlySection from './PlotlySection';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import localize from 'lib/localize';

class TraceMarkerSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextContext);
  }

  setLocals(context) {
    const _ = this.props.localize;
    const traceType = context.fullContainer.type;
    if (['bar', 'histogram'].includes(traceType)) {
      this.name = _('Bars');
    } else {
      this.name = _('Points');
    }
  }

  render() {
    return (
      <PlotlySection name={this.name}>{this.props.children}</PlotlySection>
    );
  }
}

TraceMarkerSection.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
  name: PropTypes.string,
};

TraceMarkerSection.contextTypes = {
  fullContainer: PropTypes.object,
};

export default localize(TraceMarkerSection);
