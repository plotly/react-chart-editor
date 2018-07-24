import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PanelMenuWrapper} from './components';
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
import Logo from './components/widgets/Logo';

class DefaultEditor extends Component {
  render() {
    const _ = this.context.localize;
    const logo = this.props.logoSrc && <Logo src={this.props.logoSrc} />;

    return (
      <PanelMenuWrapper>
        {logo ? logo : null}
        <GraphCreatePanel group={_('Graph')} name={_('Create')} />
        <GraphTransformsPanel group={_('Graph')} name={_('Transforms')} />
        <StyleTracesPanel group={_('Style')} name={_('Traces')} />
        <StyleLayoutPanel group={_('Style')} name={_('Layout')} />
        <StyleAxesPanel group={_('Style')} name={_('Axes')} />
        <StyleLegendPanel group={_('Style')} name={_('Legend')} />
        <StyleColorbarsPanel group={_('Style')} name={_('Color Bars')} />
        <StyleNotesPanel group={_('Style')} name={_('Annotations')} />
        <StyleShapesPanel group={_('Style')} name={_('Shapes')} />
        <StyleImagesPanel group={_('Style')} name={_('Images')} />
        <StyleSlidersPanel group={_('Style')} name={_('Sliders')} />
        <StyleUpdateMenusPanel group={_('Style')} name={_('Menus')} />
        {this.props.children ? this.props.children : null}
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.propTypes = {
  children: PropTypes.node,
  logoSrc: PropTypes.string,
};

DefaultEditor.contextTypes = {
  localize: PropTypes.func,
};

export default DefaultEditor;
