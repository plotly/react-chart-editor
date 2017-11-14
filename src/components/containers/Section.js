import SubPanel from './SubPanel';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from '../../lib/unpackPlotProps';

function childIsVisible(child) {
  return Boolean((child.props.plotProps || {}).isVisible);
}

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = null;
    this.subPanel = null;

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
    let subPanel = null;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child) {
        continue;
      }
      if (child.type === SubPanel) {
        // Process the first subPanel. Ignore the rest.
        if (subPanel) {
          continue;
        }
        subPanel = child;
        continue;
      }

      const isAttr = Boolean(child.props.attr);
      const plotProps = isAttr
        ? unpackPlotProps(child.props, context, child.constructor)
        : {isVisible: true};
      const childProps = Object.assign({plotProps}, child.props);
      childProps.key = i;
      attrChildren.push(cloneElement(child, childProps));
    }

    this.children = attrChildren.length ? attrChildren : null;
    this.subPanel = subPanel;
  }

  render() {
    const hasVisibleChildren =
      (this.children && this.children.some(childIsVisible)) ||
      Boolean(this.subPanel);

    return hasVisibleChildren ? (
      <div className="section">
        <div className="section__heading">
          {this.props.name}
          {this.subPanel}
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

Section.contextTypes = {
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  getValObject: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default Section;
