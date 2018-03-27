import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageAccordion,
  Radio,
  Dropzone,
  PositioningNumeric,
  PlotlySection,
  PositioningRef,
  Dropdown,
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

    <Dropzone attr="source" fileType={_('image')} show />

    <Dropdown
      label={_('Aspect Ratio')}
      attr="sizing"
      options={[
        {label: _('Contain'), value: 'contain'},
        {label: _('Fill'), value: 'fill'},
        {label: _('Stretch'), value: 'stretch'},
      ]}
      clearable={false}
    />
    <PositioningNumeric attr="sizex" label={_('Width')} />
    <PositioningNumeric attr="sizey" label={_('Height')} />
    <PlotlySection name={_('Horizontal Positioning')}>
      <Dropdown
        label={_('Anchor Point')}
        clearable={false}
        attr="xanchor"
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
      />
      <PositioningNumeric label={_('Position')} attr="x" />
      <PositioningRef label={_('Relative To')} attr="xref" />
    </PlotlySection>

    <PlotlySection name={_('Vertical Positioning')}>
      <Dropdown
        label={_('Anchor Point')}
        clearable={false}
        attr="yanchor"
        options={[
          {label: _('Top'), value: 'top'},
          {label: _('Middle'), value: 'middle'},
          {label: _('Bottom'), value: 'bottom'},
        ]}
      />
      <PositioningNumeric label={_('Position')} attr="y" />
      <PositioningRef label={_('Relative To')} attr="yref" />
    </PlotlySection>
  </ImageAccordion>
);

StyleImagesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleImagesPanel);
