import React from 'react';
import PropTypes from 'prop-types';
import {SubplotAccordion, RectanglePositioner} from '../components';

const GraphSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion canGroup>
    <RectanglePositioner attr="domain.x[0]" />
    <RectanglePositioner attr="xaxis.domain[0]" cartesian />
  </SubplotAccordion>
);

GraphSubplotsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default GraphSubplotsPanel;
