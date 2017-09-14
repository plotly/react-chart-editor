import React, { PropTypes } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const { onClick, buttonText } = this.props;

    return (
      <div style={{ marginTop: "8px" }}>
        <div className="button-control js-button-control" onClick={onClick}>
          {buttonText}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};

export default Button;
