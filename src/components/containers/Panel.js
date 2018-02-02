import PanelHeader from './PanelHeader';
import PropTypes from 'prop-types';
import React, {Component, cloneElement} from 'react';
import update from 'immutability-helper';
import {bem} from 'lib';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  calculateFolds() {
    // to get proper number of child folds and initialize component state
    let numFolds = 0;

    React.Children.forEach(this.props.children, child => {
      if ((child.type.plotly_editor_traits || {}).foldable) {
        numFolds++;
      }
    });

    if (this.state.individualFoldStates.length !== numFolds) {
      const newFoldStates = new Array(numFolds).fill(false);
      this.setState({
        individualFoldStates: this.props.addAction
          ? newFoldStates.map((e, i) => i !== numFolds - 1)
          : newFoldStates,
      });
    }
  }

  componentDidUpdate() {
    this.calculateFolds();
  }
  componentDidMount() {
    this.calculateFolds();
  }

  render() {
    const {individualFoldStates} = this.state;

    const newChildren = React.Children.map(
      this.props.children,
      (child, index) => {
        if ((child.type.plotly_editor_traits || {}).foldable) {
          return cloneElement(child, {
            key: index,
            folded: individualFoldStates[index] || false,
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
          allowCollapse={
            this.props.showExpandCollapse && individualFoldStates.length > 1
          }
          toggleFolds={this.toggleFolds}
          hasOpen={individualFoldStates.some(s => s === false)}
        />
        <div className={bem('panel', 'content')}>{newChildren}</div>
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  addAction: PropTypes.object,
  showExpandCollapse: PropTypes.bool,
};

Panel.defaultProps = {
  showExpandCollapse: true,
};

Panel.contextTypes = {
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default Panel;
