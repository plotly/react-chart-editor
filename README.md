# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

master
![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Usage

Install the module with `npm install` or `yarn install`. See some examples
[here](https://github.com/plotly/react-plotly.js-editor/tree/master/examples).

## Overview

The Editor is composed of 3 layers:

### Layer 1: Base Component

```
import PlotlyEditor from `react-plotly.js-editor`

<PlotlyEditor>
```

The PlotlyEditor Component expects you to host the plotly.js figure and data
sources somewhere in your application state. This can be done in a top-level
react component, Redux or any other data flow pattern.

### Layer 2: Container Components

One or more nested Container Components with one and only one connected by a
connect<Container>ToPlot function (connectLayoutToPlot, connectTraceToPlot).

```
   <Panel>, <Section>, <Fold>
```

### Layer 3: Attribute Widgets

Each connected by a `connectContainerToPlot` function

```
   <Numeric>, <ColorPicker>, <Radio>
```

Data flows via `context` downward and is augmented with additional information
at each layer boundary.

The Base Components aggregate references to the graphDiv objects (data,
fullData, layout...), grid Data sources, locale, update functions etc.

One of the Container Components uses its knowledge about which container to
target (traces, layout, ...) to generate fewer but more specific containers and
updaters which are passed down the hierarchy.

The Attribute widgets are higher-order wrappers around dumb UI controls. The
higher-order wrapper uses the container contexts and specific attributes
information to provide specific plot update functions and other behaviours for
the inner UI control.

## Development

```
git clone
cd react-plotly.js-editor
react-plotly.js-editor$ npm install
react-plotly.js-editor$ npm run make:lib
react-plotly.js-editor$ npm run watch
```

You can use `npm link` to link your local copy of the `react-plotly.js-editor`
to your test repo. To do so run `npm link` before the `npm run watch` script
mentioned above. Then in your development repo you can do `npm link
react-plotly.js-editor` to use your local copy of the editor.

With `npm link` you can get some errors related to
[multiple copies of react being loaded](https://github.com/facebookincubator/create-react-app/issues/1107).
To get around this, you can create an
[alias](https://github.com/facebookincubator/create-react-app/issues/393) that
points your project to the copy of react that it should be using or you can
simply do `rm -rf node_modules/react` and `rm -rf node_modules/react-dom` inside
of the `react-plotly.js-editor` repository so that your project relies on the
react and react-dom copy of your main project.

## See also

* [plotlyjs-react](https://github.com/plotly/plotlyjs-react)

## License

&copy; 2017 Plotly, Inc. MIT License.
