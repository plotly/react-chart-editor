import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly';
import PlotlyEditor from 'react-chart-editor';
import CustomEditor from './CustomEditor';
import 'react-chart-editor/lib/react-chart-editor.css';

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
  constructor() {
    super();
    this.state = {
      data: [
        {
          type: 'scatter',
          x: dataSources.col1,
          y: dataSources.col2,
          marker: {color: dataSources.col3},
        },
      ],
      layout: {},
    };
  }

  render() {
    return (
      <div className="app">
        <PlotlyEditor
          data={this.state.data}
          layout={this.state.layout}
          config={config}
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
          plotly={plotly}
          onUpdate={(data, layout) => this.setState({data, layout})}
          useResizeHandler
          debug
          advancedTraceTypeSelector
        >
          <CustomEditor />
        </PlotlyEditor>
      </div>
    );
  }
}

export default App;
