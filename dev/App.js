import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly';
import '../src/styles/main.scss';
import 'react-select/dist/react-select.css';
import ReactJson from 'react-json-view';
import Select from 'react-select';
import PlotlyEditor, {DefaultEditor, Panel} from '../src';

// https://github.com/plotly/react-chart-editor#mapbox-access-tokens
import ACCESS_TOKENS from '../accessTokens';

const dataSources = {
  ints: [1, 2, 3, 4, 5], // eslint-disable-line no-magic-numbers
  'jagged ints': [2, 1, 3, 5, 4], // eslint-disable-line no-magic-numbers
  'big ints': [1000, 10100, 10000, 20000, 100000], // eslint-disable-line no-magic-numbers
  dates: ['2010-01-01', '2010-07-01', '2011-01-01', '2011-07-01', '2012-01-01'],
  months: ['January', 'February', 'March', 'April', 'May'],
  colors: ['red', 'orange', 'yellow', 'green', 'blue'],
  justblue: ['blue'],
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
              <Select
                clearable={true}
                value={this.state.currentMockIndex}
                name="mock-dropdown"
                options={this.state.mocks.map((item, i) => ({
                  label: item,
                  value: i,
                }))}
                searchable={true}
                searchPromptText="Search for a mock"
                onChange={option => this.loadMock(option.value)}
                noResultsText={'No Results'}
                placeholder={'Search for a mock'}
              />
              <br />
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
                  frames: this.state.frames,
                }}
              />
            </Panel>
          </DefaultEditor>
        </PlotlyEditor>
      </div>
    );
  }
}

export default hot(module)(App);
