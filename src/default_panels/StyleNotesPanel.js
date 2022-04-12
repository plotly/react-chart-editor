import React from 'react';
import PropTypes from 'prop-types';
import {
  AnnotationAccordion,
  ArrowSelector,
  Numeric,
  Radio,
  TextEditor,
  PlotlySection,
} from '../components';

const StyleNotesPanel = (props, {localize: _}) => (
  <AnnotationAccordion canAdd canReorder>
    <PlotlySection name={_('Note Text')} attr="text">
      <TextEditor attr="text" richTextOnly />
      <Numeric label={_('Font Size')} attr="font.size" units="px" />
      <Numeric label={_('Angle')} attr="textangle" units="°" />
    </PlotlySection>

    <PlotlySection name={_('Arrow')}>
      <Radio
        attr="showarrow"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Line Width')} attr="arrowwidth" units="px" />
      <ArrowSelector label={_('Arrowhead')} attr="arrowhead" />
      <Numeric label={_('Scale')} step={0.1} attr="arrowsize" units="px" />
    </PlotlySection>
  </AnnotationAccordion>
);

StyleNotesPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleNotesPanel;
