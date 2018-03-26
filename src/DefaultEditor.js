import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PanelMenuWrapper} from './components';
import {localize} from './lib';
import {
  GraphCreatePanel,
  GraphTransformsPanel,
  StyleLayoutPanel,
  StyleAxesPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleSlidersPanel,
  StyleImagesPanel,
  StyleTracesPanel,
  StyleColorbarsPanel,
  StyleUpdateMenusPanel,
} from './default_panels';

const DefaultEditor = ({children, localize: _}) => (
  <Fragment>
    <PanelMenuWrapper>
      <GraphCreatePanel group={_('Graph')} name={_('Create')} />
      <GraphTransformsPanel group={_('Graph')} name={_('Transforms')} />
      <StyleTracesPanel group={_('Style')} name={_('Traces')} />
      <StyleLayoutPanel group={_('Style')} name={_('Layout')} />
      <StyleNotesPanel group={_('Style')} name={_('Notes')} />
      <StyleAxesPanel group={_('Style')} name={_('Axes')} />
      <StyleLegendPanel group={_('Style')} name={_('Legend')} />
      <StyleColorbarsPanel group={_('Style')} name={_('Color Bars')} />
      <StyleShapesPanel group={_('Style')} name={_('Shapes')} />
      <StyleImagesPanel group={_('Style')} name={_('Images')} />
      <StyleSlidersPanel group={_('Style')} name={_('Sliders')} />
      <StyleUpdateMenusPanel group={_('Style')} name={_('Menus')} />
      {children ? children : null}
    </PanelMenuWrapper>
  </Fragment>
);

DefaultEditor.propTypes = {
  localize: PropTypes.func,
  children: PropTypes.node,
};

export default localize(DefaultEditor);
