import React, {Component} from 'react';
import {
  Flaglist,
  ColorPicker,
  ColorscalePicker,
  PlotlyFold,
  PanelMenuWrapper,
  TextEditor,
  Radio,
  Dropdown,
  Info,
  PlotlySection,
  Numeric,
  LayoutPanel,
  Button,
  SingleSidebarItem,
  TraceAccordion,
} from 'react-chart-editor';

export default class CustomEditor extends Component {
  render() {
    return (
      <PanelMenuWrapper>
        <TraceAccordion group="Traces" name="Style">
          <PlotlySection name="Colorscale" attr="marker.colorscale">
            <ColorscalePicker label="Colorscale" attr="marker.colorscale" />
          </PlotlySection>
        </TraceAccordion>

        <LayoutPanel group="Layout" name="Style">
          <PlotlyFold name="PlotlyFold">
            {
              // At least one of the direct children of PlotlyFold must have an attr prop
              // for the PlotlyFold to display itself
            }
            <Info attr="title">
              <p>
                This custom editor demonstrates the general-purpose container
                and field components.
              </p>
              <p>
                This is an <code>Info</code> component.
              </p>
            </Info>
            <PlotlySection name="PlotlySection">
              <Numeric label="Numeric" attr="width" show units="units" />
              <Dropdown
                label="Dropdown"
                attr="xaxis.title"
                show
                options={[
                  {label: 'Yes', value: 'yes'},
                  {label: 'No', value: 'no'},
                ]}
              />
              <Radio
                label="Radio"
                attr="yaxis.title"
                show
                options={[
                  {label: 'Yes', value: 'yes'},
                  {label: 'No', value: 'no'},
                ]}
              />
              <Flaglist
                label="Flaglist"
                attr="titlefont.family"
                show
                options={[
                  {label: 'Yes', value: 'y'},
                  {label: 'No', value: 'n'},
                ]}
              />
              <ColorPicker label="ColorPicker" attr="plot_bgcolor" show />
              <TextEditor attr="title" label="TextEditor default" />
              <TextEditor
                attr="title"
                label="TextEditor richTextOnly"
                richTextOnly
              />
              <TextEditor attr="title" label="TextEditor htmlOnly" htmlOnly />
              <TextEditor attr="title" label="TextEditor latexOnly" latexOnly />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
        <SingleSidebarItem>
          <Button
            variant="primary"
            label="save"
            onClick={() => alert('save button clicked!')}
          />
        </SingleSidebarItem>
        <SingleSidebarItem>
          <Button
            variant="secondary"
            label="clear"
            onClick={() => alert('clear button clicked!')}
          />
        </SingleSidebarItem>
      </PanelMenuWrapper>
    );
  }
}
