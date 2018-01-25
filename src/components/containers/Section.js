import Info from '../fields/Info';
import MenuPanel from './MenuPanel';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {
  containerConnectedContextTypes,
  localize,
  unpackPlotProps,
} from '../../lib';

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = null;
    this.menuPanel = null;
    this.sectionVisible = false;

    this.processAndSetChildren(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.processAndSetChildren(nextProps, nextContext);
  }

  processAndSetChildren(nextProps, nextContext) {
    this.sectionVisible = false;

    this.children = React.Children.map(nextProps.children, child => {
      if (child.type === MenuPanel) {
        // Process the first menuPanel. Ignore the rest. MenuPanel does
        // not affect visibility.
        if (!this.menuPanel) {
          this.menuPanel = child;
        }
        return null;
      }

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
      } else if (child.type !== Info) {
        // custom UI other than Info forces section visibility.
        this.sectionVisible = true;
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
        <div className="section__heading">
          <div className="section__heading__text">{this.props.name}</div>
          {this.menuPanel}
        </div>
        {this.children}
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

Section.contextTypes = containerConnectedContextTypes;
export default localize(Section);
