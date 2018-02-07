import Fold from './Fold';
import TraceRequiredPanel from './TraceRequiredPanel';
import Panel from './Panel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, localize} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  render() {
    const {data = []} = this.context;
    const {canAdd, children, messageIfEmptyFold, localize: _} = this.props;

    const content =
      data.length &&
      data.map((d, i) => {
        return (
          <TraceFold
            key={i}
            traceIndex={i}
            canDelete={canAdd}
            messageIfEmpty={messageIfEmptyFold}
          >
            {children}
          </TraceFold>
        );
      });

    if (canAdd) {
      const addAction = {
        label: _('Trace'),
        handler: ({onUpdate}) => {
          if (onUpdate) {
            onUpdate({
              type: EDITOR_ACTIONS.ADD_TRACE,
            });
          }
        },
      };
      return <Panel addAction={addAction}>{content ? content : null}</Panel>;
    }
    return <TraceRequiredPanel>{content ? content : null}</TraceRequiredPanel>;
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
};

TraceAccordion.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.node,
  canAdd: PropTypes.bool,
  messageIfEmptyFold: PropTypes.string,
};

export default localize(TraceAccordion);
