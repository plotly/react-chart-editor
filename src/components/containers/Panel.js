import PropTypes from 'prop-types';
import React, {Component} from 'react';
import PanelHeader from './PanelHeader';
import {bem} from 'lib';

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbOfFolds: 0,
      individualFoldStates: [],
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
      individualFoldStates: individualFoldStates.map(() => {
        if (hasOpen) {
          return true;
        }
        return false;
      }),
    });
  }

  toggleFold(index) {
    const copy = [...this.state.individualFoldStates];
    copy[index] = !copy[index];

    this.setState({
      individualFoldStates: copy,
    });
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
      children.type.name === 'AnnotationAccordion'
    );
  }

  closeAllButLast(array) {
    const lastIndex = array.length - 1;
    return array.map((e, i) => i !== lastIndex);
  }

  render() {
    const {visible, children} = this.props;
    const {individualFoldStates, nbOfFolds} = this.state;
    const hasOpen =
      individualFoldStates.length > 0 &&
      individualFoldStates.some(s => s === false);
    const {onUpdate, layout, updateContainer} = this.context;

    if (visible) {
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

      return (
        <div className={bem('panel')}>
          <PanelHeader
            action={action}
            allowCollapse={nbOfFolds > 1}
            toggleFolds={this.toggleFolds}
            hasOpen={hasOpen}
            onAction={onAction}
          />
          {children}
        </div>
      );
    }
    return null;
  }

  componentDidUpdate() {
    // to get proper number of child folds and initialize component state
    const {visible} = this.props;
    const {nbOfFolds} = this.state;

    if (visible) {
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
