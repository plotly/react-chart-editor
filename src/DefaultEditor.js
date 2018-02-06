import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PanelMenuWrapper} from './components';
import {localize} from './lib';
import {
  GraphCreatePanel,
  StyleLayoutPanel,
  StyleAxesPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleImagesPanel,
  StyleTracesPanel,
  StyleColorbarsPanel,
} from './default_panels';

import Modal from './components/containers/Modal';
import TraceTypeSelector from './components/widgets/TraceTypeSelector';

const DefaultEditor = ({localize: _}) => (
  <Fragment>
    <TraceTypeSelector />
    <PanelMenuWrapper>
      <GraphCreatePanel group={_('Graph')} name={_('Create')} />
      <StyleTracesPanel group={_('Style')} name={_('Traces')} />
      <StyleLayoutPanel group={_('Style')} name={_('Layout')} />
      <StyleNotesPanel group={_('Style')} name={_('Notes')} />
      <StyleAxesPanel group={_('Style')} name={_('Axes')} />
      <StyleLegendPanel group={_('Style')} name={_('Legend')} />
      <StyleColorbarsPanel group={_('Style')} name={_('Color Bars')} />
      <StyleShapesPanel group={_('Style')} name={_('Shapes')} />
      <StyleImagesPanel group={_('Style')} name={_('Images')} />
    </PanelMenuWrapper>
  </Fragment>
);

DefaultEditor.propTypes = {
  localize: PropTypes.func,
};

export default localize(DefaultEditor);
