import CogMenu from './CogMenu';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {bem, icon} from '../../lib';
import unpackPlotProps from '../../lib/unpackPlotProps';

const classNames = {
  section: bem('section'),
  sectionHeading: bem('section', 'heading'),
  sectionCogMenu: `${bem('section', 'cog-menu')} ${icon('cog')}`,
};

function childIsVisible(child) {
  return Boolean((child.props.plotProps || {}).isVisible);
}

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = null;
    this.cogMenu = null;

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
    let cogMenu = null;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (!child) {
        continue;
      }
      if (child.type === CogMenu) {
        // Process the first cogMenu. Ignore the rest.
        if (cogMenu) {
          continue;
        }
        cogMenu = child;
        continue;
      }

      let isAttr = !!child.props.attr;
      let plotProps = isAttr
        ? unpackPlotProps(child.props, context, child.constructor)
        : {};
      let childProps = Object.assign({plotProps}, child.props);
      childProps.key = i;

      attrChildren.push(cloneElement(child, childProps, child.children));
    }

    this.children = attrChildren.length ? attrChildren : null;
    this.cogMenu = cogMenu;
  }

  render() {
    const hasVisibleChildren = this.children.some(childIsVisible);

    return hasVisibleChildren ? (
      <div className={classNames.section}>
        <div className={classNames.sectionHeading}>
          {this.props.name}
          {this.cogMenu ? (
            <span>
              <i className={classNames.sectionCogMenu} />
            </span>
          ) : null}
        </div>
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
