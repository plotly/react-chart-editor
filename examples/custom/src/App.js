import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly-basic';
import createPlotComponent from 'react-plotly.js/factory';
import PlotlyEditor, {dereference} from 'react-plotly.js-editor';
import CustomEditor from './CustomEditor';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';

const Plot = createPlotComponent(plotly);

class App extends Component {
  constructor() {
    super();

    // DataSources are a mapping of column or data source ids to data arrays.
    // eslint-disable-next-line no-magic-numbers
    const dataSources = {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]};
    const dataSourceOptions = [
      {value: 'col1', label: 'CO2'},
      {value: 'col2', label: 'NO2'},
      {value: 'col3', label: 'SiO2'},
    ];

    // This object is passed to Plotly.js, which then causes it to be
    // overwritten with a full DOM node that contains data, layout, _fullData,
    // _fullLayout etc in handlePlotUpdate()
    const graphDiv = {
      data: [{type: 'scatter', mode: 'markers'}],
      layout: {title: 'Room readings'},
    };

    dereference(graphDiv.data, dataSources);

    // Store the figure, dataSource and dataSourceOptions in state.
    this.state = {
      graphDiv,
      editorRevision: 0,
      plotRevision: 0,
      dataSources,
      dataSourceOptions,
    };
  }

  handlePlotUpdate(graphDiv) {
    this.setState(({editorRevision: x}) => ({editorRevision: x + 1, graphDiv}));
  }

  handleEditorUpdate() {
    this.setState(({plotRevision: x}) => ({plotRevision: x + 1}));
  }

  render() {
    return (
      <div className="app">
        <PlotlyEditor
          locale="en"
          dataSources={this.state.dataSources}
          dataSourceOptions={this.state.dataSourceOptions}
          graphDiv={this.state.graphDiv}
          onUpdate={this.handleEditorUpdate.bind(this)}
          revision={this.state.editorRevision}
          plotly={plotly}
        >
          <CustomEditor />
        </PlotlyEditor>
        <div className="app__main">
          <Plot
            debug
            data={this.state.graphDiv.data}
            layout={this.state.graphDiv.layout}
            onUpdate={this.handlePlotUpdate.bind(this)}
            onInitialized={this.handlePlotUpdate.bind(this)}
            revision={this.state.plotRevision}
          />
        </div>
      </div>
    );
  }
}

export default App;
