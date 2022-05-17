import ColorPickerWidget from '../widgets/ColorPicker';
import Field from './Field';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      empty: !this.props.fullValue && this.props.handleEmpty,
    };
  }

  render() {
    if (this.state.empty) {
      return (
        <Field {...this.props}>
          <div className="js-test-info">
            This color is computed from other parts of the figure but you can{' '}
            <a
              onClick={() => {
                this.setState({empty: false});
                this.props.updatePlot(this.props.defaultColor);
              }}
            >
              override it
            </a>
            .
          </div>
        </Field>
      );
    }

    return (
      <Field {...this.props}>
        <ColorPickerWidget
          selectedColor={this.props.fullValue}
          onColorChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

UnconnectedColorPicker.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  handleEmpty: PropTypes.bool,
  defaultColor: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedColorPicker.displayName = 'UnconnectedColorPicker';

export default connectToContainer(UnconnectedColorPicker);
