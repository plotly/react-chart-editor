import React from 'react';
import PropTypes from 'prop-types';
import {
  CanvasSize,
  ColorPicker,
  FontSelector,
  Fold,
  Numeric,
  Radio,
  TextEditor,
  Section,
  TraceRequiredPanel,
} from '../components';

import {localize} from '../lib';

const StyleLayoutPanel = ({visible, localize: _}) => (
  <TraceRequiredPanel visible={visible}>
    <Fold name={_('Canvas')}>
      <Radio
        attr="autosize"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
      />
      <CanvasSize label={_('Fixed Width')} attr="width" units="px" />
      <CanvasSize label={_('Fixed Height')} attr="height" units="px" />
      <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
      <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
    </Fold>
    <Fold name={_('Title and Fonts')}>
      <Section name={_('Title')}>
        <TextEditor attr="title" />
        <FontSelector
          label={_('Typeface')}
          attr="titlefont.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="titlefont.color" />
      </Section>
      <Section name={_('Global Font')}>
        <FontSelector
          label={_('Typeface')}
          attr="font.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="font.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="font.color" />
      </Section>
    </Fold>
    <Fold name={_('Margins and Padding')}>
      <Numeric label={_('Top')} attr="margin.t" units="px" />
      <Numeric label={_('Bottom')} attr="margin.b" units="px" />
      <Numeric label={_('Left')} attr="margin.l" units="px" />
      <Numeric label={_('Right')} attr="margin.r" units="px" />
      <Numeric label={_('Padding')} attr="margin.pad" units="px" />
    </Fold>
  </TraceRequiredPanel>
);

StyleLayoutPanel.propTypes = {
  localize: PropTypes.func,
  visible: PropTypes.bool,
};

export default localize(StyleLayoutPanel);
