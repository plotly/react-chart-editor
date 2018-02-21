import PropTypes from 'prop-types';
import {localize} from 'lib';
import {SubplotAccordion, Numeric, Section} from '../components';
import React from 'react';

const GraphSubplotsPanel = ({localize: _}) => {
  return (
    <SubplotAccordion>
      <Section name={_('Horizontal Boundary')} attr="x">
        <Numeric attr="x[0]" label={_('Lower Limit')} step={0.1} />
        <Numeric attr="x[1]" label={_('Upper Limit')} step={0.1} />
      </Section>
      <Section name={_('Vertical Boundary')} attr="y">
        <Numeric attr="y[0]" label={_('Lower Limit')} step={0.1} />
        <Numeric attr="y[1]" label={_('Upper Limit')} step={0.1} />
      </Section>
    </SubplotAccordion>
  );
};

GraphSubplotsPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphSubplotsPanel);
