import PanelHeader from './PanelHeader';
import PropTypes from 'prop-types';
import React, {Component, cloneElement} from 'react';
import update from 'immutability-helper';
import {bem} from 'lib';
import PanelEmpty from './PanelEmpty';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbOfFolds: 0,
      individualFoldStates: [],
      hasTraces: false,
    };
    this.toggleFolds = this.toggleFolds.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
  }

  getChildContext() {
    return {
      individualFoldStates: this.state.individualFoldStates,
      toggleFold: this.toggleFold,
    };
  }

  toggleFolds() {
    const {individualFoldStates} = this.state;
    const hasOpen =
      individualFoldStates.length > 0 &&
      individualFoldStates.some(s => s !== true);
    this.setState({
      individualFoldStates: individualFoldStates.map(() => hasOpen),
    });
  }

  toggleFold(index) {
    this.setState(
      update(this.state, {individualFoldStates: {$toggle: [index]}})
    );
  }

  isTraceAccordion() {
    const {children} = this.props;
    return (
      children &&
      !Array.isArray(children) &&
      children.type.displayName &&
      children.type.displayName.indexOf('TraceAccordion') >= 0
    );
  }

  isAnnotationAccordion() {
    const {children} = this.props;
    return (
      children &&
      !Array.isArray(children) &&
      children.type.displayName.indexOf('AnnotationAccordion') >= 0
    );
  }

  closeAllButLast(array) {
    const lastIndex = array.length - 1;
    return array.map((e, i) => i !== lastIndex);
  }

  render() {
    const {visible, requireTraces} = this.props;
    const {individualFoldStates, nbOfFolds, hasTraces} = this.state;
    const hasOpen =
      individualFoldStates.length > 0 &&
      individualFoldStates.some(s => s === false);
    const {onUpdate, layout, updateContainer} = this.context;

    if (visible) {
      const children = this.props.children;
      let action = null;
      let onAction = () => {};

      if (this.isTraceAccordion() && children.props.canAdd) {
        action = 'addTrace';
        onAction = () =>
          children.type.prototype.render().type.prototype.addTrace(onUpdate);
      }

      if (this.isAnnotationAccordion() && children.props.canAdd) {
        action = 'addAnnotation';
        onAction = () =>
          children.type.prototype.addAnnotation(layout, updateContainer);
      }

      const newChildren = React.Children.map(children, (child, index) => {
        if (child.type.displayName.indexOf('Fold') >= 0) {
          return cloneElement(child, {foldIndex: index, key: index});
        }
        return child;
      });

      return (
        <div className={bem('panel')}>
          <PanelHeader
            action={action}
            allowCollapse={nbOfFolds > 1}
            toggleFolds={this.toggleFolds}
            hasOpen={hasOpen}
            onAction={onAction}
          />
          {requireTraces && !hasTraces ? <PanelEmpty /> : newChildren}
        </div>
      );
    }
    return null;
  }

  componentDidUpdate() {
    // to get proper number of child folds and initialize component state
    const {visible, requireTraces} = this.props;
    const {layout} = this.context;
    const {nbOfFolds, hasTraces} = this.state;

    if (visible) {
      /**
       * Check if there is any trace data
       */
      if (requireTraces) {
        /* eslint-disable */
        if (
          Object.keys(layout.xaxis).length === 0 ||
          Object.keys(layout.yaxis).length === 0
        ) {
          if (hasTraces) {
            this.setState({
              hasTraces: false,
            });
          }
        } else {
          if (!hasTraces) {
            this.setState({
              hasTraces: true,
            });
          }
        }
        /* eslint-enable */
      }

      const currentNbOfFolds = document.getElementsByClassName('fold').length;
      if (nbOfFolds !== currentNbOfFolds) {
        /* eslint-disable */
        if (this.isAnnotationAccordion() || this.isTraceAccordion()) {
          this.setState({
            nbOfFolds: currentNbOfFolds,
            individualFoldStates: this.closeAllButLast(
              new Array(currentNbOfFolds).fill(true)
            ),
          });
        } else {
          this.setState({
            nbOfFolds: currentNbOfFolds,
            individualFoldStates: new Array(currentNbOfFolds).fill(false),
          });
        }
        /* eslint-enable */
      }
    }
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  requireTraces: PropTypes.bool,
};

Panel.contextTypes = {
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

Panel.defaultProps = {
  visible: true,
};

Panel.childContextTypes = {
  individualFoldStates: PropTypes.array,
  toggleFold: PropTypes.func,
};

export default Panel;
