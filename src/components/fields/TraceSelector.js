import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  connectToContainer,
  traceTypeToPlotlyInitFigure,
  plotlyTraceToCustomTrace,
  computeTraceOptionsFromSchema,
} from 'lib';
import {TRACES_WITH_GL} from 'lib/constants';
import {TraceTypeSelector, TraceTypeSelectorButton, RadioBlocks} from 'components/widgets';
import Field from './Field';
import {CogIcon} from 'plotly-icons';

class TraceSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.updatePlot = this.updatePlot.bind(this);
    this.setGl = this.setGl.bind(this);
    this.glEnabled = this.glEnabled.bind(this);
    this.setTraceDefaults = this.setTraceDefaults.bind(this);
    this.toggleGlControls = this.toggleGlControls.bind(this);

    this.setTraceDefaults(props.container, props.fullContainer, props.updateContainer);
    this.setLocals(props, context);

    this.state = {showGlControls: false};
  }

  glEnabled() {
    return this.props.container.type && this.props.container.type.endsWith('gl') ? 'gl' : '';
  }

  toggleGlControls() {
    this.setState({showGlControls: !this.state.showGlControls});
  }

  setLocals(props, context) {
    const _ = context.localize;
    if (props.traceOptions) {
      this.traceOptions = props.traceOptions;
    } else if (context.traceTypesConfig) {
      this.traceOptions = context.traceTypesConfig.traces(_);
    } else if (context.plotSchema) {
      this.traceOptions = computeTraceOptionsFromSchema(context.plotSchema, _, this.context);
    } else {
      this.traceOptions = [{label: _('Scatter'), value: 'scatter'}];
    }
    if (props.container) {
      this.fullValue = plotlyTraceToCustomTrace(props.container);
    }
  }

  setTraceDefaults(container, fullContainer, updateContainer, gl) {
    if (container && !container.mode && fullContainer.type === 'scatter') {
      updateContainer({
        type: 'scatter' + (gl || this.context.glByDefault ? gl : this.glEnabled()),
        mode: fullContainer.mode || 'markers',
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const {container, fullContainer, updateContainer} = nextProps;
    this.setTraceDefaults(container, fullContainer, updateContainer);
    this.setLocals(nextProps, nextContext);
  }

  updatePlot(value) {
    const {updateContainer} = this.props;
    const {glByDefault} = this.context;
    if (updateContainer) {
      updateContainer(traceTypeToPlotlyInitFigure(value, this.glEnabled() || glByDefault));
    }
  }

  setGl(value) {
    const {container, fullContainer, updateContainer} = this.props;
    const gl = 'gl';

    this.setTraceDefaults(container, fullContainer, updateContainer, value);

    const traceType =
      this.fullValue.endsWith(gl) && value === ''
        ? this.fullValue.slice(0, -gl.length)
        : this.fullValue;

    updateContainer(traceTypeToPlotlyInitFigure(traceType, value));
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
      options: this.traceOptions,
      clearable: false,
    });
    const {localize: _, advancedTraceTypeSelector} = this.context;

    const options = [
      {label: _('SVG'), value: ''},
      {label: _('WebGL'), value: 'gl'},
    ];

    // Check and see if the advanced selector prop is true
    if (advancedTraceTypeSelector) {
      return (
        <div>
          <Field {...props}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <TraceTypeSelectorButton
                {...props}
                traceTypesConfig={this.context.traceTypesConfig}
                handleClick={() =>
                  this.context.openModal(TraceTypeSelector, {
                    ...props,
                    traceTypesConfig: this.context.traceTypesConfig,
                    glByDefault: this.context.glByDefault,
                  })
                }
              />
              {!TRACES_WITH_GL.includes(this.props.container.type) ? (
                ''
              ) : (
                <CogIcon className="menupanel__icon" onClick={this.toggleGlControls} />
              )}
            </div>
          </Field>
          {!(TRACES_WITH_GL.includes(this.props.container.type) && this.state.showGlControls) ? (
            ''
          ) : (
            <Field label={_('Rendering')}>
              <RadioBlocks
                options={options}
                activeOption={this.glEnabled()}
                onOptionChange={this.setGl}
              />
            </Field>
          )}
        </div>
      );
    }

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.contextTypes = {
  openModal: PropTypes.func,
  advancedTraceTypeSelector: PropTypes.bool,
  traceTypesConfig: PropTypes.object,
  plotSchema: PropTypes.object,
  config: PropTypes.object,
  localize: PropTypes.func,
  glByDefault: PropTypes.bool,
};

TraceSelector.propTypes = {
  container: PropTypes.object.isRequired,
  fullContainer: PropTypes.object.isRequired,
  fullValue: PropTypes.any,
  updateContainer: PropTypes.func,
};

export default connectToContainer(TraceSelector);
