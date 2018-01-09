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
        const isEmpty = !canAdd && !fullDataTrace.visible;

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

    const emptyState = !canAdd &&
      (!data.length || (data.length === 1 && !fullData[0].visible)) && (
        <PanelEmpty
          heading="There aren't any traces."
          message={
            <p>
              {_(
                "Looks like there aren't any traces defined yet. Go to the 'Create'\n" +
                  '              tab to define some traces.'
              )}
            </p>
          }
        />
      );

    return (
      <div className="panel__content">
        {emptyState ? emptyState : null}
        {content ? content : null}
      </div>
    );
  }
}

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
