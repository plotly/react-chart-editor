import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly';
import '../src/styles/main.scss';
import ReactJson from 'react-json-view';
import Nav from './Nav';
import PlotlyEditor, {DefaultEditor, Panel} from '../src';

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
      frames: [],
      currentMockIndex: -1,
      mocks: [],
    };

    this.loadMock = this.loadMock.bind(this);
  }

  componentWillMount() {
    // curl https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks \
    // | jq '[.[] | .name ]' > mocks.json
    fetch('/mocks.json')
      .then(response => response.json())
      .then(mocks => this.setState({mocks}));
  }

  loadMock(mockIndex) {
    fetch(
      'https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks/' +
        this.state.mocks[mockIndex],
      {
        headers: new Headers({Accept: 'application/vnd.github.v3.raw'}),
      }
    )
      .then(response => response.json())
      .then(figure => {
        this.setState({
          currentMockIndex: mockIndex,
          data: figure.data,
          layout: figure.layout,
          frames: figure.frames,
        });
      });
  }

  render() {
    return (
      <div className="app">
        <PlotlyEditor
          data={this.state.data}
          layout={this.state.layout}
          frames={this.state.frames}
          config={config}
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
          plotly={plotly}
          onUpdate={(data, layout, frames) =>
            this.setState({data, layout, frames})
          }
          useResizeHandler
          debug
          advancedTraceTypeSelector
        >
          {' '}
          <DefaultEditor>
            <Panel group="Dev" name="JSON">
              <ReactJson
                enableClipboard={false}
                name={false}
                displayDataTypes={false}
                displayObjectSize={false}
                indentWidth={2}
                onAdd={({updated_src}) => this.setState(updated_src)}
                onEdit={({updated_src}) => this.setState(updated_src)}
                onDelete={({updated_src}) => this.setState(updated_src)}
                src={{
                  data: this.state.data,
                  layout: this.state.layout,
                }}
              />
            </Panel>
          </DefaultEditor>
        </PlotlyEditor>
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
