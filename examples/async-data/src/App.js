import './App.css';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';
import 'react-select/dist/react-select.css';
import PlotlyEditor, {
  EDITOR_ACTIONS,
  Hub,
  dereference,
} from 'react-plotly.js-editor';
import React, {Component} from 'react';
import createPlotComponent from 'react-plotly.js/factory';
import ee from 'event-emitter';
import plotly from 'plotly.js/dist/plotly-basic';

const Plot = createPlotComponent(plotly);

class Backend {
  constructor({dataSources, delay}) {
    this.dataSources = dataSources;
    this.delay = delay || 0;
  }

  fetch(request) {
    const {resource, data} = request;
    switch (resource) {
      case 'GetChartingData':
        this.processRequest('ChartingData', {
          columnName: data.columnName,
          data: this.dataSources[data.columnName],
        });
        break;
      case 'GetChartingDataColumnNames':
        this.processRequest(
          'ChartingDataColumnNames',
          Object.keys(this.dataSources)
        );
        break;
      default:
        throw new Error(`Unknown resource ${resource}`);
    }
  }

  processRequest(resource, responseData) {
    setTimeout(() => {
      this.emit(resource, responseData);
    }, this.delay);
  }
}

ee(Backend.prototype);

const backend = new Backend({
  dataSources: {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]},
  delay: 10,
});

class App extends Component {
  constructor() {
    super();

    // A basic starting plotly.js figure object. Instead of assigning
    const figure = {
      data: [{type: 'scatter'}],
      layout: {title: 'Room readings'},
    };

    // Store the figure, dataSource and dataSourceOptions in state.
    this.state = {figure, dataSources: {}};

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

    this.getChartingData = this.getChartingData.bind(this);
    this.setChartingData = this.setChartingData.bind(this);
    this.setChartingDataOptions = this.setChartingDataOptions.bind(this);
    this.onEditorUpdate = this.onEditorUpdate.bind(this);
  }

  componentDidMount() {
    backend.on('ChartingDataColumnNames', this.setChartingDataOptions);
    backend.on('ChartingData', this.setChartingData);

    this.getChartingDataColumnsNames();
  }

  componentDidUnmount() {
    backend.off('ChartingDataColumnNames', this.setChartingDataOptions);
    backend.off('ChartingData', this.setChartingData);
  }

  setChartingDataOptions(columnNames) {
    const dataSourceOptions = columnNames.map(name => ({
      value: name,
      label: name,
    }));
    this.setState(prevState => ({...prevState, dataSourceOptions}));
    this.hub.editorSourcesUpdated();
  }

  getChartingDataColumnsNames() {
    backend.fetch({
      resource: 'GetChartingDataColumnNames',
    });
  }

  getChartingData(columnName) {
    backend.fetch({
      resource: 'GetChartingData',
      data: {columnName},
    });
  }

  setChartingData({columnName, data}) {
    if (Array.isArray(data) && data.length) {
      const {dataSources, ...otherState} = this.state;
      dataSources[columnName] = data;
      dereference(this.state.figure.data, dataSources);
      this.setState({
        dataSources,
        ...otherState,
      });
      this.hub.figureUpdated();
    }
  }

  onEditorUpdate(event) {
    const {type, payload} = event;
    if (type === EDITOR_ACTIONS.UPDATE_TRACES) {
      const {update} = payload;
      if (update) {
        for (const key in update) {
          if (key.substr(key.length - 3) === 'src') {
            const columnId = update[key];
            const data = this.state.dataSources[columnId];
            if (!Array.isArray(data).length || !data.length) {
              this.getChartingData(columnId);
            }
          }
        }
      }
    }

    this.hub.handleEditorUpdate(event);
  }

  render() {
    return (
      <div className="App">
        <PlotlyEditor
          locale="en"
          dataSources={this.state.dataSources}
          dataSourceOptions={this.state.dataSourceOptions}
          graphDiv={this.hub.graphDiv}
          onUpdate={this.onEditorUpdate}
          plotly={plotly}
          revision={this.state.editorRevision}
        />
        <Plot
          debug
          data={this.state.figure.data}
          layout={this.state.figure.layout}
          onUpdate={this.hub.handlePlotUpdate}
          onInitialized={this.hub.handlePlotInitialized}
          revision={this.state.plotRevision}
        />
      </div>
    );
  }
}

export default App;
