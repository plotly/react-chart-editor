import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {MULTI_VALUED} from './constants';
import {getDisplayName, isPlainObject} from '../lib';

/**
 * Simple replacer to use with JSON.stringify.
 * @param {*} key Current object key.
 * @param {*} value Current value in object at key.
 * @returns {*} If we return undefined, the key is skipped in JSON.stringify.
 */
function skipPrivateKeys(key, value) {
  if (key.startsWith('_')) {
    return void 0;
  }

  return value;
}

/**
 * Deep-copies the value using JSON. Underscored (private) keys are removed.
 * @param {*} value Some nested value from the plotDiv object.
 * @returns {*} A deepcopy of the value.
 */
function deepCopyPublic(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  return window.JSON.parse(window.JSON.stringify(value, skipPrivateKeys));
}

/*
 * Test that we can connectLayoutToPlot(connectAxesToLayout(Panel))
 */
function setMultiValuedContainer(intoObj, fromObj, key, config = {}) {
  var intoVal = intoObj[key],
    fromVal = fromObj[key];

  var searchArrays = config.searchArrays;

  // don't merge private attrs
  if (
    (typeof key === 'string' && key.charAt(0) === '_') ||
    typeof intoVal === 'function' ||
    key === 'module'
  ) {
    return;
  }

  // already a mixture of values, can't get any worse
  if (intoVal === MULTI_VALUED) {
    return;
  } else if (intoVal === void 0) {
    // if the original doesn't have the key it's because that key
    // doesn't do anything there - so use the new value
    // note that if fromObj doesn't have a key in intoObj we will not
    // attempt to merge them at all, so this behavior makes the merge
    // independent of order.
    intoObj[key] = fromVal;
  } else if (key === 'colorscale') {
    // colorscales are arrays... need to stringify before comparing
    // (other vals we don't want to stringify, as differences could
    // potentially be real, like 'false' and false)
    if (String(intoVal) !== String(fromVal)) {
      intoObj[key] = MULTI_VALUED;
    }
  } else if (Array.isArray(intoVal)) {
    // in data, other arrays are data, which we don't care about
    // for styling purposes
    if (!searchArrays) {
      return;
    }
    // in layout though, we need to recurse into arrays
    for (var i = 0; i < fromVal.length; i++) {
      setMultiValuedContainer(intoVal, fromVal, i, searchArrays);
    }
  } else if (isPlainObject(fromVal)) {
    // recurse into objects
    if (!isPlainObject(intoVal)) {
      throw new Error('tried to merge object into non-object: ' + key);
    }
    Object.keys(fromVal).forEach(function(key2) {
      setMultiValuedContainer(intoVal, fromVal, key2, searchArrays);
    });
  } else if (isPlainObject(intoVal)) {
    throw new Error('tried to merge non-object into object: ' + key);
  } else if (intoVal !== fromVal) {
    // different non-empty values -
    intoObj[key] = MULTI_VALUED;
  }
}

function computeAxesOptions(axes) {
  const options = [{label: 'All', value: 'allaxes'}];
  for (let i = 0; i < axes.length; i++) {
    const ax = axes[i];
    const axesPrefix = ax._id.length > 1 ? ' ' + ax._id.substr(1) : '';
    const label = `${ax._id.charAt(0).toUpperCase()}${axesPrefix}`;
    options[i + 1] = {label, value: ax._name};
  }

  return options;
}

export default function connectAxesToLayout(WrappedComponent) {
  class AxesConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {axesTarget: this.props.defaultAxesTarget};
      this.axesTargetHandler = this.axesTargetHandler.bind(this);
      this.updateContainer = this.updateContainer.bind(this);

      this.setLocals(props, this.state, context);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      // This is not enough, what if plotly.js adds new axes...
      this.setLocals(nextProps, nextState, nextContext);
    }

    // This function should be optimized. We can compare a list of
    // axesNames to nextAxesNames and check gd.layout[axesN] for shallow
    // equality. Unfortunately we are currently mutating gd.layout so the
    // shallow check is not possible.
    setLocals(nextProps, nextState, nextContext) {
      const {plotly, graphDiv, container, fullContainer} = nextContext;
      const {axesTarget} = nextState;
      if (plotly) {
        this.axes = plotly.Axes.list(graphDiv);
      } else {
        this.axes = [];
      }
      this.axesOptions = computeAxesOptions(this.axes);

      if (axesTarget === 'allaxes') {
        const multiValuedContainer = deepCopyPublic(this.axes[0]);
        this.axes.slice(1).forEach(ax =>
          Object.keys(ax).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, ax, key, {
              searchArrays: true,
            })
          )
        );
        this.fullContainer = multiValuedContainer;
        this.defaultContainer = this.axes[0];
        // what should this be set to? Probably doesn't matter.
        this.container = {};
      } else {
        this.fullContainer = nestedProperty(fullContainer, axesTarget).get();
        this.container = nestedProperty(container, axesTarget).get();
      }
    }

    getChildContext() {
      return {
        axesOptions: this.axesOptions,
        axesTarget: this.state.axesTarget,
        axesTargetHandler: this.axesTargetHandler,
        container: this.container,
        defaultContainer: this.defaultContainer,
        fullContainer: this.fullContainer,
        updateContainer: this.updateContainer,
      };
    }

    axesTargetHandler(axesTarget) {
      this.setState({axesTarget});
    }

    updateContainer(update) {
      const newUpdate = {};
      const {axesTarget} = this.state;

      let axes = this.axes;
      if (axesTarget !== 'allaxes') {
        // only the selected container
        axes = [this.fullContainer];
      }

      const keys = Object.keys(update);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < axes.length; j++) {
          const scene = axes[j]._id.substr(1);
          let axesKey = axes[j]._name;

          // scenes are nested
          if (scene.indexOf('scene') !== -1) {
            axesKey = `${scene}.${axesKey}`;
          }

          const newkey = `${axesKey}.${keys[i]}`;
          newUpdate[newkey] = update[keys[i]];
        }
      }

      this.context.updateContainer(newUpdate);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  AxesConnectedComponent.displayName = `AxesConnected${getDisplayName(
    WrappedComponent
  )}`;

  AxesConnectedComponent.propTypes = {
    defaultAxesTarget: PropTypes.string,
  };

  AxesConnectedComponent.defaultProps = {
    defaultAxesTarget: 'xaxis',
  };

  AxesConnectedComponent.contextTypes = {
    container: PropTypes.object.isRequired,
    fullContainer: PropTypes.object.isRequired,
    graphDiv: PropTypes.object.isRequired,
    plotly: PropTypes.object,
    updateContainer: PropTypes.func,
  };

  AxesConnectedComponent.childContextTypes = {
    axesOptions: PropTypes.array,
    axesTarget: PropTypes.string,
    axesTargetHandler: PropTypes.func,
    container: PropTypes.object,
    defaultContainer: PropTypes.object,
    fullContainer: PropTypes.object,
    updateContainer: PropTypes.func,
  };

  return AxesConnectedComponent;
}
