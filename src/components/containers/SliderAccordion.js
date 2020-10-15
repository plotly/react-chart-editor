import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectSliderToLayout} from 'lib';

const SliderFold = connectSliderToLayout(PlotlyFold);

class SliderAccordion extends Component {
  render() {
    const {
      layout: {sliders = []},
      localize: _,
    } = this.context;
    const {children} = this.props;

    const content =
      sliders.length > 0 &&
      sliders.map((sli, i) => (
        <SliderFold key={i} sliderIndex={i} name={_('Slider') + ` ${i + 1}`}>
          {children}
        </SliderFold>
      ));

    return <TraceRequiredPanel>{content ? content : null}</TraceRequiredPanel>;
  }
}

SliderAccordion.contextTypes = {
  layout: PropTypes.object,
  localize: PropTypes.func,
};

SliderAccordion.propTypes = {
  children: PropTypes.node,
};

export default SliderAccordion;
