import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly';
import '../src/styles/main.scss';
import 'react-select/dist/react-select.css';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import AceEditor from 'react-ace';
import Select from 'react-select';
import PlotlyEditor, {DefaultEditor, Panel} from '../src';
import Inspector from 'react-inspector';
import 'brace/mode/json';
import 'brace/theme/textmate';

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
    this.loadJSON = this.loadJSON.bind(this);
    this.updateState = this.updateState.bind(this);
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
        const {data, layout, frames} = figure;
        this.updateState(data, layout, frames, mockIndex);
      });
  }

  updateState(data, layout, frames, currentMockIndex) {
    this.setState({
      data,
      layout,
      frames,
      currentMockIndex,
      full: 'hit refresh',
      json_error: false,
      json_string: JSON.stringify({data, layout, frames}, null, 2),
    });
  }

  loadJSON() {
    try {
      const {data, layout, frames} = JSON.parse(this.state.json_string);
      this.updateState(data, layout, frames);
    } catch (e) {
      this.setState({json_error: true});
    }
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
          onUpdate={this.updateState}
          divId="gd"
          useResizeHandler
          debug
          advancedTraceTypeSelector
        >
          <DefaultEditor>
            <Panel group="Dev" name="JSON">
              <Select
                clearable={false}
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
                className="mocks"
              />
              <br />
              <button
                onClick={this.loadJSON}
                style={{background: this.state.json_error ? 'pink' : 'white'}}
              >
                Save
              </button>
              <br />
              <AceEditor
                mode="json"
                theme="textmate"
                onChange={json_string => this.setState({json_string})}
                value={this.state.json_string}
                name="UNIQUE_ID_OF_DIV"
                style={{height: '80vh'}}
                setOptions={{
                  showLineNumbers: false,
                  tabSize: 2,
                }}
                commands={[
                  {
                    name: 'save',
                    bindKey: {win: 'Ctrl-s', mac: 'Command-s'},
                    exec: this.loadJSON,
                  },
                ]}
              />
            </Panel>
            <Panel group="Dev" name="_fullJSON">
              <button
                onClick={() => {
                  const gd = document.getElementById('gd') || {};
                  this.setState({
                    full: {
                      _fullData: gd._fullData || [],
                      _fullLayout: gd._fullLayout || {},
                    },
                  });
                }}
              >
                Refresh
              </button>
              <br />
              <div style={{height: '80vh'}}>
                <Inspector
                  data={{_full: this.state.full}}
                  expandLevel={2}
                  sortObjectKeys={true}
                />
              </div>
            </Panel>
          </DefaultEditor>
        </PlotlyEditor>
      </div>
    );
  }
}

export default hot(module)(App);
