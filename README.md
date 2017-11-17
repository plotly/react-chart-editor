# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

master ![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

develop ![develop](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/develop.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Installation


## API


## Development

To get started:

```bash
$ npm install
$ npm start
```

To build the dist version:

```bash
$ npm run prepublish
```

## Developer notes
 A PlotlyEditor widgets is composed of 3 layers:

### Layer 1: Base Component
```
    <PlotlyEditor>
```

### Layer 2: Container Components:
One or more nested Container Components with one and only one connected by a connect<Container>ToPlot function (connectLayoutToPlot, connectTraceToPlot).
```
    <Panel>, <Section>, <Fold>
```

### Layer 3: Attribute Widgets
Each connected by a `connectContainerToPlot` function
    <Numeric>, <ColorPicker>, <Radio> and remaining UI Controls
```

Data flows via `context` downward and is augmented with additional information at each layer boundary.
The Base Components aggregate references to the graphDiv objects (data, fullData, layout...), grid Data sources, locale, update functions etc. One of the Container Components uses its knowledge about which container to target (traces, layout, ...) to generate fewer but more specific containers and updaters which are passed down the hierarchy. The Attribute widgets are higher-order wrappers around dumb UI controls. The higher-order wrapper uses the container contexts and specific attributes information to provide specific plot update functions and other behaviours for the inner UI control.

## See also

- [plotlyjs-react](https://github.com/plotly/plotlyjs-react)

## License

&copy; 2017 Plotly, Inc. MIT License.
