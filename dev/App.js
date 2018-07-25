import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly-with-meta';
import '../src/styles/main.scss';
import 'react-select/dist/react-select.css';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import AceEditor from 'react-ace';
import Select from 'react-select';
import PlotlyEditor, {DefaultEditor, Panel} from '../src';
import Inspector from 'react-inspector';
import tips from './tips';
import 'brace/mode/json';
import 'brace/theme/textmate';

// https://github.com/plotly/react-chart-editor#mapbox-access-tokens
import ACCESS_TOKENS from '../accessTokens';

const dataSources = {
  ints: [1, 2, 3, 4, 5, 6], // eslint-disable-line no-magic-numbers
  'jagged ints': [2, 1, 3, 5, 4, 6], // eslint-disable-line no-magic-numbers
  'toggle ints': [1, -1, 1, -1, 1, -1], // eslint-disable-line no-magic-numbers
  'big ints': [1000, 10100, 10000, 20000, 100000], // eslint-disable-line no-magic-numbers
  dates: [
    '2010-01-01',
    '2010-07-01',
    '2011-01-01',
    '2011-07-01',
    '2012-01-01',
    '2012-06-01',
  ],
  months: ['January', 'February', 'March', 'April', 'May', 'June'],
  colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'],
  'blue and red': ['blue', 'red'],
  ...tips,
};
const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = {mapboxAccessToken: ACCESS_TOKENS.MAPBOX, editable: true};

const traceTypesConfig = {
  traces: _ => [
    {
      value: 'scatter',
      icon: 'scatter',
      label: _('Scatter'),
    },
    {
      value: 'line',
      label: _('Line'),
    },
    {
      value: 'area',
      label: _('Area'),
    },
    {
      value: 'bar',
      label: _('Bar'),
    },
    {
      value: 'histogram',
      label: _('Histogram'),
    },
    {
      value: 'table',
      label: _('Table'),
    },
    {
      value: 'pie',
      label: _('Pie'),
    },
    {
      value: 'box',
      label: _('Box'),
    },
    {
      value: 'histogram2d',
      label: _('Histogram 2D'),
    },
  ],
  complex: true,
};

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
    const mockName = this.state.mocks[mockIndex];
    const prefix =
      mockName[0] === '/'
        ? ''
        : 'https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks/';
    fetch(prefix + mockName, {
      headers: new Headers({Accept: 'application/vnd.github.v3.raw'}),
    })
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
          showFieldTooltips
          // glByDefault
          // traceTypesConfig={traceTypesConfig}
          // makeDefaultTrace={() => ({type: 'scattergl', mode: 'markers'})}
        >
          <DefaultEditor>
            <Panel group="Dev" name="JSON">
              <div className="mocks">
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
                />
              </div>
              <button
                className="devbtn"
                onClick={this.loadJSON}
                style={{background: this.state.json_error ? 'pink' : 'white'}}
              >
                Save
              </button>
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
                editorProps={{$blockScrolling: true}}
              />
            </Panel>
            <Panel group="Dev" name="Inspector">
              <button
                className="devbtn"
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
