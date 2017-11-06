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
The PlotlyEditor UI component API is broken down into 4 layers:

Layer 1: Base Components
```
    <PlotlyEditor>, <DefaultEditor>, <PanelMenuWrapper>, <Panel>
```
Layer 2: Container Components
```
    <TraceAccordion>, <Trace>, <Layout>
```
Layer 3: High Level Connected Attribute Components
```
    <ConnectToPlot>, <Section> and all Plot Connected wrappers
```
Layer 4: Dumb UI widgets
```
    <Numeric>, <ColorPicker>, <Radio> and remaining UI Controls
```
Data flows via `context` downward and is augmented with additional information at each layer boundary. Data exchange from Layer 3 -> Layer 4 is handled via props.

The Base Components aggregate references to the graphDiv objects (data, fullData, layout...), grid Data sources, locale, update functions etc. The Container Components use their knowledge about which container they target (traces, layout, ...) to generate fewer but more specific containers and updaters and pass these down to the next layer. The High Level Connected wrapper components mix these containers with specific attributes and other information to provide specific plot update functions and other behaviours. Those functions are then passed as props to the final layer composed of dumb UI widgets or controls.

## See also

- [plotlyjs-react](https://github.com/plotly/plotlyjs-react)

## License

&copy; 2017 Plotly, Inc. MIT License.
