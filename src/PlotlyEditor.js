import React, {Component} from 'react';
import createPlotComponent from 'react-plotly.js/factory';
import EditorControls from './EditorControls';
import PropTypes from 'prop-types';

class PlotlyEditor extends Component {
  constructor(props) {
    super();
    this.state = {graphDiv: {}};
    this.PlotComponent = createPlotComponent(props.plotly);
  }

  render() {
    return (
      <div className="app">
        <EditorControls
          graphDiv={this.state.graphDiv}
          dataSources={this.props.dataSources}
          dataSourceOptions={this.props.dataSourceOptions}
          plotly={this.props.plotly}
          onUpdate={this.props.onUpdate}
          advancedTraceTypeSelector={this.props.advancedTraceTypeSelector}
        />
        <div className="app__main" style={{width: '100%', height: '100%'}}>
          <this.PlotComponent
            data={this.props.data}
            layout={this.props.layout}
            config={this.props.config}
            useResizeHandler={this.props.useResizeHandler}
            debug={this.props.debug}
            onInitialized={graphDiv => this.setState({graphDiv})}
            onUpdate={graphDiv => this.setState({graphDiv})}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 50px)',
            }}
          />
        </div>
      </div>
    );
  }
}

PlotlyEditor.propTypes = {
  layout: PropTypes.object,
  data: PropTypes.array,
  config: PropTypes.object,
  dataSourceOptions: PropTypes.array,
  dataSources: PropTypes.object,
  onUpdate: PropTypes.func,
  plotly: PropTypes.object,
  useResizeHandler: PropTypes.bool,
  debug: PropTypes.bool,
  advancedTraceTypeSelector: PropTypes.bool,
};

export default PlotlyEditor;
