import React, { Component } from "react";
import PropTypes from "prop-types";

import { isLaTeXExpr as isWrapped } from "@workspace/components/widgets/annotation_editor/convertFormats";

class LaTeXEditor extends Component {
  constructor(props) {
    super(props);

    // Internally, represesent the LaTeX document without the
    // wrapping `$...$` characters.
    const unwrappedValue = this.unwrap(props.value);

    this.state = {
      value: unwrappedValue,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const unwrappedNextValue = this.unwrap(nextProps.value);

    if (unwrappedNextValue !== this.state.value) {
      this.setState({
        value: unwrappedNextValue,
      });
    }
  }

  // Return a new value with wrapping `$...$` removed.
  unwrap(value) {
    if (isWrapped(value)) {
      return value.substr(1, value.length - 2);
    }

    return value;
  }

  // Wrap value in `$...$`.
  wrap(value) {
    if (!isWrapped(value)) {
      return `$${value}$`;
    }

    return value;
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onBlur(e) {
    const value = this.wrap(e.target.value);
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="latex-editor">
        <textarea
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          className="latex-editor__textarea"
        />
      </div>
    );
  }
}

LaTeXEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

LaTeXEditor.defaultProps = {
  value: "",
  placeholder: "",
};

export default LaTeXEditor;
