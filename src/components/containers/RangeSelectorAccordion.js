import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectRangeSelectorToAxis, getParsedTemplateString} from 'lib';

const RangeSelectorFold = connectRangeSelectorToAxis(PlotlyFold);

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

    const {
      fullContainer: {
        rangeselector: {buttons = []},
      },
      localize: _,
      layout: meta,
    } = this.context;
    const {children} = this.props;

    const content =
      buttons.length &&
      buttons.map((btn, i) => (
        <RangeSelectorFold
          key={i}
          rangeselectorIndex={i}
          name={getParsedTemplateString(btn.label, {meta})}
          canDelete={true}
        >
          {children}
        </RangeSelectorFold>
      ));

    const addAction = {
      label: _('Button'),
      handler: (context) => {
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

    return <PlotlyPanel addAction={addAction}>{content ? content : null}</PlotlyPanel>;
  }
}

RangeSelectorAccordion.contextTypes = {
  fullContainer: PropTypes.object,
  localize: PropTypes.func,
  layout: PropTypes.object,
};

RangeSelectorAccordion.propTypes = {
  children: PropTypes.node,
};

RangeSelectorAccordion.plotly_editor_traits = {
  no_visibility_forcing: true,
};

export default RangeSelectorAccordion;
