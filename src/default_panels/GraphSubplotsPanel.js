import React from 'react';
import PropTypes from 'prop-types';
import {NumericFraction, SubplotAccordion} from '../components';

const GraphSubplotsPanel = (props, {localize: _}) => (
  <SubplotAccordion canGroup>
    <NumericFraction label={_('X Start')} attr="domain.x[0]" />
    <NumericFraction label={_('X End')} attr="domain.x[1]" />
    <NumericFraction label={_('Y Start')} attr="domain.y[0]" />
    <NumericFraction label={_('Y End')} attr="domain.y[1]" />
    <NumericFraction label={_('X Start')} attr="xaxis.domain[0]" />
    <NumericFraction label={_('X End')} attr="xaxis.domain[1]" />
    <NumericFraction label={_('Y Start')} attr="yaxis.domain[0]" />
    <NumericFraction label={_('Y End')} attr="yaxis.domain[1]" />
  </SubplotAccordion>
);

GraphSubplotsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default GraphSubplotsPanel;
