import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';
import PlotlyEditor from '../src';
import '../src/styles/main.scss';
import Nav from './Nav';

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
      currentMockIndex: -1,
      mocks: [],
    };

    this.loadMock = this.loadMock.bind(this);
  }

  componentWillMount() {
    fetch(
      'https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks'
    )
      .then(response => response.json())
      .then(mocks => this.setState({mocks}));
  }

  handlePlotUpdate(graphDiv) {
    this.setState(({editorRevision: x}) => ({editorRevision: x + 1, graphDiv}));
  }

  handleEditorUpdate() {
    this.setState(({plotRevision: x}) => ({plotRevision: x + 1}));
  }

  loadMock(mockIndex) {
    const mock = this.state.mocks[mockIndex];
    fetch(mock.url, {
      headers: new Headers({Accept: 'application/vnd.github.v3.raw'}),
    })
      .then(response => response.json())
      .then(figure => {
        const graphDiv = this.state.graphDiv;
        graphDiv.layout = figure.layout;
        graphDiv.data = figure.data;
        this.setState(({plotRevision: x}) => ({
          currentMockIndex: mockIndex,
          plotRevision: x + 1,
        }));
      });
  }

  render() {
    return (
      <div>
        <Nav
          mocks={this.state.mocks}
          currentMockIndex={this.state.currentMockIndex}
          loadMock={this.loadMock}
        />
        <div className="app">
          <PlotlyEditor
            graphDiv={this.state.graphDiv}
            onUpdate={this.handleEditorUpdate.bind(this)}
            revision={this.state.editorRevision}
            dataSources={dataSources}
            dataSourceOptions={dataSourceOptions}
            plotly={plotly}
          />
          <div className="app__main" style={{width: '100%', height: '100%'}}>
            <Plot
              debug
              useResizeHandler
              data={this.state.graphDiv.data}
              layout={this.state.graphDiv.layout}
              onUpdate={this.handlePlotUpdate.bind(this)}
              onInitialized={this.handlePlotUpdate.bind(this)}
              revision={this.state.plotRevision}
              style={{width: '100%', height: '100%', minHeight: '100vh'}}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
