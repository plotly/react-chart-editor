import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dropdown, TextEditor} from '../index';
import Field from './Field';
import {connectToContainer, localize} from 'lib';

class UpdateMenuButtons extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentButtonIndex: 0,
    };
  }

  renderDropdown() {
    const _ = this.props.localize;
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
      />
    );
  }

  render() {
    return (
      <Field>
        {this.renderDropdown()}
        <TextEditor
          attr={`buttons[${this.state.currentButtonIndex}].label`}
          richTextOnly
        />
      </Field>
    );
  }
}

UpdateMenuButtons.propTypes = {
  attr: PropTypes.string,
  localize: PropTypes.func,
  fullValue: PropTypes.object,
  updatePlot: PropTypes.func,
};

export default connectToContainer(localize(UpdateMenuButtons));
