import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {containerConnectedContextTypes, unpackPlotProps} from '../../lib';
import {recursiveMap} from '../../lib/recursiveMap';

export class Section extends Component {
  constructor() {
    super();
    this.sectionVisible = true;
  }

  render() {
    if (!this.sectionVisible) {
      return null;
    }

    const {context = {}} = this.props;
    return (
      <div className="section">
        {this.props.name ? (
          <div className="section__heading">
            <div className="section__heading__text">{this.props.name}</div>
          </div>
        ) : null}
        {recursiveMap(this.props.children, context)}
      </div>
    );
  }
}

Section.plotly_editor_traits = {no_visibility_forcing: false};
Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  attr: PropTypes.string,
  context: PropTypes.any,
};
Section.requireContext = containerConnectedContextTypes;

export default class PlotlySection extends Section {
  constructor(props) {
    super(props);
    this.determineVisibility(props);
  }

  componentWillReceiveProps(nextProps) {
    this.determineVisibility(nextProps);
  }

  determineVisibility(nextProps) {
    const {context = {}, ...props} = nextProps;
    const {isVisible} = unpackPlotProps(props, context);
    this.sectionVisible = Boolean(isVisible);

    React.Children.forEach(nextProps.children, child => {
      if (!child || this.sectionVisible) {
        return;
      }

      if (child.props.attr) {
        const plotProps = unpackPlotProps(child.props, context);
        if (child.type.modifyPlotProps) {
          child.type.modifyPlotProps(child.props, context, plotProps);
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
PlotlySection.requireContext = containerConnectedContextTypes;
