# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

master
![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Installation

Install the module with `npm install` or `yarn install`.

## Quick Start

1. Create a quick project using `create-react-app`: `npm install -g
   create-react-app` | `create-react-app quick-start` | `cd quick-start` | `npm
   start`
2. Install the needed modules: `npm install plotly.js react-plotly.js
   react-plotly.js-editor --save`
3. Import css stylesheets: `import
   react-plotly.js-editor/lib/react-plotly.js-editor.css` and
   `react-select/dist/react-select.css`
4. Decide how your application is going to manage state: higher level component
   (see
   [simple example](https://github.com/plotly/react-plotly.js-editor/tree/master/examples/simple))
   or with the help of a state management library like Redux (see
   [redux example](https://github.com/plotly/react-plotly.js-editor/tree/master/examples/redux))
5. Your application will hold in its state:
   * the `graphDiv`, which is the dom element on which plotly.js attaches data
     and layout information,
   * the editorRevision number and plotRevision numbers, to prevent unneeded app
     rerenders
   * an object containing all dataSources (ex: `{col1: [1, 2, 3], col2: [4, 3,
     2], col3: [17, 13, 9]}`),
   * an array of all dataSourceOptions (ex: `[ {value: 'col1', label: 'CO2'},
     {value: 'col2', label: 'NO2'}, {value: 'col3', label: 'SiO2'} ]`)
6. Initialize your application's state with the elements above. For the
   `graphDiv`, we can pass in an initial object containing data and layout,
   plotly.js (via a callback), will then update our state with the `graphDiv`
   dom element
7. Write the callbacks that are going to update our application state:
   * handlePlotUpdate: should change the app state with the updated `graphDiv`
     and increase the editorRevision number
   * handleEditorUpdate: should increase the plotRevision number
8. Render the Plot and Editor Components:
   * Plot component: is created with react-plotly.js with the
     createPlotComponent function and plotly.js as argument. It requires a few
     props:
     * data, layout, revision: from application state
     * onUpdate: the handlePlotUpdate callback created above
   * Editor component: is imported from `react-plotly.js-editor`, it requires
     these props:
     * dataSources, dataSourceOptions, graphDiv, revision: from application
       state
     * onUpdate: the handleEditorUpdate callback above
     * plotly: the plotly.js library
     * locale: if using the default locale 'en', it is not necessary to pass in
       this prop, more on locales later

See examples
[here](https://github.com/plotly/react-plotly.js-editor/tree/master/examples).

## Development Setup

```
git clone
cd react-plotly.js-editor
react-plotly.js-editor$ npm install
react-plotly.js-editor$ npm run make:lib
react-plotly.js-editor$ npm run watch
```

You can use `npm link` to link your local copy of the `react-plotly.js-editor`
to your test repo. To do so run `npm link` before `npm run watch`. Then in your
development repo you can do `npm link react-plotly.js-editor` to use your local
copy of the editor.

With `npm link` you can get some errors related to
[multiple copies of react being loaded](https://github.com/facebookincubator/create-react-app/issues/1107).
To get around this, you can create an
[alias](https://github.com/facebookincubator/create-react-app/issues/393) that
points your project to the copy of react that it should be using or you can
simply remove `react` and `react-dom` from the package.json of the
`react-plotly.js-editor` so that your project relies on the `react` and
`react-dom` copy of your main project.

## See also

* [react-plotlyjs](https://github.com/plotly/react-plotly.js)

## License

&copy; 2017 Plotly, Inc. MIT License.
