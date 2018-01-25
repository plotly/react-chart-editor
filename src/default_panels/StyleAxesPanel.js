import React from 'react';
import PropTypes from 'prop-types';
import {
  AxesSelector,
  AxesRange,
  ColorPicker,
  FontSelector,
  Numeric,
  Radio,
  TextEditor,
  Section,
  TraceRequiredPanel,
  AxesFold,
} from '../components';

import {localize} from '../lib';

const StyleAxesPanel = ({visible, localize: _}) => (
  <TraceRequiredPanel visible={visible}>
    <AxesFold name={_('Titles')}>
      <AxesSelector />
      <TextEditor attr="title" />
      <FontSelector label={_('Typeface')} attr="titlefont.family" />
      <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
      <ColorPicker label={_('Font Color')} attr="titlefont.color" />
    </AxesFold>

    <AxesFold name={_('Range')}>
      <AxesSelector />
      <Section name={_('Selection')}>
        <Radio
          attr="autorange"
          options={[
            {label: _('Auto'), value: true},
            {label: _('Custom'), value: false},
          ]}
        />
        <AxesRange label={_('Min')} attr="range[0]" />
        <AxesRange label={_('Max')} attr="range[1]" />
        <Radio
          attr="type"
          options={[
            {label: _('Linear'), value: 'linear'},
            {label: _('log'), value: 'log'},
          ]}
        />
      </Section>
    </AxesFold>

    <AxesFold name={_('Lines')}>
      <AxesSelector />
    </AxesFold>
    <AxesFold name={_('Tick Labels')}>
      <AxesSelector />
      <Section name={_('Tick Labels')}>
        <FontSelector label={_('Typeface')} attr="tickfont.family" />
        <Numeric label={_('Font Size')} attr="tickfont.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="tickfont.color" />
      </Section>
    </AxesFold>
    <AxesFold name={_('Tick Markers')}>
      <AxesSelector />
    </AxesFold>
    <AxesFold name={_('Zoom Interactivity')}>
      <AxesSelector />
    </AxesFold>
    <AxesFold name={_('Layout')}>
      <AxesSelector />
    </AxesFold>
  </TraceRequiredPanel>
);

StyleAxesPanel.propTypes = {
  localize: PropTypes.func,

  visible: PropTypes.bool,
};

export default localize(StyleAxesPanel);
