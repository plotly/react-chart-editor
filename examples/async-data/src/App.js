import './App.css';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';
import PlotlyEditor, {dereference} from 'react-plotly.js-editor';
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
  // eslint-disable-next-line no-magic-numbers
  dataSources: {col1: [1, 2, 3], col2: [4, 3, 2], col3: [17, 13, 9]},
  delay: 10,
});

class App extends Component {
  constructor() {
    super();

    // This object is passed to Plotly.js, which then causes it to be
    // overwritten with a full DOM node that contains data, layout, _fullData,
    // _fullLayout etc in handlePlotUpdate()
    const graphDiv = {
      data: [{type: 'scatter'}],
      layout: {title: 'Room readings'},
    };

    // Store the figure, dataSource and dataSourceOptions in state.
    this.state = {
      graphDiv,
      editorRevision: 0,
      plotRevision: 0,
      dataSources: {},
    };

    this.getChartingData = this.getChartingData.bind(this);
    this.setChartingData = this.setChartingData.bind(this);
    this.setChartingDataOptions = this.setChartingDataOptions.bind(this);
  }

  componentDidMount() {
    backend.on('ChartingDataColumnNames', this.setChartingDataOptions);
    backend.on('ChartingData', this.setChartingData);

    this.getChartingDataColumnsNames();
  }

  componentWillUnmount() {
    backend.off('ChartingDataColumnNames', this.setChartingDataOptions);
    backend.off('ChartingData', this.setChartingData);
  }

  setChartingDataOptions(columnNames) {
    this.setState({
      dataSourceOptions: columnNames.map(name => ({
        value: name,
        label: name,
      })),
    });
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
      this.setState(({dataSources, graphDiv}) => {
        const newDataSources = {...dataSources, [columnName]: data};
        dereference(graphDiv.data, newDataSources);
        return {dataSources: newDataSources, graphDiv};
      });
    }
  }

  handleEditorUpdateTraces({update}) {
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
          onUpdateTraces={this.handleEditorUpdateTraces.bind(this)}
          revision={this.state.editorRevision}
          plotly={plotly}
        />
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
