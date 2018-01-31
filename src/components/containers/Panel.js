import PanelHeader from './PanelHeader';
import PropTypes from 'prop-types';
import React, {Component, cloneElement} from 'react';
import update from 'immutability-helper';
import {bem} from 'lib';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbOfFolds: 0,
      individualFoldStates: [],
    };
    this.toggleFolds = this.toggleFolds.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
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

  closeAllButLast(array) {
    const lastIndex = array.length - 1;
    return array.map((e, i) => i !== lastIndex);
  }

  firstChildWithCanAdd() {
    const children = React.Children.map(this.props.children, c => c);
    return children && children.filter(c => c.props.canAdd)[0];
  }

  calculateFolds() {
    // to get proper number of child folds and initialize component state
    const {nbOfFolds} = this.state;
    const currentNbOfFolds = (
      React.Children.map(
        this.props.children,
        child => ((child.type.plotly_editor_traits || {}).foldable ? 1 : 0)
      ) || []
    ).reduce((sum, x) => sum + x, 0);

    if (nbOfFolds !== currentNbOfFolds) {
      if (this.firstChildWithCanAdd()) {
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
    }
  }

  componentDidUpdate() {
    this.calculateFolds();
  }
  componentDidMount() {
    this.calculateFolds();
  }

  render() {
    const {individualFoldStates, nbOfFolds} = this.state;
    const hasOpen =
      individualFoldStates.length > 0 &&
      individualFoldStates.some(s => s === false);

    const newChildren = React.Children.map(
      this.props.children,
      (child, index) => {
        if ((child.type.plotly_editor_traits || {}).foldable) {
          return cloneElement(child, {
            key: index,
            folded: this.state.individualFoldStates[index] || false,
            toggleFold: () => this.toggleFold(index),
          });
        }
        return child;
      }
    );

    return (
      <div className={bem('panel')}>
        <PanelHeader
          addAction={this.props.addAction}
          allowCollapse={nbOfFolds > 1}
          toggleFolds={this.toggleFolds}
          hasOpen={hasOpen}
        />
        <div className={bem('panel', 'content')}>{newChildren}</div>
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  addAction: PropTypes.object,
};

Panel.contextTypes = {
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default Panel;
