import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PanelEmpty from './PanelEmpty';
import Panel from './Panel';

class AxisRequiredPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAxis: true,
    };
  }

  checkAxisExistence() {
    const hasSubplot =
      Object.keys(this.context.fullContainer._subplots).filter(
        type =>
          !['cartesian', 'mapbox'].includes(type) &&
          this.context.fullContainer._subplots[type].length > 0
      ).length > 0;
    if (!hasSubplot) {
      this.setState({hasAxis: false});
    }
  }

  componentWillReceiveProps() {
    this.checkAxisExistence();
  }

  componentDidMount() {
    this.checkAxisExistence();
  }

  render() {
    if (this.state.hasAxis) {
      return <Panel>{this.props.children}</Panel>;
    }
    return <PanelEmpty heading={this.props.emptyPanelHeader} />;
  }
}

AxisRequiredPanel.propTypes = {
  children: PropTypes.node,
  emptyPanelHeader: PropTypes.string,
};

AxisRequiredPanel.contextTypes = {
  fullContainer: PropTypes.object,
};

export default AxisRequiredPanel;
