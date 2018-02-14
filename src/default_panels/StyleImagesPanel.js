import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageAccordion,
  Radio,
  TextEditor,
  Numeric,
  Section,
  PositioningRef,
  Dropdown,
  MenuPanel,
} from '../components';

import {localize} from '../lib';

const StyleImagesPanel = ({localize: _}) => (
  <ImageAccordion canAdd>
    <Radio
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <TextEditor attr="source" label={_('Source')} show />

    <Dropdown
      label={_('Aspect Ratio')}
      attr="sizing"
      options={[
        {label: _('Contain'), value: 'contain'},
        {label: _('Fill'), value: 'fill'},
        {label: _('Stretch'), value: 'stretch'},
      ]}
    />
    <Numeric attr="sizex" label={_('Width')} />
    <Numeric attr="sizey" label={_('Height')} />
    <Section name={_('Horizontal Positioning')}>
      <MenuPanel>
        <Section name={_('Anchor Point')}>
          <Radio
            attr="xanchor"
            options={[
              {label: _('Left'), value: 'left'},
              {label: _('Center'), value: 'center'},
              {label: _('Right'), value: 'right'},
            ]}
          />
        </Section>
      </MenuPanel>
      <PositioningRef label={_('Relative To')} attr="xref" />
      <Numeric label={_('Position')} attr="x" hideArrows />
    </Section>

    <Section name={_('Vertical Positioning')}>
      <MenuPanel>
        <Section name={_('Anchor Point')}>
          <Radio
            attr="yanchor"
            options={[
              {label: _('Top'), value: 'top'},
              {label: _('Middle'), value: 'middle'},
              {label: _('Bottom'), value: 'bottom'},
            ]}
          />
        </Section>
      </MenuPanel>
      <PositioningRef label={_('Relative To')} attr="yref" />
      <Numeric label={_('Position')} attr="y" hideArrows />
    </Section>
  </ImageAccordion>
);

StyleImagesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleImagesPanel);
