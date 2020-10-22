import {Component} from 'react';
import PropTypes from 'prop-types';
import {PanelMenuWrapper} from './components';
import {
  GraphCreatePanel,
  GraphTransformsPanel,
  GraphSubplotsPanel,
  StyleLayoutPanel,
  StyleAxesPanel,
  StyleMapsPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleSlidersPanel,
  StyleImagesPanel,
  StyleTracesPanel,
  StyleColorbarsPanel,
  StyleUpdateMenusPanel,
} from './default_panels';
import {traceHasColorbar} from './default_panels/StyleColorbarsPanel';
import Logo from './components/widgets/Logo';
import {TRANSFORMABLE_TRACES, TRACE_TO_AXIS} from './lib/constants';

class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.hasTransforms = this.hasTransforms.bind(this);
    this.hasAxes = this.hasAxes.bind(this);
    this.hasMenus = this.hasMenus.bind(this);
    this.hasSliders = this.hasSliders.bind(this);
    this.hasColorbars = this.hasColorbars.bind(this);
    this.hasLegend = this.hasLegend.bind(this);
  }

  hasTransforms() {
    return this.context.fullData.some((d) => TRANSFORMABLE_TRACES.includes(d.type));
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

  hasMenus() {
    const {
      fullLayout: {updatemenus = []},
    } = this.context;

    return updatemenus.length > 0;
  }

  hasSliders() {
    const {
      layout: {sliders = []},
    } = this.context;

    return sliders.length > 0;
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
    const logo = this.props.logoSrc && <Logo src={this.props.logoSrc} />;

    return (
      <PanelMenuWrapper menuPanelOrder={this.props.menuPanelOrder}>
        {logo ? logo : null}
        <GraphCreatePanel group={_('Structure')} name={_('Traces')} />
        <GraphSubplotsPanel group={_('Structure')} name={_('Subplots')} />
        {this.hasTransforms() && (
          <GraphTransformsPanel group={_('Structure')} name={_('Transforms')} />
        )}
        <StyleLayoutPanel group={_('Style')} name={_('General')} />
        <StyleTracesPanel group={_('Style')} name={_('Traces')} />
        {this.hasAxes() && <StyleAxesPanel group={_('Style')} name={_('Axes')} />}
        {this.hasMaps() && <StyleMapsPanel group={_('Style')} name={_('Maps')} />}
        {this.hasLegend() && <StyleLegendPanel group={_('Style')} name={_('Legend')} />}
        {this.hasColorbars() && <StyleColorbarsPanel group={_('Style')} name={_('Color Bars')} />}
        <StyleNotesPanel group={_('Annotate')} name={_('Text')} />
        <StyleShapesPanel group={_('Annotate')} name={_('Shapes')} />
        <StyleImagesPanel group={_('Annotate')} name={_('Images')} />
        {this.hasSliders() && <StyleSlidersPanel group={_('Control')} name={_('Sliders')} />}
        {this.hasMenus() && <StyleUpdateMenusPanel group={_('Control')} name={_('Menus')} />}
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
