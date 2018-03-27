import React, {Component, cloneElement} from 'react';
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

    this.children = null;
    this.sectionVisible = false;

    this.processAndSetChildren(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.processAndSetChildren(nextProps, nextContext);
  }

  processAndSetChildren(nextProps, nextContext) {
    const {isVisible} = unpackPlotProps(nextProps, nextContext);
    this.sectionVisible = isVisible === true;

    this.children = React.Children.map(nextProps.children, child => {
      if (child.props.attr) {
        let plotProps;
        if (child.type.supplyPlotProps) {
          plotProps = child.type.supplyPlotProps(child.props, nextContext);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, nextContext, plotProps);
          }
        } else {
          plotProps = unpackPlotProps(child.props, nextContext);
        }

        // assign plotProps as a prop of children. If they are connectedToContainer
        // it will see plotProps and skip recomputing them.
        this.sectionVisible = this.sectionVisible || plotProps.isVisible;
        return cloneElement(child, {plotProps});
      }

      if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
        // non-attr components force visibility (unless they don't via traits)
        this.sectionVisible = true;
        return child;
      }

      return child;
    });
  }

  render() {
    if (!this.sectionVisible) {
      return null;
    }
    return (
      <div className="section">
        {this.props.name && <SectionHeader name={this.props.name} />}
        {this.children}
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
