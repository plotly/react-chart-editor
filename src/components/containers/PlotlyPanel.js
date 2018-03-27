import PanelHeader from './PanelHeader';
import PanelEmpty from './PanelEmpty';
import PropTypes from 'prop-types';
import React, {Component, cloneElement} from 'react';
import update from 'immutability-helper';
import {bem, localize} from 'lib';
import {EmbedIconIcon} from 'plotly-icons';

class PanelErrorImpl extends Component {
  render() {
    const {localize: _} = this.props;

    return (
      <PanelEmpty
        icon={EmbedIconIcon}
        heading={_('Well this is embarrassing.')}
        message={_('This panel could not be displayed due to an error.')}
      />
    );
  }
}

PanelErrorImpl.propTypes = {
  localize: PropTypes.func,
};

const PanelError = localize(PanelErrorImpl);

class PlotlyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualFoldStates: [],
      hasError: false,
    };
    this.toggleFolds = this.toggleFolds.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
  }

  componentDidCatch() {
    this.setState({hasError: true});
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
    const {individualFoldStates, hasError} = this.state;

    if (hasError) {
      return <PanelError />;
    }

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
      <div
        className={`panel${this.props.noPadding ? ' panel--no-padding' : ''}`}
      >
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

PlotlyPanel.plotly_editor_traits = {no_visibility_forcing: true};

PlotlyPanel.propTypes = {
  children: PropTypes.node,
  addAction: PropTypes.object,
  showExpandCollapse: PropTypes.bool,
  noPadding: PropTypes.bool,
};

PlotlyPanel.defaultProps = {
  showExpandCollapse: true,
};

PlotlyPanel.contextTypes = {
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  updateContainer: PropTypes.func,
};

export default PlotlyPanel;

export class Panel extends PlotlyPanel {}

Panel.plotly_editor_traits = {
  no_visibility_forcing: false,
};
