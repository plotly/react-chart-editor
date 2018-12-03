import PanelHeader from './PanelHeader';
import PanelEmpty from './PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component, cloneElement} from 'react';
import update from 'immutability-helper';
import {bem} from 'lib';
import {EmbedIconIcon} from 'plotly-icons';
import {EditorControlsContext} from '../../context';
import {recursiveMap} from '../../lib/recursiveMap';
import {containerConnectedContextTypes} from '../../lib';

class PanelErrorImpl extends Component {
  render() {
    const {localize: _} = this.context;

    return (
      <PanelEmpty icon={EmbedIconIcon} heading={_('Well this is embarrassing.')}>
        <p>{_('This panel could not be displayed due to an error.')}</p>
      </PanelEmpty>
    );
  }
}

PanelErrorImpl.contextType = EditorControlsContext;

const PanelError = PanelErrorImpl;

export class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualFoldStates: [],
      hasError: false,
    };
    this.toggleFolds = this.toggleFolds.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
  }

  provideValue() {
    return {
      deleteContainer: this.props.deleteAction ? this.props.deleteAction : null,
    };
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  toggleFolds() {
    const {individualFoldStates} = this.state;
    const hasOpen = individualFoldStates.length > 0 && individualFoldStates.some(s => s !== true);
    this.setState({
      individualFoldStates: individualFoldStates.map(() => hasOpen),
    });
  }

  toggleFold(index) {
    this.setState(update(this.state, {individualFoldStates: {$toggle: [index]}}));
  }

  calculateFolds() {
    // to get proper number of child folds and initialize component state
    let numFolds = 0;

    React.Children.forEach(this.props.children, child => {
      if (((child && child.type && child.type.plotly_editor_traits) || {}).foldable) {
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
    const {individualFoldStates, hasError} = this.state;

    if (hasError) {
      return <PanelError />;
    }

    const newChildren = React.Children.map(this.props.children, (child, index) => {
      if (((child && child.type && child.type.plotly_editor_traits) || {}).foldable) {
        return cloneElement(child, {
          key: index,
          folded: individualFoldStates[index] || false,
          toggleFold: () => this.toggleFold(index),
        });
      }
      return child;
    });

    return (
      <div className={`panel${this.props.noPadding ? ' panel--no-padding' : ''}`}>
        <PanelHeader
          addAction={this.props.addAction}
          allowCollapse={this.props.showExpandCollapse && individualFoldStates.length > 1}
          toggleFolds={this.toggleFolds}
          hasOpen={individualFoldStates.some(s => s === false)}
          context={this.props.context}
        />
        <div className={bem('panel', 'content')}>
          {recursiveMap(newChildren, {
            ...this.context,
            ...this.props.context,
            ...this.provideValue(),
          })}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  addAction: PropTypes.object,
  children: PropTypes.node,
  deleteAction: PropTypes.func,
  noPadding: PropTypes.bool,
  showExpandCollapse: PropTypes.bool,
  context: PropTypes.any,
};

Panel.defaultProps = {
  showExpandCollapse: true,
};

Panel.contextType = EditorControlsContext;
Panel.requireContext = containerConnectedContextTypes;

// Panel.childContextTypes = {
//   deleteContainer: PropTypes.func,
// };

class PlotlyPanel extends Panel {}

PlotlyPanel.plotly_editor_traits = {
  no_visibility_forcing: true,
};

export default PlotlyPanel;
