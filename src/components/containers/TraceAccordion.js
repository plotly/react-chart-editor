import Fold from './Fold';
import PanelEmpty from 'components/containers/PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, localize} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  addTrace(onUpdate) {
    if (onUpdate) {
      onUpdate({
        type: EDITOR_ACTIONS.ADD_TRACE,
      });
    }
  }

  render() {
    const {fullData, data = []} = this.context;
    const {canAdd, children, localize: _} = this.props;

    const content =
      data.length &&
      data.map((d, i) => {
        const fullDataTrace = fullData.filter(t => t.index === i)[0];
        const isEmpty =
          !canAdd && !fullDataTrace.visible
            ? {
                messagePrimary: _('This trace does not yet have any data.'),
                messageSecondary: _(
                  'Return to the Graph > Create menu above to add data.'
                ),
              }
            : false;

        return (
          <TraceFold
            key={i}
            traceIndex={i}
            foldIndex={i}
            canDelete={canAdd}
            isEmpty={isEmpty}
          >
            {children}
          </TraceFold>
        );
      });

    return <div className="panel__content">{content}</div>;
  }
}

TraceAccordion.displayName = 'TraceAccordion';

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
