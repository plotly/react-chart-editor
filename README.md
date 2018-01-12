# plotly-react-editor

> Customizable React-based editor panel for Plotly charts

master
![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Quick start

Check out the demo of the `DefaultEditor` at https://plotly.github.io/react-plotly.js-editor/ or run it locally with:

```
git clone [this repo]
cd react-plotly.js-editor
cd examples/simple
npm install
npm start
```

See more examples
[here](https://github.com/plotly/react-plotly.js-editor/tree/master/examples).

## Overview

This module's entry point is a React component called `<PlotlyEditor />` which connects to a [Plotly.js](https://plot.ly/javascript/)-powered `<Plot />` component care of [`react-plotly.js`](https://github.com/plotly/react-plotly.js). `<PlotlyEditor />` accepts as children React components whose descendents are input elements wrapped via `connectToContainer()` calls so as to bind them to the `<Plot />`'s figure values. If no children are passed to the `<PlotlyEditor />`, the `<DefaultEditor />` is used.

This module exposes the [building block components](#Built-in-Components) that comprise the `<DefaultEditor />` so that developers can create their own customized editors.

## Connecting `<PlotlyEditor />` to `<Plot />`

The binding between `<PlotlyEditor />` and `<Plot />` works a little differently that in most React apps because Plotly.js mutates its properties. This is mapped onto React's one-way dataflow model via event handlers and shared revision numbers which trigger re-renders of mutated state. The following subset of the [simple example](https://github.com/plotly/react-plotly.js-editor/tree/master/examples/simple) shows how this works using a parent component to store state, but the principle is the same with a different state-manage approach, as shown in the [redux example](https://github.com/plotly/react-plotly.js-editor/tree/master/examples/simple):

```javascript
  handlePlotUpdate(graphDiv) {
    this.setState(({editorRevision: x}) => ({editorRevision: x + 1, graphDiv}));
  }

  handleEditorUpdate() {
    this.setState(({plotRevision: x}) => ({plotRevision: x + 1}));
  }

  render() {
    return (
      <div>
        <PlotlyEditor
          graphDiv={this.state.graphDiv}
          onUpdate={this.handleEditorUpdate.bind(this)}
          revision={this.state.editorRevision}
          ...
        />
        <Plot
          data={this.state.graphDiv.data}
          layout={this.state.graphDiv.layout}
          onUpdate={this.handlePlotUpdate.bind(this)}
          revision={this.state.plotRevision}
          ....
        />
      </div>
    );
  }
```

## Data Management

`<PlotlyEditor />` accepts a `dataSources` property which is an object of arrays of data, as well as a `dataSourceOptions` property which contains metadata about the `dataSources`, such as human-readable labels used to populate input elements like dropdown menus. `<PlotlyEditor />` treats these properties as immutable so any changes to them will trigger a rerender, and accepts an `onUpdateTraces` event handler property which is called whenever it needs to access a column from `dataSources`, enabling asynchronous data loading e.g. from remote APIs. The [async-data example](https://github.com/plotly/react-plotly.js-editor/tree/master/examples/async-data) shows how this is done using a dummy asynchronous back-end proxy.

## Styling the `<DefaultEditor />` and the built-in components

* Import editor styles with `import react-plotly.js-editor/lib/react-plotly.js-editor.min.css`
* Interested in [theming](https://github.com/plotly/react-plotly.js-editor/tree/master/THEMING.md)?
* Need to support IE11? import the IE css instead: `import react-plotly.js-editor/lib/react-plotly.js-editor.ie.min.css`

## Development Setup

You can use `npm link` to link your local copy of the `react-plotly.js-editor` to your test repo.

With `npm link` you can get some errors related to
[multiple copies of react being loaded](https://github.com/facebookincubator/create-react-app/issues/1107).
To get around this, you can create an
[alias](https://github.com/facebookincubator/create-react-app/issues/393) that
points your project to the copy of react that it should be using or you can
simply remove `react` and `react-dom` from `react-plotly.js-editor`.

### Using the `simple` example for development

In one terminal:

```
npm link       # registers react-plotly.js-editor for subsequent npm link calls
npm run watch  # keep this running
```

In another terminal:

```
cd examples/simple # or any other application directory
npm install
rm -rf node_modules/react node_modules/react-dom node_modules/react-plotly.js-edit
npm link react-plotly.js-edit
npm start # keep this running
```

## Built-in Component Reference

## See also

* [plotly.js](https://github.com/plotly/plotly.js)
* [react-plotlyjs](https://github.com/plotly/react-plotly.js)

## License

&copy; 2017 Plotly, Inc. MIT License.
