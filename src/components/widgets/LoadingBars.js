import React from "react";

var LoadingBars = React.createClass({
  propTypes: {
    className: PropTypes.string,
    loadingText: PropTypes.string,
  },

  renderLoadingText: function() {
    if (!this.props.loadingText) return null;

    return <h2 className="plotlybars-text">{this.props.loadingText}</h2>;
  },
  render: function() {
    let bars = [];

    for (let i = 1; i < 8; i++) {
      let className = "plotlybars-bar b" + i;
      bars.push(<div key={i} className={className} />);
    }

    var wrapperClass = "plotlybars-wrapper";
    if (this.props.className) wrapperClass += ` ${this.props.className}`;

    return (
      <div id="plotlybars" className={wrapperClass}>
        <div className="plotlybars">{bars}</div>
        {this.renderLoadingText()}
      </div>
    );
  },
});

export default LoadingBars;
