import Section from './Section';
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
    const traceType = context.fullContainer._fullInput.type;
    if (traceType === 'bar') {
      this.name = _('Bars');
    } else if (traceType === 'box') {
      this.name = _('Outliers');
    } else {
      this.name = _('Points');
    }
  }

  render() {
    return <Section name={this.name}>{this.props.children}</Section>;
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
