import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly-basic';
import createPlotComponent from 'react-plotly.js/factory';
import PlotlyEditor from 'react-plotly.js-editor';
import CustomEditor from './CustomEditor';
import 'react-plotly.js-editor/lib/react-plotly.js-editor.css';

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
  constructor() {
    super();

    // The graphDiv object is passed to Plotly.js, which then causes it to be
    // overwritten with a full DOM node that contains data, layout, _fullData,
    // _fullLayout etc in handlePlotUpdate()
    this.state = {
      graphDiv: {},
      editorRevision: 0,
      plotRevision: 0,
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
          graphDiv={this.state.graphDiv}
          onUpdate={this.handleEditorUpdate.bind(this)}
          revision={this.state.editorRevision}
          plotly={plotly}
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
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
