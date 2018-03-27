import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectSliderToLayout, localize} from 'lib';

const SliderFold = connectSliderToLayout(PlotlyFold);

class SliderAccordion extends Component {
  render() {
    const {layout: {sliders = []}} = this.context;
    const {children, localize: _} = this.props;

    const content =
      sliders.length > 0 &&
      sliders.map((sli, i) => (
        <SliderFold key={i} sliderIndex={i} name={_('Slider') + ` ${i + 1}`}>
          {children}
        </SliderFold>
      ));

    return (
      <TraceRequiredPanel
        extraConditions={[() => sliders.length > 0]}
        extraEmptyPanelMessages={[
          {
            heading: _('There are no sliders to style in your plot'),
            message: '',
          },
        ]}
      >
        {content ? content : null}
      </TraceRequiredPanel>
    );
  }
}

SliderAccordion.contextTypes = {
  layout: PropTypes.object,
};

SliderAccordion.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
};

export default localize(SliderAccordion);
