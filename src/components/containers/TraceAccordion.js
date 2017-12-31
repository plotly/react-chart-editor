import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot, bem} from 'lib';
import {PanelHeader, PanelEmpty} from 'components/containers/Panel';
import Button from 'components/Button';
import PlusIcon from 'mdi-react/PlusIcon';

const TraceFold = connectTraceToPlot(Fold);

export default class TraceAccordion extends Component {
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
    const {canAdd, children} = this.props;

    const addButton = canAdd && (
      <Button
        className="js-add-trace-button"
        variant="primary"
        onClick={this.addTrace}
        icon={<PlusIcon />}
        label="Trace"
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
              Looks like there are no traces selected yet, head back to the
              Create section to adjust the data.
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
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};
