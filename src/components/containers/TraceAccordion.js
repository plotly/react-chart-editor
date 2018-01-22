import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, localize} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  render() {
    const {data = []} = this.context;
    const {canAdd, children} = this.props;

    const content =
      data.length &&
      data.map((d, i) => {
        return (
          <TraceFold key={i} traceIndex={i} foldIndex={i} canDelete={canAdd}>
            {children}
          </TraceFold>
        );
      });

    return <div className="panel__content">{content ? content : null}</div>;
  }
}

TraceAccordion.plotly_editor_traits = {
  add_action: {
    label: 'Trace',
    handler: ({onUpdate}) => {
      if (onUpdate) {
        onUpdate({
          type: EDITOR_ACTIONS.ADD_TRACE,
        });
      }
    },
  },
};

TraceAccordion.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
};

TraceAccordion.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default localize(TraceAccordion);
