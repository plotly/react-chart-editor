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
    const {selected, onColorscaleChange} = this.props;
    return (
      <div>
        <Colorscale colorscale={selected} onClick={this.toggle} />
        {this.state.showColorscalePicker ? (
          <ColorscalePicker
            onChange={onColorscaleChange}
            colorscale={selected}
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
