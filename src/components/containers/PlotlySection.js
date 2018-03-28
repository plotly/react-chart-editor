import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  containerConnectedContextTypes,
  localize,
  unpackPlotProps,
} from '../../lib';

class UnlocalizedSection extends Component {
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

UnlocalizedSection.plotly_editor_traits = {no_visibility_forcing: false};
UnlocalizedSection.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  attr: PropTypes.string,
};

export const Section = localize(UnlocalizedSection);

class PlotlySection extends UnlocalizedSection {
  constructor(props, context) {
    super(props, context);
    this.determineVisibility(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.determineVisibility(nextProps, nextContext);
  }

  determineVisibility(nextProps, nextContext) {
    const {isVisible} = unpackPlotProps(nextProps, nextContext);
    this.sectionVisible = Boolean(isVisible);

    React.Children.forEach(nextProps.children, child => {
      if (!child || this.sectionVisible) {
        return;
      }

      if (child.props.attr) {
        const plotProps = unpackPlotProps(child.props, nextContext);
        if (child.type.modifyPlotProps) {
          child.type.modifyPlotProps(child.props, nextContext, plotProps);
        }
        this.sectionVisible = this.sectionVisible || plotProps.isVisible;
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
export default localize(PlotlySection);
