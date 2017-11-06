import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../lib';
import unpackPlotProps from '../lib/unpackPlotProps';

function childIsVisible(child) {
  return Boolean((child.props.plotProps || {}).isVisible);
}

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = this.processChildren(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.children = this.processChildren(nextContext);
  }

  processChildren(context) {
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    children = children.filter(c => Boolean(c));

    for (let i = 0; i < children.length; i++) {
      let child = children[i];

      let isAttr = !!child.props.attr;
      let plotProps = isAttr
        ? unpackPlotProps(child.props, context, child.constructor)
        : {};
      let childProps = Object.assign({plotProps}, child.props);
      childProps.key = i;

      children[i] = cloneElement(child, childProps, child.children);
    }

    return children;
  }

  render() {
    const hasVisibleChildren = this.children.some(childIsVisible);

    return hasVisibleChildren ? (
      <div className={bem('section')}>
        <div className={bem('section', 'heading')}>{this.props.heading}</div>
        {this.children}
      </div>
    ) : null;
  }
}

Section.contextTypes = {
  container: PropTypes.object,
  fullContainer: PropTypes.object,
  getValObject: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default Section;
