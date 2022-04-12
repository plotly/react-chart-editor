import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelMenuWrapper } from './components';
import {
  GraphCreatePanel,
  StyleLayoutPanel,
  StyleAxesPanel,
  StyleMapsPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleTracesPanel,
  StyleColorbarsPanel,
} from './default_panels';
import {traceHasColorbar} from './default_panels/StyleColorbarsPanel';
import { TRACE_TO_AXIS } from './lib/constants';

class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.hasAxes = this.hasAxes.bind(this);
    this.hasColorbars = this.hasColorbars.bind(this);
    this.hasLegend = this.hasLegend.bind(this);
  }

  hasAxes() {
    return (
      Object.keys(this.context.fullLayout._subplots).filter(
        (type) =>
          !['cartesian', 'mapbox'].includes(type) &&
          this.context.fullLayout._subplots[type].length > 0
      ).length > 0
    );
  }

  hasColorbars() {
    return this.context.fullData.some((d) => traceHasColorbar({}, d));
  }

  hasLegend() {
    return this.context.fullData.some((t) => t.showlegend !== undefined); // eslint-disable-line no-undefined
  }

  hasMaps() {
    return this.context.fullData.some((d) =>
      [...TRACE_TO_AXIS.geo, ...TRACE_TO_AXIS.mapbox].includes(d.type)
    );
  }

  render() {
    const _ = this.context.localize;
    return (
      <PanelMenuWrapper menuPanelOrder={this.props.menuPanelOrder}>
        <GraphCreatePanel group={_('Structure')} name={_('Plots')} />
        <StyleLayoutPanel group={_('Style')} name={_('General')} />
        <StyleTracesPanel group={_('Style')} name={_('Plots')} />
        {this.hasAxes() && <StyleAxesPanel group={_('Style')} name={_('Axes')} />}
        {this.hasMaps() && <StyleMapsPanel group={_('Style')} name={_('Maps')} />}
        {this.hasLegend() && <StyleLegendPanel group={_('Style')} name={_('Legend')} />}
        {this.hasColorbars() && <StyleColorbarsPanel group={_('Style')} name={_('Color Bars')} />}
        <StyleNotesPanel group={_('Annotate')} name={_('Text')} />
        {this.props.children ? this.props.children : null}
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.propTypes = {
  children: PropTypes.node,
  logoSrc: PropTypes.string,
  menuPanelOrder: PropTypes.array,
};

DefaultEditor.contextTypes = {
  localize: PropTypes.func,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  layout: PropTypes.object,
};

export default DefaultEditor;
