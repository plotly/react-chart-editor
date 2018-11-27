import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {deepCopyPublic, setMultiValuedContainer} from './multiValues';
import {capitalize, getAllAxes, getDisplayName, getAxisTitle} from '../lib';
import {recursiveMap} from './recursiveMap';
import {EditorControlsContext} from '../context';

function computeAxesOptions(axes, props, context) {
  const _ = context.localize;
  let filteredAxes = axes;
  if (props.axisFilter) {
    filteredAxes = axes.filter(props.axisFilter);
  }

  const options = [];
  for (let i = 0; i < filteredAxes.length; i++) {
    const ax = filteredAxes[i];
    const label = capitalize(ax._name.split('axis')[0]);
    const value = (ax._subplot && !ax._subplot.includes('xaxis') && !ax._subplot.includes('yaxis')
      ? ax._subplot + '.' + ax._name
      : ax._subplot
    ).trim();

    options[i] = {
      label,
      value,
      axisGroup: ax._axisGroup,
      title: getAxisTitle(ax),
    };
  }

  return options.length > 1 ? [{label: _('All'), value: 'allaxes'}].concat(options) : options;
}

export default function connectAxesToLayout(WrappedComponent) {
  class AxesConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      const {context: propContext, ...newProps} = props;
      this.axes = getAllAxes(propContext.fullContainer);
      this.axesOptions = computeAxesOptions(this.axes, newProps, {
        ...propContext,
        localize: context.localize,
      });

      // this.axesOptions can be an empty array when we have a filter on an AxesFold
      // and no axes correspond to the condition
      let defaultAxesTarget = null;
      if (this.axesOptions.length === 1) {
        defaultAxesTarget = this.axesOptions[0].value;
      }
      if (this.axesOptions.length > 1) {
        defaultAxesTarget = this.axesOptions[1].value;
      }

      this.state = {
        axesTarget: defaultAxesTarget,
      };

      this.axesTargetHandler = this.axesTargetHandler.bind(this);
      this.updateContainer = this.updateContainer.bind(this);

      this.setLocals(newProps, this.state, propContext);
    }

    componentWillUpdate(nextProps, nextState) {
      const {context: propContext, ...newProps} = nextProps;
      this.axes = getAllAxes(propContext.fullContainer);
      this.axesOptions = computeAxesOptions(this.axes, nextProps, {
        ...propContext,
        localize: this.context.localize,
      });
      // This is not enough, what if plotly.js adds new axes...
      this.setLocals(newProps, nextState, propContext);
    }

    setLocals(nextProps, nextState, nextContext) {
      const {container, fullContainer} = nextContext;
      const {axesTarget} = nextState;

      if (axesTarget === 'allaxes') {
        const multiValuedContainer = deepCopyPublic(this.axes[0]);
        this.axes.slice(1).forEach(ax =>
          Object.keys(ax).forEach(key =>
            setMultiValuedContainer(multiValuedContainer, deepCopyPublic(ax), key, {
              searchArrays: true,
            })
          )
        );
        this.fullContainer = multiValuedContainer;
        this.defaultContainer = this.axes[0];
        this.container = {};
      } else if (axesTarget) {
        this.fullContainer = nestedProperty(fullContainer, axesTarget).get();
        this.container = this.container = nestedProperty(container, axesTarget).get() || {};
      }
    }

    provideValue() {
      return {
        getValObject: attr =>
          !this.props.context.getValObject
            ? null
            : this.props.context.getValObject(`${this.state.axesTarget}.${attr}`),
        axesOptions: this.axesOptions,
        axesTarget: this.state.axesTarget,
        axesTargetHandler: this.axesTargetHandler,
        container: this.container,
        defaultContainer: this.defaultContainer,
        fullContainer: this.fullContainer,
        fullLayout: this.context.fullLayout,
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
          const subplot = axes[j]._subplot;
          let axesKey = axes[j]._name;

          if (subplot && !subplot.includes('xaxis') && !subplot.includes('yaxis')) {
            axesKey = `${subplot}.${axesKey}`;
          }

          const newkey = `${axesKey}.${keys[i]}`;
          newUpdate[newkey] = update[keys[i]];
        }
      }

      this.props.context.updateContainer(newUpdate);
    }

    render() {
      const newProps = {...this.props, context: this.provideValue()};
      if (this.props.children) {
        return (
          <WrappedComponent {...newProps} options={this.axesOptions}>
            {recursiveMap(this.props.children, this.provideValue())}
          </WrappedComponent>
        );
      }
      return <WrappedComponent {...newProps} options={this.axesOptions} />;
    }
  }

  AxesConnectedComponent.displayName = `AxesConnected${getDisplayName(WrappedComponent)}`;
  AxesConnectedComponent.contextType = EditorControlsContext;

  AxesConnectedComponent.requireContext = {
    container: PropTypes.object.isRequired,
    fullContainer: PropTypes.object.isRequired,
    updateContainer: PropTypes.func,
    getValObject: PropTypes.func,
  };

  AxesConnectedComponent.propTypes = {
    children: PropTypes.node,
    context: PropTypes.any,
  };

  const {plotly_editor_traits} = WrappedComponent;
  AxesConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return AxesConnectedComponent;
}
