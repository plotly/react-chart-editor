import React from 'react';

export function recursiveMap(children, context) {
  return React.Children.map(children, child => {
    let newChild = child;
    if (!React.isValidElement(child)) {
      return child;
    }

    // if (
    //   child.type &&
    //   child.type.displayName &&
    //   (child.type.displayName.indexOf('LayoutConnected') === 0 ||
    //     child.type.displayName.indexOf('TraceConnected') === 0)
    // ) {
    //   return newChild;
    // }

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
