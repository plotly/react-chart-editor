import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';
import PlotlyEditor, {dereference} from 'react-plotly.js-editor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import createPlotComponent from 'react-plotly.js/factory';
import plotly from 'plotly.js/dist/plotly-basic';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';

const Plot = createPlotComponent(plotly);

class App extends Component {
  constructor(props) {
    super(props);
    const {actions} = props;

    // eslint-disable-next-line no-magic-numbers
    const dataSources = {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]};
    const dataSourceOptions = [
      {value: 'col1', label: 'CO2'},
      {value: 'col2', label: 'NO2'},
      {value: 'col3', label: 'SiO2'},
    ];

    const graphDiv = {
      data: [{type: 'scatter', xsrc: 'col1', ysrc: 'col2'}],
      layout: {title: 'Room readings'},
    };

    dereference(graphDiv.data, dataSources);

    actions.sourcesUpdate(dataSources);
    actions.dataSourceOptionsUpdate(dataSourceOptions);
    actions.initializePlot({data: graphDiv.data, layout: graphDiv.layout});
  }

  render() {
    const {
      actions,
      dataSources,
      dataSourceOptions,
      graphDiv,
      editorRevision,
      plotRevision,
    } = this.props;

    return (
      <div className="App">
        <PlotlyEditor
          locale="en"
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
          graphDiv={graphDiv}
          onUpdate={actions.editorUpdate}
          revision={editorRevision}
          plotly={plotly}
        />
        <Plot
          debug
          data={graphDiv.data}
          layout={graphDiv.layout}
          onUpdate={actions.plotUpdate}
          onInitialized={actions.plotUpdate}
          revision={plotRevision}
        />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  editorRevision: PropTypes.number,
  graphDiv: PropTypes.object,
  plotRevision: PropTypes.number,
};

const mapStateToProps = state => ({
  dataSourceOptions: state.dataSourceOptions,
  dataSources: state.dataSources,
  editorRevision: state.editorRevision,
  graphDiv: state.graphDiv,
  plotRevision: state.plotRevision,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
