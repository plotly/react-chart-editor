import React from 'react';
import PropTypes from 'prop-types';
import {PanelMenuWrapper} from './components';
import {localize} from './lib';
import {
  GraphCreatePanel,
  StyleLayoutPanel,
  StyleAxesPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleTracesPanel,
} from './default_panels';

const DefaultEditor = ({localize: _}) => (
  <PanelMenuWrapper>
    <GraphCreatePanel group="Graph" name="Create" />
    <StyleTracesPanel group="Style" name="Traces" />
    <StyleLayoutPanel group="Style" name={_('Layout')} />
    <StyleNotesPanel group="Style" name={_('Notes')} />
    <StyleAxesPanel group="Style" name={_('Axes')} />
    <StyleLegendPanel group="Style" name={_('Legend')} />
  </PanelMenuWrapper>
);

DefaultEditor.propTypes = {
  localize: PropTypes.func,
};

export default localize(DefaultEditor);
