import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {containerConnectedContextTypes} from './connectToContainer';

export function recursiveMap(children, context) {
  return React.Children.map(children, child => {
    let newChild = child;
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.type.requireContext) {
      const requireContext = {};
      const newChildren = {};
      Object.keys(child.type.requireContext).forEach(key => {
        if (!requireContext.context) {
          requireContext.context = {};
        }
        requireContext.context[key] = context[key];
      });

      if (child.props.children) {
        newChildren.children = recursiveMap(child.props.children, context);
      }
      newChild = React.cloneElement(child, {
        ...child.props,
        ...requireContext,
        ...newChildren,
      });
    }
    return newChild;
  });
}

export class RecursiveComponent extends Component {
  render() {
    return <Fragment>{recursiveMap(this.props.children, this.props.context)}</Fragment>;
  }
}

RecursiveComponent.propTypes = {
  context: PropTypes.any,
  children: PropTypes.any,
};

RecursiveComponent.requireContext = containerConnectedContextTypes;
