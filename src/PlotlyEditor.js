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
      <div className="plotly_editor">
        <EditorControls
          graphDiv={this.state.graphDiv}
          dataSources={this.props.dataSources}
          dataSourceOptions={this.props.dataSourceOptions}
          plotly={this.props.plotly}
          onUpdate={this.props.onUpdate}
          advancedTraceTypeSelector={this.props.advancedTraceTypeSelector}
          locale={this.props.locale}
          traceTypesConfig={this.props.traceTypesConfig}
          dictionaries={this.props.dictionaries}
        >
          {this.props.children}
        </EditorControls>
        <div
          className="plotly_editor_plot"
          style={{width: '100%', height: '100%'}}
        >
          <this.PlotComponent
            data={this.props.data}
            layout={this.props.layout}
            config={this.props.config}
            useResizeHandler={this.props.useResizeHandler}
            debug={this.props.debug}
            onInitialized={graphDiv => this.setState({graphDiv})}
            onUpdate={graphDiv => this.setState({graphDiv})}
            style={{width: '100%', height: '100%'}}
          />
        </div>
      </div>
    );
  }
}

PlotlyEditor.propTypes = {
  children: PropTypes.any,
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
  locale: PropTypes.string,
  traceTypesConfig: PropTypes.object,
  dictionaries: PropTypes.object,
};

export default PlotlyEditor;
