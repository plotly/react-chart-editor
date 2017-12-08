# Simple

## Temporary Requirement (until editor is published)

```
cd react-plotly.js-editor
npm install
npm run prepublishOnly
npm link
cd examples/simple
npm install
cd node_modules/react
npm link
cd ../react-dom
npm link
cd ../../..
rm -rf node_modules/react node_modules/react-dom
npm link react
npm link react-dom
cd examples/simple
npm link react-plotly.js-editor
```

## Start

```
yarn start
```

or

```
npm start
```
