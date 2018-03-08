import 'react-chart-editor/lib/react-chart-editor.css';
import PlotlyEditor from 'react-chart-editor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';

const dataSources = {
  col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
  col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};
const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = {editable: true};

class App extends Component {
  constructor(props) {
    super(props);
    const {actions} = props;

    actions.sourcesUpdate(dataSources);
    actions.dataSourceOptionsUpdate(dataSourceOptions);
  }

  render() {
    const {actions, dataSources, dataSourceOptions, data, layout} = this.props;

    return (
      <PlotlyEditor
        data={data}
        layout={layout}
        config={config}
        dataSources={dataSources}
        dataSourceOptions={dataSourceOptions}
        plotly={plotly}
        onUpdate={actions.editorUpdate}
        useResizeHandler
        debug
        advancedTraceTypeSelector
      />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  data: PropTypes.array,
  layout: PropTypes.object,
};

const mapStateToProps = state => ({
  dataSourceOptions: state.dataSourceOptions,
  dataSources: state.dataSources,
  data: state.data,
  layout: state.layout,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
