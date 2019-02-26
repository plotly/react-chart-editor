import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import plotly from 'plotly.js/dist/plotly-with-meta';
import '../src/styles/main.scss';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import AceEditor from 'react-ace';
import Select from 'react-select';
import PlotlyEditor, {DefaultEditor, Panel} from '../src';
import Inspector from 'react-inspector';
import dataSources from './dataSources';
import 'brace/mode/json';
import 'brace/theme/textmate';

// https://github.com/plotly/react-chart-editor#mapbox-access-tokens
import ACCESS_TOKENS from '../accessTokens';

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

const chartHelp = {
  area: {
    helpDoc: 'https://help.plot.ly/make-an-area-graph/',
    examplePlot: () => {
      console.log('example bar plot!');
    },
  },
  bar: {
    helpDoc: 'https://help.plot.ly/stacked-bar-chart/',
    examplePlot: () => {
      console.log('example bar plot!');
    },
  },
  box: {helpDoc: 'https://help.plot.ly/make-a-box-plot/'},
  candlestick: {helpDoc: 'https://help.plot.ly/make-a-candlestick/'},
  choropleth: {helpDoc: 'https://help.plot.ly/make-a-choropleth-map/'},
  contour: {helpDoc: 'https://help.plot.ly/make-a-contour-plot/'},
  heatmap: {helpDoc: 'https://help.plot.ly/make-a-heatmap/'},
  histogram2d: {helpDoc: 'https://help.plot.ly/make-a-2d-histogram-heatmap/'},
  histogram2dcontour: {helpDoc: 'https://help.plot.ly/make-a-histogram/'},
  line: {helpDoc: 'https://help.plot.ly/make-a-line-graph/'},
  mesh3d: {helpDoc: null},
  ohlc: {helpDoc: 'https://help.plot.ly/make-a-ohlc/'},
  pie: {helpDoc: 'https://help.plot.ly/make-a-pie-chart/'},
  scatter3d: {helpDoc: 'https://help.plot.ly/make-a-3d-scatter-plot/'},
  line3d: {helpDoc: null},
  scatter: {helpDoc: 'https://help.plot.ly/how-to-make-a-scatter-plot/'},
  scattergeo: {helpDoc: 'https://help.plot.ly/make-scatter-map/'},
  scattermapbox: {helpDoc: 'https://help.plot.ly/make-a-mapbox-map/'},
  scatterternary: {helpDoc: 'https://help.plot.ly/ternary-scatter-plot/'},
  surface: {helpDoc: 'https://help.plot.ly/make-a-3d-surface-plot/'},
  table: {helpDoc: null},
  timeseries: {helpDoc: 'https://help.plot.ly/range-slider/'},
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
          // fontOptions={[{label:'Arial', value: 'arial'}]}
          // chartHelp={chartHelp}
        >
          <DefaultEditor
          // menuPanelOrder={[
          //   {group: 'Dev', name: 'JSON'},
          //   {group: 'Dev', name: 'Inspector'},
          //   {group: 'Structure', name: 'Create'},
          //   {group: 'Structure', name: 'Subplots'},
          //   {group: 'Structure', name: 'Transforms'},
          //   {group: 'Test', name: 'Testing'},
          //   {group: 'Style', name: 'General'},
          //   {group: 'Style', name: 'Traces'},
          //   {group: 'Style', name: 'Axes'},
          //   {group: 'Style', name: 'Legend'},
          //   {group: 'Style', name: 'Color Bars'},
          //   {group: 'Style', name: 'Annotation'},
          //   {group: 'Style', name: 'Shapes'},
          //   {group: 'Style', name: 'Images'},
          //   {group: 'Style', name: 'Sliders'},
          //   {group: 'Style', name: 'Menus'},
          // ]}
          >
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
                <Inspector data={{_full: this.state.full}} expandLevel={2} sortObjectKeys={true} />
              </div>
            </Panel>
          </DefaultEditor>
        </PlotlyEditor>
      </div>
    );
  }
}

export default hot(module)(App);
