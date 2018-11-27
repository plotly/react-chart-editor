import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectRangeSelectorToAxis} from 'lib';
import {EditorControlsContext} from '../../context';

const RangeSelectorFold = connectRangeSelectorToAxis(PlotlyFold);

class RangeSelectorAccordion extends Component {
  render() {
    if (
      !this.props.context.fullContainer ||
      !this.props.context.fullContainer.rangeselector ||
      !this.props.context.fullContainer.rangeselector.visible ||
      // next line checks for "all" case
      this.props.context.fullContainer._axisGroup === 0
    ) {
      return null;
    }

    const {localize: _} = this.context;
    const {
      fullContainer: {
        rangeselector: {buttons = []},
      },
    } = this.props.context;
    const {children} = this.props;

    const content =
      buttons.length &&
      buttons.map((btn, i) => (
        <RangeSelectorFold key={i} rangeselectorIndex={i} name={btn.label} canDelete={true}>
          {children}
        </RangeSelectorFold>
      ));

    const addAction = {
      label: _('Button'),
      handler: context => {
        const {fullContainer, updateContainer} = context;
        if (updateContainer) {
          const rangeselectorIndex = Array.isArray(fullContainer.rangeselector.buttons)
            ? fullContainer.rangeselector.buttons.length
            : 0;

          updateContainer({
            [`rangeselector.buttons[${rangeselectorIndex}]`]: {},
          });
        }
      },
    };

    return (
      <PlotlyPanel addAction={addAction} context={this.props.context}>
        {content ? content : null}
      </PlotlyPanel>
    );
  }
}

RangeSelectorAccordion.contextType = EditorControlsContext;

RangeSelectorAccordion.requireContext = {
  container: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
  getValObject: PropTypes.func,
};

RangeSelectorAccordion.propTypes = {
  children: PropTypes.node,
  context: PropTypes.any,
};

RangeSelectorAccordion.plotly_editor_traits = {
  no_visibility_forcing: true,
};

export default RangeSelectorAccordion;
