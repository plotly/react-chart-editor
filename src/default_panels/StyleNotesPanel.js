import React from 'react';
import PropTypes from 'prop-types';
import {
  AnnotationArrowRef,
  AnnotationRef,
  AnnotationAccordion,
  ArrowSelector,
  ColorPicker,
  FontSelector,
  Info,
  Numeric,
  Radio,
  TextEditor,
  Section,
  MenuPanel,
  TraceRequiredPanel,
} from '../components';

import {localize} from '../lib';

const StyleNotesPanel = ({visible, localize: _}) => (
  <TraceRequiredPanel visible={visible}>
    <AnnotationAccordion canAdd>
      <Section name={_('Note Text')}>
        <TextEditor attr="text" />
        <FontSelector label={_('Typeface')} attr="font.family" />
        <Numeric label={_('Font Size')} attr="font.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="font.color" />
        <Numeric label={_('Angle')} attr="textangle" units="°" />
      </Section>
      <Section name={_('Arrow')}>
        <Radio
          attr="showarrow"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Line Width')} attr="arrowwidth" units="px" />
        <ColorPicker label={_('Color')} attr="arrowcolor" />
        <ArrowSelector label={_('Arrowhead')} attr="arrowhead" />
        <Numeric label={_('Scale')} step={0.1} attr="arrowsize" units="px" />
        <AnnotationArrowRef label="X Offset" attr="axref" />
        <AnnotationArrowRef label="Y Offset" attr="ayref" />
        <Numeric label={_('X Vector')} attr="ax" hideArrows />
        <Numeric label={_('Y Vector')} attr="ay" hideArrows />
      </Section>
      <Section name={_('Horizontal Positioning')}>
        <MenuPanel>
          <Section name={_('Anchor Point')}>
            <Info>
              {_(
                'The anchor point determines which side of the ' +
                  "annotation's positioning coordinates refer to."
              )}
            </Info>
            <Radio
              attr="xanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Left'), value: 'left'},
                {label: _('Center'), value: 'center'},
                {label: _('Right'), value: 'right'},
              ]}
            />
          </Section>
        </MenuPanel>
        <AnnotationRef label={_('Relative To')} attr="xref" />
        <Numeric label={_('Position')} attr="x" hideArrows />
      </Section>
      <Section name={_('Vertical Positioning')}>
        <MenuPanel>
          <Section name={_('Anchor Point')}>
            <Info>
              {_(
                'The anchor point determines which side of the ' +
                  "annotation's positioning coordinates refer to."
              )}
            </Info>
            <Radio
              attr="yanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Top'), value: 'top'},
                {label: _('Middle'), value: 'middle'},
                {label: _('Bottom'), value: 'bottom'},
              ]}
            />
          </Section>
        </MenuPanel>
        <AnnotationRef label={_('Relative To')} attr="yref" />
        <Numeric label={_('Position')} attr="y" hideArrows />
      </Section>
    </AnnotationAccordion>
  </TraceRequiredPanel>
);

StyleNotesPanel.propTypes = {
  localize: PropTypes.func,

  visible: PropTypes.bool,
};

export default localize(StyleNotesPanel);
