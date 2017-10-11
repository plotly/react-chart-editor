# react-plotly.js-editor

> Standalone React-based editor panel for Plotly charts 

## Installation


## API


## Development

To get started, you may need this repo as well as the plotly react component and editor. It might be a good idea to make a directory to manage these dependencies.

```bash
$ cd /path/to/my/dev/directory
```

Next, clone the [react-plotly.js](https://github.com/plotly/react-plotly.js) repository.

```bash
$ git clone git@github.com:plotly/react-plotly.js.git
$ cd react-plotly.js
$ npm install
$ npm run prepublishOnly
$ npm link
$ cd ../
```

Then clone the [react-plotly.js-editor](git@github.com:plotly/react-plotly.js-editor.git) repository. At the moment you should be using the `develop` branch.

```bash
$ git clone git@github.com:plotly/react-plotly.js-editor.git
$ cd react-plotly.js-editor
$ git checkout develop
$ npm install
$ npm run prepublishOnly
$ npm link
$ cd ../
```

Finally, clone this repo.

```bash
$ git clone git@github.com:plotly/react-plotly.js-lab.git
$ cd react-plotly.js-lab
$ npm link react-plotly.js
$ npm link react-plotly.js-editor
$ npm install
$ npm start
```

If the server script complains that it can't find `plotly.js`, you have two options. You can either clone it into the same directory with the other repos or run the server task directly:

```bash
$ node server.js --plotlyjs ../../path/to/your/plotly.js
```


## See also

- [react-plotly.js](https://github.com/plotly/react-plotly.js)

## License

&copy; 2017 Plotly, Inc. MIT License.
