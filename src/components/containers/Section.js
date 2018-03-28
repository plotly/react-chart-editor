import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  containerConnectedContextTypes,
  localize,
  unpackPlotProps,
} from '../../lib';
import SectionHeader from './SectionHeader';

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.sectionVisible = false;

    this.determineVisibility(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.determineVisibility(nextProps, nextContext);
  }

  determineVisibility(nextProps, nextContext) {
    const {isVisible} = unpackPlotProps(nextProps, nextContext);
    this.sectionVisible = Boolean(isVisible);

    React.Children.forEach(nextProps.children, child => {
      if (!child || this.foldVisible) {
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

  render() {
    if (!this.sectionVisible) {
      return null;
    }
    return (
      <div className="section">
        {this.props.name && <SectionHeader name={this.props.name} />}
        {this.props.children}
      </div>
    );
  }
}

Section.plotly_editor_traits = {no_visibility_forcing: true};

Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  attr: PropTypes.string,
};

Section.contextTypes = containerConnectedContextTypes;
export default localize(Section);
