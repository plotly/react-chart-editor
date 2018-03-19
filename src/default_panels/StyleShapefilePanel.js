import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Dropzone,
  ShapefileAccordion,
  ColorPicker,
  NumericFraction,
  Numeric,
} from '../components';

import {localize} from '../lib';

const StyleShapefilePanel = ({localize: _}) => (
  <ShapefileAccordion canAdd>
    <Dropzone attr="source" fileType="shapefile" />
    <Dropdown
      label={_('Render As')}
      attr="type"
      options={[
        {label: _('Circle'), value: 'circle'},
        {label: _('Line'), value: 'line'},
        {label: _('Fill'), value: 'fill'},
      ]}
      clearable={false}
    />
    <ColorPicker attr="color" label={_('Color')} />
    <NumericFraction attr="opacity" label={_('Opacity')} />
    <Numeric
      attr="circle.radius"
      label={_('Circle Radius')}
      showSlider
      min={1}
      max={20}
    />
    <Numeric
      attr="line.width"
      label={_('Line Width')}
      showSlider
      min={1}
      max={20}
    />
    <ColorPicker attr="fill.outlinecolor" label={_('Fill Outline Color')} />
  </ShapefileAccordion>
);

StyleShapefilePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleShapefilePanel);
