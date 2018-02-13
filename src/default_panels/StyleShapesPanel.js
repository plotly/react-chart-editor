import React from 'react';
import PropTypes from 'prop-types';
import {ShapeAccordion, Radio} from '../components';

import {localize} from '../lib';

const StyleShapesPanel = ({localize: _}) => (
  <ShapeAccordion canAdd>
    <Radio
      attr="visible"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <Radio
      attr="type"
      options={[
        {label: _('Line'), value: 'line'},
        {label: _('Rectangle'), value: 'rect'},
        {label: _('Ellipse'), value: 'circle'},
      ]}
    />
  </ShapeAccordion>
);

StyleShapesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleShapesPanel);
