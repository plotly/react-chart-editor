import React from "react";
import ReactDOM from "react-dom";
import PlotEditor from "../../src/plotly.js-react-editor.jsx";
var fs = require("fs");
import path from "path";
import styles from "./index.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <PlotEditor />
      </div>
    );
  }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
