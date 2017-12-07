# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

master ![master](https://circleci.com/gh/plotly/react-plotly.js-editor/tree/master.svg?style=svg&circle-token=df4574e01732846dba81d800d062be5f0fef5641)

## Installation
Until the repo is published install via a `git clone` or by downloading the zip from github. Once installed open a terminal and enter the editor directory. Run

```
npm install
npm run prepublishOnly
```

These steps will not be required once this package has been published.

## Tour

Import the main component:
```
import PlotlyEditor from `react-plotly.js-editor`
```

The Editor expects you to host the plotly.js figure and data sources somewhere in your application state. For this tour we will presume the Application uses a top-level react component to hold state. The same principals will apply if you are using Redux or other data flow patterns.




## Development



## See also

- [plotlyjs-react](https://github.com/plotly/plotlyjs-react)

## License

&copy; 2017 Plotly, Inc. MIT License.
