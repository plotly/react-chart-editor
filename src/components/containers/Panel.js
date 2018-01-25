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

    const currentNbOfFolds = document.getElementsByClassName('fold').length;
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

    let addAction;

    const addableChild = this.firstChildWithCanAdd();
    if (addableChild) {
      addAction = (addableChild.type.plotly_editor_traits || {}).add_action;
    }

    const newChildren = React.Children.map(
      this.props.children,
      (child, index) => {
        if ((child.type.plotly_editor_traits || {}).foldable) {
          return cloneElement(child, {foldIndex: index, key: index});
        }
        return child;
      }
    );

    return (
      <div className={bem('panel')}>
        <PanelHeader
          addAction={addAction}
          allowCollapse={nbOfFolds > 1}
          toggleFolds={this.toggleFolds}
          hasOpen={hasOpen}
        />
        {newChildren}
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node,
};

Panel.contextTypes = {
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

Panel.childContextTypes = {
  individualFoldStates: PropTypes.array,
  toggleFold: PropTypes.func,
};

export default Panel;
