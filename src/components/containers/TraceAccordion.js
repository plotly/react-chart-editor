import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, bem, localize} from 'lib';
import {PanelHeader, PanelEmpty} from 'components/containers/Panel';
import Button from 'components/widgets/Button';

import {PlusIcon} from 'plotly-icons';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  constructor(props) {
    super(props);

    this.addTrace = this.addTrace.bind(this);
  }

  addTrace() {
    if (this.context.onUpdate) {
      this.context.onUpdate({
        type: EDITOR_ACTIONS.ADD_TRACE,
      });
    }
  }

  render() {
    const data = this.context.data || [];
    const {canAdd, children, localize: _} = this.props;

    const addButton = canAdd && (
      <Button
        className="js-add-trace-button"
        variant="primary"
        onClick={this.addTrace}
        icon={<PlusIcon />}
        label={_('Trace')}
      />
    );

    const panelHeader = canAdd && <PanelHeader action={addButton} />;

    const content = data.map((d, i) => (
      <TraceFold key={i} traceIndex={i}>
        {children}
      </TraceFold>
    ));

    const emptyState = data.length &&
      !data[0].x &&
      !canAdd && (
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
      <div className={bem('panel', 'content')}>
        {emptyState}
        {panelHeader}
        {content}
      </div>
    );
  }
}

TraceAccordion.contextTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func,
};

TraceAccordion.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default localize(TraceAccordion);
