import PropTypes from 'prop-types';
import {
  AnnotationArrowRef,
  AnnotationRef,
  AnnotationAccordion,
  ArrowSelector,
  ColorPicker,
  FontSelector,
  Numeric,
  Dropdown,
  PositioningNumeric,
  Radio,
  TextEditor,
  PlotlySection,
  NumericOrDate,
} from '../components';

const StyleNotesPanel = (props, {localize: _}) => (
  <AnnotationAccordion canAdd canReorder>
    <PlotlySection name={_('Note Text')} attr="text">
      <TextEditor attr="text" />
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Font Size')} attr="font.size" units="px" />
      <ColorPicker label={_('Font Color')} attr="font.color" />
      <Numeric label={_('Angle')} attr="textangle" units="°" />
      <Dropdown
        label={_('Horizontal Alignment')}
        clearable={false}
        attr="align"
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
      />
      <Dropdown
        label={_('Vertical Alignment')}
        clearable={false}
        attr="valign"
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
      />
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
      <ColorPicker label={_('Color')} attr="arrowcolor" />
      <ArrowSelector label={_('Arrowhead')} attr="arrowhead" />
      <Numeric label={_('Scale')} step={0.1} attr="arrowsize" units="px" />
      <AnnotationArrowRef label={_('X Offset')} attr="axref" />
      <AnnotationArrowRef label={_('Y Offset')} attr="ayref" />
      <NumericOrDate label={_('X Vector')} attr="ax" />
      <NumericOrDate label={_('Y Vector')} attr="ay" />
    </PlotlySection>
    <PlotlySection name={_('Horizontal Positioning')}>
      <Dropdown
        label={_('Anchor Point')}
        clearable={false}
        attr="xanchor"
        options={[
          {label: _('Auto'), value: 'auto'},
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
      />
      <PositioningNumeric label={_('Position')} attr="x" />
      <AnnotationRef label={_('Relative To')} attr="xref" />
    </PlotlySection>
    <PlotlySection name={_('Vertical Positioning')}>
      <Dropdown
        label={_('Anchor Point')}
        clearable={false}
        attr="yanchor"
        options={[
          {label: _('Auto'), value: 'auto'},
          {label: _('Top'), value: 'top'},
          {label: _('Middle'), value: 'middle'},
          {label: _('Bottom'), value: 'bottom'},
        ]}
      />
      <PositioningNumeric label={_('Position')} attr="y" />
      <AnnotationRef label={_('Relative To')} attr="yref" />
    </PlotlySection>
  </AnnotationAccordion>
);

StyleNotesPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleNotesPanel;
