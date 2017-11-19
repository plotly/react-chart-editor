import MenuPanel from './MenuPanel';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from '../../lib/unpackPlotProps';
import {containerConnectedContextTypes} from '../../lib/connectToContainer';

function childIsVisible(child) {
  return Boolean((child.props.plotProps || {}).isVisible);
}

export default class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = null;
    this.menuPanel = null;

    this.processAndSetChildren(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.processAndSetChildren(nextContext);
  }

  processAndSetChildren(context) {
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    const attrChildren = [];
    let menuPanel = null;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child) {
        continue;
      }
      if (child.type === MenuPanel) {
        // Process the first menuPanel. Ignore the rest.
        if (menuPanel) {
          continue;
        }
        menuPanel = child;
        continue;
      }

      const isAttr = Boolean(child.props.attr);
      let plotProps;
      if (child.plotProps) {
        plotProps = child.plotProps;
      } else if (isAttr) {
        if (child.type.supplyPlotProps) {
          plotProps = child.type.supplyPlotProps(child.props, context);
        } else {
          plotProps = unpackPlotProps(child.props, context);
        }
      } else {
        plotProps = {isVisible: true};
      }
      const childProps = Object.assign({plotProps}, child.props);
      childProps.key = i;
      attrChildren.push(cloneElement(child, childProps));
    }

    this.children = attrChildren.length ? attrChildren : null;
    this.menuPanel = menuPanel;
  }

  render() {
    const hasVisibleChildren =
      (this.children && this.children.some(childIsVisible)) ||
      Boolean(this.menuPanel);

    return hasVisibleChildren ? (
      <div className="section">
        <div className="section__heading">
          {this.props.name}
          {this.menuPanel}
        </div>
        {this.children}
      </div>
    ) : null;
  }
}

Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

Section.contextTypes = containerConnectedContextTypes;
