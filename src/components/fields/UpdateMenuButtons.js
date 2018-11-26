import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dropdown, TextEditor} from '../index';
import Field from './Field';
import {connectToContainer} from 'lib';
import {EditorControlsContext} from '../../context';

class UpdateMenuButtons extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentButtonIndex: 0,
    };
  }

  renderDropdown() {
    const _ = this.context.localize;
    const options = this.props.fullValue.map((button, index) => {
      return {label: _('Button') + ` ${index + 1}`, value: index};
    });
    return (
      <Dropdown
        attr="buttons"
        label={_('Button')}
        options={options}
        updatePlot={index => this.setState({currentButtonIndex: index})}
        clearable={false}
        fullValue={this.state.currentButtonIndex}
        context={this.props.context}
      />
    );
  }

  render() {
    return (
      <Field context={this.props.context}>
        {this.renderDropdown()}
        <TextEditor attr={`buttons[${this.state.currentButtonIndex}].label`} richTextOnly />
      </Field>
    );
  }
}

UpdateMenuButtons.propTypes = {
  attr: PropTypes.string,
  fullValue: PropTypes.array,
  updatePlot: PropTypes.func,
  context: PropTypes.any,
};

UpdateMenuButtons.contextType = EditorControlsContext;
UpdateMenuButtons.requireContext = {
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
  description: PropTypes.string,
};

export default connectToContainer(UpdateMenuButtons);
