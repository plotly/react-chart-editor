import Fold from './Fold';
import Panel from './Panel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectRangeSelectorToAxis, localize} from 'lib';

const RangeSelectorFold = connectRangeSelectorToAxis(Fold);

class RangeSelectorAccordion extends Component {
  render() {
    if (
      !this.context.fullContainer ||
      !this.context.fullContainer.rangeselector ||
      !this.context.fullContainer.rangeselector.visible ||
      // next line checks for "all" case
      this.context.fullContainer._axisGroup === 0
    ) {
      return null;
    }

    const {fullContainer: {rangeselector: {buttons = []}}} = this.context;
    const {children, localize: _} = this.props;

    const content =
      buttons.length &&
      buttons.map((btn, i) => (
        <RangeSelectorFold
          key={i}
          rangeselectorIndex={i}
          name={btn.label}
          canDelete={true}
        >
          {children}
        </RangeSelectorFold>
      ));

    const addAction = {
      label: _('Button'),
      handler: context => {
        const {fullContainer, updateContainer} = context;
        if (updateContainer) {
          const rangeselectorIndex = Array.isArray(
            fullContainer.rangeselector.buttons
          )
            ? fullContainer.rangeselector.buttons.length
            : 0;

          updateContainer({
            [`rangeselector.buttons[${rangeselectorIndex}]`]: {},
          });
        }
      },
    };

    return <Panel addAction={addAction}>{content ? content : null}</Panel>;
  }
}

RangeSelectorAccordion.contextTypes = {
  fullContainer: PropTypes.object,
};

RangeSelectorAccordion.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
};

RangeSelectorAccordion.plotly_editor_traits = {
  no_visibility_forcing: true,
};

export default localize(RangeSelectorAccordion);
