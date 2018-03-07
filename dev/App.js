import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly';
import '../src/styles/main.scss';
import Nav from './Nav';
import PlotlyEditor from '../src';

// https://github.com/plotly/react-chart-editor#mapbox-access-tokens
import ACCESS_TOKENS from '../accessTokens';

const dataSources = {
  col1: ['Jan', 'Feb', 'Mar'], // eslint-disable-line no-magic-numbers
  col2: [1, 2, 3],
  col3: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col4: [17, 13, 9], // eslint-disable-line no-magic-numbers
  col5: ['blue'],
  col6: ['yellow', 'green', 'yellow'],
};
const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = {mapboxAccessToken: ACCESS_TOKENS.MAPBOX, editable: true};

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      layout: {},
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

  loadMock(mockIndex) {
    const mock = this.state.mocks[mockIndex];
    fetch(mock.url, {
      headers: new Headers({Accept: 'application/vnd.github.v3.raw'}),
    })
      .then(response => response.json())
      .then(figure => {
        this.setState({
          currentMockIndex: mockIndex,
          data: figure.data,
          layout: figure.layout,
        });
      });
  }

  render() {
    return (
      <div className="app__container plotly-editor--theme-provider">
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
        />
        <Nav
          currentMockIndex={this.state.currentMockIndex}
          loadMock={this.loadMock}
          mocks={this.state.mocks}
        />
      </div>
    );
  }
}

export default hot(module)(App);
