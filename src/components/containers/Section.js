import Info from '../fields/Info';
import MenuPanel from './MenuPanel';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from '../../lib/unpackPlotProps';
import {containerConnectedContextTypes} from '../../lib/connectToContainer';

function childIsVisible(child) {
  const attrVisible = Boolean((child.props.plotProps || {}).isVisible);
  const sectionVisible = Boolean(child.props['data-section-child-visible']);
  return attrVisible || sectionVisible;
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
      let newProps = {};
      if (child.plotProps) {
        plotProps = child.plotProps;
      } else if (isAttr) {
        if (child.type.supplyPlotProps) {
          plotProps = child.type.supplyPlotProps(child.props, context);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, context, plotProps);
          }
        } else {
          plotProps = unpackPlotProps(child.props, context);
        }

        // assign plotProps as a prop of children. If they are connectedToContainer
        // it will see plotProps and skip recomputing them.
        newProps = {plotProps, key: i};
      } else if (child.type === Info) {
        // Info panels do not change section visibility.
        newProps = {key: i, 'data-section-child-visible': false};
      } else {
        // custom UI currently forces section visibility.
        newProps = {key: i, 'data-section-child-visible': true};
      }

      const childProps = Object.assign(newProps, child.props);
      attrChildren.push(cloneElement(child, childProps));
    }

    this.children = attrChildren.length ? attrChildren : null;
    this.menuPanel = menuPanel;
  }

  render() {
    const hasVisibleChildren =
      this.children && this.children.some(childIsVisible);

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
