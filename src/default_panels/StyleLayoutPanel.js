import PropTypes from 'prop-types';
import {
  ColorPicker,
  ColorwayPicker,
  ColorscalePicker,
  Dropdown,
  FontSelector,
  PlotlyFold,
  Numeric,
  TextEditor,
  PlotlySection,
  LayoutPanel,
  VisibilitySelect,
  HovermodeDropdown,
  Flaglist,
  Radio,
  Info,
} from '../components';
import {HoverColor} from '../components/fields/derived';
import DataSelector from '../components/fields/DataSelector';

const StyleLayoutPanel = (props, {localize: _}) => (
  <LayoutPanel>
    <PlotlyFold name={_('Defaults')}>
      <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
      <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
      <PlotlySection name={_('Colorscales')} attr="colorway">
        <ColorwayPicker
          label={_('Categorical')}
          attr="colorway"
          disableCategorySwitch
          labelWidth={80}
        />
        <ColorscalePicker
          label={_('Sequential')}
          attr="colorscale.sequential"
          disableCategorySwitch
          labelWidth={80}
        />
        <ColorscalePicker
          label={_('Diverging')}
          attr="colorscale.diverging"
          initialCategory="divergent"
          disableCategorySwitch
          labelWidth={80}
        />
        <ColorscalePicker
          label={_('Negative Sequential')}
          attr="colorscale.sequentialminus"
          disableCategorySwitch
          labelWidth={80}
        />
      </PlotlySection>
      <PlotlySection name={_('Text')} attr="font.family">
        <FontSelector label={_('Typeface')} attr="font.family" clearable={false} />
        <Numeric label={_('Base Font Size')} attr="font.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="font.color" />
        <Dropdown
          label={_('Number format')}
          attr="separators"
          options={[
            {label: _('1,234.56'), value: '.,'},
            {label: _('1 234.56'), value: ', '},
            {label: _('1 234,56'), value: ', '},
            {label: _('1.234,56'), value: ',.'},
          ]}
          clearable={false}
        />
        <Dropdown
          label={_('Uniform Text Mode')}
          attr="uniformtext.mode"
          options={[
            {label: _('Off'), value: false},
            {label: _('Show'), value: 'show'},
            {label: _('Hide'), value: 'hide'},
          ]}
          clearable={false}
        />
        <Numeric label={_('Uniform Text Size Minimum')} attr="uniformtext.minsize" units="px" />
      </PlotlySection>
    </PlotlyFold>

    <PlotlyFold name={_('Title')}>
      <TextEditor attr="title.text" />
      <FontSelector label={_('Typeface')} attr="title.font.family" clearable={false} />
      <Numeric label={_('Font Size')} attr="title.font.size" units="px" />
      <ColorPicker label={_('Font Color')} attr="title.font.color" />
      <Numeric label={_('Horizontal Position')} showSlider step={0.02} attr="title.x" />
    </PlotlyFold>

    <PlotlyFold name={_('Modebar')}>
      <Radio
        label={_('Orientation')}
        attr="modebar.orientation"
        options={[
          {label: _('Horizontal'), value: 'h'},
          {label: _('Vertical'), value: 'v'},
        ]}
      />
      <ColorPicker label={_('Icon Color')} attr="modebar.color" />
      <ColorPicker label={_('Active Icon Color')} attr="modebar.activecolor" />
      <ColorPicker label={_('Background Color')} attr="modebar.bgcolor" />
    </PlotlyFold>
    <PlotlyFold name={_('Size and Margins')}>
      <VisibilitySelect
        attr="autosize"
        label={_('Size')}
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
        showOn={false}
        defaultOpt={true}
      >
        <Numeric label={_('Fixed Width')} attr="width" units="px" />
        <Numeric label={_('Fixed height')} attr="height" units="px" />
      </VisibilitySelect>
      <Numeric label={_('Top')} attr="margin.t" units="px" />
      <Numeric label={_('Bottom')} attr="margin.b" units="px" />
      <Numeric label={_('Left')} attr="margin.l" units="px" />
      <Numeric label={_('Right')} attr="margin.r" units="px" />
      <Numeric label={_('Padding')} attr="margin.pad" units="px" />
    </PlotlyFold>
    <PlotlyFold name={_('Interactions')}>
      <PlotlySection name={_('Drag')} attr="dragmode">
        <Dropdown
          label={_('Mode')}
          attr="dragmode"
          options={[
            {label: _('Zoom'), value: 'zoom'},
            {label: _('Select'), value: 'select'},
            {label: _('Pan'), value: 'pan'},
            {label: _('Lasso'), value: 'lasso'},
            {label: _('Orbit'), value: 'orbit'},
            {label: _('Turntable'), value: 'turntable'},
          ]}
          clearable={false}
        />
        <Dropdown
          label={_('Select Direction')}
          attr="selectdirection"
          options={[
            {label: _('Any'), value: 'any'},
            {label: _('Horizontal'), value: 'h'},
            {label: _('Vertical'), value: 'v'},
            {label: _('Diagonal'), value: 'd'},
          ]}
          clearable={false}
        />
      </PlotlySection>
      <PlotlySection name={_('Click')} attr="clickmode">
        <Flaglist
          label={_('Mode')}
          attr="clickmode"
          options={[
            {label: _('Click Event'), value: 'event'},
            {label: _('Select Data Point'), value: 'select'},
          ]}
        />
      </PlotlySection>
      <PlotlySection name={_('Hover')}>
        <HovermodeDropdown label={_('Mode')} attr="hovermode">
          <Dropdown
            label={_('Text Alignment')}
            attr="hoverlabel.align"
            options={[
              {label: _('Auto'), value: 'auto'},
              {label: _('Left'), value: 'left'},
              {label: _('Right'), value: 'right'},
            ]}
            clearable={false}
          />
          <HoverColor
            label={_('Background Color')}
            attr="hoverlabel.bgcolor"
            defaultColor="#FFF"
            handleEmpty
          />
          <HoverColor
            label={_('Border Color')}
            attr="hoverlabel.bordercolor"
            defaultColor="#000"
            handleEmpty
          />
          <FontSelector label={_('Typeface')} attr="hoverlabel.font.family" clearable />
          <Numeric label={_('Font Size')} attr="hoverlabel.font.size" />
          <HoverColor
            label={_('Font Color')}
            attr="hoverlabel.font.color"
            defaultColor="#000"
            handleEmpty
          />
        </HovermodeDropdown>
      </PlotlySection>
    </PlotlyFold>
    <PlotlyFold name={_('Meta Text')}>
      <DataSelector label={_('Custom Data')} attr="meta" />
      <Info>
        <p>
          {_(
            'You can refer to the items in this column in any text fields of the editor like so: '
          )}
        </p>
        <p>
          {_('Ex: ')}
          <span style={{letterSpacing: '1px', fontStyle: 'italic', userSelect: 'text'}}>
            {_('My custom title %{meta[1]}')}
          </span>
        </p>
      </Info>
    </PlotlyFold>
  </LayoutPanel>
);

StyleLayoutPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleLayoutPanel;
