import ColorscalePicker, {Colorscale} from 'react-colorscales';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Scale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorscalePicker: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      showColorscalePicker: !this.state.showColorscalePicker,
    });
  }

  render() {
    return (
      <div>
        <Colorscale colorscale={this.props.selected} onClick={this.toggle} />
        {this.state.showColorscalePicker ? (
          <ColorscalePicker
            onChange={this.props.onColorscaleChange}
            colorscale={this.props.selected}
          />
        ) : null}
      </div>
    );
  }
}

Scale.propTypes = {
  onColorscaleChange: PropTypes.func,
  selected: PropTypes.array,
};

export default Scale;
