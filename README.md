# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

master
![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Usage

Install the module:

```
npm install
```

or

```
yarn install
```

Import the main component into your project:

```
import PlotlyEditor from `react-plotly.js-editor`
```

The Editor expects you to host the plotly.js figure and data sources somewhere
in your application state. For this tour we will presume the Application uses a
top-level react component to hold state. The same principles will apply if you
are using Redux or other data flow patterns.

You can see some examples
[here](https://github.com/plotly/react-plotly.js-editor/tree/master/examples).

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
points your project to the copy of react that it should be using

OR

you can simply do `rm -rf node_modules/react` and `rm -rf
node_modules/react-dom` inside of the `react-plotly.js-editor` repository so
that your project relies on the react and react-dom copy of your main project.

## See also

* [plotlyjs-react](https://github.com/plotly/plotlyjs-react)

## License

&copy; 2017 Plotly, Inc. MIT License.
