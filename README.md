# react-plotly.js-editor

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

This module's entry point is a React component called `<PlotlyEditor />` which connects to a [Plotly.js](https://plot.ly/javascript/)-powered `<Plot />` component care of [`react-plotly.js`](https://github.com/plotly/react-plotly.js). A Plotly.js plot is defined by a JSON-serializable object called a _figure_. `<PlotlyEditor />` accepts as children React components whose descendents are input elements wrapped via `connectToContainer()` calls so as to bind them to the `<Plot />`'s figure's values. If no children are passed to the `<PlotlyEditor />`, the `<DefaultEditor />` is used.

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
          {...snip}
        />
        <Plot
          data={this.state.graphDiv.data}
          layout={this.state.graphDiv.layout}
          onUpdate={this.handlePlotUpdate.bind(this)}
          revision={this.state.plotRevision}
          {...snip}
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

## Built-in Components

This module provides a number of nestable _containers_ which are intended to contain _fields_ that render _widgets_ that have been connected to individual values in the figure via _connectors_. Containers can also be connected to certain parts of the figure tree such that their child fields map to the appropriate leaf values. The `<PlotlyEditor />` and connector functions use the React [`context` API]() to push configuration information to child components.

At a pseudo-code level it looks like this:

```javascript
<PlotlyEditor {...etc}>
  <Container name="the_name" {...etc}>
    <Field attr="figure.value.path" {...etc} />
  </Container>
</PlotlyEditor>
```

### General-purpose Containers

* `<Panel />`: renders as a generic rectangular container with special handling for collapsing/expanding child `<Fold />`s and optionally an 'add' button for creating them
* `<PanelMenuWrapper />`: renders as a sidebar selector menu for `<Panel />`s
* `<Fold />`: collapsable container within a `<Panel />`
* `<Section />`: uncollapsable container within a `<Panel />` or `<Fold />`
* `<MenuPanel />`: container child of `<Section />` that appears when a cog icon in the section title is clicked on

### General-purpose Fields

Fields all accept an `attr` property (if bindable) to indicate which figure value they are bound to. This property can be a `.`-delimited path to a leaf, starting at the context-appropriate point in the figure for the parent container (see connector functions below).

* `<Numeric />`: useful for numeric values
* `<Radio />`: useful for mutually-exclusive low-cardinality enumerable values
* `<Dropdown />`: useful for mutually-exclusive high-cardinality enumerable values
* `<ColorPicker />`: useful for CSS color hex value strings
* `<Flaglist />`: useful for `+`-joined flag lists like `data[].mode`
* `<MultiFormatTextEditor />`: useful for text like `layout.title`
* `<Info />`: useful for displaying help text (unbindable)

### Connector functions

* `connectToContainer( Field )`: returns a wrapped field component that can be bound to a figure value.
* `connectTraceToPlot( Container )`: returns a wrapped container component that can be bound to a figure trace such that its children are bound to that trace's figure entry under the `data` key, e.g. `<TraceAccordion />` below.
* `connectLayoutToPlot( Container )`: returns a wrapped container component that can be bound to a figure such that its children are bound to that figure's layout under the `layout` key.
* `connectAxesToLayout( Container )`: returns a wrapped container component that should contain an `<AxesSelector />` field (see below) and can be bound to a figure such that its children are bound to that figure's axes entries under the `layout.*axis` keys.
* `connectAnnotationToLayout( Container )`: returns a wrapped container component that can be bound to a figure annotation such that its children are bound to that annotation's figure entry under the `layout.annotations` key, e.g. `<AnnotationAccordion />` below.

### Special-Purpose Containers

* `<TraceAccordion />`: `<Panel />` whose children are replicated into `<Folds />` connected to traces via `connectTraceToPlot()`.
* `<AnnotationAccordion />`: `<Panel />` whose children are replicated into `<Folds />` connected to annotations via `connectAnnotationToLayout()`.
* `<TraceMarkerSection />`: Wrapper around `<Section />` with trace-specific name handling. For use in containers bound to traces e.g. as children of `<TraceAccordion />`.

### Special-Purpose Fields

For use in containers bound to traces e.g. as children of `<TraceAccordion />`:

* `<DataSelector />`: dropdown coupled to `data[].*src` etc, triggers `onUpdateTraces` when changed
* `<TraceSelector />`: dropdown useful for `data[].type`
* `<LineDashSelector />`: dropdown useful for `data[].line.dash`
* `<LineShapeSelector />`: dropdown useful for `data[].line.shape`
* `<SymbolSelector />`: dropdown useful for `data[].marker.symbol`
* `<LayoutNumericFraction />` and `<LayoutNumericFractionInverse />`: numeric fields for use in trace-connected containers where normal `<Numerics />` would be bound to the `data` key instead of the `layout` key in the figure e.g. `layout.bargap` or `layout.barwidth`.

For use in containers bound to layout:

* `<FontSelector />`: dropdown whose options are rendered in the selected font
* `<CanvasSize />`: numeric with visibility coupled to `layout.autosize`

For use in containers bound to axes:

* `<AxesSelector />`: radio group to select one or all axes. Must be in a container bound to a figure via `connectAxesToPlot()` and sets that container's context such that its children are bound to either all axes or just the selected one.
* `<AxesRange />`: numeric with visibility coupled to `layout.*axis.autorange`

For use in containers bound to annotations e.g. as children of `<AnnotationAccordion />`:

* `<AnnotationRef />`: dropdown useful for `layout.annotations[].xref`, `layout.annotations[].yref`
* `<AnnotationArrowRef />`: dropdown useful for `layout.annotations[].axref`, `layout.annotations[].ayref`
* `<ArrowSelector />`: dropdown useful for `layout.annotations[].arrowhead`

## See also

* [plotly.js](https://github.com/plotly/plotly.js)
* [react-plotlyjs](https://github.com/plotly/react-plotly.js)

## License

&copy; 2017 Plotly, Inc. MIT License.
