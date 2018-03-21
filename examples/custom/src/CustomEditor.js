import React, {Component} from 'react';
import {
  Flaglist,
  ColorPicker,
  ColorscalePicker,
  Fold,
  PanelMenuWrapper,
  TextEditor,
  Radio,
  Dropdown,
  Info,
  Section,
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
          <Section name="Colorscale" attr="marker.colorscale">
            <ColorscalePicker label="Colorscale" attr="marker.colorscale" />
          </Section>
        </TraceAccordion>

        <LayoutPanel group="Layout" name="Style">
          <Fold name="Fold">
            {
              // At least one of the direct children of Fold must have an attr prop
              // for the Fold to display itself
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
            <Section name="Section">
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
            </Section>
          </Fold>
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
