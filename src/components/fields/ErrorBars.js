import PropTypes from 'prop-types';
import {Component} from 'react';
import {DataSelector, Radio, Numeric, MultiColorPicker} from '../index';
import RadioBlocks from '../widgets/RadioBlocks';
import Field from './Field';
import {connectToContainer} from 'lib';

class ErrorBars extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
  }

  updatePlot(value) {
    if (value === 'symmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: true,
      });
    }

    if (value === 'asymmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: false,
      });
    }

    if (value === 'hidden') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: false,
      });
    }
  }

  getMode() {
    let mode;

    if (!this.props.fullValue.visible) {
      mode = 'hidden';
    }

    if (
      this.props.fullValue.visible &&
      (this.props.fullValue.symmetric || typeof this.props.fullValue.symmetric === 'undefined')
    ) {
      // when this.props.fullValue.type === 'sqrt',
      // then this.props.fullValue.symmetric is undefined, but 'sqrt' is only
      // applicable when we want symmetric error bars
      // https://github.com/plotly/plotly.js/issues/2359
      mode = 'symmetric';
    }

    if (this.props.fullValue.visible && this.props.fullValue.symmetric === false) {
      // it has to be explicitly set to false, because we don't want it to catch
      // cases when it's undefined
      mode = 'asymmetric';
    }

    return mode;
  }

  renderModeSelector() {
    const {localize: _} = this.context;

    return (
      <Field>
        <RadioBlocks
          alignment="center"
          onOptionChange={this.updatePlot}
          activeOption={this.getMode()}
          options={[
            {label: _('None'), value: 'hidden'},
            {label: _('Symmetric'), value: 'symmetric'},
            {label: _('Asymmetric'), value: 'asymmetric'},
          ]}
        />
      </Field>
    );
  }

  renderErrorBarControls() {
    const {localize: _} = this.context;
    const mode = this.getMode();
    const showCustomDataControl = this.props.fullValue.type === 'data';

    const styleAttrs = (
      <>
        <Radio
          label={_('Copy Y Style')}
          attr={`${this.props.attr}.copy_ystyle`}
          options={[
            {label: _('Yes'), value: true},
            {label: _('No'), value: false},
          ]}
        />
        <Radio
          label={_('Copy Z Style')}
          attr={`${this.props.attr}.copy_zstyle`}
          options={[
            {label: _('Yes'), value: true},
            {label: _('No'), value: false},
          ]}
        />
        <MultiColorPicker label={_('Color')} attr={`${this.props.attr}.color`} />
        <Numeric label={_('Thickness')} attr={`${this.props.attr}.thickness`} />
        <Numeric label={_('Crossbar Width')} attr={`${this.props.attr}.width`} />
      </>
    );

    if (mode === 'symmetric') {
      return (
        <>
          <Radio
            label={_('Error Type')}
            attr={`${this.props.attr}.type`}
            options={[
              {label: _('%'), value: 'percent'},
              {label: _('Constant'), value: 'constant'},
              {label: _('√'), value: 'sqrt'},
              {label: _('Data'), value: 'data'},
            ]}
          />
          <Numeric label={_('Value')} attr={`${this.props.attr}.value`} />
          {showCustomDataControl ? (
            <DataSelector label={_('Custom Data')} attr={`${this.props.attr}.array`} />
          ) : null}
          {styleAttrs}
        </>
      );
    }

    if (mode === 'asymmetric') {
      return (
        <>
          <Radio
            label={_('Error Type')}
            attr={`${this.props.attr}.type`}
            options={[
              {label: _('%'), value: 'percent'},
              {label: _('Constant'), value: 'constant'},
              {label: _('Data'), value: 'data'},
            ]}
          />
          <Numeric label={_('Value')} attr={`${this.props.attr}.value`} />
          <Numeric label={_('Value (-)')} attr={`${this.props.attr}.valueminus`} />
          {showCustomDataControl ? (
            <>
              <DataSelector label={_('Error (+)')} attr={`${this.props.attr}.array`} />
              <DataSelector label={_('Error (-)')} attr={`${this.props.attr}.arrayminus`} />
            </>
          ) : null}
          {styleAttrs}
        </>
      );
    }

    return null;
  }

  render() {
    return (
      <>
        {this.renderModeSelector()}
        {this.renderErrorBarControls()}
      </>
    );
  }
}

ErrorBars.propTypes = {
  attr: PropTypes.string,
  fullValue: PropTypes.object,
  updatePlot: PropTypes.func,
};

ErrorBars.contextTypes = {
  localize: PropTypes.func,
};

export default connectToContainer(ErrorBars);
