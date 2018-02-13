import React from 'react';
import PropTypes from 'prop-types';
import {ImageAccordion, Radio, TextEditor, Numeric} from '../components';

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
    <Numeric attr="sizex" label={_('Width')} />
    <Numeric attr="sizey" label={_('Height')} />
  </ImageAccordion>
);

StyleImagesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleImagesPanel);
