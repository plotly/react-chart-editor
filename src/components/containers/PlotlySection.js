import {Children, Component} from 'react';
import PropTypes from 'prop-types';
import {
  containerConnectedContextTypes,
  unpackPlotProps,
  isVisibleGivenCustomConfig,
} from '../../lib';

export class Section extends Component {
  constructor() {
    super();
    this.sectionVisible = true;
  }

  render() {
    if (!this.sectionVisible) {
      return null;
    }

    return (
      <div className="section">
        {this.props.name ? (
          <div className="section__heading">
            <div className="section__heading__text">{this.props.name}</div>
          </div>
        ) : null}
        {this.props.children}
      </div>
    );
  }
}

Section.plotly_editor_traits = {no_visibility_forcing: false};
Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  attr: PropTypes.string,
};

export default class PlotlySection extends Section {
  constructor(props, context) {
    super(props, context);
    this.determineVisibility(props, context);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.determineVisibility(nextProps, nextContext);
  }

  determineVisibility(nextProps, nextContext) {
    const {isVisible} = unpackPlotProps(nextProps, nextContext);
    this.sectionVisible = isVisibleGivenCustomConfig(isVisible, nextProps, nextContext);

    Children.forEach(nextProps.children, (child) => {
      if (!child || this.sectionVisible) {
        return;
      }

      if (child.props.attr) {
        const plotProps = unpackPlotProps(child.props, nextContext);
        if (child.type.modifyPlotProps) {
          child.type.modifyPlotProps(child.props, nextContext, plotProps);
        }

        this.sectionVisible = isVisibleGivenCustomConfig(
          this.sectionVisible || plotProps.isVisible,
          child.props,
          nextContext,
          child.type && child.type.displayName ? child.type.displayName : null
        );
        return;
      }

      if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
        // non-attr components force visibility (unless they don't via traits)
        this.sectionVisible = true;
        return;
      }
    });
  }
}

PlotlySection.plotly_editor_traits = {no_visibility_forcing: true};
PlotlySection.contextTypes = containerConnectedContextTypes;
