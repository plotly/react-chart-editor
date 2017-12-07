import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import plotly from 'plotly.js/dist/plotly-basic';
import createPlotComponent from 'react-plotly.js/factory';
import PlotlyEditor, {Hub} from 'react-plotly.js-editor';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';

const Plot = createPlotComponent(plotly);

class App extends Component {
  constructor() {
    super();

    // DataSources are a mapping of column or data source ids to data arrays.
    const dataSources = {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]};
    const dataSourceOptions = [
      {value: 'col1', label: 'CO2'},
      {value: 'col2', label: 'NO2'},
      {value: 'col2', label: 'SiO2'},
    ];

    // A basic starting plotly.js figure object. Instead of assigning
    const figure = {
      data: [{type: 'scatter', x: dataSources.col1, ysrc: dataSources.col2}],
      layout: {title: 'Room readings'},
    };

    // Store the figure, dataSource and dataSourceOptions in state.
    this.state = {
      figure,
      dataSources,
      dataSourceOptions,
    };

    // Instantiate a Hub object. The hub is a convenience module that updates
    // the applies Editor updates to the figure object. After an update it
    // will call the onUpdate function with the editor and plot revision numbers.
    // We set these in our state and pass them to react-plotly.js-editor and
    // react-plotly.js plot component respectively. This is necessary because
    // the plotly.js library will mutate the figure object with user interactions.
    // The hub listens for events from plotly.js and alerts us to the mutation here.
    // The Editor follows the same mutation pattern (for good or ill) and the Hub
    // will pick up editor results in the same way.
    this.hub = new Hub({
      debug: true,
      onUpdate: ({editorRevision, plotRevision}) =>
        this.setState(prevState => ({
          ...prevState,
          editorRevision,
          plotRevision,
        })),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{display: 'flex'}}>
          <div style={{width: '30%'}}>
            <PlotlyEditor
              locale="en"
              dataSources={this.state.dataSources}
              dataSourceOptions={this.state.dataSourceOptions}
              graphDiv={this.hub.graphDiv}
              onUpdate={this.hub.handleEditorUpdate}
              plotly={plotly}
              revision={this.state.editorRevision}
            />
          </div>
          <div style={{width: '70%'}}>
            <Plot
              debug
              data={this.state.figure.data}
              layout={this.state.figure.layout}
              onUpdate={this.hub.handlePlotUpdate}
              onInitialized={this.hub.handlePlotInitialized}
              revision={this.state.plotRevision}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
