import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly-basic';
import createPlotComponent from 'react-plotly.js/factory';
import PlotlyEditor, {Hub, dereference} from 'react-plotly.js-editor';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';
import 'react-select/dist/react-select.css';

const Plot = createPlotComponent(plotly);

class App extends Component {
  constructor() {
    super();

    // DataSources are a mapping of column or data source ids to data arrays.
    const dataSources = {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]};
    const dataSourceOptions = [
      {value: 'col1', label: 'CO2'},
      {value: 'col2', label: 'NO2'},
      {value: 'col3', label: 'SiO2'},
    ];

    // A basic starting plotly.js figure object. Instead of assigning
    const figure = {
      data: [{type: 'scatter', xsrc: 'col1', ysrc: 'col2'}],
      layout: {title: 'Room readings'},
    };

    dereference(figure.data, dataSources);

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
        <PlotlyEditor
          locale="en"
          dataSources={this.state.dataSources}
          dataSourceOptions={this.state.dataSourceOptions}
          graphDiv={this.hub.graphDiv}
          onUpdate={this.hub.handleEditorUpdate}
          plotly={plotly}
          revision={this.state.editorRevision}
        />
        <div className="plotlyPlot">
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
    );
  }
}

export default App;
