import React from "react";
import TextAreaInput from "@workspace/components/widgets/TextAreaInput";

// TODO Implement actual HTML editor with toolbar button. This is temporary.
class HTMLEditor extends TextAreaInput {
  render() {
    return (
      <div className="html-editor">
        <textarea
          ref="textinput"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          className="html-editor__textarea"
        />
      </div>
    );
  }
}

export default HTMLEditor;
