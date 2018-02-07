import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';
import PlotlyEditor from 'react-plotly.js-editor';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import createPlotComponent from 'react-plotly.js/factory';
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

const Plot = createPlotComponent(plotly);

class App extends Component {
  constructor(props) {
    super(props);
    const {actions} = props;

    const graphDiv = {data: [], layout: {}};

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
      <div className="app">
        <aside className="app__aside">
          <PlotlyEditor
            locale="en"
            dataSources={dataSources}
            dataSourceOptions={dataSourceOptions}
            graphDiv={graphDiv}
            onUpdate={actions.editorUpdate}
            revision={editorRevision}
            plotly={plotly}
          />
        </aside>
        <div className="app__main">
          <Plot
            debug
            data={graphDiv.data}
            layout={graphDiv.layout}
            onUpdate={actions.plotUpdate}
            onInitialized={actions.plotUpdate}
            revision={plotRevision}
          />
        </div>
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
